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
class TwitterKeywordsMetricsExtractor {
    constructor(tweets) {
        this.tweets = tweets;
    }
    extract() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                impressions: this.getTotalImpressionCount(),
                reach: (_a = this.getReach()) === null || _a === void 0 ? void 0 : _a.toFixed(0),
                engagement_increase: 0,
                campaign_score: 0,
                engagement_rate: (_b = this.getEngagementRate()) === null || _b === void 0 ? void 0 : _b.toFixed(2),
                total_likes: this.getTotalLikesCount(),
                total_replies: this.getTotalReplyCount(),
                total_retweets: this.getTotalRetweetCount(),
                media_tweets: 0,
                link_tweets: 0,
                text_tweets: 0,
                no_of_contributors: 0,
                original_contributors: 0,
                average_tweet_per_contributor: 0,
                average_follower_per_contributor: 0,
                top_contributors: [{
                        username: '@Dlaureate',
                        name: 'Demo name',
                        value: 10,
                    }],
                best_performing_contributors: [{
                        username: '@Dlaureate',
                        name: 'Demo name',
                        value: 10,
                    }],
                most_active: [{
                        username: '@Dlaureate',
                        name: 'Demo name',
                        value: 10,
                    }],
                original_tweets: [{
                        username: '@Dlaureate',
                        name: 'Demo name',
                        value: 10,
                    }],
                retweeters: [{
                        username: '@Dlaureate',
                        name: 'Demo name',
                        value: 10,
                    }],
                tweets_count: this.getTweetsCount(),
                recent_tweets: this.getBestPerformingTweets(),
                replies_to_tweets: this.getBestPerformingTweets(),
                best_performing_tweets: this.getBestPerformingTweets(),
                best_performing_videos: this.getBestPerformingTweets(),
                // average_impressions: this.getAverageImpressions()?.toFixed(2),
                // total_interactions: this.getTotalInteractions(),
                // reachablility: this.getReachability()?.toFixed(0),
                // quality_audience_score: this.getQualityAudienceScore(),
                // brand_safety_level: this.getBrandSafetyLevel()?.toFixed(0),
                // authentic_engagement: this.getAuthenticEngagements()?.toFixed(0),
                // total_tweets: this.getTotalFetchedTweets(),
                // media_value: this.getMediaValue()?.toFixed(0),
                // average_cpe: this.getAverageCPE()?.toFixed(2),
                // average_cpm: this.getAverageCPM()?.toFixed(5),
            };
            // console.log({ data: Object.keys(data) })
            return data;
        });
    }
    getTotalFetchedTweets() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    }
    getFollowersCount() {
        var _a, _b;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.followers_count) !== null && _b !== void 0 ? _b : 0;
        // return this.user?.public_metrics?.followers_count;
    }
    getFollowingCount() {
        var _a, _b;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.friends_count) !== null && _b !== void 0 ? _b : 0;
        // return this.user?.public_metrics?.following_count;
    }
    getTweetsCount() {
        var _a, _b;
        return (_b = (_a = this.user) === null || _a === void 0 ? void 0 : _a.statuses_count) !== null && _b !== void 0 ? _b : 0;
        // return this.user?.public_metrics?.tweet_count;
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
        var _a;
        let sum = 0;
        // console.log({ hello: this.tweets.length })
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.forEach((tweet) => {
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
        return 0;
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
        var _a, _b;
        const hashtags = {};
        (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.forEach((tweet) => {
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
        return tweets === null || tweets === void 0 ? void 0 : tweets.slice(0, 5).map((tweet) => {
            var _a, _b, _c, _d, _e, _f;
            return ({
                text: tweet.text,
                created_at: 'May 02',
                likes_count: (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _a === void 0 ? void 0 : _a.like_count) !== null && _b !== void 0 ? _b : 0,
                replies_count: (_d = (_c = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _c === void 0 ? void 0 : _c.reply_count) !== null && _d !== void 0 ? _d : 0,
                quotes_count: (_f = (_e = tweet === null || tweet === void 0 ? void 0 : tweet.public_metrics) === null || _e === void 0 ? void 0 : _e.quote_count) !== null && _f !== void 0 ? _f : 0,
            });
        });
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
}
exports.default = TwitterKeywordsMetricsExtractor;
//# sourceMappingURL=TwitterKeywordsMetricsExtractor.js.map