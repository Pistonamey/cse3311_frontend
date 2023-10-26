import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TopBar from '../components/TopBar';
import { useParams } from 'react-router-dom';
import Profile from '../components/Profile';
import moment from 'moment';
import './index.css'; // Import the CSS file for custom styles

const localizer = momentLocalizer(moment);

const Booking = () => {
  const { name } = useParams();
  const today = new Date();

  const events = [
    {
      id: 1,
      title: 'Event 1',
      start: new Date(2023, 10, 1, 10, 0),
      end: new Date(2023, 10, 1, 12, 0),
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date(2023, 9, 26, 14, 0),
      end: new Date(2023, 9, 26, 16, 0),
    },
    {
      id: 3,
      title: 'Event 3',
      start: new Date(2023, 10, 1, 10, 0),
      end: new Date(2023, 10, 1, 12, 0),
    },
    {
      id: 4,
      title: 'Event 4',
      start: new Date(2023, 10, 1, 13, 0),
      end: new Date(2023, 10, 1, 16, 0),
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
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            dayComponent={CustomDateCell}
          />
        </div>
      </div>
    </>
  );
};

export default Booking;
