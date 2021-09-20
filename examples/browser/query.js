const prom = new Prometheus.PrometheusDriver({
    endpoint: "https://prometheus.demo.do.prometheus.io/",
});

const query = window.prompt("Please write a Prometheus query here", "up{}")

// last `up` value
prom.instantQuery(query)
    .then((res) => {
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

// up during past 24h, 1 point every 6 hours
prom.rangeQuery(query, new Date().getTime() - 24 * 60 * 60 * 1000, new Date(), 6 * 60 * 60)
    .then((res) => {
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
    .then((res) => {
        console.log("****************", "[series] matching:", query, "****************");
        console.log('[series] Series:');
        console.log(res.join('\n'));
        console.log("\n");
    })
    .catch(console.error);

// list all active alerts
prom.alerts()
    .then((res) => {
        console.log("****************", "[alerts]", "****************");
        console.log(res)
        console.log("\n");
    })
    .catch(console.error);