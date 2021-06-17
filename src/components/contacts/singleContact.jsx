import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import style from './contact.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    
  },
  media: {
    height: 140,
  },

});

const SingleContact = ({ companyContact, id, index, handleDeleteContact }) => {
  const classes = useStyles();
  
  return (
    <>
<Card className={classes.root}>
        <CardContent>
          <Typography className={style.contactContent} key={id} variant="body2" color="textSecondary" component="p">
            {companyContact} 
          </Typography>
          <CardActions>
            <Button size="small" color="secondary" onClick={() => handleDeleteContact(id, index)}>
          Delete
            </Button>
          </CardActions>
        </CardContent>
      </Card>

    </>
  );};

SingleContact.propTypes = {
  index: PropTypes.number.isRequired,
  companyContact: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteContact: PropTypes.func.isRequired
};

export default SingleContact;
