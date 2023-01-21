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

        // console.log({ keyword, nextResultsUrl })
        // Store in DB after filter

        if (!response.statuses || !response.statuses.length) {
            return false;
        }

        response.statuses.forEach((tweet: any) => {
            if (tweet.user.followers_count > 1000) {
                this.storeTweetUser(tweet.user, keyword);
            }
        });

        if (response.search_metadata?.next_results) {
            setTimeout(() => {
                console.log('Next batch ======>>>>')
                this.handleFetchInfluencers(keyword, geocode, response.search_metadata.next_results);
            }, 10000)
        }
    }

    async storeTweetUser(tweetUser: any, keyword: string) {

        try {
            const userExists = await this.checkTweetUser(tweetUser.id);

            if (userExists && userExists.length > 0) {
                // Update
                console.log('User exists', { userExists, tweetUser })

            } else {
                console.log('User does not exist', { userExists, tweetUser })

                const { id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, created_at } = tweetUser

                const query = {
                    text: `INSERT INTO twitter_influencers (twitter_id, username, name, location, bio, is_protected, followers_count,
                    following_count, is_verified, profile_image_url, keyword, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
                    values: [id, screen_name, name, location, description, tweetUser.protected, followers_count, friends_count, verified, profile_image_url_https, keyword, created_at],
                }

                await this.db.query(query);

            }
        } catch (e) {
            console.log({ e })
        }


    }


    async checkTweetUser(id: string) {

        try {
            const query = {
                text: `SELECT * from twitter_influencers WHERE twitter_id=$1;`,
                values: [id],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log({ e })
        }
    }


}