import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TopBar from '../components/TopBar';
import { useParams } from 'react-router-dom';
import Profile from '../components/Profile';
import moment from 'moment';
import './Booking.css';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

let initialValues = {
  sDay: '',
  sTime: '',
  eDay: '',
  eTime: '',
  type: '',
  location: '',
};

function BookingDialog(props) {
  const name = useParams().name;
  const { onClose, open, selectedEvent } = props;
  const handleClose = () => {
    onClose();
  };

  const [quote, setQuote] = useState(initialValues);

  const [open1, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose1 = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    const token = Cookies.get('token');
    
    fetch('/request_booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name, quote: quote }),
    }).then((resp) => {
      if (resp.status === 404) {
        alert('ERROR: sending request');
      } else if (resp.status === 200) {
        alert("Thank you for booking with PixEra! Your request was submitted!");
      } else {
        alert("This didn't work");
      }
    });
  };

  let currentDate = new Date().toJSON().slice(0, 10);

  const isEnabled =
    quote.sDay.length > 0 &&
    quote.sTime.length > 0 &&
    quote.eDay.length > 0 &&
    quote.eTime.length > 0 &&
    quote.type.length > 0 &&
    quote.location.length > 0 &&
    quote.sDay >= currentDate && 
    quote.eDay >= currentDate &&
    (((quote.sDay == quote.eDay) && (quote.sTime < quote.eTime)) || ((quote.sDay < quote.eDay)));

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Booking Information</DialogTitle>
      <DialogContent dividers>
        <p>Please enter your information</p>
        <p>
          Start Time:
          <input
            type="date"
            placeholder="Enter Start Day"
            value={quote.sDay || ''}
            name="sDay"
            onChange={onChange}
          />
          <input
            type="time"
            placeholder="Enter Start Time"
            value={quote.sTime || ''}
            name="sTime"
            onChange={onChange}
          />
        </p>
        <p>
          End Time:
          <input
            type="date"
            placeholder="Enter End Day"
            value={quote.eDay || ''}
            name="eDay"
            onChange={onChange}
          />
          <input
            type="time"
            placeholder="Enter End Time"
            value={quote.eTime || ''}
            name="eTime"
            onChange={onChange}
          />
        </p>
        <p>
          Type of Event:
          <input
            type="text"
            placeholder="Enter Type of Event"
            value={quote.type || ''}
            name="type"
            onChange={onChange}
          />
        </p>
        <p>
          Location:
          <input
            type="text"
            placeholder="Enter Location"
            value={quote.location || ''}
            name="location"
            onChange={onChange}
          />
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="success"
          onClick={handleClickOpen}
          disabled={!isEnabled}
        >
          Submit
        </Button>
        <Dialog onClose={handleClose1} open={open1}>
          <DialogTitle>Accept Alert</DialogTitle>
          <DialogContent dividers>
            <p>Are you sure you want to book this date?</p>
          </DialogContent>
          <DialogActions>
            <Link href="/request_booking" variant="body2">
              <Button
                variant="outlined"
                color="success"
                onClick={sendEmail}
              >
                Accept
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </DialogActions>
    </Dialog>
  );
}

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

const localizer = momentLocalizer(moment);

const Booking = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const token = Cookies.get('token');
  const decoded = jwtDecode(token)
  const username = decoded['username']

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { name } = useParams();
  const today = new Date();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch quotes for the current photographer's username
    const fetchQuotes = async () => {
      const response = await fetch(`/get_quotes/${name}`);
      if (response.ok) {
        const quotes = await response.json();
  
        // Convert date strings to Date objects
        const formattedQuotes = quotes.map(quote => ({
          ...quote,
          start: new Date(`${quote.startDay} ${quote.startTime}`),
          end: new Date(`${quote.endDay} ${quote.endTime}`),
        }));
        setEvents(formattedQuotes);
      }
    };
  
    fetchQuotes();
  }, [name]);

  const handleDateClick = (date) => {
    const event = events.find(event => moment(event.start).isSame(date, 'day'));
    if (event) {
      handleEventClick(event);
    }
  };

  const handleEventClick = (event, e) => {
  };

  const CustomDateCell = ({ value }) => {
    const isToday = moment(value).isSame(today, 'day');

    const dateStyle = {
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      lineHeight: '30px',
      textAlign: 'center',
      backgroundColor: isToday ? 'transparent' : 'transparent',
      color: isToday ? 'black' : 'transparent',
      border: isToday ? '1px solid black' : '1px solid transparent',
    };

    const todayDateClass = isToday ? 'today-date' : '';

    const circle = isToday ? <div className="today-circle"></div> : null;

    return (
      <button
        onClick={() => handleDateClick(value)}
        style={dateStyle}
        className={todayDateClass}
      >
        {circle} {moment(value).date()}
      </button>
    );
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          backgroundColor: '#2C2C2C',
          color: '#FFF',
          minHeight: '100vh',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <div
          className="center"
          style={{
            padding: '20px',
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="center" style={{ marginRight: '40px' }}>
            <Profile photoGrapherName={name} mode={'booking'} />
          </div>

          <Calendar
            localizer={localizer}
            selectable={true}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 500,
              backgroundColor: 'today' ? 'white' : 'lightgreen',
              color: 'today' ? 'black' : 'white',
            }}
            dayComponent={CustomDateCell}
            onSelectEvent={handleEventClick} // Add this line
          />

        </div>

        {username !== name && <div style={{ marginTop: '20px', marginLeft: '800px' }}>
          <Button variant="outlined" onClick={handleClickOpen}>
            Request Booking
          </Button>
          <BookingDialog
            open={open}
            onClose={handleClose}
            selectedEvent={selectedEvent}
          />
        </div>}
      </div>
    </>
  );
};

export default Booking;
