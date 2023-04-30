import { runCode } from "..";
import Db from "../Utils/db";
import { sleep } from "../Utils/helpers";
import TwitterService from "../Services/TwitterService";
import TwitterInfluencerMetricsExtractor from "./TwitterInfluencerMetricsExtractor";

const searchLocation = 'Nigeria';

let keywords = "artwork, art, painting, illustration, digital art, sketch, pencil artist, pencil sketch, pencil on paper, graphite, metal sculpture, wooden sculpture, illustrator, digital artist, graffitti, surrealism, graphic artist, pencil, charcoal, acrylic, canvas, pencils on paper, oil painting, acrylic on canvas, acrylic painting, abstract, art exhibition, pastel paintings, pastel, contemporary art, oil on canvas, portrait, abstract art, drawing, actor, actress, onset, main character, movie, film, actors life, acting, producer, filmmaker, cast, trailer, director, directed by, premiere, thespian, produced, shortfilm, filmmaking, actors, webseries, tvseries, character, commercial model, episode, showing on, screens, starring, cinemas, cinema, production, beauty, makeup, skincare, hydration, cosmetics, skin care routine, mua, skin, glowing, toning, moisturizer, sunscreen, toner, beauty care, beautytips, beauty products, hair, looks, facial, makeup artist, haircare, nails, oil, cleansing, glossier, fragrance, lipstick, beauty basics, glam, brows, organic, skincare tips, blog, news, news & media, gossip, 247 updates, breaking news, trending, viral, news update, lastest news, gossip blog, latest gist, instagram blog, gist, entertainment, viral posts, trending update, funny, comedy, comedian, humor, comedy video, haha, lol, lmao, comedienne, laugh, laughing, live on stage, 😆, standup comedian, standup comedy, laughter, standup, stand up, phone, iphone, smartphone, gadget store, gadgets, accessories, android, apple, samsung, gadget, computer, pc, laptop, pc gaming, gaming pc, electronics, computer graphics, computer accessories, computer hardware, computer world, phones, computers, laptops, uk used, bitcoin, cryptocurrency, blockchain, ethereum, btc, crypto, cryptotrading, nft, altcoins, cryptotrade, bitcoin trading, dogecoin, bitcoinp rice, nfts, trade crypto, crypt orader, crypto market, blockchain technology, bnb, bitcoin mining, altcoin, cryptoworld, crypto news, crypto exchange, dancer, choreographer, choreography, dancing, dance teacher, dancers, hiphop, ballet, dance challenge, song, dance video, ballerina, choreo, dance class, dance classes,  ";

keywords += "education summit, education, education strategist, business coach, education leadership, leadership coach, learning, school, study, teacher, student, education matters, online learning, business, study abroad, scholar entrepreneur coach, sme, scholarship, literacy, edutech, university, courses, elearning, classroom, school counseling, school counselor, edchat, style, fashion, model, fashion blogger, fashion style, fashionista, instafashion, photoshoot, dress, fashionable, fashiongram, fashion blog, fashion diaries, fashion nova, fashion stylist, fashion girl, fashion illustration, fashion photographer, fashion trends, fashions, fashion look, fashion inspiration, fashion bag, fashion editorial, fashion men, fashion magazine, fashion diaries, fashion week, fashion designer, fashion post, fashion lover, fashion kids, fashion show, fashion model, fashion inspo, fashion design, fashion daily, motherhood, parenting, momlife, family, fatherhood, tips parenting, parenting life, toddler life, family time, home schooling, children, mom blogger, parent life, preschool, parenting hacks, kids, family, parenting tips, parent, toddlers, positive parenting, parenting goals, parenting blog, parenting advice, parenting quotes, parenting memes, parenting101, parenting humor, parenting hacks, parenting advice, parenting problems, family first, family photo, family goals, family fun, family trip, family life, family vacation, family dinner, family holiday, family pic, family adventures, family time, food blogger, recipes, food, breakfast, foodie, delicious, homemade, foodlover, healthy food, restaurant, cooking, lunch, chef, dessert, eat, yummy, foodblog, dinner, cake, chocolate, foodstagram, food diary, wine, meal, dish, drink, cookery, fast food, fine dining, cuisine, tech news, coding, computer science, programming, software, programmer, python, developer, code, java, coder, tech tips, yoga, meditation, yoga junkie, yoga goals, yoga practice, yoga body, yoga inspiration, yoga life, mindfulness, yoga teacher, yoga love, yoga everyday, wellness, yoga girl, yoga pose, yoga poses, yoga journey, yoga pants, yoga daily, yogagram, yoga addict, yogafit, yogafun, yogamom, yoga flow, instayoga, yoga fitness, yoga at home, yoga vibes, yoga therapy, yoga family, yoga girls, yoga journal, yogaart, yoga inspiration, yoga love, yoga practice,"




export default class TwitterExtractorMainController {

    private twitterService;
    private db;
    private runCount: number = 0;

    constructor() {
        this.twitterService = new TwitterService;

        this.db = new Db;
    }

    async handleFetchUserTweets(username: string) {

        // const id = 'misteryomi';
        const userTweets = await this.twitterService.fetchUserTweets(
            //The ID of the User to list Tweets of
            username
        );

        return userTweets;
    }


    async processUserTweets(user: any, userTweets: any) {
        // if (userTweets?.length > 0) {
        //     userTweets.map((tweet: any) => {
        //         sleep(5000);
        //         // this.storeTweet(tweet, tweet.user.id)

        //     });
        // }

        let metricsExtractor = new TwitterInfluencerMetricsExtractor(user, userTweets);

        metricsExtractor.extract();
    }

    async checkUserQualifiesAsInfluencer(userTweets: any, category: any) {
        // console.log({ category })
        const keywords = category.keywords.split(', ');

        const qualifiedTweets: string[] = [];

        // console.log({ userTweets: userTweets.length })
        if (userTweets?.length > 0) {
            userTweets.forEach((tweet: any) => {
                keywords.forEach((keyword: string) => {
                    // console.log({ keyword, tweet })
                    if (tweet.text.includes(keyword) || tweet.text.includes(keyword.replace(' ', ''))) {
                        qualifiedTweets.push(tweet);
                    }
                });
            });
        }

        // console.log({ qualifiedTweets: qualifiedTweets.length })
        return ((qualifiedTweets.length / userTweets.length) * 100) > 30;
    }

    async handleFetchInfluencers(keyword: string, category: any, geocode: string = '9.0820,8.6753,1000000km', minFollowersCount: number = 1000, nextResultsUrl?: string) {


        console.log('Keyword: ', keyword, 'runcount:', this.runCount);


        const response = await this.twitterService.fetchTweets(keyword, geocode, nextResultsUrl,);

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


    async handleProcessInfluencerCheck(user: any, minFollowersCount: number, category: any, geocode: string, fetchFriends = true) {
        if (user.followers_count >= minFollowersCount) {
            // Fetch user tweets
            const userTweets = await this.handleFetchUserTweets(user.screen_name);

            const keywords = category.keywords.split(', ');

            // if (user.description.includes(keyword)) {


            if (keywords.some((v: any) => user.description.includes(v))) {
                console.log({ fetchFriends, user: user.screen_name })
                // TODO: Also check if the keyword is in the bio.
                // ALSO:: Check handle
                console.log("Bio FILTERED:", { user: user.screen_name })

                await this.storeTweetUser(user, category.id, geocode);

                if (fetchFriends) {
                    await this.fetchInfluencerFriends(user, minFollowersCount, category, geocode);
                }

                sleep()
                // // TODO: Store tweet as well.
                // this.storeTweet(tweet, user.id)

                await this.processUserTweets(user, userTweets);

            } else {

                const userQualifiesAsInfluencer = await this.checkUserQualifiesAsInfluencer(userTweets, category);

                if (userQualifiesAsInfluencer) {

                    await this.storeTweetUser(user, category.id, geocode);

                    if (fetchFriends) {
                        await this.fetchInfluencerFriends(user, minFollowersCount, category, geocode);
                    }

                    await sleep();
                    // this.storeTweet(tweet, user.id)
                    await this.processUserTweets(user, userTweets);
                }

            }

        }

    }

    async fetchInfluencerFriends(user: any, minFollowersCount: number, category: any, geocode: string) {
        sleep(30);

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


    async storeTweetUser(tweetUser: any, category: string, geocode: string) {

        try {
            // const user = 

            const userExists = await this.checkTweetUser(tweetUser.id);
            const username = tweetUser.screen_name;

            if (userExists) {
                // Update
                console.log('User exists', { username })

            } else {

                // Get user profile data from twitter v2
                this.twitterService.fetchV2User(tweetUser.id);

                console.log('User does not exist', { username })

                const { id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url, url, created_at } = tweetUser

                console.log({ id, screen_name, name, location, description, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url, url, created_at })
                const query = {
                    text: `INSERT IGNORE INTO twitter_influencers SET twitter_id = ?, username = ?, full_name = ?, location = ?, bio = ?, is_protected = ?, followers_count = ?, following_count = ?, is_verified = ?,  profile_photo_url = ?, profile_banner_url = ?, account_created_on = ?, geocode = ?`,
                    values: [id.toString(), screen_name, name, location ?? searchLocation, description, tweetUser.protected, followers_count, friends_count, verified, profile_image_url_https, profile_banner_url ?? profile_image_url_https, created_at, geocode],
                }
                const user = await this.db.query(query);

                // console.log({user})
                await this.storeTweetUserCategory(tweetUser.id, category);
            }



            // return response.length > 0;
            // }
        } catch (e) {
            console.log({ e })
            return false;
        }


    }

    async storeTweetUserCategory(tweetUserId: string, categoryId: string) {

        try {
            // const userExists = await this.checkTweetUser(tweetUser.id);

            // console.log({ tweetUser, category })
            // if (userExists) {
            //     // Update
            //     console.log('User exists', { username: tweetUser.screen_name })

            // } else {
            //     console.log('User does not exist', { username: tweetUser.screen_name })


            const query = {
                text: `INSERT IGNORE INTO influencer_categories SET influencer_id = ?, platform_id = ?, category_id = ?`,
                values: [tweetUserId, 1, categoryId],
            }

            await this.db.query(query);

            // }
        } catch (e) {
            console.log({ e })
            return false;
        }


    }

    async storeTweet(tweet: any, twitterUserId: string) {

        try {
            // const tweetExists = await this.checkTweet(tweet.id, twitterUserId);

            // console.log({ tweetExists });
            // if (tweetExists) {
            //     // Update
            //     console.log('Tweet exists', { tweetExists })

            // } else {
            // console.log('Twet does not exist', { userExists, tweetUser })

            const { id, text, geo, retweet_count, favorite_count, created_at } = tweet


            const query = {
                text: `INSERT IGNORE INTO twitter_posts SET tweet_id=?, user_id=?, text=?, location=?, retweet_count=?, favorite_count=?, tweet_created_at=?`,
                values: [id, twitterUserId, text, geo ?? searchLocation, retweet_count, favorite_count, created_at],
            }

            await this.db.query(query);

            // }
        } catch (e) {
            console.log('store tweet', { e })
            return false;
        }


    }


    async checkTweetUser(id: string) {

        try {
            const query = {
                text: `SELECT * from twitter_influencers WHERE twitter_id = ?`,
                values: [id],
            }

            const result = await this.db.query(query);

            // console.log({ result })
            return result[0];

        } catch (e) {
            console.log({ e })

            return false;
        }
    }


    async checkTweet(tweetId: string, twitterUserId: string) {

        try {
            const query = {
                text: `SELECT * from twitter_posts WHERE tweet_id = ?`,
                values: [tweetId],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log('check tweet', { e })
            return false;
        }
    }


    async findKeywordCategory(keyword: string) {

        try {
            const query = {
                text: `SELECT * from categories WHERE CONCAT(',', keywords, ',') like ? LIMIT 1`,
                values: ["%," + keyword + ",%"],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log('Find keyword error', { e })
            return false;
        }
    }


    async findKeywordCategoryByID(id: number) {

        try {
            const query = {
                text: `SELECT * from categories WHERE id = ? LIMIT 1`,
                values: [id],
            }

            const result = await this.db.query(query);

            return result;

        } catch (e) {
            console.log('Find keyword error', { e })
            return false;
        }
    }



    getRandomKeyword() {

        let _keywords = keywords.split(',');

        let randomKeyword = _keywords[Math.floor(Math.random() * _keywords.length)];

        console.log('New random keyword: ', randomKeyword)
        return randomKeyword;
    }



    // async processCategoriesUpdate() {

    //     try {

    //         let query = {
    //             text: `SELECT * from twitter_influencers`,
    //         }

    //         const result = await this.db.query(query);
    //         // console.log({ result })


    //         result.forEach(async (influencer: any) => {
    //             let q = {
    //                 text: `INSERT IGNORE INTO influencer_categories SET influencer_id = ?, platform_id = ?, category_id = ?`,
    //                 values: [influencer.id, 1, influencer.category_id],
    //             }

    //             await this.db.query(q);
    //         });




    //         // const userExists = await this.checkTweetUser(tweetUser.id);

    //         // console.log({ tweetUser, category })
    //         // if (userExists) {
    //         //     // Update
    //         //     console.log('User exists', { username: tweetUser.screen_name })

    //         // } else {
    //         //     console.log('User does not exist', { username: tweetUser.screen_name })




    //         // }
    //     } catch (e) {
    //         console.log({ e })
    //         return false;
    //     }


    // }


}