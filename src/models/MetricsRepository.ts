import BaseRepository from "./BaseRepository";

export default class MetricsRepository extends BaseRepository {

    constructor() {
        super();
    }

    async store(data: any) {
        try {
            const {
                influencer_id,
                engagement_rate,
                average_impressions,
                total_interactions,
                reach,
                reachablility,
                quality_audience_score,
                brand_safety_level,
                impressions_count,
                authentic_engagement,
                total_tweets,
                total_likes,
                total_replies,
                total_retweets,
                media_value,
                average_cpe,
                average_cpm,
                best_performing_tweets,
                most_used_hashtags } = data;

            const query = {
                text: `INSERT IGNORE INTO 
                                influencer_metrics SET influencer_id = ?, 
                                platform_id = ?,
                                engagement_rate = ?,
                                average_impressions = ?,
                                impressions = ?,
                                interactions = ?,
                                reach = ?,
                                reachability = ?,
                                quality_audience = ?,
                                authentic_engagement = ?,
                                brand_safety_level = ?,
                                total_tweets = ?,
                                total_likes = ?,
                                total_replies = ?,
                                total_retweets = ?,
                                media_value = ?,
                                average_cpe = ?,
                                average_cpm = ?,
                                best_performing_tweets = ?,
                                most_used_hashtags = ?`,
                values: [
                    parseInt(influencer_id),
                    1,
                    engagement_rate,
                    average_impressions,
                    impressions_count,
                    total_interactions,
                    reach,
                    reachablility,
                    quality_audience_score,
                    authentic_engagement,
                    brand_safety_level,
                    total_tweets,
                    total_likes,
                    total_replies,
                    total_retweets,
                    media_value,
                    average_cpe,
                    average_cpm,
                    JSON.stringify(best_performing_tweets),
                    most_used_hashtags?.toString()
                ],
            }


            await this.db.query(query);

        } catch (e) {
            // console.log({ e })

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
            // console.log({ e })

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
            // console.log({ e });

            return false;
        }
    }



}