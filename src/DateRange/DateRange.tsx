import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, IconButtonProps } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { ElementType, FC, useState } from 'react';
import { CustomDay } from '../CustomDay/CustomDay';
import { ICustomDayProps } from '../CustomDay/CustomDay.type';
import CustomField from '../CustomField/CustomField';
import { ICustomFieldProps } from '../CustomField/CustomField.type';
import { IDateRange } from './DateRange.type';

const CustomOpenButton: ElementType<IconButtonProps> = ({onClick}) => {
  return (
    <Button sx={{padding: '8px', minWidth: 'auto'}} onClick={onClick}>
      <CalendarMonthIcon/>
    </Button>
  );
};

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

  const today = new Date();

  const formatDate = (date: Date) => dayjs(date).format('DD-MM-YYYY');

  const dateString = range.start && range.end ? `${formatDate(range.start)} to ${formatDate(range.end)}` 
  : range.end ? `${formatDate(range.end)}` : 'Select a date'; 
  console.log(range, dateString);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          defaultValue={dayjs(today)}
          closeOnSelect={false}
          slots={{
            day: CustomDay,
            field: CustomField,
            openPickerButton: CustomOpenButton
          }}
          slotProps={{
            day: { onPickDay, range } as ICustomDayProps,
            field: { dateString } as ICustomFieldProps,
            inputAdornment: {sx: {height: 'auto', maxHeight: '100%'}}
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateRange;
