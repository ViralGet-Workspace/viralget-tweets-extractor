// import { runCode } from "..";
import Db from "../Utils/db";
import { sleep } from "../Utils/helpers";
import TwitterService from "../Services/TwitterService";
import TwitterInfluencerMetricsExtractor from "../Helpers/TwitterInfluencerMetricsExtractor";
import TweetRepository from "../models/TweetRepository";
import MetricsRepository from "../models/MetricsRepository";
import CategoryRepository from "../models/CategoryRepository";
import InfluencerRepository from "../models/InfluencerRepository";
import LoggerHelper from "../Helpers/LoggerHelper";
import TwitterKeywordsMetricsExtractor from "../Helpers/TwitterKeywordsMetricsExtractor";

interface DaterInterface {
    tweets: string[],
    users: string[],
    media: string[]
}
const searchLocation = 'Nigeria';

let keywords = "artwork, art, painting, illustration, digital art, sketch, pencil artist, pencil sketch, pencil on paper, graphite, metal sculpture, wooden sculpture, illustrator, digital artist, graffitti, surrealism, graphic artist, pencil, charcoal, acrylic, canvas, pencils on paper, oil painting, acrylic on canvas, acrylic painting, abstract, art exhibition, pastel paintings, pastel, contemporary art, oil on canvas, portrait, abstract art, drawing, actor, actress, onset, main character, movie, film, actors life, acting, producer, filmmaker, cast, trailer, director, directed by, premiere, thespian, produced, shortfilm, filmmaking, actors, webseries, tvseries, character, commercial model, episode, showing on, screens, starring, cinemas, cinema, production, beauty, makeup, skincare, hydration, cosmetics, skin care routine, mua, skin, glowing, toning, moisturizer, sunscreen, toner, beauty care, beautytips, beauty products, hair, looks, facial, makeup artist, haircare, nails, oil, cleansing, glossier, fragrance, lipstick, beauty basics, glam, brows, organic, skincare tips, blog, news, news & media, gossip, 247 updates, breaking news, trending, viral, news update, lastest news, gossip blog, latest gist, instagram blog, gist, entertainment, viral posts, trending update, funny, comedy, comedian, humor, comedy video, haha, lol, lmao, comedienne, laugh, laughing, live on stage, 😆, standup comedian, standup comedy, laughter, standup, stand up, phone, iphone, smartphone, gadget store, gadgets, accessories, android, apple, samsung, gadget, computer, pc, laptop, pc gaming, gaming pc, electronics, computer graphics, computer accessories, computer hardware, computer world, phones, computers, laptops, uk used, bitcoin, cryptocurrency, blockchain, ethereum, btc, crypto, cryptotrading, nft, altcoins, cryptotrade, bitcoin trading, dogecoin, bitcoinp rice, nfts, trade crypto, crypt orader, crypto market, blockchain technology, bnb, bitcoin mining, altcoin, cryptoworld, crypto news, crypto exchange, dancer, choreographer, choreography, dancing, dance teacher, dancers, hiphop, ballet, dance challenge, song, dance video, ballerina, choreo, dance class, dance classes,  ";

keywords += "education summit, education, education strategist, business coach, education leadership, leadership coach, learning, school, study, teacher, student, education matters, online learning, business, study abroad, scholar entrepreneur coach, sme, scholarship, literacy, edutech, university, courses, elearning, classroom, school counseling, school counselor, edchat, style, fashion, model, fashion blogger, fashion style, fashionista, instafashion, photoshoot, dress, fashionable, fashiongram, fashion blog, fashion diaries, fashion nova, fashion stylist, fashion girl, fashion illustration, fashion photographer, fashion trends, fashions, fashion look, fashion inspiration, fashion bag, fashion editorial, fashion men, fashion magazine, fashion diaries, fashion week, fashion designer, fashion post, fashion lover, fashion kids, fashion show, fashion model, fashion inspo, fashion design, fashion daily, motherhood, parenting, momlife, family, fatherhood, tips parenting, parenting life, toddler life, family time, home schooling, children, mom blogger, parent life, preschool, parenting hacks, kids, family, parenting tips, parent, toddlers, positive parenting, parenting goals, parenting blog, parenting advice, parenting quotes, parenting memes, parenting101, parenting humor, parenting hacks, parenting advice, parenting problems, family first, family photo, family goals, family fun, family trip, family life, family vacation, family dinner, family holiday, family pic, family adventures, family time, food blogger, recipes, food, breakfast, foodie, delicious, homemade, foodlover, healthy food, restaurant, cooking, lunch, chef, dessert, eat, yummy, foodblog, dinner, cake, chocolate, foodstagram, food diary, wine, meal, dish, drink, cookery, fast food, fine dining, cuisine, tech news, coding, computer science, programming, software, programmer, python, developer, code, java, coder, tech tips, yoga, meditation, yoga junkie, yoga goals, yoga practice, yoga body, yoga inspiration, yoga life, mindfulness, yoga teacher, yoga love, yoga everyday, wellness, yoga girl, yoga pose, yoga poses, yoga journey, yoga pants, yoga daily, yogagram, yoga addict, yogafit, yogafun, yogamom, yoga flow, instayoga, yoga fitness, yoga at home, yoga vibes, yoga therapy, yoga family, yoga girls, yoga journal, yogaart, yoga inspiration, yoga love, yoga practice,"


export default class TwitterKeywordsExtractorMainController {

    private twitterService;
    private logger;
    private influencerRepository;
    private metricsRepository;
    private tweetRepository;
    private categoryRepository;
    private runCount: number = 0;
    private minFollowersCount: number = 1000;
    private defaultGeocode: string = '9.0066472,3.3689801';

    constructor() {
        this.twitterService = new TwitterService;
        this.influencerRepository = new InfluencerRepository;
        this.tweetRepository = new TweetRepository;
        this.metricsRepository = new MetricsRepository;
        this.categoryRepository = new CategoryRepository;
        this.logger = new LoggerHelper;
    }



    async extractKeyword(keyword: string) {

        try {
            const data = await this.fetchByKeyword(keyword);

            if (!data) {
                throw new Error("No tweet found");
            }

            // this.logger.debug({ tweets: data.length, })

            let metricsExtractor = new TwitterKeywordsMetricsExtractor(data);


            const extractedData = await metricsExtractor.extract();

            // return { "impressions": { "value": 2, "growth": 0.1 }, "reach": { "value": "1", "growth": -0.1 }, "engagement_increase": { "value": 0, "growth": 0 }, "campaign_score": { "value": 0, "growth": 0 }, "engagement_rate": { "value": "0.24", "growth": 0 }, "total_likes": { "value": 0, "growth": 0.5 }, "total_replies": { "value": 0, "growth": 0 }, "total_retweets": { "value": 0, "growth": 0 }, "media_tweets": { "value": 0, "growth": 0 }, "link_tweets": { "value": 0, "growth": 0 }, "text_tweets": { "value": 0, "growth": 0 }, "no_of_contributors": 0, "original_contributors": 0, "average_tweet_per_contributor": 0, "average_follower_per_contributor": 0, "top_contributors": [{ "username": "@Dlaureate", "name": "Demo name", "value": 10 }], "best_performing_contributors": [{ "username": "@Dlaureate", "name": "Demo name", "value": 10 }], "most_active": [{ "username": "@Dlaureate", "name": "Demo name", "value": 10 }], "original_tweets": [{ "username": "@Dlaureate", "name": "Demo name", "value": 10 }], "retweeters": [{ "username": "@Dlaureate", "name": "Demo name", "value": 10 }], "tweets_count": 0, "recent_tweets": [{ "text": "Top #Farming pools for today 🔝\n\n💸 $TND / $WETH — 3,536.45%\n💸 $WOM / $USDT — 3,709.17%\n💸 $WINR / $USDC — 3,513.38%\n\n[2d2c11]\nFarm profitable pairs 👉 https://t.co/UzwOks4BVZ #swaprum #Arbitrum #DeFi #ARB #SAPR", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @CerveauxNon: 🔴 QUAND LE FOND MARIANNE FINANCE L'EXTRÊME DROITE.\n\nLe scandale sur le #FondMarianne continue. @Mediapart révèle que le fo…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @AunindyoC: B/w 2016-17 &amp; 2019-20, Karnataka got 2.2% of the total Budget of the Centre.\n\nThanks to the 15th finance commission, the sta…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @Swaprum: 🚀Discover DeFi's power with SAPR &amp; ARB, the top staking pair! \nEarn up to 5 $ARB daily with @Swaprum. \nMore rewards? Invite yo…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "🤑 Join the best Yield #Farming pools and earn high APR:\n\n💰 $SAPR / $WETH – 1,267% APR\n💰 $USDC / $USDT – 330.26% APR\n💰 $USDT / $WETH – 769% APR\n💰 $ARB / $WETH – 826% APR\n\n[f3133f]\nTry it right now 👉 https://t.co/TSOhQ95X1X #swaprum #Arbitrum #DeFi #ARB #SAPR #Dex", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }], "replies_to_tweets": [{ "text": "Top #Farming pools for today 🔝\n\n💸 $TND / $WETH — 3,536.45%\n💸 $WOM / $USDT — 3,709.17%\n💸 $WINR / $USDC — 3,513.38%\n\n[2d2c11]\nFarm profitable pairs 👉 https://t.co/UzwOks4BVZ #swaprum #Arbitrum #DeFi #ARB #SAPR", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @CerveauxNon: 🔴 QUAND LE FOND MARIANNE FINANCE L'EXTRÊME DROITE.\n\nLe scandale sur le #FondMarianne continue. @Mediapart révèle que le fo…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @AunindyoC: B/w 2016-17 &amp; 2019-20, Karnataka got 2.2% of the total Budget of the Centre.\n\nThanks to the 15th finance commission, the sta…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @Swaprum: 🚀Discover DeFi's power with SAPR &amp; ARB, the top staking pair! \nEarn up to 5 $ARB daily with @Swaprum. \nMore rewards? Invite yo…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "🤑 Join the best Yield #Farming pools and earn high APR:\n\n💰 $SAPR / $WETH – 1,267% APR\n💰 $USDC / $USDT – 330.26% APR\n💰 $USDT / $WETH – 769% APR\n💰 $ARB / $WETH – 826% APR\n\n[f3133f]\nTry it right now 👉 https://t.co/TSOhQ95X1X #swaprum #Arbitrum #DeFi #ARB #SAPR #Dex", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }], "best_performing_tweets": [{ "text": "Top #Farming pools for today 🔝\n\n💸 $TND / $WETH — 3,536.45%\n💸 $WOM / $USDT — 3,709.17%\n💸 $WINR / $USDC — 3,513.38%\n\n[2d2c11]\nFarm profitable pairs 👉 https://t.co/UzwOks4BVZ #swaprum #Arbitrum #DeFi #ARB #SAPR", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @CerveauxNon: 🔴 QUAND LE FOND MARIANNE FINANCE L'EXTRÊME DROITE.\n\nLe scandale sur le #FondMarianne continue. @Mediapart révèle que le fo…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @AunindyoC: B/w 2016-17 &amp; 2019-20, Karnataka got 2.2% of the total Budget of the Centre.\n\nThanks to the 15th finance commission, the sta…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @Swaprum: 🚀Discover DeFi's power with SAPR &amp; ARB, the top staking pair! \nEarn up to 5 $ARB daily with @Swaprum. \nMore rewards? Invite yo…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "🤑 Join the best Yield #Farming pools and earn high APR:\n\n💰 $SAPR / $WETH – 1,267% APR\n💰 $USDC / $USDT – 330.26% APR\n💰 $USDT / $WETH – 769% APR\n💰 $ARB / $WETH – 826% APR\n\n[f3133f]\nTry it right now 👉 https://t.co/TSOhQ95X1X #swaprum #Arbitrum #DeFi #ARB #SAPR #Dex", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }], "best_performing_videos": [{ "text": "Top #Farming pools for today 🔝\n\n💸 $TND / $WETH — 3,536.45%\n💸 $WOM / $USDT — 3,709.17%\n💸 $WINR / $USDC — 3,513.38%\n\n[2d2c11]\nFarm profitable pairs 👉 https://t.co/UzwOks4BVZ #swaprum #Arbitrum #DeFi #ARB #SAPR", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @CerveauxNon: 🔴 QUAND LE FOND MARIANNE FINANCE L'EXTRÊME DROITE.\n\nLe scandale sur le #FondMarianne continue. @Mediapart révèle que le fo…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @AunindyoC: B/w 2016-17 &amp; 2019-20, Karnataka got 2.2% of the total Budget of the Centre.\n\nThanks to the 15th finance commission, the sta…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "RT @Swaprum: 🚀Discover DeFi's power with SAPR &amp; ARB, the top staking pair! \nEarn up to 5 $ARB daily with @Swaprum. \nMore rewards? Invite yo…", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }, { "text": "🤑 Join the best Yield #Farming pools and earn high APR:\n\n💰 $SAPR / $WETH – 1,267% APR\n💰 $USDC / $USDT – 330.26% APR\n💰 $USDT / $WETH – 769% APR\n💰 $ARB / $WETH – 826% APR\n\n[f3133f]\nTry it right now 👉 https://t.co/TSOhQ95X1X #swaprum #Arbitrum #DeFi #ARB #SAPR #Dex", "created_at": "May 02", "likes_count": 0, "replies_count": 0, "quotes_count": 0 }] }


            return {
                impressions: {
                    value: extractedData.impressions,
                    growth: 0
                },
                reach: {
                    value: extractedData.reach,
                    growth: 0
                },
                engagement_rate: {
                    value: extractedData.engagement_rate,
                    growth: 0
                },
                engagements: {
                    value: extractedData.engagements,
                    growth: 0
                },
                campaign_score: {
                    value: extractedData.campaign_value,
                    growth: 0
                },
                total_likes: {
                    value: extractedData.total_likes,
                    growth: 0
                },
                total_replies: {
                    value: extractedData.total_replies,
                    growth: 0
                },
                total_retweets: {
                    value: extractedData.total_retweets,
                    growth: 0
                },
                media_tweets: {
                    value: extractedData.media_tweets,
                    growth: 0
                },
                link_tweets: {
                    value: extractedData.link_tweets,
                    growth: 0
                },
                text_tweets: {
                    value: extractedData.text_tweets,
                    growth: 0
                },
                no_of_contributors: extractedData.no_of_contributors,
                original_contributors: extractedData.original_contributors,
                average_tweet_per_contributor: extractedData.average_tweet_per_contributor,
                average_follower_per_contributor: extractedData.average_follower_per_contributor,
                top_contributors: extractedData.top_contributors,
                best_performing_contributors: extractedData.best_performing_contributors,
                most_active: extractedData.most_active,
                original_tweets: extractedData.original_tweets,
                retweeters: extractedData.retweeters,
                tweets_count: extractedData.tweets_count,
                recent_tweets: extractedData.recent_tweets,
                replies_to_tweets: extractedData.replies_to_tweets,
                best_performing_tweets: extractedData.best_performing_tweets,
                best_performing_videos: extractedData.best_performing_videos,
            }
            // tweeets.
            // this.twitterService.extractKeyword(keyword);
        } catch (e: any) {
            this.logger.debug('An error occured' + e.message + e.stack);

            return []
        }
    }


    async fetchByKeyword(keyword: string, data: any = {}, next_token: string | null = null): Promise<any> {

        this.runCount += 1;

        const response = await this.twitterService.fetchV2Tweets(keyword, next_token);

        // this.logger.debug(JSON.stringify(response))
        // console.log({ length: tweets.length, data: response.data })

        if (!response || !response.data || !response?.meta?.next_token || this.runCount >= 2) {
            this.logger.debug('keyword: ' + keyword + ' No more results found.');

            return data;
        }

        let { tweets = [], users = [], media = [] } = data;

        // console.log({ d: response.data });
        tweets = [...tweets, ...response.data];
        users = [...users, ...response?.includes.users ?? []];
        media = [...media, ...response?.includes.media ?? []];

        data = { tweets, users, media }

        this.logger.debug(`Run count: ${this.runCount}. Tweets count: ${data.tweets.length}`);

        await sleep();
        // run again tillt there's no more 
        return await this.fetchByKeyword(keyword, data, response.meta.next_token);
    }


    async fetchAllRecords(keyword: string) {

    }


}