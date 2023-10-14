import { Input } from '@mui/material';
import { BaseSingleInputFieldProps, FieldSection } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { ComponentType } from 'react';
import { ICustomFieldProps } from './CustomField.type';

const CustomField: ComponentType<BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, any> & ICustomFieldProps> = ({dateString, InputProps}) => {
  return (
    <>
      <Input sx={{minWidth: 250, userSelect: 'none'}} endAdornment={InputProps?.endAdornment} value={dateString}/>
    </>
  );
};

export default CustomField;

// width: '100%'
