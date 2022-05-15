import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Fn } from '@abule-common/components';

const {
  useWindowSize,
} = Fn;

const CardElement = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  zipCode,
  state,
  city,
  title,
  selectedData,
  setSelectedData,
  groupSelect,
}) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCurrentSelections = () => {
      const index = selectedData.indexOf(id);
      index > -1 ? setIsActive(true) : setIsActive(false);
    };
    getCurrentSelections();
  }, [selectedData]);

  useEffect(() => {
    if (groupSelect) {
      selectedData.indexOf(id) < 0 && selectCard();
    } else {
      setIsActive(false);
    }
  }, [groupSelect]);

  const selectCard = () => {
    const index = selectedData.indexOf(id);
    if (index > -1) {
      const data = [...selectedData];
      data.splice(index, 1);
      setSelectedData(data);
      setIsActive(false);
    } else {
      setSelectedData((currentData) => [...currentData, id]);
      setIsActive(true);
    }
  };

  return (
    <div className={`adminApp_card_ambList adminApp_card ${isActive ? 'adminApp_card_active' : ''}`}>
      <div onClick={() => selectCard()} className="adminApp_listSelect_container">
        <div className="adminApp_list_select" />
      </div>
      <div onClick={() => router.push(`${title.toLowerCase()}/${id}`)} className="adminApp_cardDetails_amb">
        <div className="adminApp_card_detailsPrimary">
          <div>
            <span className="adminApp_label">First Name</span>
            <span className="adminApp_data">{firstName}</span>
          </div>
          <div>
            <span className="adminApp_label">Last Name</span>
            <span className="adminApp_data">{lastName}</span>
          </div>
        </div>
        <div className="adminApp_card_detailsSecondary">
          <div>
            <span>{email}</span>
            <span className="adminApp_phone">{phoneNumber}</span>
          </div>
          <div>
            <span className="adminApp_location">
              <span>{city}, </span>
              <span>{state}</span>
            </span>
            <span className="adminApp_zipCode">{zipCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListElement = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  zipCode,
  state,
  city,
  selectedData,
  setSelectedData,
  title,
  groupSelect,
}) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (groupSelect) {
      selectedData.indexOf(id) < 0 && selectCard();
    } else {
      setIsActive(false);
    }
  }, [groupSelect]);

  useEffect(() => {
    const getCurrentSelections = () => {
      const index = selectedData.indexOf(id);
      console.log(index);
      index > -1 ? setIsActive(true) : setIsActive(false);
    };
    getCurrentSelections();
  }, [selectedData]);

  const selectCard = () => {
    const index = selectedData.indexOf(id);
    if (index > -1) {
      const data = [...selectedData];
      data.splice(index, 1);
      setSelectedData(data);
      setIsActive(false);
    } else {
      setSelectedData((currentData) => [...currentData, id]);
      setIsActive(true);
    }
  };

  return (
    <div className={`adminApp_list ${isActive ? 'adminApp_list_active' : ''}`}>
      <div onClick={() => selectCard()} className="adminApp_listSelect_container">
        <div className="adminApp_list_select" />
      </div>
      <div onClick={() => router.push(`${title.toLowerCase()}/${id}`)} className="adminApp_listTable_amb_headerDetails">
        <span>{firstName}</span>
        <span>{lastName}</span>
        <span>{email}</span>
        <span>{city}</span>
        <span>{state}</span>
        <span>{phoneNumber}</span>
        <span>{zipCode}</span>
      </div>
    </div>
  );
};

const ListTable = ({
  list, selectedData, setSelectedData, groupSelect, setGroupSelect, title,
}) => {
  const windowSize = useWindowSize();
  return (
    <div className="adminApp_listTable_container">
      <div className={`adminApp_listTable_header ${groupSelect ? 'adminApp_header_active' : ''}`}>
        <div className="adminApp_listSelect_container">
          <div className="adminApp_list_select" onClick={() => setGroupSelect(!groupSelect)} />
        </div>
        <div className="adminApp_listTable_amb_headerDetails">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Email</span>
          <span>City</span>
          <span>State</span>
          <span>Phone Number</span>
          <span>Zip Code</span>
        </div>
      </div>
      <div className="adminApp_listTable">
        {
          windowSize > 875
            ? list?.map((data) => <ListElement key={data.id} {...data} title={title} groupSelect={groupSelect} selectedData={selectedData} setSelectedData={setSelectedData} />)
            : list?.map((data) => <CardElement key={data.id} {...data} title={title} groupSelect={groupSelect} selectedData={selectedData} setSelectedData={setSelectedData} />)
        }
      </div>
    </div>
  );
};

const List = (props) => (
  <>
    <ListTable {...props} />
  </>
);

export default List;
