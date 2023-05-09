import http from "k6/http";
import { check, sleep } from "k6";
import API from "../API.js";

export let options = {
    stages: [
        { duration: "30s", target: 5 },
        { duration: "30s", target: 10 },
        { duration: "30s", target: 10 },
    ],
    thresholds: {
        http_req_duration: ["p(95)<1000"], // 95% of requests must complete within 1 second
    },
};

export default function () {
    let res = http.get(API.STAGE_HEALTH_CHECK);
    check(res, { "status is 200": (r) => r.status === 200 });
    sleep(1);
}
