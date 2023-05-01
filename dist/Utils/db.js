"use strict";
// import pkg from 'pg';
// const { Client } = pkg;
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
const mysql2_1 = __importDefault(require("mysql2"));
// const bluebird = require('bluebird');
class Db {
    constructor() {
        // this.client = new Client({
        // this.client.config. = true;
        // this.client = this.connect();
        // this.client =
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = mysql2_1.default.createPool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0,
                // Promise: bluebird,
                // rowsAsArray: true
            });
            this.client = pool.promise();
            // return await mysql.createConnection({
            //     user: process.env.DB_USER,
            //     host: process.env.DB_HOST,
            //     database: process.env.DB_NAME,
            //     password: process.env.DB_PASSWORD,
            //     port: process.env.DB_PORT,
            //     Promise: bluebird,
            // });
            // return await this.client.connect()
        });
    }
    // async endConnection() {
    //     return await this.client.end()
    // }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log({ query })
            try {
                // console.log({ x: await this.client });
                const [rows, fields] = yield this.client.execute(query.text, query.values);
                // console.log({ rows })
                // const [rows, fields] = await client.query('SELECT * FROM `categories`', ['Morty', 14]);
                return rows;
            }
            catch (e) {
                this.handleError(e);
                return [];
            }
        });
    }
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('An error occured: ', error.stack);
        });
    }
}
exports.default = Db;
//# sourceMappingURL=db.js.map