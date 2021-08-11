import {Router} from "express";
import {ZoomMeetingsRequests} from "./requests/zoom.meetings.requests";
import {ZoomMeetingService} from "../services/zoom.meeting.service";

export class ZoomMeetingsRouter {
    public router: Router;

    constructor(private zoomMeetingService: ZoomMeetingService) {
        this.router = Router();
        this.init();
    }

    /**
     * @apiDefine admin Admin access only
     */
    public init() {
        const requests = new ZoomMeetingsRequests(this.zoomMeetingService);

        /**
         * @api {patch} /api/zoommeeting/ Create a new zoom meeting
         * @apiName addZoomMeeting
         * @apiGroup ZoomMeetingsRouter
         *
         * @apiUse meeting
         *
         * @apiError   500        Internal error
         *
         */
        this.router.post("/", requests.addZoomMeeting.bind(requests));

    }
}
