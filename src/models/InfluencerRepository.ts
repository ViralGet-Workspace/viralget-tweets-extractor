import Db from "../Utils/db";
import BaseRepository from "./BaseRepository";

export default class InfluencerRepository extends BaseRepository {

    constructor() {
        super();
    }


    async find(id: string) {

        try {
            const query = {
                text: `SELECT * from twitter_influencers WHERE twitter_id = ?`,
                values: [id],
            }

            const result = await this.db.query(query);

            return result[0];

        } catch (e) {
            console.log({ e })

            return false;
        }
    }


    async store(tweetUser: any, category: string, geocode: string, searchLocation: string | null) {

        try {

            const userExists = await this.find(tweetUser.id);
            const username = tweetUser.screen_name;

            if (userExists) {
                // Update
                console.log('User exists', { username })

            } else {

                const { id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url, url, created_at } = tweetUser

                console.log({ id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url, url, created_at })
                const query = {
                    text: `INSERT IGNORE INTO twitter_influencers SET twitter_id = ?, username = ?, full_name = ?, location = ?, bio = ?, is_protected = ?, followers_count = ?, following_count = ?, is_verified = ?,  profile_photo_url = ?, profile_banner_url = ?, account_created_on = ?, geocode = ?`,
                    values: [id.toString(), screen_name, name, location ?? searchLocation, description, tweetUser.protected, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url ?? profile_image_url_https, created_at, geocode],
                }
                const user = await this.db.query(query);

                // console.log({user})
                await this.storeTweetUserCategory(tweetUser.id, category);
            }

            return await this.find(tweetUser.id);

        } catch (e) {
            return false;
        }


    }

    async storeTweetUserCategory(tweetUserId: string, categoryId: string) {

        try {
            // const userExists = await this.checkTweetUser(tweetUser.id);

            // console.log({ tweetUser, category })
            // if (userExists) {
            //     // Update
            //     console.log('User exists', { username: tweetUser.screen_name })

            // } else {
            //     console.log('User does not exist', { username: tweetUser.screen_name })


            const query = {
                text: `INSERT IGNORE INTO influencer_categories SET influencer_id = ?, platform_id = ?, category_id = ?`,
                values: [tweetUserId, 1, categoryId],
            }

            await this.db.query(query);

            // }
        } catch (e) {
            console.log({ e })
            return false;
        }


    }

}