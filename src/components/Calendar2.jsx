import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

export default function StaticDateTimePickerLandscape() {
  return (
    <div style={{ padding: '20px', marginTop: '60px',width:'50%' }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker orientation="landscape" />
    </LocalizationProvider>
    </div>
  );
}