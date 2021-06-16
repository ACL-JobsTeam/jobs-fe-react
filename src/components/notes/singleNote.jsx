import React from 'react';
import PropTypes from 'prop-types';


const SingleNote = ({ userNote, id, index, handleDeleteNote }) => {
 
  return (
    <>
      <div key={id}>
        {userNote}
      </div>
      <button onClick={() => handleDeleteNote(id, index)}>delete</button>
    </>
  );};

SingleNote.propTypes = {
  index: PropTypes.number.isRequired,
  userNote: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteNote: PropTypes.func.isRequired
};

export default SingleNote;
