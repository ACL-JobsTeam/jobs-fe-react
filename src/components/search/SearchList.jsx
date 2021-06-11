/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stripe from '../../assets/stripe.png';
import jobs from './Joblistings';

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 400,
    backgroundColor: 'whitesmoke',
    margin: '25px',
    boxShadow: '10px 10px 10px 10px grey',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '450px 450px 450px',
    gridTemplateRows: '450px 450px 450px',
    justifyContent: 'space-evenly',
  },
  content: {
    height: '100px',
    overflow: 'hidden',
  },
});

const SearchList = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {jobs.map((job) => (
        <Card className={classes.root} key={job.internal_job_id}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="job listing"
              height="140"
              image={Stripe}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                {job.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.content}
              >
                {job.content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Save
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default SearchList;
