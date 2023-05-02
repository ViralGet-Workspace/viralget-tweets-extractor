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
const __1 = require("..");
const helpers_1 = require("../Utils/helpers");
const TwitterService_1 = __importDefault(require("../Services/TwitterService"));
const TwitterInfluencerMetricsExtractor_1 = __importDefault(require("../Helpers/TwitterInfluencerMetricsExtractor"));
const TweetRepository_1 = __importDefault(require("../models/TweetRepository"));
const MetricsRepository_1 = __importDefault(require("../models/MetricsRepository"));
const CategoryRepository_1 = __importDefault(require("../models/CategoryRepository"));
const InfluencerRepository_1 = __importDefault(require("../models/InfluencerRepository"));
const searchLocation = 'Nigeria';
let keywords = "artwork, art, painting, illustration, digital art, sketch, pencil artist, pencil sketch, pencil on paper, graphite, metal sculpture, wooden sculpture, illustrator, digital artist, graffitti, surrealism, graphic artist, pencil, charcoal, acrylic, canvas, pencils on paper, oil painting, acrylic on canvas, acrylic painting, abstract, art exhibition, pastel paintings, pastel, contemporary art, oil on canvas, portrait, abstract art, drawing, actor, actress, onset, main character, movie, film, actors life, acting, producer, filmmaker, cast, trailer, director, directed by, premiere, thespian, produced, shortfilm, filmmaking, actors, webseries, tvseries, character, commercial model, episode, showing on, screens, starring, cinemas, cinema, production, beauty, makeup, skincare, hydration, cosmetics, skin care routine, mua, skin, glowing, toning, moisturizer, sunscreen, toner, beauty care, beautytips, beauty products, hair, looks, facial, makeup artist, haircare, nails, oil, cleansing, glossier, fragrance, lipstick, beauty basics, glam, brows, organic, skincare tips, blog, news, news & media, gossip, 247 updates, breaking news, trending, viral, news update, lastest news, gossip blog, latest gist, instagram blog, gist, entertainment, viral posts, trending update, funny, comedy, comedian, humor, comedy video, haha, lol, lmao, comedienne, laugh, laughing, live on stage, 😆, standup comedian, standup comedy, laughter, standup, stand up, phone, iphone, smartphone, gadget store, gadgets, accessories, android, apple, samsung, gadget, computer, pc, laptop, pc gaming, gaming pc, electronics, computer graphics, computer accessories, computer hardware, computer world, phones, computers, laptops, uk used, bitcoin, cryptocurrency, blockchain, ethereum, btc, crypto, cryptotrading, nft, altcoins, cryptotrade, bitcoin trading, dogecoin, bitcoinp rice, nfts, trade crypto, crypt orader, crypto market, blockchain technology, bnb, bitcoin mining, altcoin, cryptoworld, crypto news, crypto exchange, dancer, choreographer, choreography, dancing, dance teacher, dancers, hiphop, ballet, dance challenge, song, dance video, ballerina, choreo, dance class, dance classes,  ";
keywords += "education summit, education, education strategist, business coach, education leadership, leadership coach, learning, school, study, teacher, student, education matters, online learning, business, study abroad, scholar entrepreneur coach, sme, scholarship, literacy, edutech, university, courses, elearning, classroom, school counseling, school counselor, edchat, style, fashion, model, fashion blogger, fashion style, fashionista, instafashion, photoshoot, dress, fashionable, fashiongram, fashion blog, fashion diaries, fashion nova, fashion stylist, fashion girl, fashion illustration, fashion photographer, fashion trends, fashions, fashion look, fashion inspiration, fashion bag, fashion editorial, fashion men, fashion magazine, fashion diaries, fashion week, fashion designer, fashion post, fashion lover, fashion kids, fashion show, fashion model, fashion inspo, fashion design, fashion daily, motherhood, parenting, momlife, family, fatherhood, tips parenting, parenting life, toddler life, family time, home schooling, children, mom blogger, parent life, preschool, parenting hacks, kids, family, parenting tips, parent, toddlers, positive parenting, parenting goals, parenting blog, parenting advice, parenting quotes, parenting memes, parenting101, parenting humor, parenting hacks, parenting advice, parenting problems, family first, family photo, family goals, family fun, family trip, family life, family vacation, family dinner, family holiday, family pic, family adventures, family time, food blogger, recipes, food, breakfast, foodie, delicious, homemade, foodlover, healthy food, restaurant, cooking, lunch, chef, dessert, eat, yummy, foodblog, dinner, cake, chocolate, foodstagram, food diary, wine, meal, dish, drink, cookery, fast food, fine dining, cuisine, tech news, coding, computer science, programming, software, programmer, python, developer, code, java, coder, tech tips, yoga, meditation, yoga junkie, yoga goals, yoga practice, yoga body, yoga inspiration, yoga life, mindfulness, yoga teacher, yoga love, yoga everyday, wellness, yoga girl, yoga pose, yoga poses, yoga journey, yoga pants, yoga daily, yogagram, yoga addict, yogafit, yogafun, yogamom, yoga flow, instayoga, yoga fitness, yoga at home, yoga vibes, yoga therapy, yoga family, yoga girls, yoga journal, yogaart, yoga inspiration, yoga love, yoga practice,";
class TwitterExtractorMainController {
    constructor() {
        this.runCount = 0;
        this.twitterService = new TwitterService_1.default;
        // this.db = new Db;
        this.influencerRepository = new InfluencerRepository_1.default;
        this.tweetRepository = new TweetRepository_1.default;
        this.metricsRepository = new MetricsRepository_1.default;
        this.categoryRepository = new CategoryRepository_1.default;
    }
    handleFetchInfluencers(keyword, category, geocode = '9.0820,8.6753', minFollowersCount = 1000, nextResultsUrl) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Keyword: ', keyword, 'runcount:', this.runCount);
            const response = yield this.twitterService.fetchTweets(keyword, geocode, nextResultsUrl);
            // console.log({ response });
            // Store in DB after filter
            if (!response.statuses || !response.statuses.length) {
                console.log('No tweets found. Restart!!!');
                yield (0, helpers_1.sleep)();
                yield (0, __1.runCode)();
                return false;
            }
            // if (response.statuses.length == 0) {
            //     console.log('Terminated!!!')
            //     return false;
            // }
            // console.log({response: response.statuses})
            for (let i = 0; i <= response.statuses.length; i++) {
                let tweet = response.statuses[i];
                // console.log({ tweet })
                if (tweet) {
                    const user = tweet.user;
                    yield this.handleProcessInfluencerCheck(user, minFollowersCount, category, geocode);
                    // sleep(200000);
                }
            }
            yield (0, helpers_1.sleep)(10000);
            if ((_a = response.search_metadata) === null || _a === void 0 ? void 0 : _a.next_results) {
                setTimeout(() => {
                    var _a;
                    console.log('Continue to next page ======>>>> ', (_a = response.search_metadata) === null || _a === void 0 ? void 0 : _a.next_result);
                    // this.handleFetchInfluencers(keyword, category, geocode, response.search_metadata.next_results);
                    this.runCount++;
                    this.handleFetchInfluencers(keyword, category, geocode, minFollowersCount, response.search_metadata.next_results);
                }, 10000);
            }
            else {
                console.log('Terminated!!!');
            }
        });
    }
    processinfluencerTweets(influencerId, influencer, influencerTweets) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('SEE ME HEREEEE', { influencer, influencerTweets })
            try {
                if (!influencer || !influencerTweets) {
                    throw new Error('Cannot process user metrics');
                }
                console.log(influencerTweets);
                let metricsExtractor = new TwitterInfluencerMetricsExtractor_1.default(influencer, influencerTweets);
                let extractedData = yield metricsExtractor.extract();
                yield this.metricsRepository.store(Object.assign({ influencer_id: influencerId }, extractedData));
                yield this.influencerRepository.update(influencerId, ['tweets_count'], [extractedData === null || extractedData === void 0 ? void 0 : extractedData.tweets_count]);
            }
            catch (e) {
                console.log({ e });
            }
        });
    }
    checkUserQualifiesAsInfluencer(influencerTweets, category) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const keywords = category.keywords.split(', ');
            const qualifiedTweets = [];
            if (((_a = influencerTweets.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                influencerTweets.data.forEach((tweet) => {
                    keywords.forEach((keyword) => {
                        // console.log({ keyword, tweet })
                        if (tweet.text.includes(keyword) || tweet.text.includes(keyword.replace(' ', ''))) {
                            qualifiedTweets.push(tweet);
                        }
                    });
                });
            }
            return ((qualifiedTweets.length / influencerTweets.length) * 100) > 30;
        });
    }
    handleProcessInfluencerCheck(user, minFollowersCount, category, geocode, fetchFriends = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.followers_count >= minFollowersCount) {
                // Fetch user tweets
                const influencerTweets = yield this.twitterService.fetchV2UserTweets(user.id_str);
                // console.log({ influencerTweets })
                const keywords = category.keywords.split(', ');
                // if (user.description.includes(keyword)) {
                if (keywords.some((v) => user.description.includes(v))) {
                    // console.log({ fetchFriends, user: user.screen_name })
                    // TODO: Also check if the keyword is in the bio.
                    // ALSO:: Check handle
                    console.log("Bio FILTERED:", { user: user.screen_name });
                    // Get user location using IPINFO??
                    const insertedUser = yield this.influencerRepository.store(user, category.id, geocode, searchLocation);
                    if (insertedUser) {
                        yield this.categoryRepository.store(insertedUser.id, category.id);
                        yield this.processinfluencerTweets(insertedUser.id, user, influencerTweets);
                    }
                    if (fetchFriends) {
                        yield this.fetchInfluencerFriends(user, minFollowersCount, category, geocode);
                    }
                }
                else {
                    const userQualifiesAsInfluencer = yield this.checkUserQualifiesAsInfluencer(influencerTweets, category);
                    if (userQualifiesAsInfluencer) {
                        let insertedUser = yield this.influencerRepository.store(user, category.id, geocode, searchLocation);
                        if (insertedUser) {
                            yield this.categoryRepository.store(insertedUser.id, category.id);
                            yield this.processinfluencerTweets(insertedUser.id, user, influencerTweets);
                        }
                        if (fetchFriends) {
                            yield this.fetchInfluencerFriends(user, minFollowersCount, category, geocode);
                        }
                    }
                }
            }
        });
    }
    fetchInfluencerFriends(user, minFollowersCount, category, geocode) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, helpers_1.sleep)(30);
            const friends = yield this.twitterService.fetchFollowings(user.screen_name);
            const keywords = category.keywords.split(', ');
            console.log('Fetching friends', { friends: (_b = (_a = friends === null || friends === void 0 ? void 0 : friends.users) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0 });
            if (((_c = friends.users) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                friends.users.forEach((friend) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, helpers_1.sleep)();
                    yield this.handleProcessInfluencerCheck(friend, minFollowersCount, category, geocode, false);
                }));
            }
        });
    }
    // async handleFetchinfluencerTweets(username: string) {
    //     const influencerTweets = await this.twitterService.fetchinfluencerTweets(
    //         username
    //     );
    //     return influencerTweets;
    // }
    getRandomKeyword() {
        let _keywords = keywords.split(',');
        let randomKeyword = _keywords[Math.floor(Math.random() * _keywords.length)];
        console.log('New random keyword: ', randomKeyword);
        return randomKeyword;
    }
}
exports.default = TwitterExtractorMainController;
//# sourceMappingURL=TwitterExtractorMainController.js.map