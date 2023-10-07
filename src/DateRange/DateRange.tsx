import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { FC, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IDateRange } from "./DateRange.type";

const CustomDay: FC<{
  day: any;
  onDaySelect: (day: any) => void;
  range: IDateRange;
}> = ({ day, onDaySelect, range }) => {
  const date = day.$d;

  const isStart = range.start && date.getTime() === range.start.getTime();
  const isEnd = range.end && date.getTime() === range.end.getTime();
  const isBetween =
    range.start &&
    range.end &&
    date.getTime() > range.start.getTime() &&
    date.getTime() < range.end.getTime();

  const style = {
    backgroundColor: isEnd || isStart || isBetween ? "red" : "none",
  };

  return (
    <PickersDay
      day={day}
      onDaySelect={() => onDaySelect(date as Date)}
      isFirstVisibleCell={true}
      isLastVisibleCell={true}
      outsideCurrentMonth={false}
      sx={style}
    />
  );
};

const DateRange: FC = () => {
  const [range, setRange] = useState<IDateRange>({
    start: 0,
    end: 0,
  });

  const onDaySelect = (day: Date) => {
    setRange((prev) => {
      if (!prev.start && !prev.end) {
        return {
          start: 0,
          end: day,
        };
      }

      if (!prev.start && prev.end) {
        if (prev.end.getTime() === day.getTime()) {
          return {
            start: 0,
            end: prev.end,
          };
        }
        if (prev.end.getTime() > day.getTime()) {
          return {
            start: day,
            end: prev.end,
          };
        }
        return {
          start: prev.end,
          end: day,
        };
      }

      if (prev.start && prev.end) {
        return {
          start: 0,
          end: day,
        };
      }

      return {
        start: 0,
        end: 0,
      };
    });
  };

  // console.log(range);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          defaultValue={dayjs(new Date())}
          closeOnSelect={false}
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: { onDaySelect, range },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateRange;
