import conf from "../config";
import jwt from "jsonwebtoken";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export class ZoomMeetingService {

    public createZoomMeeting = async (): Promise<AxiosResponse> => {
        const {key, secret, email} = conf.zoom;
        if (!key || !secret) {
            throw  new Error("Missing JWT credentials");
        }
        const payload = {
            iss: key,
            exp: (new Date()).getTime() + 5000
        };
        const token = jwt.sign(payload, secret);
        const options: AxiosRequestConfig = {
            url: `https://api.zoom.us/v2/users/${email}/meetings`,
            method: 'post',
            data: {
                topic: "Meeting",
                type: 1,
                settings: {
                    host_video: true,
                    participant_video: true,
                }
            },
            headers: {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'json'
        };
        return await axios.request(options);
    }
}
