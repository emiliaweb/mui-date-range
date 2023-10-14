import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, IconButtonProps } from '@mui/material';
import { ElementType } from 'react';

const CustomOpenButton: ElementType<IconButtonProps> = ({onClick}) => {
    return (
      <Button sx={{padding: '8px', minWidth: 'auto'}} onClick={onClick}>
        <CalendarMonthIcon/>
      </Button>
    );
  };

export default CustomOpenButton;