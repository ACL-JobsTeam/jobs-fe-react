/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { imageFinder } from '../../utils/imageUtil';

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
    height: '70%',
    top: '100px',
    display: 'grid',
    gridTemplateColumns: '450px 450px 450px',
    gridTemplateRows: '450px 450px 450px',
    justifyContent: 'space-evenly',
  },
  content: {
    height: '70px',
    overflow: 'hidden',
  },
});

const SearchList = ({ getPaginatedData }) => {
  const classes = useStyles();

  const handleSaveJob = async ({ title, company, url }) => {
    const savedJob = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/jobs/savejob`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, company, url }),
      }
    );
  };

  return (
    <div className={classes.container}>
      {getPaginatedData().map((job) => (
        <Card className={classes.root} key={job.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="job listing"
              height="140"
              image={imageFinder(job.company)}
              title="Job Listing"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h3"
                className={classes.content}
              >
                {job.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.content}
              >
                {job.location}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={() => handleSaveJob(job)}
              size="small"
              color="primary"
            >
              save
            </Button>
            <Button size="small" color="primary">
              <a href={job.url}>Learn More</a>
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

SearchList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      post_date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  getPaginatedData: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default SearchList;
