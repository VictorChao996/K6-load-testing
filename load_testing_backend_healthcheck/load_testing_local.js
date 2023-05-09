import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
    stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 20 },
        { duration: "1m", target: 10 },
    ],
    thresholds: {
        http_req_duration: ["p(95)<1000"], // 95% of requests must complete within 1 second
        http_reqs: ["rate>700"], // Average rate of successful requests must be greater than 700 per second
    },
};

export default function () {
    let res = http.get("http://localhost:3000/api/greeting");
    check(res, { "status is 200": (r) => r.status === 200 });
    sleep(1);
}
