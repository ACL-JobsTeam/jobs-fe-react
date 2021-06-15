/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import SearchComponent from '../../components/search/SearchComponent';
import { fetchAllJobs } from '../../utils/searchUtils';

const Search = () => {
  const [jobs, setJobs] = useState([]);
  const [pages] = useState(jobs.length / 18);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAllJobs().then(setJobs);
  }, []);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = ({ target }) => {
    const pageNumber = Number(target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * 18 - 18;
    const endIndex = startIndex + 18;
    return jobs.slice(startIndex, endIndex);
  };

  const getPageGroup = () => {
    const start = Math.floor((currentPage - 1) / 10) * 10;
    return new Array(10).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <SearchComponent
        jobs={jobs}
        previous={goToPreviousPage}
        next={goToNextPage}
        currentPage={currentPage}
        pages={pages}
        getPageGroup={getPageGroup}
        changePage={changePage}
        getPaginatedData={getPaginatedData}
      />
    </div>
  );
};

export default Search;
