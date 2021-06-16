import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleNote from './singleNote';
import { useParams } from 'react-router';

const NoteList = ({ notes, setNotes }) => {
  const [userNote, setUserNote] = useState('');
  const { id } = useParams();
  
      
  const createNewNote = async (e) => {
    e.preventDefault();
    const newNote = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/notes/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        userNote,
        appId: id
      })

    });
    
    const newNoteJson = await newNote.json();
    
    if(newNoteJson) {
      setNotes(prevArray => {
        const copy = [...prevArray];
        copy.push(newNoteJson);
        return copy;
      });
    }
  };

  const handleDeleteNote = async (id, index) => {
    const deleted = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/notes/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const deletedJson = await deleted.json();
    

    if(deletedJson) {
      setNotes(prevArray => {
        const copy = [...prevArray];
        copy.splice(index, 1);
        return copy;
      });
    }
  };
 
  const noteItems = notes.map((note, index) => (
    <li key={note.id}>
      
      <SingleNote {...note} index={index} handleDeleteNote={handleDeleteNote}/>
    </li>
  ));

  return (
    <div>
      <p>view/add notes </p>
      <form onSubmit={createNewNote}>
        <input placeholder="new note" onChange={(e) => setUserNote(e.target.value)}/>
        <button type="submit">add note</button>
      </form>
      <ul>
        {noteItems}
      </ul>
    </div>
  );};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      note: PropTypes.string,
      id: PropTypes.string.isRequired,
    })
  )
};

export default NoteList;

