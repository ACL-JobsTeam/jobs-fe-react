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


const Detail = () => {
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
      <p>This is the Details Page </p>
      <ContactList contacts={contacts} setContacts={setContacts}/>
      <NoteList notes={notes} setNotes={setNotes} />
      <QuestionList questions={questions} setQuestions={setQuestions} />
      <EventList events={events} setEvents={setEvents} />
      
    </>
  );
};

export default Detail;
