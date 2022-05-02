import React, { useEffect, useState } from 'react';
import './index.scss';

const Body = ({
  searchMethod,
  body,
  setBody,
  param,
  setParam,
  header,
  setHeader,
  url,
  setUrl,
  loading,
  response,
  error,
  errorMessage,
}) => {
  const tabs = [{ tab: 'PARAMS' }, { tab: 'JSON' }, { tab: 'HEADERS' }];
  const responsetabs = [{ tab: 'BODY' }, { tab: 'HEADERS' }];
  const [tabSelected, setTabSelected] = useState(
    searchMethod === 'GET' ? 'PARAMS' : 'JSON'
  );
  const [responseTabSelected, setResponseTabSelected] = useState('BODY');

  useEffect(() => {
    paramshandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, param]);

  const removeItem = (length, data, cb) => {
    const filtered = data.filter((item, index) => index !== length);
    cb(filtered);
    paramshandle();
  };

  const handleKeyChange = (e, length, data, cb) => {
    const filtered = data.map((item, index) => {
      if (index === length) {
        return { ...item, key: e.target.value };
      } else {
        return item;
      }
    });
    cb(filtered);
  };

  const handleValueChange = (e, length, data, cb) => {
    const filtered = data.map((item, index) => {
      if (index === length) {
        return { ...item, value: e.target.value };
      } else {
        return item;
      }
    });
    cb(filtered);
  };

  const handleAdd = (data, cb) => {
    const newParam = { key: '', value: '' };
    cb([...data, newParam]);
  };

  const paramshandle = () => {
    const params = url.split('?');
    if (param.length > 0) {
      let newUrl = params[0];
      param.forEach((item, index) => {
        if (item.key !== '' && item.value !== '') {
          if (index === 0) {
            newUrl += `?${item.key}=${item.value}`;
          } else {
            newUrl += `&${item.key}=${item.value}`;
          }
        }
      });
      setUrl(newUrl);
    } else {
      setUrl(params[0]);
    }
  };

  const renderHtml = (response) => {
    const array = [];
    Object.entries(response).forEach(([key, value]) => {
      array.push(
        <div className='col-md-12'>
          <span>{key} : </span>
          <span>{value}</span>
        </div>
      );
    });
    console.log(array);
    return array;
  };

  return (
    <>
      <div className='col-md-12 mt-3 body'>
        <div className='col-md-12 body-Tab'>
          {tabs.map((item, index) => (
            <span
              key={index}
              onClick={() => setTabSelected(item.tab)}
              className={`body-TabLink ${
                item.tab === tabSelected ? 'Active' : ''
              }`}
            >
              {item.tab}
            </span>
          ))}
        </div>
        <div className='col-md-12 body-TabBody'>
          {tabSelected === 'PARAMS' && (
            <div className='col-md-12 body-TabBody-Params'>
              <div className='col-md-12 mb-3'>
                <button
                  className='col-md-2 col-sm-4 col-xs-6 addbutton'
                  onClick={() => handleAdd(param, setParam)}
                >
                  Add +
                </button>
              </div>
              <div className='col-md-12  justiy-content-center'>
                {param.map((item, index) => {
                  return (
                    <div className='mb-1' key={index}>
                      <input
                        className='col-md-5 inputText'
                        placeholder='key'
                        value={item.key}
                        onChange={(e) =>
                          handleKeyChange(e, index, param, setParam)
                        }
                      />
                      <input
                        className='col-md-5 inputText'
                        placeholder='value'
                        value={item.value}
                        onChange={(e) =>
                          handleValueChange(e, index, param, setParam)
                        }
                      />
                      <button
                        className='col-md-2'
                        onClick={() => removeItem(index, param, setParam)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {tabSelected === 'JSON' && (
            <div className='col-md-12 text-start '>
              <textarea
                className='col-md-12 inputBody'
                defaultValue={body}
                onChange={(e) => {
                  e.preventDefault();
                  setBody(e.target.value);
                }}
              />
            </div>
          )}
          {tabSelected === 'HEADERS' && (
            <div className='col-md-12 body-TabBody-Params'>
              <div className='col-md-12 mb-3'>
                <button
                  className='col-md-2 col-sm-4 col-xs-6 addbutton'
                  onClick={() => handleAdd(header, setHeader)}
                >
                  Add +
                </button>
              </div>
              <div className='col-md-12  justiy-content-center'>
                {header.map((item, index) => {
                  return (
                    <div className='mb-1' key={index}>
                      <input
                        className='col-md-5 inputText'
                        placeholder='key'
                        value={item.key}
                        onChange={(e) =>
                          handleKeyChange(e, index, header, setHeader)
                        }
                      />
                      <input
                        className='col-md-5 inputText'
                        placeholder='value'
                        value={item.value}
                        onChange={(e) =>
                          handleValueChange(e, index, header, setHeader)
                        }
                      />
                      <button
                        className='col-md-2'
                        onClick={() => removeItem(index, header, setHeader)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='col-md-12 mt-3 body'>
        <div className='col-md-12 body-Tab'>
          {responsetabs.map((item, index) => (
            <span
              key={index}
              onClick={() => setResponseTabSelected(item.tab)}
              className={`body-TabLink ${
                item.tab === responseTabSelected ? 'Active' : ''
              }`}
            >
              {item.tab}
            </span>
          ))}
        </div>
        {error ? (
          <div className='col-md-12 inputText d-flex justify-content-center'>
            {errorMessage}
          </div>
        ) : loading ? (
          <div className='col-md-12 inputText d-flex justify-content-center'>
            Loading...
          </div>
        ) : (
          <div>
            {responseTabSelected === 'BODY' && (
              <div className='col-md-12 text-start '>
                <textarea
                  className='col-md-12 inputBodyResponse'
                  defaultValue={
                    !loading && JSON.stringify(response?.data, null, 10)
                  }
                  readOnly
                />
              </div>
            )}
            {responseTabSelected === 'HEADERS' && (
              <div className='col-md-12 text-start '>
                <div className='col-md-12 inputBodyResponse'>
                  {!loading && response?.headers
                    ? renderHtml(response.headers).map((item, i) => (
                        <div key={i}>{item}</div>
                      ))
                    : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
