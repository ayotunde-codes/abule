/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Fn } from '@abule-common/components';
import Layout from '../../components/general/Layout';

import { updateHeader, setInfo } from '../../redux/settings/action';
import PageLoader from '../../components/general/PageLoader';

const {
  popAlert, lcFirst, ucFirst,
} = Fn;
// import UserRequestCard from '../../components/tribe/userRequest';

const UserFriendRequest = (props) => {
  const { fetchRequest, onPageLoad } = props;
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    friendRequests: [],
    groups: [],
    loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchRequest({
          url: `${process.env.REACT_APP_API}/tribe`,
        });
        setState({
          ...data,
          loading: false,
        });
      } catch (e) {
        alert('got error');
      }
    })();
  }, []);

  const treatCategoryTitle = (str) => {
    const strArr = str.replace('&', ' ').split(' ');
    return strArr.map((word, index) => (index === 0 ? lcFirst(word) : ucFirst(word))).join('');
  };
  const setFriends = (tribeId) => {
    const restoreTribe = () => state.friendRequests.filter((item) => item.id !== tribeId);
    setState({ ...state, friendRequests: restoreTribe(tribeId) });
  };
  const setTribeUsers = () => {
    popAlert({
      title: 'Tribe Accepted',
    });
  };

  const { users, groups } = state;
  return (
    <Layout {...props}>
      <div id="myHub">
        <div className="my-tribe">

          {state.loading ? (
            <>
              {/* <HubHeader {...props} /> */}
              <div style={{ marginTop: '27%' }}>
                <PageLoader inline />
              </div>
            </>
          ) : (
            <>
              {/* <HubHeader {...props} /> */}
              <div className="sg_tribe_section">
                <h3 className="big">Pending Request</h3>
                <div className="hub_tribe_container">
                  {state.friendRequests && state.friendRequests.length > 0 ? state.friendRequests.map((user) => (
                    <div className="tribe_box">
                      {/*  <UserRequestCard
                        {...props}
                        tribe={user}
                        setFriends={setFriends}
                        setTribeUsers={setTribeUsers}
                        groups={groups}
                        singleGroup
                        move={false}
                        tribeCheck
                      /> */}
                    </div>
                  )) : ''}
                </div>
              </div>

            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

// const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
});
export default connect(null, mapDispatchToProps)(UserFriendRequest);
