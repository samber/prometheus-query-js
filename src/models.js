// https://prometheus.io/docs/prometheus/latest/querying/api/#expression-query-result-formats

export class ResponseType {
    static get MATRIX() {
        return "matrix";
    }

    static get VECTOR() {
        return "vector";
    }

    static get SCALAR() {
        return "scalar";
    }

    static get STRING() {
        return "string";
    }
}

export class Metric {

    constructor(name, labels) {
        if (!!name && typeof (name) != 'string')
            throw new Error("Wrong name format. Expected string.");
        if (!!labels && typeof (labels) != 'object')
            throw new Error("Wrong labels format. Expected object.");

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

export class SampleValue {

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

export class RangeVector {

    constructor(metric, values) {
        this.metric = metric;
        this.values = values;
    }

    static fromJSON(obj) {
        const metric = !!obj['metric'] ? Metric.fromJSON(obj['metric']) : null;
        const values = obj['values'].map(SampleValue.fromJSON);
        return new RangeVector(metric, values);
    }

};

export class InstantVector {

    constructor(metric, value) {
        this.metric = metric;
        this.value = value;
    }

    static fromJSON(obj) {
        const metric = !!obj['metric'] ? Metric.fromJSON(obj['metric']) : null;
        const value = SampleValue.fromJSON(obj['value']);
        return new InstantVector(metric, value);
    }

};

export class QueryResult {

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
                throw new Error("Unexpected resultType:", resultType);
        }

        return new QueryResult(resultType, result);
    }

};

export class Target {

    constructor(discoveredLabels, labels, scrapePool, scrapeUrl, lastError, lastScrape, lastScrapeDuration, health) {
        if (!!discoveredLabels && typeof (discoveredLabels) != 'object')
            throw new Error(`Unexpected format for discoveredLabels. Got ${typeof(discoveredLabels)} instead of object`);
        if (!!labels && typeof (labels) != 'object')
            throw new Error(`Unexpected format for labels. Got ${typeof(labels)} instead of object`);
        if (!!scrapePool && typeof (scrapePool) != 'string')
            throw new Error(`Unexpected format for scrapePool. Got ${typeof(scrapePool)} instead of string`);
        if (!!scrapeUrl && typeof (scrapeUrl) != 'string')
            throw new Error(`Unexpected format for scrapeUrl. Got ${typeof(scrapeUrl)} instead of string`);
        if (!!lastError && typeof (lastError) != 'string')
            throw new Error(`Unexpected format for lastError. Got ${typeof(lastError)} instead of string`);
        if (!!lastScrape && (typeof (lastScrape) != 'object' || lastScrape.constructor.name != 'Date'))
            throw new Error(`Unexpected format for lastScrape. Got ${typeof(lastScrape)} instead of object`);
        if (!!lastScrapeDuration && typeof (lastScrapeDuration) != 'number')
            throw new Error(`Unexpected format for lastScrapeDuration. Got ${typeof(lastScrapeDuration)} instead of number`);
        if (!!health && typeof (health) != 'string')
            throw new Error(`Unexpected format for health. Got ${typeof(health)} instead of string`);

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

    constructor(activeAt, annotations, labels, state, value) {
        if (!!activeAt && (typeof (activeAt) != 'object' || activeAt.constructor.name != 'Date'))
            throw new Error(`Unexpected format for activeAt. Got ${typeof(activeAt)} instead of object`);
        if (!!annotations && typeof (annotations) != 'object')
            throw new Error(`Unexpected format for annotations. Got ${typeof(annotations)} instead of object`);
        if (!!labels && typeof (labels) != 'object')
            throw new Error(`Unexpected format for labels. Got ${typeof(labels)} instead of object`);
        if (!!state && typeof (state) != 'string')
            throw new Error(`Unexpected format for state. Got ${typeof(state)} instead of string`);
        if (!!value && typeof (value) != 'number')
            throw new Error(`Unexpected format for value. Got ${typeof(value)} instead of number`);

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
            obj['state'],
            !!obj['value'] ? parseFloat(obj['value']) : null,
        );
    }

};

export class Rule {

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

    constructor(rules, file, interval, name) {
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