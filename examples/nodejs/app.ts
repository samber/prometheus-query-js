
import { PrometheusDriver, Alert, Metric, QueryResult } from '../../';

const prom = new PrometheusDriver({
    endpoint: 'https://prometheus.demo.do.prometheus.io/',
    // endpoint: 'http://localhost:9090/',
});

const query = 'up{instance="demo.do.prometheus.io:9090",job="prometheus"}';
// const query = 'up{}';

// last value
prom.instantQuery(query)
    .then((res: QueryResult) => {
        console.log("****************", "[instantQuery] Query:", query, "****************")
        console.log("\n");

        const series = res.result;
        series.forEach((serie) => {
            console.log("[instantQuery] Serie:", serie.metric.toString());
            console.log("[instantQuery] Time:", serie.value.time);
            console.log("[instantQuery] Value:", serie.value.value);
            console.log("\n");
        });
    })
    .catch(console.error);

// during past 24h, 1 point every 6 hours
prom.rangeQuery(query, new Date().getTime() - 24 * 60 * 60 * 1000, new Date(), 6 * 60 * 60)
    .then((res: QueryResult) => {
        console.log("****************", "[rangeQuery] Query:", query, "****************");
        console.log("\n");

        const series = res.result;
        series.forEach((serie) => {
            console.log("[rangeQuery] Serie:", serie.metric.toString());
            console.log("[rangeQuery] Values:\n" + serie.values.join('\n'));
            console.log("\n");
        });
    })
    .catch(console.error);


// list series matching query
prom.series(query, new Date().getTime() - 24 * 60 * 60 * 1000, new Date())
    .then((res: Metric[]) => {
        console.log("****************", "[series] matching:", query, "****************");
        console.log('[series] Series:');
        console.log(res.join('\n'));
        console.log("\n");
    })
    .catch(console.error);

// list all active alerts
prom.alerts()
    .then((res: Alert[]) => {
        console.log("****************", "[alerts]", "****************");
        console.log(res)
        console.log("\n");
    })
    .catch(console.error);

// list all active alerts
prom.labelValues("instance")
    .then((res: string[]) => {
        console.log("****************", "[alerts]", "****************");
        console.log(res)
        console.log("\n");
    })
    .catch(console.error);
