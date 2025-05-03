const shortid = require("shortid");
const URL = require("../models/url");



async function handlegenerateShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: req.body.url,
        visitHistory: [],
    })

    return res.render("home", {
        Id: shortID,
        redirectURL: req.body.url,
    });
    return res.json({id: shortID});
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne(
        {shortId}
    );
    return res.json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory 
    });
}    
    
    // const entry = await URL.findOne({shortId});
    // if(!entry) return res.status(404).json({error: "URL not found"});
    
    // return res.json({
    //     shortId: entry.shortId,
    //     redirectURL: entry.redirectURL,
    //     visitHistory: entry.visitHistory,
    // });
// }

module.exports = {
    handlegenerateShortUrl,
    handleGetAnalytics,
}