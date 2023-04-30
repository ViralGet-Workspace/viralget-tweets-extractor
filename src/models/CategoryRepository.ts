import Db from "../Utils/db";
import BaseRepository from "./BaseRepository";

export default class CategoryRepository extends BaseRepository {

    constructor() {
        super();
    }


    async store(userId: string, categoryId: string) {
        try {

            const query = {
                text: `INSERT IGNORE INTO influencer_categories SET influencer_id = ?, platform_id = ?, category_id = ?`,
                values: [userId, 1, categoryId],
            }

            await this.db.query(query);

        } catch (e) {

            return false;
        }
    }


    async findKeywordCategory(keyword: string) {

        try {
            const query = {
                text: `SELECT * from categories WHERE CONCAT(',', keywords, ',') like ? LIMIT 1`,
                values: ["%," + keyword + ",%"],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log('Find keyword error', { e })
            return false;
        }
    }


    async findKeywordCategoryByID(id: number) {

        try {
            const query = {
                text: `SELECT * from categories WHERE id = ? LIMIT 1`,
                values: [id],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log('Find keyword error', { e })
            return false;
        }
    }

}