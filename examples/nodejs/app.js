const PrometheusQuery = require('../../');

const pq = new PrometheusQuery({
    endpoint: "http://demo.robustperception.io:9090/",
});

// last `up` value
pq.instantQuery('up{instance="demo.robustperception.io:9100",job="node"}')
    .then((res) => {
        console.log("[instantQuery] Query:", 'up{instance="demo.robustperception.io:9100",job="node"}')
        console.log("[instantQuery] Time:", new Date(res.data.result[0].value[0] * 1000));
        console.log("[instantQuery] Value:", res.data.result[0].value[1]);
        console.log("\n");
    })
    .catch(console.error);

// up during past 24h, 1 point every 6 hours
pq.rangeQuery("up", new Date().getTime() - 24 * 60 * 60 * 1000, new Date(), 6 * 60 * 60)
    .then((res) => {
        console.log("[rangeQuery] Query:", "up");
        console.log("\n");

        const series = res.data.result;
        series.forEach((serie) => {
            const name = serie.metric['__name__'];
            const labels = serie.metric;

            delete labels['__name__'];
            strLabels = Object.keys(labels).map((curr) => curr + '="' + labels[curr] + '"');
            const serieName = name + '{' + strLabels.join(', ') + '}';

            console.log("[rangeQuery] Serie:", serieName);
            console.log("[rangeQuery] Values:", JSON.stringify(serie.values));
            console.log("\n");
        });
    })
    .catch(console.error(err));