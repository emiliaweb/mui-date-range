import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FC, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IDateRange } from "./DateRange.type";
import { CustomDay } from "../CustomDay/CustomDay";
import { ICustomDayProps } from "../CustomDay/CustomDay.type";

const DateRange: FC = () => {
  const [range, setRange] = useState<IDateRange>({
    start: 0,
    end: 0,
  });

  const onPickDay = (day: Date) => {
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

  console.log(range);

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
            day: { onPickDay, range } as ICustomDayProps,
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateRange;
