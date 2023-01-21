import * as dotenv from 'dotenv';
import express from 'express';
import TwitterExtractorMainController from './src/controllers/TwitterExtractorMainController.js';
import Db from './src/Utils/db.js';

dotenv.config()
const port = 8000;

const app = express()


app.get('/', async (req, res) => {
    // const twitterExtractor = new TwitterExtractorMainController();

    // twitterExtractor.fetchTweets();

    const db = new Db();

    const result = await db.query('SELECT * FROM twitter_influencers');

    console.log({ result });

    res.send('hello world')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})