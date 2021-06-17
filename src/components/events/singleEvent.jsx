import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    
  },
  media: {
    height: 140,
  },

});

const SingleEvent = ({ eventDate, eventName, id, index, handleDeleteEvent }) => {
  const classes = useStyles();
  return (
    <>
        <Card className={classes.root}>
        <CardContent>
          <Typography key={id} variant="body2" color="info.main" component="p">
          {new Date(eventDate).toDateString()} : {eventName}
          </Typography>
          <CardActions>
            <Button size="small" color="secondary" onClick={() => handleDeleteEvent(id, index)}>
          Delete
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );};

SingleEvent.propTypes = {
  index: PropTypes.number.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired
};

export default SingleEvent;
