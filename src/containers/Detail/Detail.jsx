import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchContacts } from '../../utils/contactUtils';
import { fetchNotes } from '../../utils/noteUtils';
import ContactList from '../../components/contacts/contactList';
import NoteList from '../../components/notes/noteList';
import { fetchQuestions } from '../../utils/questionUtils';
import QuestionList from '../../components/questions/questionList';
import { fetchEvents } from '../../utils/fetchEvents';
import EventList from '../../components/events/eventList';
import styles from './detail.css';
import Header from '../../components/header/header';


const Detail = ({ user }) => {
  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const [notes, setNotes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [events, setEvents] = useState([]);
  
  

  useEffect(() => {
    fetchQuestions(id)
      .then(setQuestions);
    fetchNotes(id)
      .then(setNotes);
    fetchContacts(id)
      .then(setContacts);
    fetchEvents(id)
      .then(setEvents);
    
  }, []);

  

  return (
    <>
      <div className={styles.page} >
        
        <Header user={user} />
        <h1 className={styles.header}>Notebook</h1>
      
        <EventList events={events} setEvents={setEvents} />
        <ContactList contacts={contacts} setContacts={setContacts}/>
        <QuestionList questions={questions} setQuestions={setQuestions} />
        <NoteList notes={notes} setNotes={setNotes} />
      
      </div>
    </>
  );
};

export default Detail;
