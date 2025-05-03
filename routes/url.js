const express = require('express');
const {handlegenerateShortUrl, handleGetAnalytics} = require("../controllers/url");

const router = express.Router();

router.post('/', handlegenerateShortUrl);

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;