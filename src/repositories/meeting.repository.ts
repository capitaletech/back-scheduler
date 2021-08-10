import logger from '../components/logger';
import {IMeeting} from "../models/meeting";
import Database from "../db/sequelize";

export default class MeetingRepository {

    constructor(private db: Database) {
    }

    async getMeetings(): Promise<IMeeting[]> {
        try {
            return await this.db.models.Meeting.findAll();
        } catch (err) {
            logger.error(err);
            throw new Error("Couldn't get meetings");
        }
    }

    async getMeeting(id: number): Promise<IMeeting | null> {
        try {
            return await this.db.models.Meeting.findOne({
                where: {
                    id,
                },
            });
        } catch (err) {
            logger.error(err);
            throw new Error(`Couldn't get the meeting '${id}'`);
        }
    }

    async addMeeting(body: IMeeting): Promise<string> {
        try {
            const response = await this.db.models.Meeting.create(body);
            return response.id;
        } catch (err) {
            logger.error(err);
            throw new Error("Couldn't add the meeting");
        }
    }

    async removeMeeting(id: number): Promise<number> {
        try {
            return await this.db.models.Meeting.destroy({
                where: {
                    id,
                },
            });
        } catch (err) {
            logger.error(err);
            throw new Error(`Couldn't remove the meeting ${id}`);
        }
    }

    async updateMeeting(id: number, body: IMeeting): Promise<[number, IMeeting[]]> {
        try {
            return await this.db.models.Meeting.update(body, {where: {id}});
        } catch (err) {
            logger.error(err);
            throw new Error(`Couldn't update the meeting ${id}`);
        }
    }
}
