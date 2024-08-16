const { hex2string, string2hex } = require('./utils');
const CapsuleController = require('./controller/capsuleController');

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

async function handle_advance(data) {
    console.log("Received advance request data " + JSON.stringify(data));
    const metadata = data.metadata;
    const payload = data.payload;
    const action = hex2string(payload);
    let response;

    if (action === "create_capsule") {
        response = JSON.stringify(await CapsuleController.createCapsule(data.payload));
    }

    const notice_req = await fetch(rollup_server + "/notice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: string2hex(response) }),
    });

    return "accept";
}

async function handle_inspect(data) {
    console.log("Received inspect request data " + JSON.stringify(data));
    const payload = data.payload;
    const route = hex2string(payload);
    let response;

    if (route === "list_capsules") {
        response = JSON.stringify(await CapsuleController.getAllCapsules());
    } else if (route.startsWith("capsule/")) {
        const capsuleId = route.substring(8);
        response = JSON.stringify(await CapsuleController.getCapsule(capsuleId));
    }

    const report_req = await fetch(rollup_server + "/report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: string2hex(response) }),
    });

    return "accept";
}

const handlers = {
    advance_state: handle_advance,
    inspect_state: handle_inspect,
};

(async () => {
    while (true) {
        const finish_req = await fetch(rollup_server + "/finish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "accept" }),
        });

        console.log("Received finish status " + finish_req.status);

        if (finish_req.status == 202) {
            console.log("No pending rollup request, trying again");
        } else {
            const rollup_req = await finish_req.json();
            const handler = handlers[rollup_req["request_type"]];
            await handler(rollup_req["data"]);
        }
    }
})();
