import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import SearchList from './SearchList';

const SearchComponent = ({
  jobs,
  previous,
  next,
  getPageGroup,
  changePage,
  getPaginatedData,
}) => {
  return (
    <div className="search-component">
      <SearchInput />
      <SearchList jobs={jobs} getPaginatedData={getPaginatedData} />
      <section className="pagination">
        <button onClick={previous}>previous</button>
        {getPageGroup().map((page, index) => (
          <button key={index} onClick={changePage}>
            <span>{page}</span>
          </button>
        ))}
        <button onClick={next}>next</button>
      </section>
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
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  getPageGroup: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  getPaginatedData: PropTypes.func.isRequired,
};

export default SearchComponent;
