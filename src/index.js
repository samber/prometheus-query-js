import axios from "axios";
import {
    QueryResult,
    Metric,
    Target,
    RuleGroup,
    Alert,
} from './models';

export default class PrometheusQuery {

    /**
     * Creates a PrometheusQuery client
     * `options` has the following fields:
     *      - endpoint: address of Prometheus instance
     *      - baseURL: base path of Prometheus API (default: /api/v1)
     *      - headers: headers to be sent (k/v format)
     *      - auth: {username: 'foo', password: 'bar'}: basic auth
     *      - proxy: {host: '127.0.0.1', port: 9000}: hostname and port of a proxy server
     *      - withCredentials: indicates whether or not cross-site Access-Control requests
     *      - timeout: number of milliseconds before the request times out
     *      - warningHook: a hook for handling warning messages
     * @param {*} options
     */
    constructor(options) {
        options = options || {};
        if (!options.endpoint)
            throw "Endpoint is required";

        this.endpoint = options.endpoint.replace(/\/$/, "");
        this.baseURL = options.baseURL || "/api/v1/";
        this.headers = options.headers || {};
        this.auth = options.auth || {};
        this.proxy = options.proxy || {};
        this.withCredentials = options.withCredentials || false;
        this.timeout = options.timeout || 10000;

        this.warningHook = options.warningHook;
    }

    request(method, uri, params, body) {
        const req = axios.request({
            baseURL: this.endpoint + this.baseURL,
            url: uri,
            method: method,
            params: params,
            data: body,
            headers: this.headers,
            auth: {
                username: this.auth.username,
                password: this.auth.password
            },
            proxy: (!!this.proxy.host && !!this.proxy.port) ? {
                host: this.proxy.host,
                port: this.proxy.port
            } : null,
            withCredentials: this.withCredentials,
            timeout: this.timeout,
        });
        return req
            .then((res) => this.handleResponse(res))
            .catch((res) => this.handleResponse(res));
    }

    handleResponse(response) {
        const err = response.isAxiosError;
        if (err)
            response = response['response'];

        if (!response)
            throw {
                status: 'error',
                errorType: 'unexpected_error',
                error: 'unexpected http error',
            };

        if (!!this.warningHook && !!response['warnings'] && response['warnings'].length > 0)
            this.warningHook(response['warnings']);

        const data = response.data;
        if (!data || data.status == null)
            throw {
                status: 'error',
                errorType: 'client_error',
                error: 'unexpected client error',
            };

        if (err)
            throw response;

        // deserialize to QueryResult when necessary
        // if (typeof (data) == 'object' && !!data['data'] && !!data['data']['resultType'])
        //     return QueryResult.fromJSON(data['data']);
        return data['data'];
    }

    formatTimeToPrometheus(input, dEfault) {
        if (!input)
            input = dEfault;

        if (typeof (input) == 'number')
            return input / 1000;
        else if (typeof (input) == 'object' && input.constructor.name == 'Date')
            return input.getTime() / 1000;
        throw new Error("Wrong time format. Expected number or Date.");
    }

    // @DEPRECATED
    // static metricToReadable(metric) {
    //     const name = !!metric['__name__'] ? metric['__name__'] : '';
    //     const labels = Object.assign({}, metric);

    //     // renders readable serie name and labels
    //     delete labels['__name__'];
    //     const strLabels = Object.keys(labels).map((curr) => curr + '="' + labels[curr] + '"');
    //     return name + '{' + strLabels.join(', ') + '}';
    // }

    /***********************  EXPRESSION QUERIES  ***********************/

    /**
     * Evaluates an instant query at a single point in time
     * @param {*} query Prometheus expression query string.
     * @param {*} time Evaluation Date object or number in milliseconds. Optional.
     */
    instantQuery(query, time) {
        const params = {
            query: query,
            time: this.formatTimeToPrometheus(time, new Date()),
        };
        return this.request("GET", "query", params, null)
            .then((data) => QueryResult.fromJSON(data));
    }

    /**
     * Evaluates an expression query over a range of time
     * @param {*} query Prometheus expression query string.
     * @param {*} start Start Date object or number in milliseconds.
     * @param {*} end End Date object or number in milliseconds.
     * @param {*} step Query resolution step width in number of seconds.
     */
    rangeQuery(query, start, end, step) {
        const params = {
            query: query,
            start: this.formatTimeToPrometheus(start),
            end: this.formatTimeToPrometheus(end),
            step: step,
        };
        return this.request("GET", "query_range", params, null)
            .then((data) => QueryResult.fromJSON(data));
    }

    /***********************  METADATA API  ***********************/

    /**
     * Finding series by label matchers
     * @param {*} matchs Repeated series selector argument that selects the series to return.
     * @param {*} start Start Date object or number in milliseconds.
     * @param {*} end End Date object or number in milliseconds.
     */
    series(matchs, start, end) {
        const params = {
            'match[]': matchs,
            start: this.formatTimeToPrometheus(start),
            end: this.formatTimeToPrometheus(end),
        };
        return this.request("GET", "series", params, null)
            .then((data) => data.map(Metric.fromJSON));
    }

    /**
     * Getting label names
     */
    labelNames() {
        return this.request("GET", "labels", null, null);
    }

    /**
     * Querying label values
     * @param {*} labelName This argument is not explicit ?
     */
    labelValues(labelName) {
        return this.request("GET", `label/${labelName}/values`, null, null);
    }

    /**
     * Overview of the current state of the Prometheus target discovery:
     * @param {*} state Filter by target state. Can be 'active', 'dropped' or 'any'. Optional.
     */
    targets(state) {
        const params = {
            query: state || 'any',
        };
        return this.request("GET", "targets", params, null)
            .then((data) => {
                return {
                    'activeTargets': !!data['activeTargets'] ? data['activeTargets'].map(Target.fromJSON) : [],
                    'droppedTargets': !!data['droppedTargets'] ? data['droppedTargets'].map(Target.fromJSON) : [],
                };
            });
    }

    /**
     * Returns metadata about metrics currently scraped from targets.
     * @param {*} matchTarget Label selectors that match targets by their label sets. Optional.
     * @param {*} metric Metric name to retrieve metadata for. Optional.
     * @param {*} limit Maximum number of targets to match. Optional.
     */
    targetsMetadata(matchTarget, metric, limit) {
        const params = {
            match_target: matchTarget,
            metric: metric,
            limit: limit,
        };
        return this.request("GET", "targets/metadata", params, null);
    }

    /**
     * Metadata about metrics currently scrapped from targets
     * @param {*} metric Metric name to retrieve metadata for. Optional.
     * @param {*} limit Maximum number of targets to match. Optional.
     */
    metadata(metric, limit) {
        const params = {
            metric: metric,
            limit: limit,
        };
        return this.request("GET", "metadata", params, null);
    }

    /***********************  SERIES API  ***********************/

    /**
     * Getting a list of alerting and recording rules
     */
    rules() {
        return this.request("GET", "rules", null, null)
            .then((data) => (!!data['groups'] ? data['groups'] : []).map(RuleGroup.fromJSON));
    }

    /**
     * Returns a list of all active alerts.
     */
    alerts() {
        return this.request("GET", "alerts", null, null)
            .then((data) => (!!data['alerts'] ? data['alerts'] : []).map(Alert.fromJSON));
    }

    /**
     * Returns an overview of the current state of the Prometheus alertmanager discovery.
     */
    alertmanagers() {
        return this.request("GET", "alertmanagers", null, null);
    }

    /***********************  STATUS API  ***********************/

    /**
     * Following status endpoints expose current Prometheus configuration.
     */
    status() {
        return this.request("GET", "status/config", null, null);
    }

    /**
     * Returns flag values that Prometheus was configured with.
     * New in v2.2
     */
    statusFlags() {
        return this.request("GET", "status/flags", null, null);
    }

    /**
     * Returns runtime information properties that Prometheus was configured with.
     * New in v2.14
     */
    statusRuntimeInfo() {
        return this.request("GET", "status/runtimeinfo", null, null);
    }

    /**
     * Returns various build information properties about Prometheus Server.
     */
    statusBuildinfo() {
        return this.request("GET", "status/buildinfo", null, null);
    }

    /**
     * Returns various cardinality statistics about the Prometheus TSDB.
     * New in v2.14
     */
    statusTSDB() {
        return this.request("GET", "status/tsdb", null, null);
    }


    /***********************  ADMIN API  ***********************/

    /**
     * Creates a snapshot of all current data
     * New in v2.1
     * @param {*} skipHead Skip data present in the head block. Boolean. Optional.
     */
    adminSnapshot(skipHead) {
        const params = {
            skip_head: skipHead,
        };
        return this.request("POST", "admin/tsdb/snapshot", params, null);
    }

    /**
     * Deletes data for a selection of series in a time range
     * New in v2.1
     * @param {*} matchs Repeated series selector argument that selects the series to return.
     * @param {*} start Start Date object or number in milliseconds.
     * @param {*} end End Date object or number in milliseconds.
     */
    adminDeleteSeries(matchs, start, end) {
        const params = {
            'match[]': matchs,
            start: this.formatTimeToPrometheus(start),
            end: this.formatTimeToPrometheus(end),
        };
        return this.request("POST", "admin/tsdb/delete_series", params, null);
    }

    /**
     * Removes the deleted data from disk and cleans up
     * New in v2.1
     */
    adminCleanTombstones() {
        return this.request("POST", "admin/tsdb/clean_tombstones", null, null);
    }

};
