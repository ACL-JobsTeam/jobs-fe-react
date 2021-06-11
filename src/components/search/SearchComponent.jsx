import React from 'react';
import SearchInput from './SearchInput';
import SearchList from './SearchList';

const SearchComponent = () => {
  return (
    <div className="search-component">
      <SearchInput />
      <SearchList />
    </div>
  );
};

export default SearchComponent;
