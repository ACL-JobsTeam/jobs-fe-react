/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import SearchComponent from '../../components/search/SearchComponent';
import { fetchAllJobs, fetchJobsByCompany } from '../../utils/searchUtils';

const Search = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchAndCompanyJobs, setSearchAndCompanyJobs] = useState([]);
  const [pages] = useState(jobs.length / 18);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const dataLimit = 18;
  const pageWindowSize = 10;

  useEffect(() => {
    if (selectedCompany === '') {
      fetchAllJobs().then(setJobs);
    } else if (selectedCompany) {
      fetchJobsByCompany(selectedCompany).then(setJobs).then(setCurrentPage(1));
      const reFiltered = filteredJobs.filter((job) =>
        job.company.toLowerCase.includes(selectedCompany.toLowerCase())
      );
    } 
      setSearchAndCompanyJobs(reFiltered);
    }
    console.log('this filter is set', searchAndCompanyJobs);
  }, [selectedCompany]);

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
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;

    if (filteredJobs.length === 0) return jobs.slice(startIndex, endIndex);
    else if (filteredJobs) return filteredJobs.slice(startIndex, endIndex);
    else searchAndCompanyJobs.length > 0;
    return searchAndCompanyJobs.slice(startIndex, endIndex);
  };

  const getPageGroup = () => {
    const start =
      Math.floor((currentPage - 1) / pageWindowSize) * pageWindowSize;
    return new Array(10).fill().map((_, idx) => start + idx + 1);
  };

  const companyFilter = (e) => {
    e.preventDefault();
    setSelectedCompany(e.target.value);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === '') return;
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
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
        companyFilter={companyFilter}
        selectedCompany={selectedCompany}
        handleSearchTerm={handleSearchTerm}
        searchTerm={searchTerm}
        searchSubmit={searchSubmit}
        searchAndCompanyJobs={searchAndCompanyJobs}
      />
    </div>
  );
};

export default Search;
