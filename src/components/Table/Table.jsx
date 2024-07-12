import React, { useEffect, useState, useCallback } from 'react';
import { TABLE_CONS, TABLE_HEADER, ERROR_MESSAGE } from './constants';
import { ImMoveUp } from "react-icons/im";
import { FaCopy } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const Table = ({ filteredSource, getData }) => {

  const [expandedRows, setExpandedRows] = useState({});
  const [updatedData, setUpdatedData] = useState(filteredSource);

  const arrangeData = useCallback((data) => {
    return [...data].sort((a, b) => a.id - b.id);
  }, []);

  const toggleRow = (id) => {
    setExpandedRows(prevState => ({
      [id]: !prevState[id]
    }));
  };

  useEffect(() => {
    setUpdatedData(filteredSource);
    setExpandedRows({});
  }, [filteredSource]);

  const moveRowUp = (id) => {
    const index = updatedData.findIndex(item => item.id === id);
    if (index > 0) {
      const newData = [...updatedData];

      const temp = newData[index];
      newData[index] = newData[index - 1];
      newData[index - 1] = temp;

      newData[index].id = index + 1;
      newData[index - 1].id = index;

      setUpdatedData(newData);
    }
  };

  const getDataAndCopy = () => {
    const jsonData = JSON.stringify(arrangeData(updatedData), null, 2);
    getData(arrangeData(updatedData));
    navigator.clipboard.writeText(jsonData)
      .then(() => {
        console.log('Coppied');
        toast.success('Coppied', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.error(ERROR_MESSAGE, err);
      });
  };

  const renderDetails = (user) => (
    <tr className="detail-row">
      <td colSpan="4">
        <div className='detail-body'>
          <b className='paddingRightDetailText'>{TABLE_CONS.EMAIL}:</b> {user.email}<br />
          <b className='paddingRightDetailText'>{TABLE_CONS.PHONE}:</b> {user.phone}<br />
          <b className='paddingRightDetailText'>{TABLE_CONS.WEBSITE}:</b> {user.website}<br />
          <b className='paddingRightDetailText'>{TABLE_CONS.ADDRESS}:</b> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}<br />
          <b className='paddingRightDetailText'>{TABLE_CONS.COMPANY}:</b> {user.company.name} <br />
          <div className='companySection'>
            <b className='paddingRightDetailText'>- {TABLE_CONS.COMPANY_BS}:</b> {user.company.bs} <br />
            <b className='paddingRightDetailText'>- {TABLE_CONS.COMPANY_CATCH_PHRASE}:</b> {user.company.catchPhrase} <br />
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{TABLE_HEADER.ID}</th>
            <th>{TABLE_HEADER.USERNAME}</th>
            <th>{TABLE_HEADER.NAME}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrangeData(updatedData).map(user => (
            <React.Fragment key={user.id}>
              <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>
                  <button className='upIcon' onClick={() => moveRowUp(user.id)}><ImMoveUp /></button>
                  <button className='toggleIcon' onClick={() => toggleRow(user.id)}>
                    {expandedRows[user.id] ? '▲' : '▼'}
                  </button>
                </td>
              </tr>
              {expandedRows[user.id] && renderDetails(user)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className='getDataBtn'>
        <button onClick={getDataAndCopy}>Test Referance Object Method and Copy as JSON <FaCopy /></button>
      </div>
    </>
  )
}

export default Table;