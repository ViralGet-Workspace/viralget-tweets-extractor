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
const db_1 = __importDefault(require("../Utils/db"));
const TwitterService_1 = __importDefault(require("./TwitterService"));
class TwitterExtractorMainController {
    constructor() {
        this.twitterService = new TwitterService_1.default;
        this.db = new db_1.default;
    }
    handleFetchInfluencers(keyword, geocode = '9.0820,8.6753,1000000km', nextResultsUrl) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.twitterService.fetchTweets(keyword, geocode, nextResultsUrl);
            // console.log({ keyword, nextResultsUrl })
            // Store in DB after filter
            if (!response.statuses || !response.statuses.length) {
                return false;
            }
            response.statuses.forEach((tweet) => {
                if (tweet.user.followers_count > 1000) {
                    this.storeTweetUser(tweet.user, keyword);
                }
            });
            if ((_a = response.search_metadata) === null || _a === void 0 ? void 0 : _a.next_results) {
                setTimeout(() => {
                    console.log('Next batch ======>>>>');
                    this.handleFetchInfluencers(keyword, geocode, response.search_metadata.next_results);
                }, 10000);
            }
        });
    }
    storeTweetUser(tweetUser, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.checkTweetUser(tweetUser.id);
                if (userExists && userExists.length > 0) {
                    // Update
                    console.log('User exists', { userExists, tweetUser });
                }
                else {
                    console.log('User does not exist', { userExists, tweetUser });
                    const { id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, created_at } = tweetUser;
                    const query = {
                        text: `INSERT INTO twitter_influencers (twitter_id, username, name, location, bio, is_protected, followers_count,
                    following_count, is_verified, profile_image_url, keyword, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
                        values: [id, screen_name, name, location, description, tweetUser.protected, followers_count, friends_count, verified, profile_image_url_https, keyword, created_at],
                    };
                    yield this.db.query(query);
                }
            }
            catch (e) {
                console.log({ e });
            }
        });
    }
    checkTweetUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `SELECT * from twitter_influencers WHERE twitter_id=$1;`,
                    values: [id],
                };
                const result = yield this.db.query(query);
                return result;
            }
            catch (e) {
                console.log({ e });
            }
        });
    }
}
exports.default = TwitterExtractorMainController;
//# sourceMappingURL=TwitterExtractorMainController.js.map