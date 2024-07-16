require("dotenv").config();
const stompit = require("stompit");
const fs = require("fs");

const plugins = [];
const signal_blocks = {};

fs.readdirSync("./plugins").map((i) => {
    // if not js return
    if (!i.match(/\.js$/)) return;
    plugins.push(require("./plugins/" + i));
});

process.env.SIGNAL_BLOCKS.split(",").forEach((i) => {
    signal_blocks[i] = "";
});

const signal_index = Object.keys(signal_blocks);

const connectOptions = {
    host: "publicdatafeeds.networkrail.co.uk",
    port: 61618,
    connectHeaders: {
        host: "/",
        login: process.env.RAIL_USER,
        passcode: process.env.RAIL_PASSWORD,
        "heart-beat": "5000,5000",
    },
};

stompit.connect(connectOptions, function (error, client) {
    if (error) {
        console.log("connect error " + error.message);
        return;
    }

    // maybe in future we can sub to just the area we want?
    const subscribeHeaders = {
        destination: "/topic/TD_ALL_SIG_AREA",
        ack: "client-individual",
    };

    client.subscribe(subscribeHeaders, function (error, message) {
        if (error) {
            console.log("subscribe error " + error.message);
            return;
        }

        message.readString("utf-8", function (error, body) {
            if (error) {
                console.log("read message error " + error.message);
                return;
            }

            for (let msg of JSON.parse(body)) parseMessage(msg);

            client.ack(message);
        });
    });
});

function parseMessage(message) {
    // first we filter to area
    // if no id provided, don't bother reporting
    const area_id = process.env.AREA_ID;
    if (!area_id) return console.log("No area ID provided");

    // split message into type and body
    const type = Object.keys(message)[0];
    const body = message[type];

    // if body isn't relevant to our area, discard
    if (!body.area_id || body.area_id != area_id) return;

    // we're only looking for certain messages, mainly step messages will
    // do what we want, so we filter for those to start
    if (type != "CA_MSG") return;

    const to = body.to ? String(parseInt(body.to)) : false;
    const from = body.from ? String(parseInt(body.from)) : false;

    var change = false;
    if (to && signal_index.indexOf(to) > -1) {
        // console.log("moving in", type, body);
        signal_blocks[to] = body.descr;
        var change = true;
    }
    if (from && signal_index.indexOf(from) > -1) {
        // console.log("moving out", type, body);
        signal_blocks[from] = "";
        var change = true;
    }

    if (change) plugins.forEach((i) => i(signal_blocks));
}
