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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_api_v2_1 = require("twitter-api-v2");
class TwitterService {
    constructor() {
        this.client = new twitter_api_v2_1.TwitterApi(process.env.TWITTER_BEARER_TOKEN);
        this.api = this.client.readOnly;
    }
    // async fetchFollowings(username: string) {
    //     const url = `https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name=${username}&skip_status=true&include_user_entities=false&count=200`;
    //     // console.log({ url, searchQuery })
    //     return await this.api.get(url, true);
    // }
    fetchTweets(keyword, geocode, searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const tweets = yield this.client.v2.searchAll(keyword, {
                'tweet.fields': 'attachments,author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld',
                'expansions': 'author_id,referenced_tweets.id',
                'user.fields': 'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
                'media.fields': 'duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,width',
                'place.fields': 'contained_within,country,country_code,full_name,geo,id,name,place_type',
            });
            return tweets;
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
    fetchV2Tweets() {
        var _a, e_1, _b, _c;
        var _d;
        return __awaiter(this, void 0, void 0, function* () {
            const stream = this.client.tweets.sampleStream({
                "tweet.fields": ["author_id"],
            });
            try {
                for (var _e = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a;) {
                    _c = stream_1_1.value;
                    _e = false;
                    try {
                        const tweet = _c;
                        console.log((_d = tweet.data) === null || _d === void 0 ? void 0 : _d.author_id);
                    }
                    finally {
                        _e = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_e && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
}
exports.default = TwitterService;
//# sourceMappingURL=TwitterService.js.map