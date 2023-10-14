import { BaseSingleInputFieldProps, FieldSection } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export interface ICustomFieldProps extends BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, any> {
    dateString: string
}