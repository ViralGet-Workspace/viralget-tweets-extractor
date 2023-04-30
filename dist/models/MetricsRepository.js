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
class MetricsRepository {
    constructor() {
        this.db = new db_1.default;
    }
    store(tweetUserId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `INSERT IGNORE INTO influencer_categories SET influencer_id = ?, platform_id = ?, category_id = ?`,
                    values: [tweetUserId, 1, categoryId],
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