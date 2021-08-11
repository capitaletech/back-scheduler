import {Request, Response} from "express";
import MeetingRepository from "../../repositories/meeting.repository";
import Meeting, {IMeeting} from "../../models/meeting";
import logger from "../../components/logger";
import {capitalizeKeys, decapitalizeKeys} from "../../helpers/utils";
import {ZoomMeetingService} from "../../services/zoom.meeting.service";

export class MeetingsRequests {

    constructor(
        private meetingRepository: MeetingRepository,
        private zoomMeetingService: ZoomMeetingService,
    ) {
    }

    public async getAllMeetings(req: Request, res: Response) {
        try {
            const result = await this.meetingRepository.getMeetings() as IMeeting[];
            const meetings: IMeeting[] = JSON.parse(JSON.stringify(result));

            // Object keys are capitalized to comply with Frontend scheduler api
            const capsMeetings: IMeeting[] = capitalizeKeys(meetings);
            return res.json(capsMeetings);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    public async addMeeting(req: Request, res: Response) {
        const meeting = new Meeting(req.body as IMeeting);
        if (!meeting.isValid()) {
            return res.status(400).json("The meeting is not valid");
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
            return res.status(400).json("The meeting is not valid");
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
            await this.meetingRepository.removeMeeting(meetingId);
        } catch (err) {
            return res.status(404).json(err.message);
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
            return res.status(404).json(err.message);
        }
    }


    public async batchProcessMeetings(req: Request, res: Response) {
        try {
            let eventData = [];
            if (req.body.action == "insert" || (req.body.action == "batch" && req.body.added.length > 0)) {
                (req.body.action == "insert") ? eventData.push(req.body.value) : eventData = req.body.added;
                for (let i = 0; i < eventData.length; i++) {
                    eventData[i].StartTime = new Date(eventData[i].StartTime);
                    eventData[i].EndTime = new Date(eventData[i].EndTime);
                    const meeting: Meeting = new Meeting(decapitalizeKeys(eventData[i]));
                    if (!meeting.isValid()) {
                        return res.status(400).json("The meeting is not valid");
                    }
                    const zoomResponse = await this.zoomMeetingService.createZoomMeeting();
                    meeting.meetingUrl = zoomResponse.data.join_url;
                    await this.meetingRepository.addMeeting(meeting);
                }
            }

            if (req.body.action == "update" || (req.body.action == "batch" && req.body.changed.length > 0)) {
                (req.body.action == "update") ? eventData.push(req.body.value) : eventData = req.body.changed;
                for (let i = 0; i < eventData.length; i++) {
                    delete eventData[i]._id;
                    eventData[i].StartTime = new Date(eventData[i].StartTime);
                    eventData[i].EndTime = new Date(eventData[i].EndTime);
                    const meeting: Meeting = new Meeting(decapitalizeKeys(eventData[i]));
                    if (!meeting.isValid()) {
                        return res.status(400).json("The meeting is not valid");
                    }
                    await this.meetingRepository.updateMeeting(eventData[i].Id, meeting);
                }
            }
            if (req.body.action == "remove" || (req.body.action == "batch" && req.body.deleted.length > 0)) {
                (req.body.action == "remove") ? eventData.push(req.body.value) : eventData = req.body.deleted;
                for (let i = 0; i < eventData.length; i++) {
                    await this.meetingRepository.removeMeeting(eventData[i].Id);
                }
            }
            res.send(req.body);
        } catch (err) {
            logger.error(err);
            throw new Error(err.message);
        }
    }

}
