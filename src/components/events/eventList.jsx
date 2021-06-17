import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleEvent from './singleEvent';
import { useParams } from 'react-router';
import CardActions from '@material-ui/core/CardActions';
import style from './event.css';
import Button from '@material-ui/core/Button';

const EventList = ({ events, setEvents }) => {
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');
  const { id } = useParams();
  
      
  const createNewEvent = async (e) => {
    e.preventDefault();
    const newEvent = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/events/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        eventDate,
        eventName,
        appId: id
      })

    });
    
    const newEventJson = await newEvent.json();
    
    if(newEventJson) {
      setEvents(prevArray => {
        const copy = [...prevArray];
        copy.push(newEventJson);
        return copy;
      });
    }
  };

  const handleDeleteEvent = async (id, index) => {
    const deleted = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/events/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const deletedJson = await deleted.json();
   

    if(deletedJson) {
      setEvents(prevArray => {
        const copy = [...prevArray];
        copy.splice(index, 1);
        return copy;
      });
    }
  };

  const eventItems = events.map((event, index) => (
    <li className={style.eventItem} key={event.id}>
      
      <SingleEvent {...event} index={index} handleDeleteEvent={handleDeleteEvent}/>
    </li>
  ));

  return (
    <div className={style.eventCon}>
      <p className={style.eventsIntro}>Events</p>
      <form onSubmit={createNewEvent}>
        <span>
          <input className={style.eventCal} type="date" placeholder="new date" onChange={(e) => setEventDate(e.target.value)}/>
          <textarea className={style.eventInput} placeholder="Got lost in interviewers eyes" onChange={(e) => setEventName(e.target.value)}/>
        </span>
        
        <CardActions>
          <span  className={style.eventButton}>
            <Button type="submit" variant="contained" size="large" color="primary">
        Add Event&gt; 
            </Button>
          </span> 
        </CardActions>
      
      </form>
        
      <ul className={style.eventContainer}>
      
        {eventItems}
      
      </ul>
    </div>
  );};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      event: PropTypes.string,
      id: PropTypes.string.isRequired,
    })
  )
};

export default EventList;
