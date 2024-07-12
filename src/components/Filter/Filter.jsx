import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    username: '',
    name: '',
    email: '',
    website: '',
    phone: '',
    'company.name': '',
    'company.catchPhrase': '',
    'company.bs': '',
    'address.city': '',
    'address.street': '',
    'address.suite': '',
    'address.zipcode': '',
    'address.geo.lat': '',
    'address.geo.lng': ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      {Object.keys(filters).map((filter) => (
        <div key={filter} className="input-group">
          <label className="capitalize">
            {filter.replace('.', ' ')}:
            <div className="input-with-icon">
              <FiSearch className="search-icon" />
              <input
                type="text"
                name={filter}
                value={filters[filter]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="input-with-search"
              />
            </div>
          </label>
        </div>
      ))}
    <button className="submitButton" type="submit">Apply</button>
  </form>
  );
};
export default Filter;