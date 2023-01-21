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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_api_sdk_1 = require("twitter-api-sdk");
const api_1 = __importDefault(require("../Utils/api"));
class TwitterService {
    constructor() {
        this.client = new twitter_api_sdk_1.Client(process.env.TWITTER_BEARER_TOKEN);
        const authorization = `Bearer ${process.env.TWITTER_BEARER_TOKEN}`;
        this.api = new api_1.default(authorization);
    }
    fetchTweets(keyword, geocode, searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = `https://api.twitter.com/1.1/search/tweets.json`;
            let url = `?q=${keyword}&count=100&result_type=top`;
            if (geocode) {
                url += `&geocode=${geocode}`;
            }
            url = searchQuery ? baseUrl + searchQuery : baseUrl + url;
            console.log({ url, searchQuery });
            return yield this.api.get(url, true);
        });
    }
    fetchV2Tweets() {
        var _a, e_1, _b, _c;
        var _d;
        return __awaiter(this, void 0, void 0, function* () {
            const stream = this.client.tweets.sampleStream({
                "tweet.fields": ["author_id"],
            });
            try {
                for (var _e = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a;) {
                    _c = stream_1_1.value;
                    _e = false;
                    try {
                        const tweet = _c;
                        console.log((_d = tweet.data) === null || _d === void 0 ? void 0 : _d.author_id);
                    }
                    finally {
                        _e = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_e && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
}
exports.default = TwitterService;
//# sourceMappingURL=TwitterService.js.map