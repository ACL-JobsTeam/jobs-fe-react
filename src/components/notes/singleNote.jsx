import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import style from './note.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    
  },
  media: {
    height: 140,
  },

});
const SingleNote = ({ userNote, id, index, handleDeleteNote }) => {
  const classes = useStyles();

  return (
    <>
     
      <Card className={classes.root}>
        <CardContent>
          <Typography className={style.noteContent} key={id} variant="body2" color="info.main" component="p">
            {userNote} 
          </Typography>
          <CardActions>
            <Button size="small" color="secondary" onClick={() => handleDeleteNote(id, index)}>
          Delete
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      
    </>

  );};

SingleNote.propTypes = {
  index: PropTypes.number.isRequired,
  userNote: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteNote: PropTypes.func.isRequired
};

export default SingleNote;

