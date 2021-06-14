import React, { useState, useEffect } from 'react';
import SearchComponent from '../../components/search/SearchComponent';
import { fetchAllJobs } from '../../utils/searchUtils';

const Search = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(async () => {
    const fetchedJobs = await fetchAllJobs();
    setJobs(fetchedJobs);
  }, [jobs]);

  return (
    <div>
      <SearchComponent />
    </div>
  );
};

export default Search;
