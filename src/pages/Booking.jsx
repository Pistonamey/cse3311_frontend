import React, {  useState }  from 'react';
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

import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';

let initialValues = {
  sDay: '',
  sTime: '',
  eDay: '',
  eTime: '',
  type: '',
  location: ''
}

function BookingDialog(props) { 

  const {name} = useParams();

  const { onClose, open} = props; 
  const handleClose = () => { onClose(); console.log(initialValues); console.log(quote) }; 

  const [quote, setQuote] = useState(initialValues);

  const [open1, setOpen] = React.useState(false); 
  const handleClickOpen = () => { setOpen(true);};
  const handleClose1 = () => { setOpen(false); console.log(initialValues); console.log(quote) }; 

  const onChange = (e) => {
    setQuote({...quote, [e.target.name]: e.target.value});
  };

  const sendEmail = async () => { 
    const token = Cookies.get('token')
    
      fetch('/request_booking', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(name)
      })
      .then(resp => {
          if (resp.status === 404) {
              alert("ERROR: sending request");
          }
          else if (resp.status === 200) {
              alert("Thank you for booking with PixEra! Your request was submitted!")
          } else {
              alert("This didn't work")
          }})}

  // const [name, setName] = useState(initialValues);
  // const nameChangeHandler = (e) => {
  //     setName(e.target.value)
  // };

  return ( 
      <Dialog onClose={handleClose} open={open}> 
          <DialogTitle>Booking Information</DialogTitle> 
          <DialogContent dividers> 
              <p>Please enter your information</p>
              <p>Start Time:    
                <input type="date" placeholder="Enter Start Day"
                value={ quote.sDay || "" }
                name="sDay"
                onChange={ onChange }/>
                <input type="time" placeholder="Enter Start Time"
                value={ quote.sTime || "" }
                name="sTime"
                onChange={ onChange }/></p>
              <p>End Time:      
                <input type="date" placeholder="Enter End Day"
                value={ quote.eDay || "" }
                name="eDay"
                onChange={ onChange }/>
                <input type="time" placeholder="Enter End Time"
                value={ quote.eTime || "" }
                name="eTime"
                onChange={ onChange }/></p>
              <p>Type of Event: 
                <input type="text" placeholder="Enter Type of Event"
                value={ quote.type || "" }
                name="type"
                onChange={ onChange }/></p>
              <p>Location: 
                <input type="text" placeholder="Enter Location"
                value={ quote.location || "" }
                name="location"
                onChange={ onChange }/></p>
          </DialogContent> 
          <DialogActions> 
          
          <Button variant="outlined" color="success" onClick={handleClickOpen}> Submit </Button>
            <Dialog onClose={handleClose1} open={open1}> 
            <DialogTitle>Accept Alert</DialogTitle> 
            <DialogContent dividers> 
              <p>Are you sure you want to book this date?</p> 
            </DialogContent> 
            <DialogActions> 

            <Link href="/request_booking" variant="body2">
            <Button variant="outlined" color="success" onClick={sendEmail}> Accept </Button> 
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
  })

const localizer = momentLocalizer(moment);

const Booking = () => {

  const [open, setOpen] = React.useState(false); 
  const handleClickOpen = () => { setOpen(true);}; 
  const handleClose = () => { setOpen(false); };

  const { name } = useParams();
  const today = new Date();

  const events = [
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2023, 11, 12, 10, 0),
      end: new Date(2023, 11, 12, 12, 0),
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date(2023, 11, 26, 14, 0),
      end: new Date(2023, 11, 26, 16, 0),
    },
    {
      id: 3,
      title: 'Event 3',
      start: new Date(2023, 16, 1, 10, 0),
      end: new Date(2023, 17, 1, 12, 0),
    },
    {
      id: 4,
      title: 'Event 4',
      start: new Date(2023, 11, 2, 13, 0),
      end: new Date(2023, 11, 2, 16, 0),
    },
  ];

  const handleDateClick = (date) => {
    console.log('Date clicked:', date);
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

    // Define a class for today's date cell
    const todayDateClass = isToday ? 'today-date' : '';

    // Add a small circle to the number if it's today
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
              color: 'today' ? 'black' : 'white',}}
            dayComponent={CustomDateCell} 
            />

        </div>
        <div style={{marginTop: '20px', marginLeft: '950px' }}>

      <Button variant="outlined" onClick={handleClickOpen}>Request Booking 
      </Button> 
      <BookingDialog open={open} onClose={handleClose} /> 

      </div>
      </div>
    </>
  );
};

export default Booking;
