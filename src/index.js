import sourceMapSupport from 'source-map-support';
import * as dotenv from 'dotenv';
import express from 'express';
import TwitterInfluencerExtractorMainController from './controllers/TwitterInfluencerExtractorMainController.js';
import TwitterKeywordsExtractorMainController from './controllers/TwitterKeywordsExtractorMainController.js';
import cors from 'cors';

sourceMapSupport.install();
dotenv.config()

const port = 8002;
const app = express();
app.use(cors());

const twitterExtractorMainController = new TwitterInfluencerExtractorMainController();
const twitterKeywordsExtractorMainController = new TwitterKeywordsExtractorMainController();

app.get("/", (req, res) => {
    res.send('hello');
});

app.get("/twitter/extract-keywords", async (req, res) => {

    const { keyword } = req.query;

    if (!keyword) {
        res.send({ status: false, message: 'No keyword param provided' })
    }

    const data = await twitterKeywordsExtractorMainController.extractKeyword(keyword);

    res.send({ status: data ? true : false, data });
});


app.get("/twitter/recent-tweets", async (req, res) => {

    const { username } = req.query;

    if (!username) {
        res.send({ status: false, message: 'No username param provided' })
    }

    const data = await TwitterInfluencerExtractorMainController.getRecentTweets(username);

    res.send({ status: data ? true : false, data });
});



app.get("/twitter/extract-influencers/extract", (req, res) => {
    twitterExtractorMainController.fetchByRandomCategory();

    res.send('OK');
});

app.get("/twitter/extract-influencers", async (req, res) => {
    const { categoryID, geocode } = req.query;

    await twitterExtractorMainController.fetchByCategory(categoryID, geocode);

    res.send('OK');
});

app.get("/twitter/keyword/:keyword", (req, res) => {


    res.send('Running...');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})