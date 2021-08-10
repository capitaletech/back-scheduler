import cors from "cors";
import http from 'http';
import createExpressApp from './components/express';
import logger from './components/logger';
import {Express, NextFunction, Request, Response} from "express";
import {MeetingsRouter} from "./routes/MeetingsRouter";
import MeetingRepository from "./repositories/meeting.repository";
import Database from "./db/sequelize";


export default class App {

    private readonly host: string;
    private readonly port: number;
    private whitelist: string;
    private server: http.Server;
    private readonly express: Express;
    private meetingRepository: MeetingRepository;
    private readonly database: Database;

    constructor(conf: any) {
        this.port = conf.server.port;
        this.host = conf.server.host;
        this.whitelist = conf.whitelist;
        this.express = createExpressApp();
        this.server = http.createServer(this.express);
        this.database = new Database(conf.db);
        this.meetingRepository = new MeetingRepository(this.database);

        this.useCors();
        this.mountRoutes();
    }

    public listen(): void {
        this.server.listen(this.port, this.host, () => {
            logger.info(`server is listening on ${this.host}:${this.port}`);
        });
    }

    private mountRoutes() {
        this.express.use(
            "/api/meetings",
            new MeetingsRouter(this.meetingRepository).router
        );

        // Catch-all route. Responds 404 if the endpoint could not be found.
        this.express.use((req, res) => res.status(404).json('This endpoint does not exist'));

        this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
            logger.error(err.stack || err);
            if (res.headersSent) return next(err);
            return res.status(err.statusCode || 500).json('Something wrong happened');
        });
    }

    private useCors() {
        const allowed = this.whitelist.split(" ").join("").split(",");
        const corsOptions = {
            origin: (origin: any, callback: any) => {
                if (origin === undefined || allowed.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    logger.error("Origin not allowed by CORS = ", origin);
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true
        };
        this.express.use(cors(corsOptions));
    }

}


