// import pkg from 'pg';
// const { Client } = pkg;

import mysql from 'mysql2';

class Db {

    private client;

    constructor() {
        // this.client = new Client({
        this.client = mysql.createConnection({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        this.connect();
    }

    async connect() {
        return await this.client.connect()
    }

    async endConnection() {
        return await this.client.end()
    }

    async query(query: queryFormat) {

        try {
            const res = await this.client.execute(query.text, query.values);

            return res.rows;
        } catch (e) {
            this.handleError(e);

            return false;
        }
    }

    async handleError(error: any) {
        console.log('An error occured: ', error.stack);
    }
}


interface queryFormat {
    name?: string;
    text: string;
    values?: any[];
}

export default Db;