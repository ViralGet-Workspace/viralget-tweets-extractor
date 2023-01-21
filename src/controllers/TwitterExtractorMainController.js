import { Client } from "twitter-api-sdk";


export default class TwitterExtractorMainController {

    // private any client;

    constructor() {
        this.client = new Client(process.env.TWITTER_BEARER_TOKEN);
    }

    async fetchTweets() {
        const stream = this.client.tweets.sampleStream({
            "tweet.fields": ["author_id"],
        });

        for await (const tweet of stream) {
            console.log(tweet.data?.author_id);
        }
    }

}