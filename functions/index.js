require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

require('./routes/main.js')(app);
require('./routes/questions.js')(app);

app.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    } catch (err) {
        console.error(err.message);
    }
})

if (process.env.DEVELOPMENT === 'true') {
    app.listen(5000, () => {
        console.log(`server has started on port ${5000}`);
        console.log('static file served at ' + path.join(__dirname, "..", "client", "build", "index.html"));
    });
}

exports.envirothon = functions.https.onRequest(app)
