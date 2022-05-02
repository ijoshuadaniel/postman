import React from 'react';
import './index.scss';

const Search = ({
  searchMethod,
  setSearchMethod,
  url,
  setUrl,
  sendRequest,
}) => {
  const selectOptions = ['GET', 'POST', 'PUT', 'DELETE'];
  const handleChange = (e) => {
    setSearchMethod(e.target.value);
  };

  return (
    <div className='col-md-12 mt-3 d-flex justify-content-center search'>
      <select
        className='custom-select search-select'
        value={searchMethod}
        onChange={handleChange}
      >
        {selectOptions.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
      <input
        type='text'
        placeholder='https://'
        className='search-input'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className='search-button' onClick={() => sendRequest()}>
        Send
      </button>
    </div>
  );
};

export default Search;
