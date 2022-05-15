import React, { useState, useEffect } from 'react';
import router from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Fn } from '@abule-common/components';
import UserIcon from '../icons/user-ico';
import EditIcon from '../icons/edit-ico';
import DeleteIcon from '../icons/del-ico';

const {
  useWindowSize, popMessage,
} = Fn;
const CardElement = ({
  id,
  accountStatus,
  firstName,
  lastName,
  email,
  imageUrl,
  adminRole,
  adminDepartment,
  selectedData,
  setSelectedData,
  groupSelect,
  token,
  managerDepartmentName,
  managerDepartmentId,
  fetchAdminList,
}) => {
  const [isActive, setIsActive] = useState(false);

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

  const deleteHandler = async () => {
    try {
      if (department !== managerDepartmentId && (managerDepartmentName === 'Management' || managerDepartmentName === 'Human_Resources')) {
        popMessage(
          `<div>
                        <img src='/icons/error-ico.svg' alt='icon'>
                        <span>Error</span> 
                        <div>Unauthorized</div>
                    </div>`,
          'adminApp_message',
        );
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let route = '';
      if (managerDepartmentName === 'Management' || managerDepartmentName === 'Human_Resources') {
        route = `${process.env.REACT_APP_API}/admin/admins/${id}`;
      } else {
        route = `${process.env.REACT_APP_API}/admin/admins/${id}/department`;
      }

      const { data } = await axios.delete(route, config);
      if (data?.status === 200) {
        await fetchAdminList();
        popMessage(
          `<div>
                        <img src='/icons/success-ico.svg' alt='icon'>
                        <span>Success</span> 
                    </div>`,
          'adminApp_message',
        );
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log(e);
      popMessage(
        `<div>
                    <img src='/icons/error-ico.svg' alt='icon'>
                    <span>Error</span> 
                    <div>Admin has not been deleted</div>
                </div>`,
        'adminApp_message',
      );
    }
  };

  const editHandler = () => {
    if (accountStatus === 'Pending') {
      popMessage(
        `<div>
                    <img src='/icons/error-ico.svg' alt='icon'>
                    <span>Error</span> 
                    <div>Invite pending</div>
                </div>`,
        'adminApp_message',
      );
    } else {
      router.push(`/admin/manage/edit/${id}`);
    }
  };

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
    <div className={`adminApp_card_adminList adminApp_card ${isActive ? 'adminApp_card_active' : ''}`}>
      <div>
        <div onClick={selectCard} className="adminApp_listSelect_container">
          <div className="adminApp_list_select" />
        </div>
        <div className={`adminApp_defaultAvatar ${!imageUrl ? 'bg-gray' : ''}`}>
          {
            imageUrl
              ? <img src={imageUrl} alt="Admin avatar" />
              : <UserIcon className="black-fill" />
          }
        </div>
      </div>
      <div>
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
          <span className="adminApp_email">{email}</span>
          <span>{adminDepartment?.label}</span>
          <div>
            <div className="adminApp_isSuperAdmin">
              <span>Super Admin:</span>
              <span className="adminApp_status">{adminRole?.name === 'SUPER_ADMIN' ? 'Yes' : 'No'}</span>
            </div>
            <div className="adminApp_actions">
              <EditIcon editHandler={editHandler} />
              <DeleteIcon
                identity="admin"
                deletehandler={deleteHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListElement = ({
  id,
  accountStatus,
  firstName,
  lastName,
  email,
  department,
  adminRole,
  adminDepartment,
  selectedData,
  setSelectedData,
  groupSelect,
  token,
  managerDepartmentName,
  managerDepartmentId,
  fetchAdminList,
}) => {
  const [isActive, setIsActive] = useState(false);

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

  const deleteHandler = async () => {
    try {
      if (department !== managerDepartmentId && (managerDepartmentName === 'Management' || managerDepartmentName === 'Human_Resources')) {
        popMessage(
          `<div>
                        <img src='/icons/error-ico.svg' alt='icon'>
                        <span>Error</span> 
                        <div>Unauthorized</div>
                    </div>`,
          'adminApp_message',
        );
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let route = '';
      if (managerDepartmentName === 'Management' || managerDepartmentName === 'Human_Resources') {
        route = `${process.env.REACT_APP_API}/admin/admins/${id}`;
      } else {
        route = `${process.env.REACT_APP_API}/admin/admins/${id}/department`;
      }

      const { data } = await axios.delete(route, config);
      if (data?.status === 200) {
        await fetchAdminList();
        popMessage(
          `<div>
                        <img src='/icons/success-ico.svg' alt='icon'>
                        <span>Success</span> 
                    </div>`,
          'adminApp_message',
        );
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log(e);
      popMessage(
        `<div>
                    <img src='/icons/error-ico.svg' alt='icon'>
                    <span>Error</span> 
                    <div>Admin has not been deleted</div>
                </div>`,
        'adminApp_message',
      );
    }
  };

  const editHandler = () => {
    if (accountStatus === 'Pending') {
      popMessage(
        `<div>
                    <img src='/icons/error-ico.svg' alt='icon'>
                    <span>Error</span> 
                    <div>Invite pending</div>
                </div>`,
        'adminApp_message',
      );
    } else {
      router.push(`/admin/manage/edit/${id}`);
    }
  };

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
      <div className="adminApp_listTable_admin_headerDetails">
        <span>{firstName}</span>
        <span>{lastName}</span>
        <span>{email}</span>
        <span>{adminDepartment?.label}</span>
        <span>{adminRole?.label}</span>
        <span className="adminApp_listTable_admin_actions">
          <EditIcon editHandler={editHandler} />
          <DeleteIcon
            deletehandler={deleteHandler}
            identity="admin"
          />
        </span>
      </div>
    </div>
  );
};

const ListTable = ({
  list, selectedData, setSelectedData, groupSelect, setGroupSelect, fetchAdminList,
}) => {
  const windowSize = useWindowSize();
  const admin = useSelector((state) => state.admin);

  return (
    <div id="root" className="adminApp_listTable_container">
      <div className={`adminApp_listTable_header ${groupSelect ? 'adminApp_header_active' : ''}`}>
        <div className="adminApp_listSelect_container">
          <div className="adminApp_list_select" onClick={() => setGroupSelect(!groupSelect)} />
        </div>
        <div className="adminApp_listTable_admin_headerDetails">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Email</span>
          <span>Department</span>
          <span>Role</span>
          <span className="adminApp_listTable_admin_actions">Actions</span>
        </div>
      </div>
      <div className="adminApp_listTable">
        {
          windowSize > 875
            ? list?.map((item) => (
              <ListElement
                {...item}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                key={item.id}
                token={admin.data?.token}
                managerDepartmentId={admin.data?.department}
                managerDepartmentName={admin?.data?.adminDepartment?.name}
                groupSelect={groupSelect}
                fetchAdminList={fetchAdminList}
              />
            ))
            : list?.map((item) => (
              <CardElement
                {...item}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                key={item.id}
                token={admin.data?.token}
                managerDepartmentId={admin.data?.department}
                managerDepartmentName={admin?.data?.adminDepartment?.name}
                groupSelect={groupSelect}
                fetchAdminList={fetchAdminList}
              />
            ))
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
