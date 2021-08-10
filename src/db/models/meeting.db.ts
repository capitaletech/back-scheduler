import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {IMeeting} from "../../models/meeting";

@Table({tableName: "meetings"})
class Meeting extends Model<IMeeting> implements IMeeting {

    @Column(DataType.STRING)
    subject!: string;

    @Column(DataType.DATE)
    startTime!: Date;

    @Column(DataType.DATE)
    endTime!: Date;

    @Column(DataType.BOOLEAN)
    isBlock!: boolean;

    @Column(DataType.BOOLEAN)
    isReadonly!: boolean;

    @Column(DataType.STRING)
    recurrenceRule!: string;
}

export default Meeting;

