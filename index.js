const express = require("express");
const { connectToMongoDB } = require("./connect/connect");
const urlRoute = require("./routes/url");
const URL = require('./models/url'); // Import the URL model
const shortid = require('shortid');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

app.post('/shortId', async (req, res) => {
    const { shortId } = req.body; // Assuming shortId is sent in the request body

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: new Date() } }, // Use new Date() instead of Timestamp.now()
            { new: true } // Option to return the updated document
        );

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send('Short ID not found');
        }
    } catch (error) {
        console.error('Error updating visit history:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
