import MetricsRepository from "../models/MetricsRepository";
import { numberFormat } from "../Utils/helpers";

export default class TwitterKeywordsMetricsExtractor {

    private user: any;
    private tweets: any;

    constructor(tweets: any) {
        this.tweets = tweets;
    }


    public async extract() {
        const data = {
            impressions: this.getTotalImpressionCount(),
            reach: this.getReach()?.toFixed(0),
            engagement_increase: 0,
            campaign_score: 0,
            engagement_rate: this.getEngagementRate()?.toFixed(2),
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

        }
        // console.log({ data: Object.keys(data) })

        return data;
    }


    getTotalFetchedTweets() {
        return this.tweets?.data?.length ?? 0;
    }

    getFollowersCount() {
        return this.user?.followers_count ?? 0;
        // return this.user?.public_metrics?.followers_count;
    }

    getFollowingCount() {
        return this.user?.friends_count ?? 0;
        // return this.user?.public_metrics?.following_count;
    }

    getTweetsCount() {
        return this.user?.statuses_count ?? 0;
        // return this.user?.public_metrics?.tweet_count;
    }

    getTotalLikesCount() {
        let sum = 0;

        this.tweets?.data?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.like_count ?? 0;
        });

        return sum;
    }

    getTotalRetweetCount() {
        let sum = 0;

        this.tweets?.data?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.retweet_count ?? 0;
        });

        return sum;
    }

    getTotalReplyCount() {
        let sum = 0;

        this.tweets?.data?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.reply_count ?? 0;
        });

        return sum;
    }

    getTotalQuoteCount() {
        let sum = 0;

        this.tweets?.data?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.quote_count ?? 0;
        });

        return sum;
    }

    getTotalImpressionCount() {
        let sum = 0;

        // console.log({ hello: this.tweets.length })
        this.tweets?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.impression_count ?? 0;
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

        let sum = 0;

        if (this.tweets?.includes?.media) {
            this.tweets?.media?.forEach((tweet: any) => {
                sum += tweet?.public_metrics?.view_count ?? 0;
            });
        }

        return sum;
    }

    getTotalPollsCount() {

        let sum = 0;


        if (this.tweets?.includes?.polls) {
            this.tweets?.polls?.forEach((tweet: any) => {
                sum += tweet?.public_metrics?.votes ?? 0;
            });
        }

        return sum;
    }


    getBrandSafetyLevel() {
        let sensitive_tweets = this.tweets?.data?.filter((tweet: any) => tweet.possibly_sensitive);


        let tweets_count = this.getTotalFetchedTweets();

        return (((sensitive_tweets?.length) / tweets_count) * 100) - 100;
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
        const hashtags: any = {};

        this.tweets?.data?.forEach((tweet: any) => {
            tweet.entities?.hashtags?.forEach((hashtag: any) => {
                let tag = hashtag?.tag;

                if (tag) {
                    if (hashtags[tag]) {
                        hashtags[tag] = hashtags.tag + 1;
                    } else {
                        hashtags[tag] = 1;
                    }
                }
            });
        });

        return Object.keys(hashtags).sort((a: any, b: any) => hashtags[a] - hashtags[b]);
    }

    getBestPerformingTweets() {
        let tweets = this.tweets?.sort((a: any, b: any) => a.public_metrics?.impression_count < b.public_metrics?.impression_count);


        return tweets?.slice(0, 5).map((tweet: any) => ({
            text: tweet.text,
            created_at: 'May 02',
            likes_count: tweet?.public_metrics?.like_count ?? 0,
            replies_count: tweet?.public_metrics?.reply_count ?? 0,
            quotes_count: tweet?.public_metrics?.quote_count ?? 0,
        }));
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