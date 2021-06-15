import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import SearchList from './SearchList';

const SearchComponent = ({ jobs }) => {
  return (
    <div className="search-component">
      <SearchInput />
      <SearchList jobs={jobs} />
    </div>
  );
};

SearchComponent.propTypes = {
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
};

export default SearchComponent;
