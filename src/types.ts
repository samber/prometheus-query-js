// https://prometheus.io/docs/prometheus/latest/querying/api/#expression-query-result-formats

export enum ResponseType {
    MATRIX = 'matrix',
    VECTOR = 'vector',
    SCALAR = 'scalar',
    STRING = 'string',
}

export class Metric {

    public name: string;
    public labels: object;

    constructor(name: string, labels: object) {
        if (!!name && typeof (name) != 'string')
            throw new Error('Wrong name format. Expected string.');
        if (!!labels && typeof (labels) != 'object')
            throw new Error('Wrong labels format. Expected object.');

        this.name = name;
        this.labels = labels;
    }

    static fromJSON(obj: object) {
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

export class SampleValue {

    public time: Date;
    public value: number;

    constructor(unixTime: Date, sampleValue: number) {
        if (typeof (unixTime) != 'object' || unixTime.constructor.name != 'Date')
            throw new Error("Wrong time format. Expected Date.");
        if (typeof (sampleValue) != 'number')
            throw new Error("Wrong value format. Expected float.");

        this.time = unixTime;
        this.value = sampleValue;
    }

    static fromJSON(arr: any[]) {
        const unixTime = new Date(arr[0] * 1000);
        const sampleValue = parseFloat(arr[1]);

        return new SampleValue(unixTime, sampleValue);
    }

    toString() {
        return this.time + ': ' + this.value;
    }

}

export class RangeVector {

    public metric: Metric;
    public values: any[];

    constructor(metric: Metric | null, values: any[]) {
        this.metric = metric;
        this.values = values;
    }

    static fromJSON(obj: object) {
        const metric = !!obj['metric'] ? Metric.fromJSON(obj['metric']) : null;
        const values = obj['values'].map(SampleValue.fromJSON);
        return new RangeVector(metric, values);
    }

};

export class InstantVector {

    public metric: Metric;
    public value: any;

    constructor(metric: Metric, value: any) {
        this.metric = metric;
        this.value = value;
    }

    static fromJSON(obj: object) {
        const metric = !!obj['metric'] ? Metric.fromJSON(obj['metric']) : null;
        const value = SampleValue.fromJSON(obj['value']);
        return new InstantVector(metric, value);
    }

};

export class QueryResult {

    public resultType: ResponseType;
    public result: any[];

    constructor(resultType: ResponseType, result: any[]) {
        this.resultType = resultType;
        this.result = result;
    }

    static fromJSON(data: object) {
        const resultType: string = data['resultType'];
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

};

export class Target {

    public discoveredLabels: object;
    public labels: object;
    public scrapePool: string;
    public scrapeUrl: string;
    public lastError: string;
    public lastScrape: string | Date;
    public lastScrapeDuration: number;
    public health: string;

    constructor(discoveredLabels: object, labels: object, scrapePool: string, scrapeUrl: string, lastError: string, lastScrape: string | Date, lastScrapeDuration: number, health: string) {
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

    static fromJSON(obj: object) {
        return new Target(
            obj['discoveredLabels'],
            obj['labels'],
            obj['scrapePool'],
            obj['scrapeUrl'],
            obj['lastError'],
            !!obj['lastScrape'] ? new Date(obj['lastScrape']) : null,
            !!obj['lastScrapeDuration'] ? parseFloat(obj['lastScrapeDuration']) : null,
            obj['health'],
        );
    }

};


export class Alert {

    public activeAt: Date;
    public annotations: object;
    public labels: object;
    public state: TargetState;
    public value: number;

    constructor(activeAt: Date, annotations: object, labels: object, state: TargetState, value: number) {
        if (!!activeAt && (typeof (activeAt) != 'object' || activeAt.constructor.name != 'Date'))
            throw new Error(`Unexpected format for activeAt. Got ${typeof (activeAt)} instead of object`);
        if (!!annotations && typeof (annotations) != 'object')
            throw new Error(`Unexpected format for annotations. Got ${typeof (annotations)} instead of object`);
        if (!!labels && typeof (labels) != 'object')
            throw new Error(`Unexpected format for labels. Got ${typeof (labels)} instead of object`);
        // if (!!state && typeof (state) != 'TargetState')
        //     throw new Error(`Unexpected format for state. Got ${typeof (state)} instead of string`);
        if (!!value && typeof (value) != 'number')
            throw new Error(`Unexpected format for value. Got ${typeof (value)} instead of number`);

        this.activeAt = activeAt;
        this.annotations = annotations;
        this.labels = labels;
        this.state = state;
        this.value = value;
    }

    static fromJSON(obj) {
        return new Alert(
            !!obj['activeAt'] ? new Date(obj['activeAt']) : null,
            obj['annotations'],
            obj['labels'],
            ResponseType[obj['state']],
            !!obj['value'] ? parseFloat(obj['value']) : null,
        );
    }

};

export class Rule {

    public alerts: Alert[];
    public annotations: object;
    public duration: number;
    public health: string;
    public labels: object;
    public name: string;
    public query: string;
    public type: string;

    constructor(alerts: Alert[], annotations: object, duration: number, health: string, labels: object, name: string, query: string, type: string) {
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
        return new Rule(
            !!obj['alerts'] ? obj['alerts'].map(Alert.fromJSON) : [],
            obj['annotations'],
            obj['duration'],
            obj['health'],
            obj['labels'],
            obj['name'],
            obj['query'],
            obj['type'],
        );
    }

};

export class RuleGroup {

    public rules: Rule[];
    public file: string;
    public interval: number;
    public name: string;

    constructor(rules: Rule[], file: string, interval: number, name: string) {
        this.rules = rules;
        this.file = file;
        this.interval = interval;
        this.name = name;
    }

    static fromJSON(obj) {
        return new RuleGroup(
            !!obj['rules'] ? obj['rules'].map(Rule.fromJSON) : [],
            obj['file'],
            obj['interval'],
            obj['name'],
        );
    }

};

export type SerieSelector = string | string[];
export type TargetState = 'active' | 'dropped' | 'any';