import React, { useState, useEffect } from 'react';
import SearchComponent from '../../components/search/SearchComponent';
import { fetchAllJobs } from '../../utils/searchUtils';

const Search = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    fetchAllJobs.then(setJobs).then(setLoading);
  }, [jobs]);

  return (
    <div>
      {loading ? <span>Loading...</span> : <SearchComponent jobs={jobs} />}
    </div>
  );
};

export default Search;
