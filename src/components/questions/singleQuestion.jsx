import React from 'react';
import PropTypes from 'prop-types';


const SingleQuestion = ({ userQuestion, id, index, handleDeleteQuestion }) => {
 
  return (
    <>
      <div key={id}>
        {userQuestion}
      </div>
      <button onClick={() => handleDeleteQuestion(id, index)}>delete</button>
    </>
  );};

SingleQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  userQuestion: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired
};

export default SingleQuestion;
