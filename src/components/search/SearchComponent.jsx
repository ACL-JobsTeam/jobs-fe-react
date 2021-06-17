import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from './SearchInput';
import SearchList from './SearchList';
import './list.css';

const SearchComponent = ({
  jobs,
  previous,
  next,
  getPageGroup,
  changePage,
  getPaginatedData,
  companyFilter,
  selectedCompany,
  currentPage,
  pages,
  handleSearchTerm,
  searchTerm,
  searchSubmit,
  companyReset,
}) => {
  return (
    <div className="search-component">
      <SearchInput
        companyFilter={companyFilter}
        selectedCompany={selectedCompany}
        handleSearchTerm={handleSearchTerm}
        searchSubmit={searchSubmit}
        companyReset={companyReset}
      />
      <SearchList
        jobs={jobs}
        getPaginatedData={getPaginatedData}
        searchTerm={searchTerm}
      />
      <section className="pagination">
        <button
          onClick={previous}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          previous
        </button>
        {getPageGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? 'active' : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={next}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button>
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
  companyFilter: PropTypes.func.isRequired,
  selectedCompany: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handleSearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  searchSubmit: PropTypes.func.isRequired,
  companyReset: PropTypes.func.isRequired,
};

export default SearchComponent;
