import axios from 'axios';
import React, { useState } from 'react';
import { Header, Search, Body } from './components';

const App = () => {
  const [body, setBody] = useState('');
  const [param, setParam] = useState([]);
  const [header, setHeader] = useState([]);
  const [searchMethod, setSearchMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendRequest = async () => {
    const headersObj = {};
    header.forEach((item) => {
      headersObj[item.key] = item.value;
    });
    setResponse();
    setError(false);
    setErrorMessage('');
    setLoading(true);
    try {
      const response = await axios({
        method: searchMethod,
        url: url,
        data: JSON.stringify(body),
        headers: headersObj,
      });
      setLoading(false);
      setResponse(response);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <Header />
      <Search
        searchMethod={searchMethod}
        setSearchMethod={setSearchMethod}
        url={url}
        setUrl={setUrl}
        sendRequest={sendRequest}
      />
      <Body
        searchMethod={searchMethod}
        body={body}
        setBody={setBody}
        param={param}
        setParam={setParam}
        header={header}
        setHeader={setHeader}
        url={url}
        setUrl={setUrl}
        loading={loading}
        response={response}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default App;
