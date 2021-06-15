import React, { useState, useEffect } from 'react';
import SearchComponent from '../../components/search/SearchComponent';
import { fetchAllJobs } from '../../utils/searchUtils';

const Search = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchAllJobs().then(setJobs);
  }, []);

  return (
    <div>
      <SearchComponent jobs={jobs} />
    </div>
  );
};

export default Search;
