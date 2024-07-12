import React from 'react'
import Filter from '../Filter/Filter';
import Table from '../Table/Table';
import './style.css';

const AccordionListWithSearch = ({ filteredSource, onFilter, getData }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-2">
          <Filter onFilter={onFilter} />
        </div>
        <div className="col col-md-10">
          <Table filteredSource={filteredSource} getData={getData} />
        </div>
      </div>
    </div>
  )
}
export default AccordionListWithSearch;