import { PickersDayProps, PickersDay } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useState, useEffect, ComponentType } from "react";
import { ICustomDayProps } from "./CustomDay.type";

const CustomDay: ComponentType<ICustomDayProps & PickersDayProps<Dayjs>> = ({
  day,
  onPickDay,
  range,
}) => {
  const date = day.toDate();

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

  return (
    <PickersDay
      day={day}
      onDaySelect={() => onPickDay(date)}
      isFirstVisibleCell={true}
      isLastVisibleCell={true}
      outsideCurrentMonth={false}
      selected={isEnd || isStart || isBetween}
    />
  );
};

export default CustomDay;
