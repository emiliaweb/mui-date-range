
export interface IDateRange {
    start: Date | 0;
    end: Date | 0
}


export interface IDateRangeProps {
    getValues: (range: IDateRange) => void
}