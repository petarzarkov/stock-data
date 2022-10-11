module.exports = {
    defaultHttpTimeout: 10000,
    log: {
        level: "TRACE",
        filters: [
            {
                key: "event",
                values: [
                    "GET:/documentation/*"
                ]
            },
        ],
        serializers: [{
            key: "event",
            values: ["GET:/api/questions"],
            modifiers: [{ properties: ["response.payload"] }]
        }]
    }
}