const app = require("express").Router();
const Stream = require("node-rtsp-stream");
const urls = require("../db/urls");

const startStream = (url) => {
    return stream = new Stream({
        name: "rtsp",
        streamUrl: url,
        wsPort: 9999,
        ffmpegOptions: {
          "-stats": "",
          "-r": 30,
        },
      });
}

app.post("/get_url_stream", async (req, res, next) => {
  try {
    const url = req.body.url;
    let stream = null
    try{
        stream = startStream(url)
    } catch(error) {
        stream.stop()
        stream = startStream(url)
    }
    const obj = { url: url };
    const saveObj = new urls(obj);
    await saveObj.save();
    res.status(200).json({ message: "Stream started" });
  } catch (error) {
    res.status(500).json({ error: error, message: "Stream Failed" });
  }
});

module.exports = app;
