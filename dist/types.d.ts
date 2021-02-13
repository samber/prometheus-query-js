export declare enum ResponseType {
    MATRIX = "matrix",
    VECTOR = "vector",
    SCALAR = "scalar",
    STRING = "string"
}
export declare class Metric {
    name: string;
    labels: object;
    constructor(name: string, labels: object);
    static fromJSON(obj: object): Metric;
    toString(): string;
}
export declare class SampleValue {
    time: Date;
    value: number;
    constructor(unixTime: Date, sampleValue: number);
    static fromJSON(arr: any[]): SampleValue;
    toString(): string;
}
export declare class RangeVector {
    metric: Metric;
    values: any[];
    constructor(metric: Metric | null, values: any[]);
    static fromJSON(obj: object): RangeVector;
}
export declare class InstantVector {
    metric: Metric;
    value: any;
    constructor(metric: Metric, value: any);
    static fromJSON(obj: object): InstantVector;
}
export declare class QueryResult {
    resultType: ResponseType;
    result: any[];
    constructor(resultType: ResponseType, result: any[]);
    static fromJSON(data: object): QueryResult;
}
export declare class Target {
    discoveredLabels: object;
    labels: object;
    scrapePool: string;
    scrapeUrl: string;
    lastError: string;
    lastScrape: string | Date;
    lastScrapeDuration: number;
    health: string;
    constructor(discoveredLabels: object, labels: object, scrapePool: string, scrapeUrl: string, lastError: string, lastScrape: string | Date, lastScrapeDuration: number, health: string);
    static fromJSON(obj: object): Target;
}
export declare class Alert {
    activeAt: Date;
    annotations: object;
    labels: object;
    state: TargetState;
    value: number;
    constructor(activeAt: Date, annotations: object, labels: object, state: TargetState, value: number);
    static fromJSON(obj: any): Alert;
}
export declare class Rule {
    alerts: Alert[];
    annotations: object;
    duration: number;
    health: string;
    labels: object;
    name: string;
    query: string;
    type: string;
    constructor(alerts: Alert[], annotations: object, duration: number, health: string, labels: object, name: string, query: string, type: string);
    static fromJSON(obj: any): Rule;
}
export declare class RuleGroup {
    rules: Rule[];
    file: string;
    interval: number;
    name: string;
    constructor(rules: Rule[], file: string, interval: number, name: string);
    static fromJSON(obj: any): RuleGroup;
}
export declare type SerieSelector = string | string[];
export declare type TargetState = 'active' | 'dropped' | 'any';
