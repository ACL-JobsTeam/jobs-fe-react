import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleContact from './singleContact';
import { useParams } from 'react-router';
import CardActions from '@material-ui/core/CardActions';
import style from './contact.css';
import Button from '@material-ui/core/Button';

const ContactList = ({ contacts, setContacts }) => {
  const [companyContact, setCompanyContact] = useState('');
  const { id } = useParams();
  
      
  const createNewContact = async (e) => {
    e.preventDefault();
    const newContact = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/contacts/new`, {
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
    const deleted = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/contacts/${id}`, {
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
 
  const contactItems = contacts.map((contact, index) => (
    <li className={style.contactItem} key={contact.id}>
      
      <SingleContact {...contact} index={index} handleDeleteContact={handleDeleteContact}/>
    </li>
  ));

  return (
    <div className={style.contactCon}>
      <p className={style.contactsIntro}>Contacts</p>
      <form onSubmit={createNewContact}>
      <span >
          <textarea className={style.contactInput} placeholder="The interviewer had kind eyes" onChange={(e) => setCompanyContact(e.target.value)}/>
        </span>
        <CardActions>
          <span  className={style.contactButton}>
            <Button type="submit" variant="contained" size="large" color="primary">
        Add Contact&gt; 
            </Button>
          </span> 
        </CardActions>
       
      </form>
        
      <ul className={style.contactContainer}>
      
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
