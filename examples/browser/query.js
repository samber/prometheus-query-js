const pq = new PrometheusQuery({
    endpoint: "http://demo.robustperception.io:9090/",
});

const query = window.prompt("Please write a Prometheus query here", "up{}")

// last `up` value
pq.instantQuery(query)
    .then((res) => {
        console.log("****************", "[instantQuery] Query:", query, "****************")
        console.log("\n");

        const series = res.data.result;
        series.forEach((serie) => {
            console.log("[instantQuery] Serie:", PrometheusQuery.metricToReadable(serie.metric));
            console.log("[instantQuery] Time:", new Date(serie.value[0] * 1000));
            console.log("[instantQuery] Value:", serie.value[1]);
            console.log("\n");
        });
    })
    .catch(console.error);

// up during past 24h, 1 point every 6 hours
pq.rangeQuery(query, new Date().getTime() - 24 * 60 * 60 * 1000, new Date(), 6 * 60 * 60)
    .then((res) => {
        console.log("****************", "[rangeQuery] Query:", query, "****************");
        console.log("\n");

        const series = res.data.result;
        series.forEach((serie) => {
            console.log("[rangeQuery] Serie:", PrometheusQuery.metricToReadable(serie.metric));
            console.log("[rangeQuery] Values:", JSON.stringify(serie.values));
            console.log("\n");
        });
    })
    .catch(console.error);