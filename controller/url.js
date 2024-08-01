const shortid = require('shortid');
const URL = require('../models/url');

// Handler for generating a new short URL
async function handlegenerateNewShortURL(req, res) {
    const { url } = req.body; // Assuming the body contains the URL to shorten

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortid.generate(); // Generate a unique short ID

    try {
        const newEntry = await URL.create({
            shortId: shortID,
            redirectURL: url,
            visitHistory: [],
        });

        res.json({ id: shortID });
    } catch (error) {
        console.error('Error creating new short URL:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handlegenerateNewShortURL,
};
