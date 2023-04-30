import { runCode } from "..";
import Db from "../Utils/db";
import { sleep } from "../Utils/helpers";
import TwitterService from "../Services/TwitterService";
import TwitterInfluencerMetricsExtractor from "../Helpers/TwitterInfluencerMetricsExtractor";
import UserRepository from "../models/InfluencerRepository";
import TweetRepository from "../models/TweetRepository";
import MetricsRepository from "../models/MetricsRepository";
import CategoryRepository from "../models/CategoryRepository";

const searchLocation = 'Nigeria';

let keywords = "artwork, art, painting, illustration, digital art, sketch, pencil artist, pencil sketch, pencil on paper, graphite, metal sculpture, wooden sculpture, illustrator, digital artist, graffitti, surrealism, graphic artist, pencil, charcoal, acrylic, canvas, pencils on paper, oil painting, acrylic on canvas, acrylic painting, abstract, art exhibition, pastel paintings, pastel, contemporary art, oil on canvas, portrait, abstract art, drawing, actor, actress, onset, main character, movie, film, actors life, acting, producer, filmmaker, cast, trailer, director, directed by, premiere, thespian, produced, shortfilm, filmmaking, actors, webseries, tvseries, character, commercial model, episode, showing on, screens, starring, cinemas, cinema, production, beauty, makeup, skincare, hydration, cosmetics, skin care routine, mua, skin, glowing, toning, moisturizer, sunscreen, toner, beauty care, beautytips, beauty products, hair, looks, facial, makeup artist, haircare, nails, oil, cleansing, glossier, fragrance, lipstick, beauty basics, glam, brows, organic, skincare tips, blog, news, news & media, gossip, 247 updates, breaking news, trending, viral, news update, lastest news, gossip blog, latest gist, instagram blog, gist, entertainment, viral posts, trending update, funny, comedy, comedian, humor, comedy video, haha, lol, lmao, comedienne, laugh, laughing, live on stage, 😆, standup comedian, standup comedy, laughter, standup, stand up, phone, iphone, smartphone, gadget store, gadgets, accessories, android, apple, samsung, gadget, computer, pc, laptop, pc gaming, gaming pc, electronics, computer graphics, computer accessories, computer hardware, computer world, phones, computers, laptops, uk used, bitcoin, cryptocurrency, blockchain, ethereum, btc, crypto, cryptotrading, nft, altcoins, cryptotrade, bitcoin trading, dogecoin, bitcoinp rice, nfts, trade crypto, crypt orader, crypto market, blockchain technology, bnb, bitcoin mining, altcoin, cryptoworld, crypto news, crypto exchange, dancer, choreographer, choreography, dancing, dance teacher, dancers, hiphop, ballet, dance challenge, song, dance video, ballerina, choreo, dance class, dance classes,  ";

keywords += "education summit, education, education strategist, business coach, education leadership, leadership coach, learning, school, study, teacher, student, education matters, online learning, business, study abroad, scholar entrepreneur coach, sme, scholarship, literacy, edutech, university, courses, elearning, classroom, school counseling, school counselor, edchat, style, fashion, model, fashion blogger, fashion style, fashionista, instafashion, photoshoot, dress, fashionable, fashiongram, fashion blog, fashion diaries, fashion nova, fashion stylist, fashion girl, fashion illustration, fashion photographer, fashion trends, fashions, fashion look, fashion inspiration, fashion bag, fashion editorial, fashion men, fashion magazine, fashion diaries, fashion week, fashion designer, fashion post, fashion lover, fashion kids, fashion show, fashion model, fashion inspo, fashion design, fashion daily, motherhood, parenting, momlife, family, fatherhood, tips parenting, parenting life, toddler life, family time, home schooling, children, mom blogger, parent life, preschool, parenting hacks, kids, family, parenting tips, parent, toddlers, positive parenting, parenting goals, parenting blog, parenting advice, parenting quotes, parenting memes, parenting101, parenting humor, parenting hacks, parenting advice, parenting problems, family first, family photo, family goals, family fun, family trip, family life, family vacation, family dinner, family holiday, family pic, family adventures, family time, food blogger, recipes, food, breakfast, foodie, delicious, homemade, foodlover, healthy food, restaurant, cooking, lunch, chef, dessert, eat, yummy, foodblog, dinner, cake, chocolate, foodstagram, food diary, wine, meal, dish, drink, cookery, fast food, fine dining, cuisine, tech news, coding, computer science, programming, software, programmer, python, developer, code, java, coder, tech tips, yoga, meditation, yoga junkie, yoga goals, yoga practice, yoga body, yoga inspiration, yoga life, mindfulness, yoga teacher, yoga love, yoga everyday, wellness, yoga girl, yoga pose, yoga poses, yoga journey, yoga pants, yoga daily, yogagram, yoga addict, yogafit, yogafun, yogamom, yoga flow, instayoga, yoga fitness, yoga at home, yoga vibes, yoga therapy, yoga family, yoga girls, yoga journal, yogaart, yoga inspiration, yoga love, yoga practice,"


export default class TwitterExtractorMainController {

    private twitterService;
    // private db;
    private userRepository;
    private metricsRepository;
    private tweetRepository;
    private categoryRepository;
    private runCount: number = 0;

    constructor() {
        this.twitterService = new TwitterService;

        // this.db = new Db;

        this.userRepository = new UserRepository;
        this.tweetRepository = new TweetRepository;
        this.metricsRepository = new MetricsRepository;
        this.categoryRepository = new CategoryRepository;
    }



    async handleFetchInfluencers(keyword: string, category: any, geocode: string = '9.0820,8.6753,1000000km', minFollowersCount: number = 1000, nextResultsUrl?: string) {

        console.log('Keyword: ', keyword, 'runcount:', this.runCount);

        const response = await this.twitterService.fetchTweets(keyword, geocode, nextResultsUrl,);

        console.log({ response });
        // Store in DB after filter
        if (!response.statuses || !response.statuses.length) {
            console.log('No tweets found. Restart!!!')

            runCode();
            return false;
        }

        if (response.statuses.length == 0) {
            console.log('Terminated!!!')

            return false;
        }

        // console.log({response: response.statuses})
        for (let i = 0; i <= response.statuses.length; i++) {
            let tweet = response.statuses[i];
            // console.log({ tweet })

            if (tweet) {

                const user = tweet.user;

                this.handleProcessInfluencerCheck(user, minFollowersCount, category, geocode);
                // sleep(200000);
            }

        }

        await sleep(10000);

        if (response.search_metadata?.next_results) {
            setTimeout(() => {
                console.log('Next batch ======>>>> ', response.search_metadata?.next_result)
                // this.handleFetchInfluencers(keyword, category, geocode, response.search_metadata.next_results);
                this.runCount++;
                this.handleFetchInfluencers(keyword, category, geocode, minFollowersCount, response.search_metadata.next_results);
            }, 10000)
        } else {
            console.log('Terminated!!!')
        }
    }


    async processUserTweets(user: any, userTweets: any) {
        let metricsExtractor = new TwitterInfluencerMetricsExtractor(user, userTweets);

        let extractedData = metricsExtractor.extract();

        await this.metricsRepository.store(extractedData);
    }

    async checkUserQualifiesAsInfluencer(userTweets: any, category: any) {
        const keywords = category.keywords.split(', ');

        const qualifiedTweets: string[] = [];

        if (userTweets.data?.length > 0) {
            userTweets.data.forEach((tweet: any) => {
                keywords.forEach((keyword: string) => {
                    // console.log({ keyword, tweet })
                    if (tweet.text.includes(keyword) || tweet.text.includes(keyword.replace(' ', ''))) {
                        qualifiedTweets.push(tweet);
                    }
                });
            });
        }
        return ((qualifiedTweets.length / userTweets.length) * 100) > 30;
    }

    async handleProcessInfluencerCheck(user: any, minFollowersCount: number, category: any, geocode: string, fetchFriends = true) {
        if (user.followers_count >= minFollowersCount) {
            // Fetch user tweets
            const userTweets = await this.twitterService.fetchV2UserTweets(user.id);
            // console.log({ userTweets })

            const keywords = category.keywords.split(', ');

            // if (user.description.includes(keyword)) {


            if (keywords.some((v: any) => user.description.includes(v))) {
                console.log({ fetchFriends, user: user.screen_name })
                // TODO: Also check if the keyword is in the bio.
                // ALSO:: Check handle
                console.log("Bio FILTERED:", { user: user.screen_name })

                // Get user location using IPINFO??
                const insertedUser = await this.userRepository.store(user, category.id, geocode, searchLocation);

                if (insertedUser) {
                    await this.categoryRepository.store(insertedUser, category.id)
                }

                if (fetchFriends) {
                    await this.fetchInfluencerFriends(user, minFollowersCount, category, geocode);
                }

                await sleep()

                await this.processUserTweets(user, userTweets);

            } else {

                const userQualifiesAsInfluencer = await this.checkUserQualifiesAsInfluencer(userTweets, category);

                if (userQualifiesAsInfluencer) {

                    let insertedUser = await this.userRepository.store(user, category.id, geocode, searchLocation);

                    if (insertedUser) {
                        await this.categoryRepository.store(insertedUser.id, category.id)
                    }

                    if (fetchFriends) {
                        await this.fetchInfluencerFriends(user, minFollowersCount, category, geocode);
                    }

                    await sleep();

                    await this.processUserTweets(user, userTweets);
                }

            }

        }

    }

    async fetchInfluencerFriends(user: any, minFollowersCount: number, category: any, geocode: string) {
        await sleep(30);

        const friends = await this.twitterService.fetchFollowings(user.screen_name);
        const keywords = category.keywords.split(', ')

        console.log('Fetching friends', { friends: friends?.users?.length ?? 0 });

        if (friends.users?.length > 0) {
            friends.users.forEach(async (friend: any) => {
                sleep();
                await this.handleProcessInfluencerCheck(friend, minFollowersCount, category, geocode, false);
            });

        }
    }

    // async handleFetchUserTweets(username: string) {

    //     const userTweets = await this.twitterService.fetchUserTweets(
    //         username
    //     );

    //     return userTweets;
    // }

    getRandomKeyword() {

        let _keywords = keywords.split(',');

        let randomKeyword = _keywords[Math.floor(Math.random() * _keywords.length)];

        console.log('New random keyword: ', randomKeyword)
        return randomKeyword;
    }

}