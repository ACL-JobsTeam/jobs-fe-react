import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleContact from './singleContact';
import { useParams } from 'react-router';

const ContactList = ({ contacts, setContacts }) => {
  const [companyContact, setCompanyContact] = useState('');
  const { id } = useParams();
  
      
  const createNewContact = async (e) => {
    e.preventDefault();
    const newContact = await fetch('http://localhost:7890/api/v1/contacts/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        companyContact,
        appId: id
      })

    });
    const newContactJson = await newContact.json();
    if(newContactJson) {
      setContacts(prevArray => {
        const copy = [...prevArray];
        copy.push(newContactJson);
        return copy;
      });
    }
  };

  const handleDeleteContact = async (id, index) => {
    const deleted = await fetch(`http://localhost:7890/api/v1/contacts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const deletedJson = await deleted.json();
   

    if(deletedJson) {
      setContacts(prevArray => {
        const copy = [...prevArray];
        copy.splice(index, 1);
        return copy;
      });
    }
  };
  /*
  const handleEditContact = async (id) => {
    const editedContact = await fetch(`http://localhost:7890/api/v1/contacts/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({
        companyContact
      })
    });
  };
 */
  const contactItems = contacts.map((contact, index) => (
    <li key={contact.id}>
      
      <SingleContact {...contact} index={index} handleDeleteContact={handleDeleteContact}/>
    </li>
  ));

  return (
    <div>
      <p>view/add contacts </p>
      <form onSubmit={createNewContact}>
        <input placeholder="new contact" onChange={(e) => setCompanyContact(e.target.value)}/>
        <button type="submit">click me</button>
      </form>
        
      <ul>
      
        {contactItems}
 
      
      </ul>
    </div>
  );};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      contact: PropTypes.string,
      id: PropTypes.string.isRequired,
    })
  )
};

export default ContactList;
