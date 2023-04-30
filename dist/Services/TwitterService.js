"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_api_sdk_1 = require("twitter-api-sdk");
const api_1 = __importDefault(require("../Utils/api"));
const helpers_1 = require("../Utils/helpers");
class TwitterService {
    constructor() {
        this.client = new twitter_api_sdk_1.Client(process.env.TWITTER_BEARER_TOKEN);
        this.baseURL = 'https://api.twitter.com/2/';
        const authorization = `Bearer ${process.env.TWITTER_BEARER_TOKEN}`;
        this.api = new api_1.default(authorization);
    }
    fetchFollowings(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name=${username}&skip_status=true&include_user_entities=false&count=200`;
            // console.log({ url, searchQuery })
            return yield this.api.get(url, true);
        });
    }
    fetchTweets(keyword, geocode, searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield this.api.get(url, true);
        });
    }
    fetchUserTweets(username, searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = `https://api.twitter.com/1.1/statuses/user_timeline.json`;
            let url = `?screen_name=${username}&count=100&include_rts=false`;
            url = searchQuery ? baseUrl + searchQuery : baseUrl + url;
            return yield this.api.get(url, true);
        });
    }
    // async fetchV2Tweets() {
    //     const stream = this.client.tweets.sampleStream({
    //         "tweet.fields": ["author_id"],
    //     });
    //     for await (const tweet of stream) {
    //         console.log(tweet.data?.author_id);
    //     }
    // }
    fetchV2UserTweets(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseURL + `users/${userId}/tweets`;
            let params = {
                'max_results': 100,
                // 'tweet.fields': 'attachments,author_id,context_annotations,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,source,text,withheld',
                'tweet.fields': 'context_annotations,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,source,text,withheld',
                'expansions': 'attachments.media_keys,attachments.poll_ids',
                'user.fields': 'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
                'media.fields': 'duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width',
                'place.fields': 'contained_within,country,country_code,full_name,geo,id,name,place_type',
                'poll.fields': 'options',
                'exclude': 'retweets,replies',
            };
            return yield this.api.get((0, helpers_1.generateQueryUrl)(url, params), true);
        });
    }
    fetchV2User(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.baseURL + `users/${userId}`;
            url += '?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld';
            return yield this.api.get(url, true);
        });
    }
}
exports.default = TwitterService;
//# sourceMappingURL=TwitterService.js.map