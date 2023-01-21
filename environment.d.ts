declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            TWITTER_BEARER_TOKEN: string;
            DB_USER: string;
            DB_HOST: string;
            DB_NAME: string;
            DB_PASSWORD: string;
            DB_PORT: number;
        }
    }
}

export { }
