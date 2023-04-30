import Db from "../Utils/db";
import BaseRepository from "./BaseRepository";

export default class TweetRepository extends BaseRepository {

    constructor() {
        super();
    }

    async storeTweet(tweet: any, twitterUserId: string) {

        try {
            // const tweetExists = await this.checkTweet(tweet.id, twitterUserId);

            // console.log({ tweetExists });
            // if (tweetExists) {
            //     // Update
            //     console.log('Tweet exists', { tweetExists })

            // } else {
            // console.log('Twet does not exist', { userExists, tweetUser })

            const { id, text, geo, retweet_count, favorite_count, created_at } = tweet


            const query = {
                text: `INSERT IGNORE INTO twitter_posts SET tweet_id=?, user_id=?, text=?, location=?, retweet_count=?, favorite_count=?, tweet_created_at=?`,
                values: [id, twitterUserId, text, geo, retweet_count, favorite_count, created_at],
            }

            await this.db.query(query);

            // }
        } catch (e) {
            console.log('store tweet', { e })
            return false;
        }


    }



    async checkTweet(tweetId: string, twitterUserId: string) {

        try {
            const query = {
                text: `SELECT * from twitter_posts WHERE tweet_id = ?`,
                values: [tweetId],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log('check tweet', { e })
            return false;
        }
    }

}