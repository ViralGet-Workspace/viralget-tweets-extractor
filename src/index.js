import sourceMapSupport from 'source-map-support';
import * as dotenv from 'dotenv';
import express from 'express';
import TwitterExtractorMainController from './controllers/TwitterExtractorMainController.js';
import Db from './Utils/db.js';
import API from './Utils/api.js';
import TwitterService from './Services/TwitterService.js';
import TwitterInfluencerMetricsExtractor from './Helpers/TwitterInfluencerMetricsExtractor.js';
import CategoryRepository from './models/CategoryRepository.js';

sourceMapSupport.install();
dotenv.config()

const port = 8002;
const app = express();

const geocode = '9.0066472,3.3689801';
// const geocode = '37.6000,-95.6650,1000km';

const minFollowersCount = 1000;
const twitterExtractor = new TwitterExtractorMainController();


async function fetchByKeyword(keyword, category) {
    await twitterExtractor.handleFetchInfluencers(keyword, category, geocode, minFollowersCount);
}

async function fetchByCategory(categoryId) {
    const categoryRepository = (new CategoryRepository)
    const keywordCategory = await categoryRepository.findKeywordCategoryByID(categoryId);

    // console.log({ keywordCategory })

    if (keywordCategory.length) {
        const keywords = keywordCategory[0]?.keywords.split(', ');

        let nextKeyword = keywords[Math.floor(Math.random() * keywords?.length)];

        await fetchByKeyword(nextKeyword, keywordCategory[0]);
    }
}

async function fetchByRandomCategory() {
    let min = 1;
    let max = 15;
    let categoryId = Math.floor(Math.random() * (max - min + 1)) - min;


    fetchByCategory(categoryId);

}

export async function runCode() {
    // await fetchByRandomCategory();
    fetchByCategory(7);
}

// export async function runCode() {
//     let twitterService = (new TwitterService);
//     // let data = await twitterService.fetchTweets('finance');

//     let userId = '28332478';
//     let user = await twitterService.fetchV2User(userId);
//     let userTweets = await twitterService.fetchV2UserTweets(userId);

//     // console.log(user)
//     // console.log({ user: user.toString(), userTweets: userTweets.toString() });

//     let metricsExtractor = new TwitterInfluencerMetricsExtractor(user, userTweets);

//     metricsExtractor.extract();
//     // console.log({ data })
// }

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