import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccordionListWithSearch from './components/AccordionListWithSearch/AccordionListWithSearch';
import './App.css';

const App = () => {
  const [source, setSource] = useState([]);
  const [filteredSource, setFilteredSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilter = (filters) => {
    const filtered = source.filter(user => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        if (key.includes('company')) {
          const companyKey = key.split('company.')[1];
          return user.company[companyKey].toLowerCase().includes(filters[key].toLowerCase());
        }
        if (key.includes('address')) {
          const addressKey = key.split('address.')[1];
          if (addressKey === 'geo') {
            return user.address.geo.lat.includes(filters[key]) || user.address.geo.lng.includes(filters[key]);
          }
          return user.address[addressKey].toLowerCase().includes(filters[key].toLowerCase());
        }
        return user[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });
    setFilteredSource(filtered);
  };

  const getData = updatedData => {
    console.log('referance object method: ', updatedData);
    setFilteredSource(updatedData);
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSource(data);
        setFilteredSource(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <AccordionListWithSearch
        filteredSource={filteredSource}
        onFilter={handleFilter}
        getData={getData}
      />
    </div>
  );
}

export default App;
