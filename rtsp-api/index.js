const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")

app.use(bodyParser.json({limit: "50mb"}))
app.use(cors())

const connect = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/rtsp", {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Connected")
    } catch (error) {
        console.log("Not Connected")
    }
}

const stream = require("./routes/stream")

app.use('/stream', stream);

connect();
app.listen(6060)
module.exports = app;