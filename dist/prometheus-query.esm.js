import axios from 'axios';

// https://prometheus.io/docs/prometheus/latest/querying/api/#expression-query-result-formats
var ResponseType;
(function (ResponseType) {
    ResponseType["MATRIX"] = "matrix";
    ResponseType["VECTOR"] = "vector";
    ResponseType["SCALAR"] = "scalar";
    ResponseType["STRING"] = "string";
})(ResponseType || (ResponseType = {}));
class Metric {
    constructor(name, labels) {
        if (!!name && typeof (name) != 'string')
            throw new Error('Wrong name format. Expected string.');
        if (!!labels && typeof (labels) != 'object')
            throw new Error('Wrong labels format. Expected object.');
        this.name = name;
        this.labels = labels;
    }
    static fromJSON(obj) {
        const name = obj['__name__'];
        const labels = Object.assign({}, obj);
        delete labels['__name__'];
        return new Metric(name, labels);
    }
    toString() {
        const strName = !!this.name ? this.name : '';
        const strLabels = Object.keys(this.labels).map((curr) => curr + '="' + this.labels[curr] + '"');
        return strName + '{' + strLabels.join(', ') + '}';
    }
}
class SampleValue {
    constructor(unixTime, sampleValue) {
        if (typeof (unixTime) != 'object' || unixTime.constructor.name != 'Date')
            throw new Error("Wrong time format. Expected Date.");
        if (typeof (sampleValue) != 'number')
            throw new Error("Wrong value format. Expected float.");
        this.time = unixTime;
        this.value = sampleValue;
    }
    static fromJSON(arr) {
        const unixTime = new Date(arr[0] * 1000);
        const sampleValue = parseFloat(arr[1]);
        return new SampleValue(unixTime, sampleValue);
    }
    toString() {
        return this.time + ': ' + this.value;
    }
}
class RangeVector {
    constructor(metric, values) {
        this.metric = metric;
        this.values = values;
    }
    static fromJSON(obj) {
        const metric = !!obj['metric'] ? Metric.fromJSON(obj['metric']) : null;
        const values = obj['values'].map(SampleValue.fromJSON);
        return new RangeVector(metric, values);
    }
}
class InstantVector {
    constructor(metric, value) {
        this.metric = metric;
        this.value = value;
    }
    static fromJSON(obj) {
        const metric = !!obj['metric'] ? Metric.fromJSON(obj['metric']) : null;
        const value = SampleValue.fromJSON(obj['value']);
        return new InstantVector(metric, value);
    }
}
class QueryResult {
    constructor(resultType, result) {
        this.resultType = resultType;
        this.result = result;
    }
    static fromJSON(data) {
        const resultType = data['resultType'];
        let result = null;
        switch (resultType) {
            case ResponseType.MATRIX:
                result = data['result'].map(RangeVector.fromJSON);
                break;
            case ResponseType.VECTOR:
                result = data['result'].map(InstantVector.fromJSON);
                break;
            case ResponseType.SCALAR:
            case ResponseType.STRING:
                result = data['result'];
                break;
            default:
                throw new Error(`Unexpected resultType: ${resultType}`);
        }
        return new QueryResult(resultType, result);
    }
}
class Target {
    constructor(discoveredLabels, labels, scrapePool, scrapeUrl, lastError, lastScrape, lastScrapeDuration, health) {
        if (!!discoveredLabels && typeof (discoveredLabels) != 'object')
            throw new Error(`Unexpected format for discoveredLabels. Got ${typeof (discoveredLabels)} instead of object`);
        if (!!labels && typeof (labels) != 'object')
            throw new Error(`Unexpected format for labels. Got ${typeof (labels)} instead of object`);
        if (!!scrapePool && typeof (scrapePool) != 'string')
            throw new Error(`Unexpected format for scrapePool. Got ${typeof (scrapePool)} instead of string`);
        if (!!scrapeUrl && typeof (scrapeUrl) != 'string')
            throw new Error(`Unexpected format for scrapeUrl. Got ${typeof (scrapeUrl)} instead of string`);
        if (!!lastError && typeof (lastError) != 'string')
            throw new Error(`Unexpected format for lastError. Got ${typeof (lastError)} instead of string`);
        if (!!lastScrape && (typeof (lastScrape) != 'object' || lastScrape.constructor.name != 'Date'))
            throw new Error(`Unexpected format for lastScrape. Got ${typeof (lastScrape)} instead of object`);
        if (!!lastScrapeDuration && typeof (lastScrapeDuration) != 'number')
            throw new Error(`Unexpected format for lastScrapeDuration. Got ${typeof (lastScrapeDuration)} instead of number`);
        if (!!health && typeof (health) != 'string')
            throw new Error(`Unexpected format for health. Got ${typeof (health)} instead of string`);
        this.discoveredLabels = discoveredLabels;
        this.labels = labels;
        this.scrapePool = scrapePool;
        this.scrapeUrl = scrapeUrl;
        this.lastError = lastError;
        this.lastScrape = lastScrape;
        this.lastScrapeDuration = lastScrapeDuration;
        this.health = health;
    }
    static fromJSON(obj) {
        return new Target(obj['discoveredLabels'], obj['labels'], obj['scrapePool'], obj['scrapeUrl'], obj['lastError'], !!obj['lastScrape'] ? new Date(obj['lastScrape']) : null, !!obj['lastScrapeDuration'] ? parseFloat(obj['lastScrapeDuration']) : null, obj['health']);
    }
}
class Alert {
    constructor(activeAt, annotations, labels, state, value) {
        if (!!activeAt && (typeof (activeAt) != 'object' || activeAt.constructor.name != 'Date'))
            throw new Error(`Unexpected format for activeAt. Got ${typeof (activeAt)} instead of object`);
        if (!!annotations && typeof (annotations) != 'object')
            throw new Error(`Unexpected format for annotations. Got ${typeof (annotations)} instead of object`);
        if (!!labels && typeof (labels) != 'object')
            throw new Error(`Unexpected format for labels. Got ${typeof (labels)} instead of object`);
        // if (!!state && typeof (state) != 'AlertState')
        // throw new Error(`Unexpected format for state. Got ${typeof (state)} instead of string`);
        if (!!value && typeof (value) != 'number')
            throw new Error(`Unexpected format for value. Got ${typeof (value)} instead of number`);
        this.activeAt = activeAt;
        this.annotations = annotations;
        this.labels = labels;
        this.state = state;
        this.value = value;
    }
    static fromJSON(obj) {
        return new Alert(!!obj['activeAt'] ? new Date(obj['activeAt']) : null, obj['annotations'], obj['labels'], obj['state'], !!obj['value'] ? parseFloat(obj['value']) : null);
    }
}
class Rule {
    constructor(alerts, annotations, duration, health, labels, name, query, type) {
        this.alerts = alerts;
        this.annotations = annotations;
        this.duration = duration;
        this.health = health;
        this.labels = labels;
        this.name = name;
        this.query = query;
        this.type = type;
    }
    static fromJSON(obj) {
        return new Rule(!!obj['alerts'] ? obj['alerts'].map(Alert.fromJSON) : [], obj['annotations'], obj['duration'], obj['health'], obj['labels'], obj['name'], obj['query'], obj['type']);
    }
}
class RuleGroup {
    constructor(rules, file, interval, name) {
        this.rules = rules;
        this.file = file;
        this.interval = interval;
        this.name = name;
    }
    static fromJSON(obj) {
        return new RuleGroup(!!obj['rules'] ? obj['rules'].map(Rule.fromJSON) : [], obj['file'], obj['interval'], obj['name']);
    }
}

class PrometheusConnectionOptions {
    constructor() {
        this.baseURL = '/api/v1/';
        this.headers = {};
        this.auth = null;
        this.proxy = null;
        this.withCredentials = false;
        this.timeout = 10000; // ms
        this.preferPost = false;
        this.warningHook = null;
    }
}
class PrometheusDriver {
    /**
     * Creates a PrometheusDriver client
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
        this.listifyIfNeeded = (listOrNot) => listOrNot instanceof Array ? listOrNot : [listOrNot];
        this.formatPromQlParams = (obj) => Object.entries(obj !== null && obj !== void 0 ? obj : {}).reduce((usp, [key, value]) => {
            if (value != null) {
                if (value instanceof Array) {
                    value.filter(v => v != null).forEach(v => usp.append(`${key}[]`, v));
                }
                else {
                    usp.append(key, value);
                }
            }
            return usp;
        }, new URLSearchParams());
        options = options || new PrometheusConnectionOptions();
        if (!options.endpoint)
            throw 'Endpoint is required';
        options.endpoint = options.endpoint.replace(/\/$/, '');
        options.baseURL = options.baseURL || '/api/v1/';
        options.withCredentials = options.withCredentials || false;
        options.timeout = options.timeout || 10000;
        this.options = options;
        this.axiosInstance = axios.create();
        if (!!this.options.requestInterceptor)
            this.axiosInstance.interceptors.request.use(this.options.requestInterceptor.onFulfilled, this.options.requestInterceptor.onRejected);
        if (!!this.options.responseInterceptor)
            this.axiosInstance.interceptors.response.use(this.options.responseInterceptor.onFulfilled, this.options.responseInterceptor.onRejected);
    }
    request(method, uri, params, body) {
        var _a, _b, _c, _d, _e, _f;
        const headers = Object.assign({}, this.options.headers || {});
        const req = this.axiosInstance.request({
            baseURL: this.options.endpoint + this.options.baseURL,
            url: uri,
            method: method,
            params: this.formatPromQlParams(params),
            data: this.formatPromQlParams(body),
            headers: headers,
            auth: (!!((_a = this.options.auth) === null || _a === void 0 ? void 0 : _a.username) && !!((_b = this.options.auth) === null || _b === void 0 ? void 0 : _b.password)) ? {
                username: this.options.auth.username,
                password: this.options.auth.password
            } : null,
            proxy: (!!((_c = this.options.proxy) === null || _c === void 0 ? void 0 : _c.host) && !!((_d = this.options.proxy) === null || _d === void 0 ? void 0 : _d.port)) ? {
                host: (_e = this.options.proxy) === null || _e === void 0 ? void 0 : _e.host,
                port: (_f = this.options.proxy) === null || _f === void 0 ? void 0 : _f.port
            } : null,
            withCredentials: this.options.withCredentials,
            timeout: this.options.timeout,
        });
        return req
            .then((res) => this.handleResponse(res))
            .catch((res) => this.handleResponse(res));
    }
    handleResponse(response) {
        const err = response.isAxiosError || false;
        if (err)
            response = response.response;
        if (!response)
            throw {
                status: 'error',
                errorType: 'unexpected_error',
                error: 'unexpected http error',
            };
        if (!!this.options.warningHook && !!response['warnings'] && response['warnings'].length > 0)
            this.options.warningHook(response['warnings']);
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
        var _a;
        if (!input)
            input = dEfault;
        if (typeof (input) == 'number')
            return input / 1000;
        else if (typeof (input) == 'object' && ((_a = input === null || input === void 0 ? void 0 : input.constructor) === null || _a === void 0 ? void 0 : _a.name) == 'Date')
            return input.getTime() / 1000;
        throw new Error('Wrong time format. Expected number or Date.');
    }
    /***********************  EXPRESSION QUERIES  ***********************/
    /**
     * Evaluates an instant query at a single point in time
     * @param {*} query Prometheus expression query string.
     * @param {*} time Evaluation Date object or number in milliseconds. Optional.
     * @param {*} timeout Evaluation timeout string. Optional.
     */
    instantQuery(query, time, timeout) {
        const params = {
            query,
            time: this.formatTimeToPrometheus(time, new Date()),
            timeout,
        };
        const response = (this.options.preferPost)
            ? this.request('POST', 'query', null, params)
            : this.request('GET', 'query', params);
        return response.then((data) => QueryResult.fromJSON(data));
    }
    /**
     * Evaluates an expression query over a range of time
     * @param {*} query Prometheus expression query string.
     * @param {*} start Start Date object or number in milliseconds.
     * @param {*} end End Date object or number in milliseconds.
     * @param {*} step Query resolution step width in duration format or number of seconds.
     * @param {*} timeout Evaluation timeout string. Optional.
     */
    rangeQuery(query, start, end, step, timeout) {
        const params = {
            query,
            start: this.formatTimeToPrometheus(start),
            end: this.formatTimeToPrometheus(end),
            step,
            timeout: timeout,
        };
        const response = (this.options.preferPost)
            ? this.request('POST', 'query_range', null, params)
            : this.request('GET', 'query_range', params);
        return response.then((data) => QueryResult.fromJSON(data));
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
            match: this.listifyIfNeeded(matchs),
            start: this.formatTimeToPrometheus(start),
            end: this.formatTimeToPrometheus(end),
        };
        const response = (this.options.preferPost)
            ? this.request('POST', 'series', null, params)
            : this.request('GET', 'series', params);
        return response.then((data) => data.map(Metric.fromJSON));
    }
    /**
     * Getting label names
     * @param {*} matchs Repeated series selector argument that selects the series to return. Optional.
     * @param {*} start Start Date object or number in milliseconds. Optional.
     * @param {*} end End Date object or number in milliseconds. Optional.
     */
    labelNames(matchs, start, end) {
        const params = {
            match: this.listifyIfNeeded(matchs),
            start: this.formatTimeToPrometheus(start),
            end: this.formatTimeToPrometheus(end),
        };
        return (this.options.preferPost)
            ? this.request('POST', 'labels', null, params)
            : this.request('GET', 'labels', params);
    }
    /**
     * Getting label values
     * @param {*} labelName Label name to query values for.
     * @param {*} matchs Repeated series selector argument that selects the series to return. Optional.
     * @param {*} start Start Date object or number in milliseconds. Optional.
     * @param {*} end End Date object or number in milliseconds. Optional.
     */
    labelValues(labelName, matchs, start, end) {
        const params = {
            match: this.listifyIfNeeded(matchs),
            start: this.formatTimeToPrometheus(start, new Date()),
            end: this.formatTimeToPrometheus(end, new Date()),
        };
        return this.request('GET', `label/${labelName}/values`, params);
    }
    /**
     * Overview of the current state of the Prometheus target discovery:
     * @param {*} state Filter by target state. Can be 'active', 'dropped' or 'any'. Optional.
     */
    targets(state) {
        const params = {
            query: state || 'any',
        };
        return this.request('GET', 'targets', params)
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
        return this.request('GET', 'targets/metadata', params);
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
        return this.request('GET', 'metadata', params);
    }
    /***********************  SERIES API  ***********************/
    /**
     * Getting a list of alerting and recording rules
     */
    rules() {
        return this.request('GET', 'rules')
            .then((data) => (!!data['groups'] ? data['groups'] : []).map(RuleGroup.fromJSON));
    }
    /**
     * Returns a list of all active alerts.
     */
    alerts() {
        return this.request('GET', 'alerts')
            .then((data) => (!!data['alerts'] ? data['alerts'] : []).map(Alert.fromJSON));
    }
    /**
     * Returns an overview of the current state of the Prometheus alertmanager discovery.
     */
    alertmanagers() {
        return this.request('GET', 'alertmanagers');
    }
    /***********************  STATUS API  ***********************/
    /**
     * Following status endpoints expose current Prometheus configuration.
     */
    status() {
        return this.request('GET', 'status/config');
    }
    /**
     * Returns flag values that Prometheus was configured with.
     * New in v2.2
     */
    statusFlags() {
        return this.request('GET', 'status/flags');
    }
    /**
     * Returns runtime information properties that Prometheus was configured with.
     * New in v2.14
     */
    statusRuntimeInfo() {
        return this.request('GET', 'status/runtimeinfo');
    }
    /**
     * Returns various build information properties about Prometheus Server.
     */
    statusBuildinfo() {
        return this.request('GET', 'status/buildinfo');
    }
    /**
     * Returns various cardinality statistics about the Prometheus TSDB.
     * New in v2.14
     */
    statusTSDB() {
        return this.request('GET', 'status/tsdb');
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
        return this.request('POST', 'admin/tsdb/snapshot', params);
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
            match: this.listifyIfNeeded(matchs),
            start: this.formatTimeToPrometheus(start),
            end: this.formatTimeToPrometheus(end),
        };
        return this.request('POST', 'admin/tsdb/delete_series', params);
    }
    /**
     * Removes the deleted data from disk and cleans up
     * New in v2.1
     */
    adminCleanTombstones() {
        return this.request('POST', 'admin/tsdb/clean_tombstones');
    }
}

export { Alert, InstantVector, Metric, PrometheusConnectionOptions, PrometheusDriver, QueryResult, RangeVector, ResponseType, Rule, RuleGroup, SampleValue, Target };
//# sourceMappingURL=prometheus-query.esm.js.map
