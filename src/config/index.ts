import 'dotenv/config';
import log from './logger.config';

export default {
    db: {
        database: process.env.DB_DATABASE || "schedule",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "root",
        dialect: process.env.DB_DIALECT || "postgres",
        ssl: process.env.DB_SSL || false,
        dialectOptions: {ssl: process.env.DB_SSL || false}
    },
    server: {
        host: process.env.SERVER_HOST || "http://localhost",
        port: process.env.SERVER_PORT || 8080,
    },
    whitelist: process.env.WHITELIST || "https://localhost:3000",
    scheduler: {
        lunchTime: process.env.LUNCH_TIME || "13,14"
    },
    log
};
