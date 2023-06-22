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
class InfluencerRepository extends BaseRepository_1.default {
    constructor() {
        super();
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `SELECT * from twitter_influencers WHERE id = ?`,
                    values: [id],
                };
                const result = yield this.db.query(query);
                return result[0];
            }
            catch (e) {
                console.log({ e });
                return false;
            }
        });
    }
    findByTwitterId(twitter_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `SELECT * from twitter_influencers WHERE twitter_id = ?`,
                    values: [twitter_id],
                };
                const result = yield this.db.query(query);
                return result[0];
            }
            catch (e) {
                console.log({ e });
                return false;
            }
        });
    }
    store(tweetUser, category, geocode, searchLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByTwitterId(tweetUser.id);
                const username = tweetUser.screen_name;
                if (userExists) {
                    // Update
                    console.log('User exists', { username });
                }
                else {
                    const { followers_count, following_count, tweet_count } = tweetUser === null || tweetUser === void 0 ? void 0 : tweetUser.public_metrics;
                    const { id, username, name, location, description, verified, profile_image_url_https, profile_image_url, profile_banner_url, url, created_at } = tweetUser;
                    // console.log({ id, username, location, searchLocation, description, protected: tweetUser.protected, followers_count, following_count, verified, profile_image_url, profile_banner_url, created_at, geocode });
                    // console.log({ id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url, url, created_at })
                    const query = {
                        text: `INSERT IGNORE INTO twitter_influencers SET twitter_id = ?, username = ?, full_name = ?, location = ?, bio = ?, is_protected = ?, followers_count = ?, following_count = ?, is_verified = ?,  profile_photo_url = ?, profile_banner_url = ?, account_created_on = ?, geocode = ?`,
                        values: [id, username, name, location !== null && location !== void 0 ? location : searchLocation, description, tweetUser.protected, followers_count, following_count, verified, profile_image_url, profile_banner_url !== null && profile_banner_url !== void 0 ? profile_banner_url : profile_image_url, created_at, geocode],
                    };
                    // console.log({ query })
                    const user = yield this.db.query(query);
                }
                return yield this.findByTwitterId(tweetUser.id);
            }
            catch (e) {
                return false;
            }
        });
    }
    update(userId, fields, values) {
        return __awaiter(this, void 0, void 0, function* () {
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
                };
                console.log({ query });
                const result = yield this.db.query(query);
                return result[0];
            }
            catch (e) {
                console.log({ e });
                return false;
            }
        });
    }
}
exports.default = InfluencerRepository;
//# sourceMappingURL=InfluencerRepository.js.map