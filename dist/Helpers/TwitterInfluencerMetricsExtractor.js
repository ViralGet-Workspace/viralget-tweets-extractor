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
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../Utils/helpers");
class TwitterInfluencerMetricsExtractor {
    constructor(user, tweets) {
        // this.user = user.data;
        this.user = user;
        this.tweets = tweets;
    }
    extract() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                followers_count: this.getFollowersCount(),
                following_count: this.getFollowingCount(),
                tweets_count: this.getTweetsCount(),
                engagement_rate: (_a = this.getEngagementRate()) === null || _a === void 0 ? void 0 : _a.toFixed(2),
                average_impressions: (_b = this.getAverageImpressions()) === null || _b === void 0 ? void 0 : _b.toFixed(2),
                total_interactions: this.getTotalInteractions(),
                reach: (_c = this.getReach()) === null || _c === void 0 ? void 0 : _c.toFixed(0),
                reachablility: (_d = this.getReachability()) === null || _d === void 0 ? void 0 : _d.toFixed(0),
                quality_audience_score: this.getQualityAudienceScore(),
                brand_safety_level: (_e = this.getBrandSafetyLevel()) === null || _e === void 0 ? void 0 : _e.toFixed(0),
                impressions_count: this.getTotalImpressionCount(),
                authentic_engagement: (_f = this.getAuthenticEngagements()) === null || _f === void 0 ? void 0 : _f.toFixed(0),
                total_tweets: this.getTotalFetchedTweets(),
                total_likes: this.getTotalLikesCount(),
                total_replies: this.getTotalReplyCount(),
                total_retweets: this.getTotalRetweetCount(),
                media_value: (_g = this.getMediaValue()) === null || _g === void 0 ? void 0 : _g.toFixed(0),
                average_cpe: (_h = this.getAverageCPE()) === null || _h === void 0 ? void 0 : _h.toFixed(2),
                average_cpm: (_j = this.getAverageCPM()) === null || _j === void 0 ? void 0 : _j.toFixed(5),
                best_performing_tweets: this.getBestPerformingTweets(),
                most_used_hashtags: this.getMostUsedHashtags(),
            };
            // console.log({ data: Object.keys(data) })
            return data;
        });
    }
    getTotalFetchedTweets() {
        var _a, _b;
        return (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
    getFollowersCount() {
        var _a, _b;
        // return this.user?.followers_count ?? 0;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.followers_count;
    }
    getFollowingCount() {
        var _a, _b;
        // return this.user?.friends_count ?? 0;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.following_count;
    }
    getTweetsCount() {
        var _a, _b;
        // return this.user?.statuses_count ?? 0;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.tweet_count;
    }
    getTotalLikesCount() {
        var _a;
        let sum = 0;
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.like_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    getTotalRetweetCount() {
        var _a;
        let sum = 0;
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.retweet_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    getTotalReplyCount() {
        var _a;
        let sum = 0;
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.reply_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    getTotalQuoteCount() {
        var _a;
        let sum = 0;
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.quote_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    getTotalImpressionCount() {
        var _a;
        let sum = 0;
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.impression_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    // getLinksClicksCount() {
    //     const sum = this.tweets?.reduce((a: any, b: any) => a.public_metrics?.url_link_clicks + b.public_metrics?.url_link_clicks);
    //     return sum;
    // }
    // getProfileLinkClicksCount() {
    //     const sum = this.tweets?.reduce((a: any, b: any) => a.public_metrics?.user_profile_clicks + b.public_metrics?.user_profile_clicks);
    //     return sum;
    // }
    getTotalMediaViewsCount() {
        var _a, _b, _c, _d;
        let sum = 0;
        if ((_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.media) {
            (_d = (_c = this.tweets) === null || _c === void 0 ? void 0 : _c.media) === null || _d === void 0 ? void 0 : _d.forEach((tweet) => {
                var _a, _b;
                sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.view_count) !== null && _b !== void 0 ? _b : 0;
            });
        }
        return sum;
    }
    getTotalPollsCount() {
        var _a, _b, _c, _d;
        let sum = 0;
        if ((_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.polls) {
            (_d = (_c = this.tweets) === null || _c === void 0 ? void 0 : _c.polls) === null || _d === void 0 ? void 0 : _d.forEach((tweet) => {
                var _a, _b;
                sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.votes) !== null && _b !== void 0 ? _b : 0;
            });
        }
        return sum;
    }
    getBrandSafetyLevel() {
        var _a;
        let sensitive_tweets = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.filter((tweet) => tweet.possibly_sensitive);
        let tweets_count = this.getTotalFetchedTweets();
        return (((sensitive_tweets === null || sensitive_tweets === void 0 ? void 0 : sensitive_tweets.length) / tweets_count) * 100) - 100;
    }
    getTotalInteractions() {
        return this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalLikesCount() + this.getTotalQuoteCount() + this.getTotalMediaViewsCount() + this.getTotalPollsCount();
    }
    getTotalEngagements() {
        return this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalLikesCount() + this.getTotalQuoteCount();
    }
    getAuthenticEngagements() {
        return ((this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalLikesCount() + this.getTotalQuoteCount()) / this.getTotalFetchedTweets()) / 100;
    }
    // TODO
    getQualityAudience() {
        // Check through user's followers.
        // one with most likes and comments and retweets amongt influcers' tweets
        return this.getTotalInteractions() / 4;
        // return 0;
    }
    getEngagementRate() {
        let er = (this.getTotalLikesCount() + this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalQuoteCount()) / this.getFollowersCount();
        return er;
    }
    getAverageImpressions() {
        return this.getTotalImpressionCount() / this.getTotalFetchedTweets();
    }
    getQualityAudienceScore() {
        return ((this.getEngagementRate() * this.getQualityAudience()) / this.getTotalInteractions()) * 100;
    }
    getMostUsedHashtags() {
        let hashtags = this.getTweetsHashtags();
        return hashtags.slice(0, 5);
    }
    getReach() {
        return this.getTotalImpressionCount() / 3;
    }
    getReachability() {
        return this.getReach() * 1000;
    }
    getTweetsHashtags() {
        var _a;
        const hashtags = {};
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.forEach((tweet) => {
            var _a, _b;
            (_b = (_a = tweet.entities) === null || _a === void 0 ? void 0 : _a.hashtags) === null || _b === void 0 ? void 0 : _b.forEach((hashtag) => {
                let tag = hashtag === null || hashtag === void 0 ? void 0 : hashtag.tag;
                if (tag) {
                    if (hashtags[tag]) {
                        hashtags[tag] = hashtags.tag + 1;
                    }
                    else {
                        hashtags[tag] = 1;
                    }
                }
            });
        });
        return Object.keys(hashtags).sort((a, b) => hashtags[a] - hashtags[b]);
    }
    getBestPerformingTweets() {
        var _a;
        let tweets = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.sort((a, b) => { var _a, _b; return ((_a = a.public_metrics) === null || _a === void 0 ? void 0 : _a.impression_count) < ((_b = b.public_metrics) === null || _b === void 0 ? void 0 : _b.impression_count); });
        return tweets === null || tweets === void 0 ? void 0 : tweets.slice(0, 5).map((tweet) => this.formatTweet(tweet));
    }
    getMediaValue() {
        return (this.getAverageImpressions() * 360) / 1000;
    }
    getAverageCPE() {
        return this.getMediaValue() / this.getTotalEngagements();
    }
    getAverageCPM() {
        return (this.getMediaValue() / this.getTotalImpressionCount()) * 1000;
    }
    formatTweet(tweet) {
        var _a, _b, _c;
        // console.log({ tweet })
        return {
            text: tweet.text,
            created_at: (0, helpers_1.formatDate)(tweet.created_at),
            replies: (_a = tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.reply_count,
            quotes: (_b = tweet.public_metrics) === null || _b === void 0 ? void 0 : _b.quote_count,
            likes: (_c = tweet.public_metrics) === null || _c === void 0 ? void 0 : _c.like_count,
        };
    }
}
exports.default = TwitterInfluencerMetricsExtractor;
//# sourceMappingURL=TwitterInfluencerMetricsExtractor.js.map