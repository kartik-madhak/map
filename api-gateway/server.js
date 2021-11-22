const express = require('express')

const {ROUTES} = require("./routes");

const {setupLogging} = require("./logging");
const {setupProxies} = require("./proxy");

const app = express()
const port = 50049;


setupLogging(app);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log(`API-Gateway listening at http://localhost:${port}`)
})