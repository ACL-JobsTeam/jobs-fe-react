/*

import React, { useState } from 'react';
import { useParams } from 'react-router';


const Contacts = () => {
  const [companyContact, setCompanyContact] = useState(''); 
  const { id } = useParams();
  const [newContacts, setNewContact] = useState('');
    
  const submit = async (e) => {
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
    const data = await newContact.json();
    const newContactMade = data.companyContact;
   
    if(newContactMade) {
      setNewContact(newContactMade);
    }
  
  };
  

  return (
    <>
      <p>view/add contacts </p>
      <form onSubmit={submit}>
        <input placeholder="new contact" onChange={e => setCompanyContact(e.target.value)} />
        <button type="submit">click me</button>
      </form>
      
    </>
  );
};



export default Contacts;
 
















