import MetricsRepository from "../models/MetricsRepository";
import { formatDate, numberFormat } from "../Utils/helpers";

export default class TwitterInfluencerMetricsExtractor {

    private user: any;
    private tweets: any;

    constructor(user: any, tweets: any[]) {
        // this.user = user.data;
        this.user = user;
        this.tweets = tweets;
    }


    public async extract() {
        const data = {
            followers_count: this.getFollowersCount(),
            following_count: this.getFollowingCount(),
            tweets_count: this.getTweetsCount(),
            engagement_rate: this.getEngagementRate()?.toFixed(2),
            average_impressions: this.getAverageImpressions()?.toFixed(2),
            total_interactions: this.getTotalInteractions(),
            reach: this.getReach()?.toFixed(0),
            reachablility: this.getReachability()?.toFixed(0),
            quality_audience_score: this.getQualityAudienceScore(),
            brand_safety_level: this.getBrandSafetyLevel()?.toFixed(0),
            impressions_count: this.getTotalImpressionCount(),
            authentic_engagement: this.getAuthenticEngagements()?.toFixed(0),
            total_tweets: this.getTotalFetchedTweets(),
            total_likes: this.getTotalLikesCount(),
            total_replies: this.getTotalReplyCount(),
            total_retweets: this.getTotalRetweetCount(),
            media_value: this.getMediaValue()?.toFixed(0),
            average_cpe: this.getAverageCPE()?.toFixed(2),
            average_cpm: this.getAverageCPM()?.toFixed(5),
            best_performing_tweets: this.getBestPerformingTweets(),
            most_used_hashtags: this.getMostUsedHashtags(),

        }
        // console.log({ data: Object.keys(data) })

        return data;
    }


    getTotalFetchedTweets() {
        return this.tweets?.length ?? 0;
    }

    getFollowersCount() {
        // return this.user?.followers_count ?? 0;
        return this.user?.public_metrics?.followers_count;
    }

    getFollowingCount() {
        // return this.user?.friends_count ?? 0;
        return this.user?.public_metrics?.following_count;
    }

    getTweetsCount() {
        // return this.user?.statuses_count ?? 0;
        return this.user?.public_metrics?.tweet_count;
    }

    getTotalLikesCount() {
        let sum = 0;

        this.tweets?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.like_count ?? 0;
        });

        return sum;
    }

    getTotalRetweetCount() {
        let sum = 0;

        this.tweets?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.retweet_count ?? 0;
        });

        return sum;
    }

    getTotalReplyCount() {
        let sum = 0;

        this.tweets?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.reply_count ?? 0;
        });

        return sum;
    }

    getTotalQuoteCount() {
        let sum = 0;

        this.tweets?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.quote_count ?? 0;
        });

        return sum;
    }

    getTotalImpressionCount() {
        let sum = 0;

        this.tweets?.forEach((tweet: any) => {
            sum += tweet?.public_metrics?.impression_count ?? 0;
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
        let sensitive_tweets = this.tweets?.filter((tweet: any) => tweet.possibly_sensitive);


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
        const hashtags: any = {};

        this.tweets?.forEach((tweet: any) => {
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

        return tweets?.slice(0, 5).map((tweet: any) => this.formatTweet(tweet));
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

    formatTweet(tweet: any) {
        // console.log({ tweet })
        return {
            text: tweet.text,
            created_at: formatDate(tweet.created_at),
            replies: tweet.public_metrics?.reply_count,
            quotes: tweet.public_metrics?.quote_count,
            likes: tweet.public_metrics?.like_count,
        }
    }
}