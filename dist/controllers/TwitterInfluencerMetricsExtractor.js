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
const MetricsRepository_1 = __importDefault(require("../models/MetricsRepository"));
class TwitterInfluencerMetricsExtractor {
    constructor(user, tweets) {
        this.user = user.data;
        this.tweets = tweets;
        this.metricsRepository = new MetricsRepository_1.default;
    }
    extract() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                followers_count: this.getFollowersCount(),
                following_count: this.getFollowingCount(),
                tweets_count: this.getTweetsCount(),
                engagement_rate: this.getEngagementRate().toFixed(2),
                average_impressions: this.getAverageImpressions().toFixed(2),
                total_interactions: this.getTotalInteractions(),
                reach: this.getReach(),
                reachablility: this.getReachability(),
                quality_audience_score: this.getQualityAudienceScore(),
                brand_safety_level: this.getBrandSafetyLevel().toFixed(0),
                impressions_count: this.getTotalImpressionCount(),
                authentic_engagement: this.getAuthenticEngagements().toFixed(0),
                total_tweeets: this.getTotalFetchedTweets(),
                total_likes: this.getTotalLikesCount(),
                total_replies: this.getTotalReplyCount(),
                total_retweets: this.getTotalRetweetCount(),
                media_value: this.getMediaValue().toFixed(0),
                average_cpe: this.getAverageCPE().toFixed(2),
                average_cpm: this.getAverageCPM().toFixed(4),
                best_performing_tweets: this.getBestPerformingTweets(),
                most_used_hashtags: this.getMostUsedHashtags(),
            };
            console.log({ data });
        });
    }
    getTotalFetchedTweets() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    }
    getFollowersCount() {
        var _a, _b;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.followers_count;
    }
    getFollowingCount() {
        var _a, _b;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.following_count;
    }
    getTweetsCount() {
        var _a, _b;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.tweet_count;
    }
    getTotalLikesCount() {
        var _a, _b;
        let sum = 0;
        (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.like_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    getTotalRetweetCount() {
        var _a, _b;
        let sum = 0;
        (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.retweet_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    getTotalReplyCount() {
        var _a, _b;
        let sum = 0;
        (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.reply_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    getTotalQuoteCount() {
        var _a, _b;
        let sum = 0;
        (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.quote_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    getTotalImpressionCount() {
        var _a, _b;
        let sum = 0;
        (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.forEach((tweet) => {
            var _a, _b;
            sum += (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.impression_count) !== null && _b !== void 0 ? _b : 0;
        });
        return sum;
    }
    // getLinksClicksCount() {
    //     const sum = this.tweets?.data?.reduce((a: any, b: any) => a.public_metrics?.url_link_clicks + b.public_metrics?.url_link_clicks);
    //     return sum;
    // }
    // getProfileLinkClicksCount() {
    //     const sum = this.tweets?.data?.reduce((a: any, b: any) => a.public_metrics?.user_profile_clicks + b.public_metrics?.user_profile_clicks);
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
        var _a, _b;
        let sensitive_tweets = (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.filter((tweet) => tweet.possibly_sensitive);
        console.log({ sensitive_tweets: this.tweets });
        return (sensitive_tweets.length / this.getTotalFetchedTweets()) * 100;
    }
    getTotalInteractions() {
        return this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalLikesCount() + this.getTotalQuoteCount() + this.getTotalMediaViewsCount() + this.getTotalPollsCount();
    }
    getTotalEngagements() {
        return this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalLikesCount() + this.getTotalQuoteCount();
    }
    getAuthenticEngagements() {
        return ((this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalLikesCount() + this.getTotalQuoteCount()) / this.getTotalFetchedTweets()) * 100;
    }
    // TODO
    getQualityAudience() {
        return 0;
    }
    getEngagementRate() {
        let er = (this.getTotalLikesCount() + this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalQuoteCount()) / this.getFollowersCount();
        console.log((this.getTotalLikesCount() + this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalQuoteCount()));
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
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data.forEach((tweet) => {
            var _a, _b;
            (_b = (_a = tweet.entity) === null || _a === void 0 ? void 0 : _a.hashtags) === null || _b === void 0 ? void 0 : _b.forEach((hashtag) => {
                if (hashtags[hashtag]) {
                    hashtags[hashtag] = hashtags.hashtag + 1;
                }
                else {
                    hashtags[hashtag] = 1;
                }
            });
        });
        return Object.values(hashtags).sort((a, b) => a[1] - b[1]);
    }
    getBestPerformingTweets() {
        let tweets = this.tweets.data.sort((a, b) => { var _a, _b; return ((_a = a.public_metrics) === null || _a === void 0 ? void 0 : _a.impression_count) < ((_b = b.public_metrics) === null || _b === void 0 ? void 0 : _b.impression_count); });
        return tweets.slice(0, 5);
    }
    getMediaValue() {
        return (this.getAverageImpressions() * 360) / 1000;
    }
    getAverageCPE() {
        return this.getMediaValue() / this.getTotalEngagements();
    }
    getAverageCPM() {
        return (this.getMediaValue() / this.getTotalImpressionCount()) / 1000;
    }
}
exports.default = TwitterInfluencerMetricsExtractor;
//# sourceMappingURL=TwitterInfluencerMetricsExtractor.js.map