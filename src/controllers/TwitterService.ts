import { Client } from "twitter-api-sdk";
import API from "../Utils/api";

export default class TwitterService {

    private client;
    private api;

    constructor() {
        this.client = new Client(process.env.TWITTER_BEARER_TOKEN);

        const authorization = `Bearer ${process.env.TWITTER_BEARER_TOKEN}`;
        this.api = new API(authorization);
    }


    async fetchTweets(keyword: string, geocode?: string, searchQuery?: string) {

        const baseUrl = `https://api.twitter.com/1.1/search/tweets.json`;

        let url = `?q=${keyword}&count=100&result_type=top`;

        if (geocode) {
            url += `&geocode=${geocode}`;
        }

        url = searchQuery ? baseUrl + searchQuery : baseUrl + url;

        console.log({ url, searchQuery })

        return await this.api.get(url, true);
    }


    async fetchV2Tweets() {
        const stream = this.client.tweets.sampleStream({
            "tweet.fields": ["author_id"],
        });

        for await (const tweet of stream) {
            console.log(tweet.data?.author_id);
        }
    }


}