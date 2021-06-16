import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './list.css';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      marginLeft: '500px',
      marginTop: '3vh',
      width: '70ch',
      display: 'flex',
      justifyContent: 'center',
      boxShadow: '10px 10px 10px grey',
    },
  },
}));

const SearchInput = ({ companyFilter, handleSearchTerm, searchSubmit }) => {
  const companies = [
    {
      name: 'lyft',
    },
    {
      name: 'airbnb',
    },
    {
      name: 'stripe',
    },
    {
      name: 'twitch',
    },
    {
      name: 'coinbase',
    },
    {
      name: 'discord',
    },
    {
      name: 'github',
    },
    {
      name: 'reddit',
    },
    {
      name: 'strava',
    },
    {
      name: 'glassdoor',
    },
    {
      name: 'netlify',
    },
    {
      name: 'robinhood',
    },
    {
      name: 'doordash',
    },
  ];

  const classes = useStyles();

  return (
    <div className="search-header">
      <form className="company-section">
        {companies.map((company) => (
          <label key={company.name} className={company.name}>
            {company.name}
            <input
              type="radio"
              id={company.name}
              value={company.name}
              name="companies"
              onClick={(e) => companyFilter(e)}
            />
          </label>
        ))}
      </form>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={searchSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Enter a Job Title"
          variant="outlined"
          onChange={(e) => handleSearchTerm(e)}
        />
        <button type="submit" value="Submit">
          search
        </button>
      </form>
    </div>
  );
};

SearchInput.propTypes = {
  companyFilter: PropTypes.func.isRequired,
  selectedCompany: PropTypes.string.isRequired,
  handleSearchTerm: PropTypes.func.isRequired,
  searchSubmit: PropTypes.func.isRequired,
};

export default SearchInput;
