import {Request, Response} from "express";
import {ZoomMeetingService} from "../../services/zoom.meeting.service";

export class ZoomMeetingsRequests {

    constructor(private zoomMeetingService: ZoomMeetingService) {
    }

    public async addZoomMeeting(req: Request, res: Response) {
        try {
            const response = await this.zoomMeetingService.createZoomMeeting();
            return res.status(201).json({join_url: response.data.join_url});
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}
