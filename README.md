
# Welcome to prometheus-query  👋
[![NPM version](https://img.shields.io/npm/v/prometheus-query.svg?style=flat-square)](https://npmjs.org/package/prometheus-query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> A Javascript client for Prometheus **query** and admin API.

> ⚠️ This library does not export metrics. Please use [prom-client](https://github.com/siimon/prom-client) instead.

## ✨ Features

- Thin & **minimal low-level HTTP client** to interact with Prometheus's API
- Works both on the **browser** and **node.js**
- **UMD compatible**, you can use it with any module loader
- Supports **query** and admin [APIs](https://prometheus.io/docs/prometheus/latest/querying/api/)

## 🚀 Install

### NodeJS

```sh
npm install prometheus-query
```

### Browser

```html

```

## 💡 Quick start

```js
const PrometheusQuery = require('prometheus-query');

const pq = new PrometheusQuery({
    endpoint: "http://demo.robustperception.io:9090",
});
```

### Instant query

```js
// last `up` value
pq.instantQuery('up{instance="demo.robustperception.io:9100",job="node"}')
    .then((res) => {
        const series = res.data.result;
        series.forEach((serie) => {
	         console.log("Serie:", PrometheusQuery.metricToReadable(serie.metric));
   	     	  console.log("Time:", new Date(serie.value[0] * 1000));
            console.log("Value:", serie.value[1]);
        });
    })
    .catch(console.error);
```

Output:

```txt
Serie: up{instance="demo.robustperception.io:9100", job="node"}
Time: Sun Feb 09 2020 22:04:41 GMT+0100 (Central European Standard Time)
Value: 1
```

### Range query

```js
// up during past 24h, 1 point every 6 hours
pq.rangeQuery("up", new Date().getTime() - 24 * 60 * 60 * 1000, new Date(), 6 * 60 * 60)
    .then((res) => {
        const series = res.data.result;
        series.forEach((serie) => {
            console.log("Serie:", PrometheusQuery.metricToReadable(serie.metric));
            console.log("Values:", JSON.stringify(serie.values));
        });
    })
    .catch(console.error);
```

Output:

```txt
Serie: up{instance="demo.robustperception.io:9090", job="prometheus"}
Values: [[1581196201.66,"1"],[1581217801.66,"1"],[1581239401.66,"1"],[1581261001.66,"1"],[1581282601.66,"1"]]

Serie: up{instance="demo.robustperception.io:9091", job="pushgateway"}
Values: [[1581196201.66,"1"],[1581217801.66,"1"],[1581239401.66,"1"],[1581261001.66,"1"],[1581282601.66,"1"]]

Serie: up{instance="demo.robustperception.io:9093", job="alertmanager"}
Values: [[1581196201.66,"1"],[1581217801.66,"1"],[1581239401.66,"1"],[1581261001.66,"1"],[1581282601.66,"1"]]

Serie: up{instance="demo.robustperception.io:9100", job="node"}
Values: [[1581196201.66,"1"],[1581217801.66,"1"],[1581239401.66,"1"],[1581261001.66,"1"],[1581282601.66,"1"]]
```

## 🏋️‍♂️ Documentation



## ✅ Run tests

```sh
npm run test
```

## Contribute

The Prometheus Query client is open source and contributions from community (you!) are welcomed.

There are many ways to contribute: writing code, documentation, reporting issues...

## Author

👤 **Samuel Berthe**

* Twitter: [@samuelberthe](https://twitter.com/samuelberthe)
* Github: [@samber](https://github.com/samber)

## Show your support

Give a ⭐️ if this project helped you!

[![support us](https://img.shields.io/badge/become-a patreon%20us-orange.svg?cacheSeconds=2592000)](https://www.patreon.com/samber)
