# K6 load testing
- [K6 load testing](#k6-load-testing)
  - [prerequisites](#prerequisites)
  - [Command](#command)
  - [Usage](#usage)
  - [Notes](#notes)


## prerequisites
- K6 installed
- node.js installed

## Command
`K6 run script.js` to run the k6 test script


## Usage
1. Run the K6 test script on local machine
2. Run the K6 test script with gitHub Actions

## Notes
1. You can test the K6 js file in localhost with the local server setting up. There is a simple express app that could set up in the server directory.
```
cd local_server
yarn start
```

## Links
- Grafana K6 documentation: https://k6.io/docs/
- K6 中文文章介紹: https://www.dotblogs.com.tw/armycoding/2021/12/02/k6-introuction
- K6 Metrics (測試結果指標): https://k6.io/docs/using-k6/metrics/