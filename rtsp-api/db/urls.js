const mongoose = require('mongoose')

const urlsSchema = new mongoose.Schema({
    url: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("urls", urlsSchema);