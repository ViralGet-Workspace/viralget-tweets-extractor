import MetricsRepository from "../models/MetricsRepository";
import TwitterService from "../Services/TwitterService";
import { numberFormat } from "../Utils/helpers";

export default class TwitterInfluencerMetricsExtractor {

    private likes: any;
    private quotes: any;
    private tweets: any;
    private user: any;
    private twitterService: any;

    constructor(user: any, tweets: any) {
        // this.user = user.data;
        this.user = user;
        this.tweets = tweets;

        this.extractLikes();
        this.extractQuotes();

        this.twitterService = new TwitterService;
    }


    public async extract() {

        // console.log({ data: Object.keys(data) })

    }



    private extractLikes() {

        // Get user's  followers
        // const followers =

        // const maxCount = 5;

        // let data = [];

        // const response = this.extractLikes()

    }

    private extractQuotes() {

    }


    private likesExtractor() {

    }
}