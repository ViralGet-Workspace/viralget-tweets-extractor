import sourceMapSupport from 'source-map-support';
import * as dotenv from 'dotenv';
import express from 'express';
import TwitterExtractorMainController from './controllers/TwitterExtractorMainController.js';
import Db from './Utils/db.js';
import API from './Utils/api.js';

sourceMapSupport.install();
dotenv.config()

const port = 8000;
const app = express()


const twitterExtractor = new TwitterExtractorMainController();

async function runCode() {
    await twitterExtractor.handleFetchInfluencers('fashion');
}

runCode();




// app.get('/', async (req, res) => {
//     const twitterExtractor = new TwitterExtractorMainController();

//     const response = await twitterExtractor.handleFetchInfluencers('family');

//     // const db = new Db();

//     // const result = await db.query('SELECT * FROM twitter_influencers');

//     // const api = new API;
//     // const result = await api.get('https://google.com');


//     res.send('hello world')
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})