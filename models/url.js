const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    visitHistory:[{
        timestamp: {
            type: Number
        }
    }],
},
{timestamps: true}
);

const URL = mongoose.model('url', urlSchema);

module.exports = URL;
// This code defines a Mongoose schema and model for a URL shortening service.
// The schema includes fields for a short ID, the original URL, and a visit history.