/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import style from './list.module.css';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: '88vh',
    zIndex: 1,
  },
}));

const SearchInput = ({
  companyFilter,
  handleSearchTerm,
  searchSubmit,
  companyReset,
}) => {
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
    <div className={style.searchHeader}>
      <form className={style.companySection}>
        {companies.map((company) => (
          <label key={company.name} className={style[company.name]}>
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
          className={classes.searchBar}
        />
        <button type="submit" value="Submit" className={style.searchButton}>
          <img
            src="https://img.icons8.com/pastel-glyph/64/000000/search--v3.png"
            className={style.searchImg}
          />
        </button>
      </form>
      <div className={style.resetContainer}>
        <button onClick={companyReset} className={style.resetButton}>
          Reset
        </button>
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  companyFilter: PropTypes.func.isRequired,
  selectedCompany: PropTypes.string.isRequired,
  handleSearchTerm: PropTypes.func.isRequired,
  searchSubmit: PropTypes.func.isRequired,
  companyReset: PropTypes.func.isRequired,
};

export default SearchInput;
