import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SingleNote from './singleNote';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import style from './note.css';


import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  
  
});

const NoteList = ({ notes, setNotes }) => {
  const classes = useStyles();
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
    <li className={style.listItem} key={note.id}>
      
      <SingleNote {...note} index={index} handleDeleteNote={handleDeleteNote}/>
    </li>
  ));

  return (
    <>
      <p className={style.notesIntro}>Notes</p>
      <form onSubmit={createNewNote}>
        <span >
          <textarea className={style.noteInput} placeholder="The interviewer had kind eyes" onChange={(e) => setUserNote(e.target.value)}/>
        </span>
        <CardActions>
          <span  className={style.noteButton}>
            <Button type="submit" size="large" color="primary">
        Add Note&gt; 
            </Button>
          </span> 
        </CardActions>
      </form>
        
      <ul className={style.listContainer}>
        {noteItems}
      </ul>
    
    </>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      note: PropTypes.string,
      id: PropTypes.string.isRequired,
    })
  )
};

export default NoteList;




/* <div>
      
  <form onSubmit={createNewNote}>
       
    <button type="submit">add note</button>
  </form>
  <ul>
    {noteItems}
  </ul>
</div>;

*/
