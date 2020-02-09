const pq = new PrometheusQuery({
    endpoint: "http://demo.robustperception.io:9090/",
});

pq.instantQuery("up");