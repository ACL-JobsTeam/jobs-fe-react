import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {fetchContacts} from '../../utils/contactUtils';
import ContactList from '../../components/contacts/contactList'

const Detail = () => {
  const { id } = useParams();
  const [contacts, setContacts] = useState([]);

  

  useEffect(() => {
    fetchContacts(id)
      .then(setContacts);

  }, []);

  

  return (
    <>
      <p>This is the Details Page </p>
      <ContactList contacts={contacts} setContacts={setContacts}/>
      
      <div></div>
    </>
  );
};

export default Detail;
