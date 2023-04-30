// import pkg from 'pg';
// const { Client } = pkg;

import mysql from 'mysql2';
import bluebird from 'bluebird';
// const bluebird = require('bluebird');

class Db {

    private client: any;

    constructor() {
        // this.client = new Client({

        // this.client.config. = true;

        // this.client = this.connect();
        // this.client =
        this.connect()
    }

    async connect() {
        const pool = mysql.createPool({
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
    }

    // async endConnection() {
    //     return await this.client.end()
    // }

    async query(query: queryFormat) {

        // console.log({ query })

        try {
            // console.log({ x: await this.client });
            const [rows, fields] = await this.client.execute(query.text, query.values);


            // const [rows, fields] = await client.query('SELECT * FROM `categories`', ['Morty', 14]);

            return rows;

        } catch (e) {
            this.handleError(e);

            return [];
        }
    }

    async handleError(error: any) {
        console.log('An error occured: ', error.stack);
    }
}


interface queryFormat {
    // name?: string;
    text: string;
    values?: any;
}

export default Db;