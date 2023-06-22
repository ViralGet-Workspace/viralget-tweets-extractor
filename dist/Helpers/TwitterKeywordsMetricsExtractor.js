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
class TwitterKeywordsMetricsExtractor {
    constructor(data) {
        this.tweets = data.tweets;
        this.users = data.users;
        this.media = data.media;
    }
    extract() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                impressions: this.getTotalImpressionCount(),
                reach: (_a = this.getReach()) === null || _a === void 0 ? void 0 : _a.toFixed(0),
                campaign_value: this.getCampaignValue(),
                engagement_rate: (_b = this.getEngagementRate()) === null || _b === void 0 ? void 0 : _b.toFixed(2),
                engagements: (_c = this.getTotalEngagements()) === null || _c === void 0 ? void 0 : _c.toFixed(0),
                total_likes: this.getTotalLikesCount(),
                total_replies: this.getTotalReplyCount(),
                total_retweets: this.getTotalRetweetCount(),
                media_tweets: this.getTotalMediaTweetsCount(),
                link_tweets: this.getTotalLinkTweetsCount(),
                text_tweets: this.getTotalTextTweetsCount(),
                no_of_contributors: this.users.length,
                original_contributors: (_d = this.getOriginalContributors()) === null || _d === void 0 ? void 0 : _d.length,
                average_tweet_per_contributor: this.getAverageTweetPerContributor().toFixed(0),
                average_follower_per_contributor: this.getAverageFollowerPerContributor().toFixed(0),
                top_contributors: this.getTopContributors(),
                best_performing_contributors: this.getBestPerformingContributors(),
                most_active: this.getMostActiveContributors(),
                original_tweets: this.getTopOriginalTweetsContributors(),
                retweeters: this.getTopRetweeters(),
                //     [{
                //     username: '@Dlaureate',
                //     name: 'Demo name',
                //     value: 10,
                //     profile_image_url: 'https://placeimg.com/640/480/any',
                // }],
                tweets_count: this.getTweetsCount(),
                recent_tweets: this.getRecentTweets(),
                replies_to_tweets: this.getRepliesToTweets(),
                best_performing_tweets: this.getBestPerformingTweets(),
                best_performing_videos: this.getBestPerformingVideos(),
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
        var _a, _b;
        return (_b = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
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
    getTotalMediaTweetsCount() {
        return this.media.length;
    }
    getTotalLinkTweetsCount() {
        var _a;
        let sum = 0;
        // console.log({ hello: this.tweets.length })
        (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.forEach((tweet) => {
            var _a, _b, _c;
            sum += (_c = (_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.entities) === null || _a === void 0 ? void 0 : _a.urls) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
        });
        return sum;
    }
    getTotalTextTweetsCount() {
        // Media is inclusive in link tweets
        return this.tweets.length - this.getTotalLinkTweetsCount();
    }
    getCampaignValue() {
        return this.getTotalImpressionCount() * 500;
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
        return 0;
    }
    getEngagementRate() {
        let er = (this.getTotalLikesCount() + this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalQuoteCount()) / this.getTotalFollowersCount();
        return er;
    }
    getTotalFollowersCount() {
        let sum = 0;
        this.users.map((user) => {
            var _a;
            sum += (_a = user.public_metrics) === null || _a === void 0 ? void 0 : _a.followers_count;
        });
        return sum;
    }
    getAverageImpressions() {
        return this.getTotalImpressionCount() / this.getTotalFetchedTweets();
    }
    getQualityAudienceScore() {
        return 0; // ((this.getEngagementRate() * this.getQualityAudience()) / this.getTotalInteractions()) * 100;
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
    getRecentTweets() {
        var _a;
        return (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.slice(0, 5).map((tweet) => this.formatTweet(tweet));
    }
    getBestPerformingTweets() {
        var _a;
        let tweets = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.sort((a, b) => { var _a, _b; return ((_a = a.public_metrics) === null || _a === void 0 ? void 0 : _a.impression_count) < ((_b = b.public_metrics) === null || _b === void 0 ? void 0 : _b.impression_count); });
        return tweets === null || tweets === void 0 ? void 0 : tweets.slice(0, 5).map((tweet) => this.formatTweet(tweet));
    }
    getBestPerformingVideos() {
        var _a;
        let media = (_a = this.media) === null || _a === void 0 ? void 0 : _a.sort((a, b) => { var _a, _b; return ((_a = a.public_metrics) === null || _a === void 0 ? void 0 : _a.view_count) < ((_b = b.public_metrics) === null || _b === void 0 ? void 0 : _b.view_count); });
        return media === null || media === void 0 ? void 0 : media.slice(0, 5).map((media) => {
            return {
                tweet: this.findMediaTweet(media.media_key),
                media,
            };
        });
    }
    findMediaTweet(media_key) {
        this.tweets.filter((tweet) => { var _a, _b; return (_b = (_a = tweet.attachments) === null || _a === void 0 ? void 0 : _a.media_keys) === null || _b === void 0 ? void 0 : _b.includes(media_key); });
    }
    getOriginalContributors() {
        var _a;
        const filtered_tweets = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.filter((tweet) => !tweet.referenced_tweets);
        let data = this.getContributors(filtered_tweets);
        data = data.sort((a, b) => { var _a, _b, _c, _d; return ((_b = (_a = a.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.tweet_count) < ((_d = (_c = b.user) === null || _c === void 0 ? void 0 : _c.public_metrics) === null || _d === void 0 ? void 0 : _d.tweet_count); });
        return data;
    }
    getRepliesToTweets() {
        var _a;
        const filtered_tweets = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.filter((tweet) => tweet.referenced_tweets);
        const data = filtered_tweets.sort((a, b) => { var _a, _b; return ((_a = a.public_metrics) === null || _a === void 0 ? void 0 : _a.tweet_count) < ((_b = b.public_metrics) === null || _b === void 0 ? void 0 : _b.tweet_count); });
        return data.slice(0, 5);
    }
    getAverageTweetPerContributor() {
        let total_contributors = 0;
        this.users.map((user) => {
            var _a;
            total_contributors += (_a = user.public_metrics) === null || _a === void 0 ? void 0 : _a.tweet_count;
        });
        return total_contributors / this.users.length;
    }
    getAverageFollowerPerContributor() {
        return this.getTotalFollowersCount() / this.users.length;
    }
    getTopContributors() {
        let contributors = this.getContributors(this.tweets);
        contributors = contributors.sort((a, b) => a.tweets_count < b.tweets_count);
        return contributors === null || contributors === void 0 ? void 0 : contributors.slice(0, 5);
    }
    getContributors(tweets) {
        const data = tweets.map((tweet) => {
            var _a;
            const user_tweets = (_a = this.users) === null || _a === void 0 ? void 0 : _a.filter((user) => user.id == tweet.author_id);
            let _data = {
                user: user_tweets[0],
                tweets_count: user_tweets.length
            };
            return _data;
        });
        return data;
    }
    getBestPerformingContributors() {
        let data = this.getContributors(this.tweets);
        data = data.sort((a, b) => { var _a, _b, _c, _d; return ((_b = (_a = a.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.impressions) < ((_d = (_c = b.user) === null || _c === void 0 ? void 0 : _c.public_metrics) === null || _d === void 0 ? void 0 : _d.impressions); });
        return data === null || data === void 0 ? void 0 : data.slice(0, 5);
    }
    getMostActiveContributors() {
        let data = this.getContributors(this.tweets);
        data = data.sort((a, b) => { var _a, _b, _c, _d; return ((_b = (_a = a.user) === null || _a === void 0 ? void 0 : _a.public_metrics) === null || _b === void 0 ? void 0 : _b.like_count) < ((_d = (_c = b.user) === null || _c === void 0 ? void 0 : _c.public_metrics) === null || _d === void 0 ? void 0 : _d.like_count); });
        return data === null || data === void 0 ? void 0 : data.slice(0, 5);
    }
    getTopOriginalTweetsContributors() {
        var _a;
        const filtered_tweets = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.filter((tweet) => !tweet.referenced_tweets);
        let data = this.getContributors(filtered_tweets);
        return data === null || data === void 0 ? void 0 : data.slice(0, 5);
    }
    getTopRetweeters() {
        var _a;
        // Possobly fetch fresh data for this
        const filtered_tweets = (_a = this.tweets) === null || _a === void 0 ? void 0 : _a.filter((tweet) => tweet.referenced_tweets);
        let data = this.getContributors(filtered_tweets);
        return data === null || data === void 0 ? void 0 : data.slice(0, 5);
    }
    getTweetsCount() {
        return this.tweets.length;
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
exports.default = TwitterKeywordsMetricsExtractor;
//# sourceMappingURL=TwitterKeywordsMetricsExtractor.js.map