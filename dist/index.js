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
const source_map_support_1 = __importDefault(require("source-map-support"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const TwitterExtractorMainController_js_1 = __importDefault(require("./controllers/TwitterExtractorMainController.js"));
const db_js_1 = __importDefault(require("./Utils/db.js"));
const api_js_1 = __importDefault(require("./Utils/api.js"));
source_map_support_1.default.install();
dotenv.config();
const port = 8000;
const app = (0, express_1.default)();
const twitterExtractor = new TwitterExtractorMainController_js_1.default();
function runCode() {
    return __awaiter(this, void 0, void 0, function* () {
        yield twitterExtractor.handleFetchInfluencers('fashion');
    });
}
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