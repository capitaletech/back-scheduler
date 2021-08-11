import {Router} from "express";
import {MeetingsRequests} from "./requests/meetings.requests";
import MeetingRepository from "../repositories/meeting.repository";

export class MeetingsRouter {
    public router: Router;

    constructor(private meetingRepository: MeetingRepository) {
        this.router = Router();
        this.init();
    }

    /**
     * @apiDefine admin Admin access only
     */
    public init() {
        const requests = new MeetingsRequests(this.meetingRepository);


        /**
         * @api {delete} /api/meetings/:id remove a meeting
         * @apiName deleteMeeting
         * @apiGroup MeetingsRouter.
         *
         * @apiSuccess {Object} meeting
         *
         * @apiError   404        Meeting not found error.
         * @apiError   500        An error occured.
         *
         */
        this.router.delete("/:id", requests.deleteMeeting.bind(requests));

        /**
         * @api {get} /api/meetings/:id Get a meeting
         * @apiName getMeeting
         * @apiGroup MeetingsRouter
         *
         * @apiUse meeting
         *
         * @apiError   404        Meeting does not exist.
         *
         */
        this.router.get("/:id", requests.getMeeting.bind(requests));

        /**
         * @api {get} /api/meetings/ Get all meetings
         * @apiName getAllMeetings
         * @apiGroup MeetingsRouter
         *
         * @apiSuccess {Object[]} meetings List of Meetings.
         * @apiUse meeting
         */
        this.router.get("/", requests.getAllMeetings.bind(requests));

        /**
         * @api {patch} /api/meetings/ Create a new meeting
         * @apiName addMeeting
         * @apiGroup MeetingsRouter
         *
         * @apiUse meeting
         *
         * @apiError   400        Meeting not valid error.
         * @apiError   500        Internal error
         *
         */
        this.router.post("/", requests.addMeeting.bind(requests));

        /**
         * @api {patch} /api/meetings/:id Update a meeting
         * @apiName updateMeeting
         * @apiGroup MeetingsRouter
         *
         * @apiUse meeting
         *
         * @apiError   404        Meeting does not exist error.
         * @apiError   500        Internal error
         *
         */
        this.router.patch("/:id", requests.updateMeeting.bind(requests));

        /**
         * @api {patch} /api/meetings/batch Process CRUD operations on meetings from the scheduler
         * @apiName batchProcessMeetings
         * @apiGroup MeetingsRouter
         *
         * @apiUse meeting
         *
         * @apiError   500        Internal error
         *
         */
        this.router.post("/batch", requests.batchProcessMeetings.bind(requests));

        /**
         * @api {get} /api/meetings/data Retrieves all the meetings to be displayed on the scheduler
         * @apiName getData
         * @apiGroup MeetingsRouter
         *
         * @apiSuccess {Object[]} meetings List of Meetings.
         * @apiUse meeting
         */
        this.router.post("/data", requests.getAllMeetings.bind(requests));

    }
}
