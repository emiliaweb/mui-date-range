import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { FC, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomDay: FC<{ day: any; onDaySelect: (day: any) => void }> = ({
  day,
  onDaySelect,
}) => {
  const date = day.$d;
  // console.log(date);
  return (
    <PickersDay
      day={day}
      onDaySelect={() => onDaySelect(date)}
      isFirstVisibleCell={true}
      isLastVisibleCell={true}
      outsideCurrentMonth={false}
    />
  );
};

const DateRange: FC = () => {
  const [range, setRange] = useState<{ start: Date | 0; end: Date | 0 }>({
    start: 0,
    end: 0,
  });

  const onDaySelect = (day: any) => {
    setRange((prev) => {
      if (!prev.start && !prev.end) {
        return {
          start: 0,
          end: day,
        };
      }
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
            day: { onDaySelect },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateRange;
