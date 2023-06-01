import MetricsRepository from "../models/MetricsRepository";
import { formatDate, numberFormat } from "../Utils/helpers";

export default class TwitterKeywordsMetricsExtractor {

    private users: any;
    private tweets: any;
    private media: any;

    constructor(data: any) {
        this.tweets = data.tweets;
        this.users = data.users;
        this.media = data.media;
    }


    public async extract() {
        const data = {
            impressions: this.getTotalImpressionCount(),
            reach: this.getReach()?.toFixed(0),
            campaign_value: this.getCampaignValue(),
            engagement_rate: this.getEngagementRate()?.toFixed(2),
            engagements: this.getTotalEngagements()?.toFixed(0),
            total_likes: this.getTotalLikesCount(),
            total_replies: this.getTotalReplyCount(),
            total_retweets: this.getTotalRetweetCount(),
            media_tweets: this.getTotalMediaTweetsCount(),
            link_tweets: this.getTotalLinkTweetsCount(),
            text_tweets: this.getTotalTextTweetsCount(),
            no_of_contributors: this.users.length,
            original_contributors: this.getOriginalContributors()?.length,
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

        }
        // console.log({ data: Object.keys(data) })

        return data;
    }

    getTotalFetchedTweets() {
        return this.tweets?.length ?? 0;
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

    getTotalMediaTweetsCount() {
        return this.media.length;
    }

    getTotalLinkTweetsCount() {
        let sum = 0;

        // console.log({ hello: this.tweets.length })
        this.tweets?.forEach((tweet: any) => {
            sum += tweet?.entities?.urls?.length ?? 0;
        });

        return sum;
    }

    getTotalTextTweetsCount() {
        // Media is inclusive in link tweets
        return this.tweets.length - this.getTotalLinkTweetsCount();
    }

    getCampaignValue() {
        return 0;
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
        return 0;
    }

    getEngagementRate() {

        let er = (this.getTotalLikesCount() + this.getTotalRetweetCount() + this.getTotalReplyCount() + this.getTotalQuoteCount()) / this.getTotalFollowersCount();

        return er;
    }

    getTotalFollowersCount() {
        let sum = 0;

        this.users.map((user: any) => {
            sum += user.public_metrics?.followers_count
        });

        return sum;
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

    getRecentTweets() {
        return this.tweets?.slice(0, 5).map((tweet: any) => this.formatTweet(tweet));
    }

    getBestPerformingTweets() {
        let tweets = this.tweets?.sort((a: any, b: any) => a.public_metrics?.impression_count < b.public_metrics?.impression_count);


        return tweets?.slice(0, 5).map((tweet: any) => this.formatTweet(tweet));
    }


    getBestPerformingVideos() {
        let media = this.media?.sort((a: any, b: any) => a.public_metrics?.view_count < b.public_metrics?.view_count);


        return media?.slice(0, 5).map((media: any) => {

            return {
                tweet: this.findMediaTweet(media.media_key),
                media,
            }
        });
    }

    findMediaTweet(media_key: string) {
        this.tweets.filter((tweet: any) => tweet.attachments?.media_keys?.includes(media_key))
    }


    getOriginalContributors() {
        const filtered_tweets = this.tweets?.filter((tweet: any) => !tweet.referenced_tweets);

        let data = this.getContributors(filtered_tweets);

        data = data.sort((a: any, b: any) => a.user?.public_metrics?.tweet_count < b.user?.public_metrics?.tweet_count);

        return data;
    }


    getRepliesToTweets() {
        const filtered_tweets = this.tweets?.filter((tweet: any) => tweet.referenced_tweets);

        const data = filtered_tweets.sort((a: any, b: any) => a.public_metrics?.tweet_count < b.public_metrics?.tweet_count);

        return data.slice(0, 5);
    }



    getAverageTweetPerContributor() {
        let total_contributors = 0;

        this.users.map((user: any) => {
            total_contributors += user.public_metrics?.tweet_count
        });

        return total_contributors / this.users.length;
    }

    getAverageFollowerPerContributor() {
        return this.getTotalFollowersCount() / this.users.length;
    }

    getTopContributors() {

        let contributors = this.getContributors(this.tweets);


        contributors = contributors.sort((a: any, b: any) => a.tweets_count < b.tweets_count);

        return contributors?.slice(0, 5);
    }


    getContributors(tweets: any) {
        const data = tweets.map((tweet: any) => {

            const user_tweets = this.users?.filter((user: any) => user.id == tweet.author_id);

            let _data = {
                user: user_tweets[0],
                tweets_count: user_tweets.length
            }

            return _data;
        });

        return data

    }

    getBestPerformingContributors() {
        let data = this.getContributors(this.tweets);

        data = data.sort((a: any, b: any) => a.user?.public_metrics?.impressions < b.user?.public_metrics?.impressions);

        return data?.slice(0, 5);
    }

    getMostActiveContributors() {
        let data = this.getContributors(this.tweets);

        data = data.sort((a: any, b: any) => a.user?.public_metrics?.like_count < b.user?.public_metrics?.like_count);

        return data?.slice(0, 5);
    }

    getTopOriginalTweetsContributors() {
        const filtered_tweets = this.tweets?.filter((tweet: any) => !tweet.referenced_tweets);

        let data = this.getContributors(filtered_tweets);

        return data?.slice(0, 5);
    }

    getTopRetweeters() {

        // Possobly fetch fresh data for this
        const filtered_tweets = this.tweets?.filter((tweet: any) => tweet.referenced_tweets);

        let data = this.getContributors(filtered_tweets);

        return data?.slice(0, 5);
    }

    getTweetsCount() {
        return this.tweets.length;
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