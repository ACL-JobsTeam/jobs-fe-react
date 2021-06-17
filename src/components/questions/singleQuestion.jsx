import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import style from './question.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    
  },
  media: {
    height: 140,
  },
});

const SingleQuestion = ({ userQuestion, id, index, handleDeleteQuestion }) => {
  const classes = useStyles();
  return (
    <>

      <Card className={classes.root}>
        <CardContent>
          <Typography className={style.questionContent} key={id} variant="body2" color="primary" component="p">
            {userQuestion} 
          </Typography>
          <CardActions>
            <Button size="small" color="secondary" onClick={() => handleDeleteQuestion(id, index)}>
          Delete
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );};

SingleQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  userQuestion: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired
};

export default SingleQuestion;
