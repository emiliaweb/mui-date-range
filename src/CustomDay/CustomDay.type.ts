import { Dayjs } from "dayjs";
import { IDateRange } from "../DateRange/DateRange.type";

export interface ICustomDayProps {
    onPickDay: (day: Date) => void;
    range: IDateRange;
    day: Dayjs;
}