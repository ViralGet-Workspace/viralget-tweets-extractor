import Db from "../Utils/db";
import BaseRepository from "./BaseRepository";

export default class InfluencerRepository extends BaseRepository {

    constructor() {
        super();
    }

    async findById(id: string) {

        try {
            const query = {
                text: `SELECT * from twitter_influencers WHERE id = ?`,
                values: [id],
            }

            const result = await this.db.query(query);

            return result[0];

        } catch (e) {
            // console.log({ e })

            return false;
        }
    }

    async findByTwitterId(twitter_id: string) {

        try {
            const query = {
                text: `SELECT * from twitter_influencers WHERE twitter_id = ?`,
                values: [twitter_id],
            }

            const result = await this.db.query(query);

            return result[0];

        } catch (e) {
            // console.log({ e })

            return false;
        }
    }

    async store(tweetUser: any, category: string, geocode: string, searchLocation: string | null) {

        try {

            const userExists = await this.findByTwitterId(tweetUser.id);
            const username = tweetUser.screen_name;

            if (userExists) {
                // Update
                console.log('User exists', { username })

            } else {

                const { followers_count, following_count, tweet_count } = tweetUser?.public_metrics;

                const { id, username, name, location, description, verified, profile_image_url_https, profile_image_url, profile_banner_url, url, created_at } = tweetUser

                // console.log({ id, username, location, searchLocation, description, protected: tweetUser.protected, followers_count, following_count, verified, profile_image_url, profile_banner_url, created_at, geocode });
                // console.log({ id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url, url, created_at })
                const query = {
                    text: `INSERT IGNORE INTO twitter_influencers SET twitter_id = ?, username = ?, full_name = ?, location = ?, bio = ?, is_protected = ?, followers_count = ?, following_count = ?, is_verified = ?,  profile_photo_url = ?, profile_banner_url = ?, account_created_on = ?, geocode = ?`,
                    values: [id, username, name, location ?? searchLocation, description, tweetUser.protected, followers_count, following_count, verified, profile_image_url, profile_banner_url ?? profile_image_url, created_at, geocode],
                }

                // console.log({ query })
                const user = await this.db.query(query);

            }

            return await this.findByTwitterId(tweetUser.id);

        } catch (e) {
            return false;
        }


    }


    async update(userId: number, fields: string[], values: string[]) {

        let _fields = '';

        fields.forEach((field, index) => {

            _fields += `${field} = ?`;

            if (index != fields.length - 1) {
                _fields += ', ';
            }
        });

        // console.log({ _fields, values })

        try {
            const query = {
                text: `UPDATE twitter_influencers SET ${_fields} WHERE id = ?`,
                values: [...values, userId],
            }

            // console.log({ query })
            const result = await this.db.query(query);

            return result[0];

        } catch (e) {
            // console.log({ e })

            return false;
        }
    }


}