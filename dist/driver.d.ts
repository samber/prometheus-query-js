import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryResult, Metric, RuleGroup, Alert, TargetState, SerieSelector } from './types';
export declare type PrometheusConnectionAuth = {
    username: string;
    password: string;
};
export declare type PrometheusConnectionProxy = {
    host: string;
    port: number;
};
export declare class PrometheusConnectionOptions {
    endpoint: string;
    baseURL?: string;
    headers?: object;
    auth?: PrometheusConnectionAuth;
    proxy?: PrometheusConnectionProxy;
    withCredentials?: boolean;
    timeout?: number;
    preferPost?: boolean;
    requestInterceptor?: {
        onFulfilled: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
        onRejected?: (error: any) => any;
    };
    responseInterceptor?: {
        onFulfilled: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
        onRejected?: (error: any) => any;
    };
    warningHook?: (any: any) => any;
}
export declare type PrometheusQueryDate = Date | number;
export declare class PrometheusDriver {
    private options;
    private axiosInstance;
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
    constructor(options: PrometheusConnectionOptions);
    private request;
    private handleResponse;
    private formatTimeToPrometheus;
    private listifyIfNeeded;
    private formatPromQlParams;
    /***********************  EXPRESSION QUERIES  ***********************/
    /**
     * Evaluates an instant query at a single point in time
     * @param {*} query Prometheus expression query string.
     * @param {*} time Evaluation Date object or number in milliseconds. Optional.
     * @param {*} timeout Evaluation timeout string. Optional.
     */
    instantQuery(query: string, time?: PrometheusQueryDate, timeout?: string): Promise<QueryResult>;
    /**
     * Evaluates an expression query over a range of time
     * @param {*} query Prometheus expression query string.
     * @param {*} start Start Date object or number in milliseconds.
     * @param {*} end End Date object or number in milliseconds.
     * @param {*} step Query resolution step width in number of seconds.
     * @param {*} timeout Evaluation timeout string. Optional.
     */
    rangeQuery(query: string, start: PrometheusQueryDate, end: PrometheusQueryDate, step: number, timeout?: string): Promise<QueryResult>;
    /***********************  METADATA API  ***********************/
    /**
     * Finding series by label matchers
     * @param {*} matchs Repeated series selector argument that selects the series to return.
     * @param {*} start Start Date object or number in milliseconds.
     * @param {*} end End Date object or number in milliseconds.
     */
    series(matchs: SerieSelector, start: PrometheusQueryDate, end: PrometheusQueryDate): Promise<Metric[]>;
    /**
     * Getting label names
     * @param {*} matchs Repeated series selector argument that selects the series to return. Optional.
     * @param {*} start Start Date object or number in milliseconds. Optional.
     * @param {*} end End Date object or number in milliseconds. Optional.
     */
    labelNames(matchs?: SerieSelector, start?: PrometheusQueryDate, end?: PrometheusQueryDate): Promise<string[]>;
    /**
     * Getting label values
     * @param {*} labelName Label name to query values for.
     * @param {*} matchs Repeated series selector argument that selects the series to return. Optional.
     * @param {*} start Start Date object or number in milliseconds. Optional.
     * @param {*} end End Date object or number in milliseconds. Optional.
     */
    labelValues(labelName: string, matchs?: SerieSelector, start?: PrometheusQueryDate, end?: PrometheusQueryDate): Promise<string[]>;
    /**
     * Overview of the current state of the Prometheus target discovery:
     * @param {*} state Filter by target state. Can be 'active', 'dropped' or 'any'. Optional.
     */
    targets(state?: TargetState): Promise<object>;
    /**
     * Returns metadata about metrics currently scraped from targets.
     * @param {*} matchTarget Label selectors that match targets by their label sets. Optional.
     * @param {*} metric Metric name to retrieve metadata for. Optional.
     * @param {*} limit Maximum number of targets to match. Optional.
     */
    targetsMetadata(matchTarget: SerieSelector, metric?: string, limit?: number): Promise<any>;
    /**
     * Metadata about metrics currently scrapped from targets
     * @param {*} metric Metric name to retrieve metadata for. Optional.
     * @param {*} limit Maximum number of targets to match. Optional.
     */
    metadata(metric?: string, limit?: number): Promise<any>;
    /***********************  SERIES API  ***********************/
    /**
     * Getting a list of alerting and recording rules
     */
    rules(): Promise<RuleGroup[]>;
    /**
     * Returns a list of all active alerts.
     */
    alerts(): Promise<Alert[]>;
    /**
     * Returns an overview of the current state of the Prometheus alertmanager discovery.
     */
    alertmanagers(): Promise<any>;
    /***********************  STATUS API  ***********************/
    /**
     * Following status endpoints expose current Prometheus configuration.
     */
    status(): Promise<any>;
    /**
     * Returns flag values that Prometheus was configured with.
     * New in v2.2
     */
    statusFlags(): Promise<any>;
    /**
     * Returns runtime information properties that Prometheus was configured with.
     * New in v2.14
     */
    statusRuntimeInfo(): Promise<any>;
    /**
     * Returns various build information properties about Prometheus Server.
     */
    statusBuildinfo(): Promise<any>;
    /**
     * Returns various cardinality statistics about the Prometheus TSDB.
     * New in v2.14
     */
    statusTSDB(): Promise<any>;
    /***********************  ADMIN API  ***********************/
    /**
     * Creates a snapshot of all current data
     * New in v2.1
     * @param {*} skipHead Skip data present in the head block. Boolean. Optional.
     */
    adminSnapshot(skipHead?: boolean): Promise<any>;
    /**
     * Deletes data for a selection of series in a time range
     * New in v2.1
     * @param {*} matchs Repeated series selector argument that selects the series to return.
     * @param {*} start Start Date object or number in milliseconds.
     * @param {*} end End Date object or number in milliseconds.
     */
    adminDeleteSeries(matchs: SerieSelector, start: PrometheusQueryDate, end: PrometheusQueryDate): Promise<any>;
    /**
     * Removes the deleted data from disk and cleans up
     * New in v2.1
     */
    adminCleanTombstones(): Promise<any>;
}
