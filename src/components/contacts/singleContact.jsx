import React from 'react';
import PropTypes from 'prop-types';


const SingleContact = ({ companyContact, id, index, handleDeleteContact }) => {
 
  return (
    <>
      <div key={id}>
        {companyContact} 
      </div>
      <button onClick={() => handleDeleteContact(id, index)}>delete</button>
    </>
  );};

SingleContact.propTypes = {
  index: PropTypes.number.isRequired,
  companyContact: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteContact: PropTypes.func.isRequired
};

export default SingleContact;
