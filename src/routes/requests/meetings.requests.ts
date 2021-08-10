import {Request, Response} from "express";
import MeetingRepository from "../../repositories/meeting.repository";
import Meeting, {IMeeting} from "../../models/meeting";

export class MeetingsRequests {

    constructor(private meetingRepository: MeetingRepository) {
    }

    public async getAllMeetings(req: Request, res: Response) {
        try {
            const result = await this.meetingRepository.getMeetings() as IMeeting[];
            const meetings: IMeeting[] = JSON.parse(JSON.stringify(result));

            // Object keys are capitalized to comply with Frontend scheduler api
            const capsMeetings: IMeeting[] = [];
            meetings.forEach(meeting => {
                const entries = Object.entries(meeting);
                const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
                capsMeetings.push(Object.fromEntries(capsEntries) as IMeeting);
            })
            return res.json(capsMeetings);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    public async addMeeting(req: Request, res: Response) {
        const meeting = new Meeting(req.body as IMeeting);
        if (!meeting.isValid()) {
            return res.status(400).json({err: "The meeting is not valid"});
        }
        try {
            const result = await this.meetingRepository.addMeeting(meeting);
            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    public async updateMeeting(req: Request, res: Response) {
        const meeting = new Meeting(req.body as IMeeting);
        if (!meeting.isValid()) {
            return res.status(400).json({err: "The meeting is not valid"});
        }
        const meetingId: number = parseInt(req.params.id, 10);
        try {
            const result = await this.meetingRepository.updateMeeting(meetingId, meeting);
            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    public async deleteMeeting(req: Request, res: Response) {
        const meetingId: number = parseInt(req.params.id, 10);
        try {
            await this.meetingRepository.getMeeting(meetingId);
        } catch (err) {
            return res.status(404).json({err: err.message});
        }
        try {
            const result = await this.meetingRepository.removeMeeting(meetingId);
            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    public async getMeeting(req: Request, res: Response) {
        try {
            const meetingId: number = parseInt(req.params.id, 10);
            const result = await this.meetingRepository.getMeeting(meetingId);
            return res.status(201).json(result);
        } catch (err) {
            return res.status(404).json({err: err.message});
        }
    }

}
