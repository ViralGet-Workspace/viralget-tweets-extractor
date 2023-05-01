"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = __importDefault(require("./BaseRepository"));
class MetricsRepository extends BaseRepository_1.default {
    constructor() {
        super();
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { influencer_id, engagement_rate, average_impressions, total_interactions, reach, reachablility, quality_audience_score, brand_safety_level, impressions_count, authentic_engagement, total_tweets, total_likes, total_replies, total_retweets, media_value, average_cpe, average_cpm, best_performing_tweets, most_used_hashtags } = data;
                const query = {
                    text: `INSERT IGNORE INTO influencer_metrics SET influencer_id = ?, platform_id = ?, engagement_rate = ?, average_impressions = ?, impressions = ?, interactions = ?, reach = ?, reachability = ?, quality_audience = ?, authentic_engagement = ?, brand_safety_level = ?, total_tweets = ?, total_likes = ?, total_replies = ?, total_retweets = ?, media_value = ?, average_cpe = ?, average_cpm = ?, global_rank = ?, category_rank = ?, country_rank = ?, most_used_hashtags = ?`,
                    values: [
                        influencer_id,
                        1,
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
                        best_performing_tweets.toString(),
                        most_used_hashtags.toString()
                    ],
                };
                yield this.db.query(query);
            }
            catch (e) {
                console.log({ e });
                return false;
            }
        });
    }
    checkTweetUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `SELECT * from twitter_influencers WHERE twitter_id = ?`,
                    values: [id],
                };
                const result = yield this.db.query(query);
                // console.log({ result })
                return result[0];
            }
            catch (e) {
                console.log({ e });
                return false;
            }
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `SELECT * from categories WHERE id = ? LIMIT 1`,
                    values: [id],
                };
                const result = yield this.db.query(query);
                return result;
            }
            catch (e) {
                console.log({ e });
                return false;
            }
        });
    }
}
exports.default = MetricsRepository;
//# sourceMappingURL=MetricsRepository.js.map