import http from "k6/http";
import { check, sleep } from "k6";
import API from "../API.js";

export let options = {
    stages: [
        { duration: "30s", target: 700 }, // First stage with 700 requests per second
        { duration: "1m", target: 800 }, // Second stage with 800 requests per second
        { duration: "1m", target: 800 }, // third stage with 800 requests per second
    ],
    thresholds: {
        http_req_duration: ["p(95)<1000"], // 95% of requests must complete within 1 second
        http_reqs: ["rate>700"], // Average rate of successful requests must be greater than 700 per second
    },
};

export default function () {
    let res = http.get(API.STAGE_FRONTEND);
    check(res, { "status is 200": (r) => r.status === 200 });
    sleep(1);
}
