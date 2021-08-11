import {expect} from 'chai';
import {describe} from 'mocha';
import Meeting, {IMeeting} from "../../src/models/meeting";

describe('Is meeting valid', () => {
    const today = new Date();
    it('Should return false when given a meeting between 12PM and 13:30PM ', () => {
        const time = {
            startTime: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 12, 0),
            endTime: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 13, 30),
        } as IMeeting;
        const meeting = new Meeting(time);
        expect(meeting.isValid()).to.be.false;
    });

    it('Should return true when given a meeting between 15PM and 16:30PM ', () => {
        const time = {
            startTime: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 15, 0),
            endTime: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 16, 30),
        } as IMeeting;
        const meeting = new Meeting(time);
        expect(meeting.isValid()).to.be.true;
    });

    it('Should return false when start time = 12PM and end time = 11PM ', () => {
        const time = {
            startTime: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 12, 0),
            endTime: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 11, 0),
        } as IMeeting;
        const meeting = new Meeting(time);
        expect(meeting.isValid()).to.be.false;
    });

    it('Should return false when start time < today ', () => {
        const time = {
            startTime: new Date(2021, 7, 6, 17, 0),
            endTime: new Date(2021, 7, 6, 18, 0),
        } as IMeeting;
        const meeting = new Meeting(time);
        expect(meeting.isValid()).to.be.false;
    });
});
