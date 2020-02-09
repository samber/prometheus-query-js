const PrometheusQuery = require('../../');

const pq = new PrometheusQuery({
    endpoint: "http://demo.robustperception.io:9090/",
    // auth: {
    //     'username': 'toto',
    //     'password': 'toto,'
    // },
});

// const q = pq.instantQuery("node_load1");
const q = pq.rangeQuery("node_load1", 1580900000, 1580907000, 60);
// const q = pq.series(["node_load1"], 1580900000, 1580907000);

q.then((a) => console.log(a.data.result)).catch(console.log);