import React from 'react';
import PropTypes from 'prop-types';


const SingleEvent = ({ eventDate, eventName, id, index, handleDeleteEvent }) => {
 
  return (
    <>
      <div key={id}>
        {new Date(eventDate).toDateString()} - {eventName} 
      </div>
      <button onClick={() => handleDeleteEvent(id, index)}>delete</button>
    </>
  );};

SingleEvent.propTypes = {
  index: PropTypes.number.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired
};

export default SingleEvent;
