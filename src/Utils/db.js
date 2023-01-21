import pkg from 'pg';
const { Client } = pkg;

class Db {

    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'viralget',
            password: 'postgrespw',
            port: 55000,
        });

        this.connect();
    }

    async connect() {
        return await this.client.connect()
    }

    async endConnection() {
        return await this.client.end()
    }

    async query(query) {

        try {
            const res = await this.client.query(query);

            this.endConnection();

            return res.rows;
        } catch (e) {
            this.handleError(e);

            return false;
        }
    }

    async handleError(error) {
        console.log(err.stack);
    }
}

export default Db;