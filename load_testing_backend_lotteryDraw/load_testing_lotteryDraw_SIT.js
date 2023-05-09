import http from "k6/http"
import { check, sleep } from "k6"
import API from "../API.js"

export let options = {
    stages: [
        { duration: "30s", target: 5 },
        { duration: "30s", target: 10 },
        { duration: "30s", target: 10 }
    ],
    thresholds: {
        http_req_duration: ["p(95)<1000"] // 95% of requests must complete within 1 second
    }
}

export function setup() {
    const body = {
        "username": "Stlish",
        "password": "stylish123"
    }
    const response = http.post(
        "http://member-api.appworks.local/api/v1/client/login",
        JSON.stringify(body)
    )
    // const response = http.get("https://www.google.com")

    console.log(response.body)
    console.log(response.body.access_token)
    const token = JSON.parse(response.body).data.access_token
    // const token = response.body.json().data.access_token
    console.log(token)
    // Set the token as an environment variable
    const options = { env: { TOKEN: token } }
    return options
}

export default function () {
    const token = __ENV.TOKEN
    console.log(token)
    const url = API.SIT_LOTTERY_DRAW
    const body = {
        "member_id": "1",
        "event_id": "1"
    }
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + __ENV.TOKEN
    }
    let res = http.post(API.url, JSON.stringify(body), { headers: headers })
    check(res, { "status is 200": (r) => r.status === 200 })
    sleep(1)
}
