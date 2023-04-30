import Db from "../Utils/db";

export default class BaseRepository {

    protected db;

    constructor() {
        this.db = new Db;
    }

}