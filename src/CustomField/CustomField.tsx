import { Input } from '@mui/material';
import { BaseSingleInputFieldProps, FieldSection } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { ComponentType } from 'react';
import { ICustomFieldProps } from './CustomField.type';

const CustomFieldBase: ComponentType<BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, any> & ICustomFieldProps> = ({dateString, InputProps, sx, onClick}) => {
  return (
    <>
      <Input onClick={(e) => onClick(e)} sx={{minWidth: '250px', ...sx}} endAdornment={InputProps?.endAdornment} value={dateString}/>
    </>
  );
};

const CustomField: ComponentType<BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, any>> = (props) => {
  return (
    <CustomFieldBase {...(props as BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, any> & ICustomFieldProps)} />
  );
};

export default CustomField;

// width: '100%'
