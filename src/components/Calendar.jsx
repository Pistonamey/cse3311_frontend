import React from 'react';
import { Calendar } from "@progress/kendo-react-dateinputs";
import { useEffect, useRef, useState } from "react";
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

const times = [
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

const getRandomNumInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const pickSlotTimes = times => {
  // Get a random number that will indicate how many time slots we pick
  const timesToPick = getRandomNumInRange(0, times.length);

  // If the random picked is the maximum possible then return all times
  if (timesToPick === times.length - 1) {
    return times;
  }

  let timesPicked = [];

  // Loop until we have picked specified number of times
  while (timesToPick !== timesPicked.length - 1) {
    // Get a new index and time
    const index = getRandomNumInRange(0, times.length);
    const selectedTime = times[index];
    // If we already picked that time we continue
    // as we don't want duplicated
    if (timesPicked.includes(selectedTime)) continue;
    // Keep the time
    timesPicked.push(selectedTime);
  }

  // We need to sort the times, as they may not be in a correct order
  return timesPicked.sort();
};

const Calendar3 = props => {
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingTimes, setBookingTimes] = useState([]);
  const timeSlotCacheRef = useRef(new Map());

  const [open, setOpen] = React.useState(false); 
  const handleClickOpen = () => { setOpen(true); }; 
  const handleClose = () => { setOpen(false); };

  useEffect(() => {
    // Bail out if there is no date selected
    if (!bookingDate) return;

    // Get time slots from cache
    let newBookingTimes = timeSlotCacheRef.current.get(
      bookingDate.toDateString()
    );

    // If we have no cached time slots then pick new ones
    if (!newBookingTimes) {
      newBookingTimes = pickSlotTimes(times);
      // Update cache with new time slots for the selected date
      timeSlotCacheRef.current.set(bookingDate.toDateString(), newBookingTimes);
    }

    setBookingTimes(newBookingTimes);
  }, [bookingDate]);

  const onDateChange = e => {
    setSelectedTimeSlot(null);
    setBookingDate(e.value);
  };

  return (
    <div className="k-my-8">
      <div className="k-mb-4 k-font-weight-bold">Book Appointment:</div>

      <div className="k-flex k-display-flex k-mb-4">
        <Calendar value={bookingDate} onChange={onDateChange} />
        <div className="k-ml-4 k-display-flex k-flex-col">
          {bookingTimes.map(time => {
            return (
              <button
                key={time}
                className="k-button k-mb-4"

              >
                {time}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{marginTop: '20px' }}>
      <Button variant="outlined" color="success"
              onClick={handleClickOpen}>Accept</Button> 
            <SimpleDialog open={open} onClose={handleClose} /> 
            </div>

      {bookingDate && selectedTimeSlot ? (
        <div>
          Selected slot: {bookingDate.toDateString()} at {selectedTimeSlot}
        </div>
      ) : null}
    </div>
  );
};

export default Calendar3;