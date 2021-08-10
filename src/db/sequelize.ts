import {Sequelize} from "sequelize-typescript";
import Meeting from "./models/meeting.db";
import logger from "../components/logger";

class Database {
    public database: Sequelize;
    public models: any;

    constructor(config: any) {
        if (config) {
            this.database = new Sequelize({
                host: config.host,
                port: config.port,
                database: config.database,
                dialect: config.dialect,
                username: config.username,
                password: config.password,
                ssl: config.ssl,
                logging: false,
            });
            this.models = {
                Meeting,
            };
            this.database.addModels([Meeting]);
        } else {
            throw Error("Please configure your database");
        }
    }

    async testConnection() {
        try {
            await this.database.authenticate();
            logger.info('Connection has been established successfully.');
        } catch (error) {
            logger.error('Unable to connect to the database:', error);
        }
    }
}

export default Database;
