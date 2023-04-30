import { Client } from "twitter-api-sdk";
import API from "../Utils/api";
import { generateQueryUrl } from "../Utils/helpers";

export default class TwitterService {

    private client;
    private api;
    private baseURL;

    constructor() {
        this.client = new Client(process.env.TWITTER_BEARER_TOKEN);
        this.baseURL = 'https://api.twitter.com/2/';

        const authorization = `Bearer ${process.env.TWITTER_BEARER_TOKEN}`;

        this.api = new API(authorization);
    }

    async fetchFollowings(username: string) {

        const url = `https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name=${username}&skip_status=true&include_user_entities=false&count=200`;

        // console.log({ url, searchQuery })

        return await this.api.get(url, true);
    }

    async fetchTweets(keyword: string, geocode?: string, searchQuery?: string) {

        // let url = this.baseURL + `tweets/search/recent/?query=${keyword}`;

        // let params: any = {
        //     'tweet.fields': 'attachments,author_id,context_annotations,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld',
        //     'expansions': 'author_id,referenced_tweets.id',
        //     'user.fields': 'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
        //     'media.fields': 'duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,width',
        //     'place.fields': 'contained_within,country,country_code,full_name,geo,id,name,place_type',
        // }

        // return await this.api.get(generateQueryUrl(url, params), true);


        let baseUrl = this.baseURL + `tweets/search/recent/`;

        let url = baseUrl;

        if (geocode) {
            url += `&geocode=${geocode}`;
        }

        url = searchQuery ? baseUrl + searchQuery : baseUrl + url;

        return await this.api.get(url, true);
    }


    async fetchUserTweets(username: string, searchQuery?: string) {
        const baseUrl = `https://api.twitter.com/1.1/statuses/user_timeline.json`;

        let url = `?screen_name=${username}&count=100&include_rts=false`;


        url = searchQuery ? baseUrl + searchQuery : baseUrl + url;

        return await this.api.get(url, true);
    }



    // async fetchV2Tweets() {
    //     const stream = this.client.tweets.sampleStream({
    //         "tweet.fields": ["author_id"],
    //     });

    //     for await (const tweet of stream) {
    //         console.log(tweet.data?.author_id);
    //     }
    // }


    async fetchV2UserTweets(userId: string) {
        let url = this.baseURL + `users/${userId}/tweets`;

        let params: any = {
            'max_results': 100,
            // 'tweet.fields': 'attachments,author_id,context_annotations,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld',
            'tweet.fields': 'context_annotations,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,source,text,withheld',
            'expansions': 'attachments.media_keys,attachments.poll_ids',
            'user.fields': 'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
            'media.fields': 'duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width',
            'place.fields': 'contained_within,country,country_code,full_name,geo,id,name,place_type',
            'poll.fields': 'options',
            'exclude': 'retweets,replies',
        }

        return await this.api.get(generateQueryUrl(url, params), true);
    }

    async fetchV2User(userId: string) {
        let url = this.baseURL + `users/${userId}`;

        url += '?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';

        return await this.api.get(url, true);
    }
}