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
class TweetRepository extends BaseRepository_1.default {
    constructor() {
        super();
    }
    storeTweet(tweet, twitterUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const tweetExists = await this.checkTweet(tweet.id, twitterUserId);
                // console.log({ tweetExists });
                // if (tweetExists) {
                //     // Update
                //     console.log('Tweet exists', { tweetExists })
                // } else {
                // console.log('Twet does not exist', { userExists, tweetUser })
                const { id, text, geo, retweet_count, favorite_count, created_at } = tweet;
                const query = {
                    text: `INSERT IGNORE INTO twitter_posts SET tweet_id=?, user_id=?, text=?, location=?, retweet_count=?, favorite_count=?, tweet_created_at=?`,
                    values: [id, twitterUserId, text, geo, retweet_count, favorite_count, created_at],
                };
                yield this.db.query(query);
                // }
            }
            catch (e) {
                console.log('store tweet', { e });
                return false;
            }
        });
    }
    checkTweet(tweetId, twitterUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `SELECT * from twitter_posts WHERE tweet_id = ?`,
                    values: [tweetId],
                };
                const result = yield this.db.query(query);
                return result;
            }
            catch (e) {
                console.log('check tweet', { e });
                return false;
            }
        });
    }
}
exports.default = TweetRepository;
//# sourceMappingURL=TweetRepository.js.map