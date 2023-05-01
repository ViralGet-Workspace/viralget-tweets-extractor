"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.runCode = void 0;
const source_map_support_1 = __importDefault(require("source-map-support"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const TwitterExtractorMainController_js_1 = __importDefault(require("./controllers/TwitterExtractorMainController.js"));
const db_js_1 = __importDefault(require("./Utils/db.js"));
const api_js_1 = __importDefault(require("./Utils/api.js"));
const TwitterService_js_1 = __importDefault(require("./Services/TwitterService.js"));
const TwitterInfluencerMetricsExtractor_js_1 = __importDefault(require("./Helpers/TwitterInfluencerMetricsExtractor.js"));
const CategoryRepository_js_1 = __importDefault(require("./models/CategoryRepository.js"));
source_map_support_1.default.install();
dotenv.config();
const port = 8002;
const app = (0, express_1.default)();
const geocode = '9.0066472,3.3689801';
// const geocode = '37.6000,-95.6650,1000km';
const minFollowersCount = 1000;
const twitterExtractor = new TwitterExtractorMainController_js_1.default();
function fetchByKeyword(keyword, category) {
    return __awaiter(this, void 0, void 0, function* () {
        yield twitterExtractor.handleFetchInfluencers(keyword, category, geocode, minFollowersCount);
    });
}
function fetchByCategory(categoryId) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const categoryRepository = (new CategoryRepository_js_1.default);
        const keywordCategory = yield categoryRepository.findKeywordCategoryByID(categoryId);
        // console.log({ keywordCategory })
        if (keywordCategory.length) {
            const keywords = (_a = keywordCategory[0]) === null || _a === void 0 ? void 0 : _a.keywords.split(', ');
            let nextKeyword = keywords[Math.floor(Math.random() * (keywords === null || keywords === void 0 ? void 0 : keywords.length))];
            yield fetchByKeyword(nextKeyword, keywordCategory[0]);
        }
    });
}
function fetchByRandomCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        let min = 1;
        let max = 15;
        let categoryId = Math.floor(Math.random() * (max - min + 1)) - min;
        fetchByCategory(categoryId);
    });
}
function runCode() {
    return __awaiter(this, void 0, void 0, function* () {
        // await fetchByRandomCategory();
        fetchByCategory(7);
    });
}
exports.runCode = runCode;
// export async function runCode() {
//     let twitterService = (new TwitterService);
//     // let data = await twitterService.fetchTweets('finance');
//     let userId = '28332478';
//     let user = await twitterService.fetchV2User(userId);
//     let userTweets = await twitterService.fetchV2UserTweets(userId);
//     // console.log(user)
//     // console.log({ user: user.toString(), userTweets: userTweets.toString() });
//     let metricsExtractor = new TwitterInfluencerMetricsExtractor(user, userTweets);
//     metricsExtractor.extract();
//     // console.log({ data })
// }
runCode();
// app.get('/', async (req, res) => {
//     const twitterExtractor = new TwitterExtractorMainController();
//     const response = await twitterExtractor.handleFetchInfluencers('family');
//     // const db = new Db();
//     // const result = await db.query('SELECT * FROM twitter_influencers');
//     // const api = new API;
//     // const result = await api.get('https://google.com');
//     res.send('hello world')
// })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map