import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { FC, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IDateRange } from "./DateRange.type";

const CustomDay: FC<{
  day: any;
  onDaySelect: (day: any) => void;
  range: IDateRange;
}> = ({ day, onDaySelect, range }) => {
  const date = day.$d;

  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isBetween, setIsBetween] = useState(false);

  useEffect(() => {
    if (range.start && date.getTime() === range.start.getTime()) {
      setIsStart(true);
      setIsEnd(false);
      setIsBetween(false);
    } else if (range.end && date.getTime() === range.end.getTime()) {
      setIsStart(false);
      setIsEnd(true);
      setIsBetween(false);
    } else if (
      range.start &&
      range.end &&
      date.getTime() > range.start.getTime() &&
      date.getTime() < range.end.getTime()
    ) {
      setIsStart(false);
      setIsEnd(false);
      setIsBetween(true);
    } else {
      setIsStart(false);
      setIsEnd(false);
      setIsBetween(false);
    }
  }, [date, range]);

  // const style = {
  //   backgroundColor: isEnd || isStart || isBetween ? "red" : "none",
  // };

  return (
    <PickersDay
      day={day}
      onDaySelect={() => onDaySelect(date as Date)}
      isFirstVisibleCell={true}
      isLastVisibleCell={true}
      outsideCurrentMonth={false}
      disableHighlightToday={true}
      selected={isEnd || isStart || isBetween}
      // sx={style}
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
