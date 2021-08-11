import conf from '../config'

export interface IMeeting {
    id?: number;
    subject: string;
    startTime: Date;
    endTime: Date;
    meetingUrl?: string;
    isBlock?: boolean;
    isReadonly?: boolean;
    recurrenceRule?: string;
}

class Meeting implements IMeeting {
    id?: number;
    subject: string;
    startTime: Date;
    endTime: Date;
    meetingUrl?: string;
    isBlock?: boolean;
    isReadonly?: boolean;
    recurrenceRule?: string;

    constructor(meeting: IMeeting) {
        this.id = meeting.id;
        this.subject = meeting.subject;
        this.startTime = meeting.startTime;
        this.endTime = meeting.endTime;
        this.meetingUrl = meeting.meetingUrl;
        this.isBlock = meeting.isBlock;
        this.isReadonly = meeting.isReadonly;
        this.recurrenceRule = meeting.recurrenceRule;
    }

    /**
     *  Returns true if the meeting can be booked
     */
    isValid = (): boolean => (this.isTimeOk() && this.isOutsideLunchTime());

    /**
     *  Returns true if the meeting is outside the lunch time (between 1PM and 2PM)
     */
    isOutsideLunchTime = (): boolean => {
        const [startLunch, endLunch] = conf.scheduler.lunchTime.split(",").map(x => +x);
        const startMinutes = this.startTime.getHours() * 60 + this.startTime.getMinutes();
        const endMinutes = this.endTime.getHours() * 60 + this.endTime.getMinutes();
        const startLunchMinutes = startLunch * 60
        const endLunchMinutes = endLunch * 60;
        return endMinutes <= startLunchMinutes || startMinutes >= endLunchMinutes;
    }

    isTimeOk = (): boolean => {
        return this.endTime > this.startTime && this.startTime > new Date()
    }
}

export default Meeting;

