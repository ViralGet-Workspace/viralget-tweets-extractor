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
class CategoryRepository extends BaseRepository_1.default {
    constructor() {
        super();
    }
    store(userId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `INSERT IGNORE INTO influencer_categories SET influencer_id = ?, platform_id = ?, category_id = ?`,
                    values: [userId, 1, categoryId],
                };
                yield this.db.query(query);
            }
            catch (e) {
                return false;
            }
        });
    }
    findKeywordCategory(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    text: `SELECT * from categories WHERE CONCAT(',', keywords, ',') like ? LIMIT 1`,
                    values: ["%," + keyword + ",%"],
                };
                const result = yield this.db.query(query);
                return result;
            }
            catch (e) {
                console.log('Find keyword error', { e });
                return false;
            }
        });
    }
    findKeywordCategoryByID(id) {
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
                console.log('Find keyword error', { e });
                return false;
            }
        });
    }
}
exports.default = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map