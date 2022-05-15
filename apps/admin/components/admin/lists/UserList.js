import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Fn } from '@abule-common/components';
import CautionIcon from '../icons/caution-ico';
import DeleteIcon from '../icons/del-ico';
import UserIcon from '../icons/user-ico';

const {
  useWindowSize,
} = Fn;

const deleteHandler = async () => {
  console.log('Deleted a user-------');
};

const CardElement = ({
  userId,
  firstName,
  lastName,
  email,
  phoneNumber,
  imageUrl,
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
      selectedData.indexOf(userId) < 0 && selectCard();
    } else {
      setIsActive(false);
    }
  }, [groupSelect]);

  useEffect(() => {
    const getCurrentSelections = () => {
      const index = selectedData.indexOf(userId);
      index > -1 ? setIsActive(true) : setIsActive(false);
    };
    getCurrentSelections();
  }, [selectedData]);

  const gotoUser = () => router.push(`${title.toLowerCase()}/${userId}`);

  const selectCard = () => {
    const index = selectedData.indexOf(userId);
    if (index > -1) {
      const data = [...selectedData];
      data.splice(index, 1);
      setSelectedData(data);
      setIsActive(false);
    } else {
      setSelectedData((currentData) => [...currentData, userId]);
      setIsActive(true);
    }
  };

  return (
    <div className={`adminApp_card_userList adminApp_card ${isActive ? 'adminApp_card_active' : ''}`}>
      <div>
        <div onClick={selectCard} className="adminApp_listSelect_container">
          <div className="adminApp_list_select" />
        </div>
        {
          imageUrl === '' || imageUrl === undefined || !imageUrl
            ? <div onClick={gotoUser} className="adminApp_cardAvatar"><UserIcon className="black-fill" /></div>
            : <img onClick={gotoUser} className="adminApp_cardAvatarImg" src={imageUrl} alt="user photo" />
        }
      </div>
      <div className="adminApp_cardDetails">
        <div onClick={gotoUser} className="adminApp_card_detailsPrimary">
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
          <div onClick={gotoUser}>
            <span>{email}</span>
            <span className="adminApp_phone">{phoneNumber}</span>
          </div>
          <div>
            <span onClick={gotoUser} className="adminApp_location">
              <span>{city}, </span>
              <span>{state}</span>
            </span>
            <span className="adminApp_actions">
              <CautionIcon />
              <DeleteIcon deletehandler={deleteHandler} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListElement = ({
  userId,
  firstName,
  lastName,
  email,
  phoneNumber,
  imageUrl,
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
      selectedData.indexOf(userId) < 0 && selectCard();
    } else {
      setIsActive(false);
    }
  }, [groupSelect]);

  useEffect(() => {
    const getCurrentSelections = () => {
      const index = selectedData.indexOf(userId);
      console.log(index);
      index > -1 ? setIsActive(true) : setIsActive(false);
    };
    getCurrentSelections();
  }, [selectedData]);

  const gotoUser = () => router.push(`${title.toLowerCase()}/${userId}`);

  const selectCard = () => {
    const index = selectedData.indexOf(userId);
    if (index > -1) {
      const data = [...selectedData];
      data.splice(index, 1);
      setSelectedData(data);
      setIsActive(false);
    } else {
      setSelectedData((currentData) => [...currentData, userId]);
      setIsActive(true);
    }
  };

  return (
    <div className={`adminApp_list ${isActive ? 'adminApp_list_active' : ''}`}>
      <div onClick={selectCard} className="adminApp_listSelect_container">
        <div className="adminApp_list_select" />
      </div>
      {
        imageUrl === '' || imageUrl === undefined || !imageUrl
          ? <div className="adminApp_avatar"><UserIcon className="black-fill" /></div>
          : <img className="adminApp_avatarImage" src={imageUrl} alt="user photo" />
      }
      <div className="adminApp_listTable_user_headerDetails">
        <span onClick={gotoUser}>{firstName}</span>
        <span onClick={gotoUser}>{lastName}</span>
        <span onClick={gotoUser}>{email}</span>
        <span onClick={gotoUser}>{phoneNumber}</span>
        <span onClick={gotoUser}>{city}</span>
        <span onClick={gotoUser}>{state}</span>
        <span className="user_actions">
          <CautionIcon />
          <DeleteIcon
            deletehandler={deleteHandler}
            identity="user"
          />
        </span>
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
        <div className="adminApp_avatar" />
        <div className="adminApp_listTable_user_headerDetails">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Email</span>
          <span>Phone Number</span>
          <span>City</span>
          <span>State</span>
          <span className="user_actions">Actions</span>
        </div>
      </div>
      <div className="adminApp_listTable">
        {
          windowSize > 875
            ? list?.map((data) => <ListElement key={data.id} userId={data?.id} {...data?.userProfile} groupSelect={groupSelect} email={data?.email} title={title} selectedData={selectedData} setSelectedData={setSelectedData} />)
            : list?.map((data) => <CardElement key={data.id} userId={data?.id} {...data?.userProfile} groupSelect={groupSelect} email={data?.email} title={title} selectedData={selectedData} setSelectedData={setSelectedData} />)
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
