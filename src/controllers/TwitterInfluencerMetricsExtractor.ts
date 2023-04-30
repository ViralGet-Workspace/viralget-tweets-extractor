import MetricsRepository from "../models/MetricsRepository";
import { numberFormat } from "../Utils/helpers";

export default class TwitterInfluencerMetricsExtractor {

    private user: any;
    private tweets: any;
    private metricsRepository: any;

    constructor(user: any, tweets: any) {
        this.user = user.data;
        this.tweets = tweets;
        this.metricsRepository = new MetricsRepository;
    }


    public async extract() {
        const data = {
            followers_count: this.getFollowersCount(),
            following_count: this.getFollowingCount(),
            tweets_count: this.getTweetsCount(),
            engagement_rate: this.getEngagementRate().toFixed(2),
            average_impressions: this.getAverageImpressions().toFixed(2),
            total_interactions: this.getTotalInteractions(),
            reach: this.getReach(),
            reachablility: this.getReachability()
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

        }

        console.log({ data })
    }


    getTotalFetchedTweets() {
        return this.tweets?.data?.length ?? 0;
    }

    getFollowersCount() {
        return this.user?.public_metrics?.followers_count;
    }

    getFollowingCount() {
        return this.user?.public_metrics?.following_count;
    }

    getTweetsCount() {
        return this.user?.public_metrics?.tweet_count;
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

        this.tweets?.data?.forEach((tweet: any) => {
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
        const hashtags: any = {};

        this.tweets?.data.forEach((tweet: any) => {
            tweet.entity?.hashtags?.forEach((hashtag: string) => {
                if (hashtags[hashtag]) {
                    hashtags[hashtag] = hashtags.hashtag + 1;
                } else {
                    hashtags[hashtag] = 1;
                }
            });
        });

        return Object.values(hashtags).sort((a: any, b: any) => a[1] - b[1]);
    }

    getBestPerformingTweets() {
        let tweets = this.tweets.data.sort((a: any, b: any) => a.public_metrics?.impression_count < b.public_metrics?.impression_count);

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