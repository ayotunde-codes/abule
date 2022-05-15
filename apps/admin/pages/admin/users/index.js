import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Fn } from '@abule-common/components';
import Layout from '../../../components/admin/layout';
import UserList from '../../../components/admin/lists/UserList';
import GenericList from '../../../components/admin/lists/GenericList';
import ListPageHeader from '../../../components/admin/lists/ListPageHeader/header';
import SecondaryNav from '../../../components/admin/lists/ListPageHeader/secondaryNav';
import { ExportCSV } from '../../../components/admin/lists/ListPageHeader/buttonExport';
import Filters from '../../../components/admin/lists/ListPageHeader/Filter';

const {
  popMessage, getIDSFromList, isEmpty,
} = Fn;

const initialFilterState = {
  state: '',
  city: '',
  zipCode: '',
  from: '',
  to: '',
  distance: '',
};

const Page = ({ setActivePage }) => {
  const [title, setTitle] = useState('');
  const [selectedData, setSelectedData] = useState([]);
  const [list, setList] = useState([]);
  const [exportedData, setExportedData] = useState([]);
  const [filter, setFilter] = useState(initialFilterState);
  const [groupSelect, setGroupSelect] = useState(false);

  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${admin?.data?.token}` },
        };
        const res = await axios.get(`${process.env.REACT_APP_API}/admin/users`, config);
        console.log(res.data);
        setList(res.data.data.users);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUserList();
    setTitle('List of Users');
    setActivePage('users');
  }, []);

  useEffect(() => {
    setSelectedData([]);
  }, [list]);

  useEffect(() => {
    if (!groupSelect) setSelectedData([]);
  }, [groupSelect]);

  useEffect(() => {
    const getListTobeExported = () => {
      if (selectedData.length <= 0) {
        setExportedData(getIDSFromList(list));
      } else {
        setExportedData(selectedData);
      }
    };
    getListTobeExported();
  }, [selectedData]);

  const switchList = (withFilters = false) => {
    if (title === 'Waitlist') {
      getWaitlist(withFilters);
    } else if (title === 'Ambassadors') {
      getAmbassadorsList(withFilters);
    } else {
      getActiveUsers(withFilters);
    }
  };

  const onSaveFilter = () => {
    switchList(true);
  };

  const onResetFilter = () => {
    switchList(true);
  };

  const getActiveUsers = async (withFilters = false) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${admin?.data?.token}` },
        params: {},
      };
      if (withFilters) {
        if (!isEmpty(filter.from)) config.params.from = filter.from;
        if (!isEmpty(filter.to)) config.params.to = filter.to;
        if (!isEmpty(filter.city)) config.params.city = filter.city;
      } else {
        setFilter(initialFilterState);
      }
      const res = await axios.get(`${process.env.REACT_APP_API}/admin/users`, config);
      if (withFilters && res.data.data.users.length === 0) {
        popMessage(
          `<div>
                        <span>Sorry</span>
                        <div>No results for Search</div> 
                    </div>`,
          'adminApp_message',
        );
        return;
      }
      setList(res.data.data.users);
    } catch (e) {
      console.log(e);
      setList([]);
    }
    setTitle('List of Users');
  };

  const getWaitlist = async (withFilters = false) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${admin?.data?.token}` },
        params: {},
      };
      console.log('This idsid vhdf---', withFilters);
      if (withFilters) {
        if (!isEmpty(filter.from)) config.params.from = filter.from;
        if (!isEmpty(filter.to)) config.params.to = filter.to;
      } else {
        setFilter(initialFilterState);
      }
      const res = await axios.get(`${process.env.REACT_APP_API}/admin/waitlists`, config);
      if (withFilters && res.data.data.waitLists.length === 0) {
        popMessage(
          `<div>
                        <span>Sorry</span>
                        <div>No results for Search</div> 
                    </div>`,
          'adminApp_message',
        );
        return;
      }
      setList(res.data.data.waitLists);
    } catch (e) {
      console.log(e);
      setList([]);
    }
    setTitle('Waitlist');
  };

  const getAmbassadorsList = async (withFilters = false) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${admin?.data?.token}` },
        params: {},
      };
      if (withFilters) {
        if (!isEmpty(filter.from)) config.params.from = filter.from;
        if (!isEmpty(filter.to)) config.params.to = filter.to;
      } else {
        setFilter(initialFilterState);
      }
      const res = await axios.get(`${process.env.REACT_APP_API}/admin/ambassadors`, config);
      if (withFilters && res.data.data.ambassadors.length === 0) {
        popMessage(
          `<div>
                        <span>Sorry</span>
                        <div>No results for Search</div> 
                    </div>`,
          'adminApp_message',
        );
        return;
      }
      setList(res.data.data.ambassadors);
    } catch (e) {
      console.log(e);
      setList([]);
    }
    if (!withFilters) setFilter(initialFilterState);
    setTitle('Ambassadors');
  };

  return (
    <>
      <Head>
        <title>Abule - Users</title>
      </Head>
      <div id="root" className="adminApp_listPage_container">
        <ListPageHeader
          title={title}
          firstName={admin?.data?.firstName}
          lastName={admin?.data?.lastName}
          role={admin?.data?.adminRole?.name}
        />
        <SecondaryNav>
          <div onClick={() => getActiveUsers()} className={`nav_links ${title === 'List of Users' ? 'active' : ''}`}>
            <span className="text">Active Users</span>
            <div className="pill" />
          </div>
          <div onClick={() => getWaitlist()} className={`nav_links ${title === 'Waitlist' ? 'active' : ''}`}>
            <span className="text">Waitlist</span>
            <div className="pill" />
          </div>
          <div onClick={() => getAmbassadorsList()} className={`nav_links ${title === 'Ambassadors' ? 'active' : ''}`}>
            <span className="text">Ambassadors</span>
            <div className="pill" />
          </div>
        </SecondaryNav>
        <div className="adminApp_filter_container">
          <Filters
            setFilter={setFilter}
            filter={filter}
            setList={setList}
            onResetFilter={onResetFilter}
            onSaveFilter={onSaveFilter}
            title={title}
            token={admin?.data?.token}
          />
          <ExportCSV
            list={exportedData}
            listType={title}
            token={admin?.data?.token}
          />
        </div>
        <div onClick={() => setGroupSelect(!groupSelect)} className="adminApp_selectAll">Select all</div>
        {
          title === 'List of Users'
            ? (
              <UserList
                title="users"
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                list={list}
                groupSelect={groupSelect}
                setGroupSelect={setGroupSelect}
              />
            )
            : (
              <GenericList
                title={title}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                list={list}
                groupSelect={groupSelect}
                setGroupSelect={setGroupSelect}
              />
            )
        }
      </div>
    </>
  );
};

const Users = () => (
  <Layout>
    <Page />
  </Layout>
);

export default Users;
