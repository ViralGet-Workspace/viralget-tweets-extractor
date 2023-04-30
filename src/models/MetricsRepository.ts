import Db from "../Utils/db";

export default class MetricsRepository {

    private db;

    constructor() {
        this.db = new Db;
    }


    async store(tweetUserId: string, categoryId: string) {
        try {

            const query = {
                text: `INSERT IGNORE INTO influencer_categories SET influencer_id = ?, platform_id = ?, category_id = ?`,
                values: [tweetUserId, 1, categoryId],
            }

            await this.db.query(query);

        } catch (e) {
            console.log({ e })

            return false;
        }


    }



    async checkTweetUser(id: string) {

        try {
            const query = {
                text: `SELECT * from twitter_influencers WHERE twitter_id = ?`,
                values: [id],
            }

            const result = await this.db.query(query);

            // console.log({ result })
            return result[0];

        } catch (e) {
            console.log({ e })

            return false;
        }
    }


    async update(id: number) {

        try {
            const query = {
                text: `SELECT * from categories WHERE id = ? LIMIT 1`,
                values: [id],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log({ e });

            return false;
        }
    }



}