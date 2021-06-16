import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleEvent from './singleEvent';
import { useParams } from 'react-router';

const EventList = ({ events, setEvents }) => {
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');
  const { id } = useParams();
  
      
  const createNewEvent = async (e) => {
    e.preventDefault();
    const newEvent = await fetch('http://localhost:7890/api/v1/events/new', {
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
    const deleted = await fetch(`http://localhost:7890/api/v1/events/${id}`, {
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
    <li key={event.id}>
      
      <SingleEvent {...event} index={index} handleDeleteEvent={handleDeleteEvent}/>
    </li>
  ));

  return (
    <div>
      <p>view/add event </p>
      <form onSubmit={createNewEvent}>
        <input type="date" placeholder="new date" onChange={(e) => setEventDate(e.target.value)}/>
        <input placeholder="new event" onChange={(e) => setEventName(e.target.value)}/>
        <button type="submit">click me</button>
      </form>
        
      <ul>
      
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
