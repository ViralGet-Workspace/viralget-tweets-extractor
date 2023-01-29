import { Client } from "twitter-api-sdk";
import API from "../Utils/api";
import Db from "../Utils/db";
import { sleep } from "../Utils/helpers";
import TwitterService from "./TwitterService";


export default class TwitterExtractorMainController {

    private twitterService;
    private db;

    constructor() {
        this.twitterService = new TwitterService;

        this.db = new Db;

    }

    async handleFetchInfluencers(keyword: string, geocode: string = '9.0820,8.6753,1000000km', nextResultsUrl?: string) {


        const response = await this.twitterService.fetchTweets(keyword, geocode, nextResultsUrl);

        console.log({ keyword, nextResultsUrl, count: response.statuses.length })
        // Store in DB after filter

        if (!response.statuses || !response.statuses.length) {
            return false;
        }

        if (response.statuses.length == 0) {
            console.log('Terminated!!!')

            return false;
        }

        response.statuses.forEach((tweet: any) => {
            if (tweet.user.followers_count > 1000 && (tweet.user.description.includes(keyword) || tweet.user.screen_name.includes(keyword) || tweet.user.name.includes(keyword))) {
                // TODO: Also check if the keyword is in the bio.
                // ALSO:: Check handle
                console.log("FILTERED:", { keyword, nextResultsUrl, count: response.statuses.length })

                this.storeTweetUser(tweet.user, keyword);

                // TODO: Store tweet as well.
                this.storeTweet(tweet, tweet.user.id)
            }
        });

        if (response.search_metadata?.next_results) {



            setTimeout(() => {
                console.log('Next batch ======>>>>')
                this.handleFetchInfluencers(keyword, geocode, response.search_metadata.next_results);
            }, 10000)
        } else {
            console.log('Terminated!!!')
        }
    }

    async storeTweetUser(tweetUser: any, keyword: string) {

        try {
            const userExists = await this.checkTweetUser(tweetUser.id);

            if (userExists && userExists.length > 0) {
                // Update
                console.log('User exists', { username: tweetUser.screen_name })

            } else {
                console.log('User does not exist', { username: tweetUser.screen_name })

                const { id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url, created_at } = tweetUser

                const query = {
                    text: `INSERT INTO twitter_influencers (twitter_id, username, name, location, bio, is_protected, followers_count,
                    following_count, is_verified, profile_image_url, profile_image_url, profile_banner_url, keyword, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
                    values: [id, screen_name, name, location, description, tweetUser.protected, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url, keyword, created_at],
                }

                await this.db.query(query);

            }
        } catch (e) {
            console.log({ e })
        }


    }

    async storeTweet(tweet: any, twitterUserId: string) {

        try {
            const tweetExists = await this.checkTweet(tweet.id, twitterUserId);

            if (tweetExists && tweetExists.length > 0) {
                // Update
                console.log('Tweet exists', { tweetExists })

            } else {
                // console.log('Twet does not exist', { userExists, tweetUser })

                const { id, text, geo, retweet_count, favorite_count, created_at } = tweet


                const query = {
                    text: `INSERT INTO twitter_posts (tweet_id, user_id, text, location, retweet_count, favorite_count, tweet_created_at) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
                    values: [id, twitterUserId, text, geo, retweet_count, favorite_count, created_at],
                }

                await this.db.query(query);

            }
        } catch (e) {
            console.log('store tweet', { e })
        }


    }


    async checkTweetUser(id: string) {

        try {
            const query = {
                text: `SELECT * from twitter_influencers WHERE twitter_id=?;`,
                values: [id],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log({ e })
        }
    }


    async checkTweet(tweetId: string, twitterUserId: string) {

        try {
            const query = {
                text: `SELECT * from twitter_posts WHERE tweet_id=? and user_id=?;`,
                values: [tweetId, twitterUserId],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log('check tweet', { e })
        }
    }


}