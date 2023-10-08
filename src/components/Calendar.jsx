import React from 'react';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

import Button from '@mui/material/Button'; 
import Dialog from '@mui/material/Dialog'; 
import DialogTitle from '@mui/material/DialogTitle'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogActions from '@mui/material/DialogActions';

function SimpleDialog(props) { 
    const { onClose, open } = props; 
    const handleClose = () => { onClose(); }; 
  
    return ( 
        <Dialog onClose={handleClose} open={open}> 
            <DialogTitle>Accept Alert</DialogTitle> 
            <DialogContent dividers> 
                <p>Are you sure you want to book this date?</p> 
            </DialogContent> 
            <DialogActions> 
                <Button variant="outlined" color="success"> 
                  Accept 
                </Button> 
            </DialogActions> 
        </Dialog> 
    ); 
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs('2023-9-24');

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? 'N/A' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}


function ActionList(props) {
  const {onClear, onCancel, onSetToday, className } = props;
  const actions = [
    //{ text: 'Accept', method: onAccept },
    { text: 'Clear', method: onClear },
    { text: 'Cancel', method: onCancel },
    { text: 'Today', method: onSetToday },
  ];

  return (
    <List className={className}>
      {actions.map(({ text, method }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={method}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

function Calendar({ photos, photographerName }) {
  const [open, setOpen] = React.useState(false); 
  const handleClickOpen = () => { setOpen(true); }; 
  const handleClose = () => { setOpen(false); };

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };


  return (
    <div style={{ padding: '20px', marginTop: '60px',width:'50%' }}>
              <Link to={`/photographer/${photographerName}/Booking`} style={{ color: '#FFF', textDecoration: 'none' }}>
                {photographerName}
              </Link>
                <p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                  DateCalendar
                  defaultValue={dayjs(new Date())} //setting todays date
                  loading={isLoading}
                  onMonthChange={handleMonthChange}
                  renderLoading={() => <DayCalendarSkeleton />}

                  slotProps={{
                    day: {
                      highlightedDays,
                    },

                    layout: {
                    sx: { backgroundColor: 'grey',
                    [`.${pickersLayoutClasses.actionBar}`]: {
                    gridColumn: 1,
                    gridRow: 2, },},},}}
                  slots={{
                    day: ServerDay,
                    actionBar: ActionList,}}/>
            <Button variant="outlined" color="success"
              onClick={handleClickOpen}>Accept</Button> 
            <SimpleDialog open={open} onClose={handleClose} /> 
                </LocalizationProvider>
                </p>
      </div>
  );
}

export default Calendar;