import conf from '../config'

export interface IMeeting {
    id?: number;
    subject: string;
    startTime: Date;
    endTime: Date;
    isBlock?: boolean;
    isReadonly?: boolean;
    recurrenceRule?: string;
}

class Meeting implements IMeeting {
    id?: number;
    subject: string;
    startTime: Date;
    endTime: Date;
    isBlock?: boolean;
    isReadonly?: boolean;
    recurrenceRule?: string;

    constructor(meeting: IMeeting) {
        this.id = meeting.id;
        this.subject = meeting.subject;
        this.startTime = meeting.startTime;
        this.endTime = meeting.endTime;
        this.isBlock = meeting.isBlock;
        this.isReadonly = meeting.isReadonly;
        this.recurrenceRule = meeting.recurrenceRule;
    }

    /**
     *  Returns true if the meeting can be booked
     */
    isValid = (): boolean => (this.endTime > this.startTime && this.isOutsideLunchTime());

    /**
     *  Returns true if the meeting is outside the lunch time (between 1PM and 2PM)
     */
    isOutsideLunchTime = (): boolean => {
        const [startLunch, endLunch] = conf.scheduler.lunchTime.split(",").map(x => +x);
        const startHour = this.startTime.getHours();
        const endHour = this.endTime.getHours();
        return endHour < startLunch || startHour > endLunch;
    }
}

export default Meeting;

