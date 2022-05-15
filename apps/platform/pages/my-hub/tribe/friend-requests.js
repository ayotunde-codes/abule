/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../../components/general/Layout';
import UserConnectCard from '../../../components/UserConnectCard';

class TribeFriendRequest extends React.Component {
  render() {
    const { props, state } = this;
    const { sessionUser } = props.settings;
    const userFriends = sessionUser.friends;
    const approvedFriends = userFriends.approved;
    const pendingFriends = userFriends.pending;
    const groupUsers = userFriends.approved.groups;
    const { unassigned } = userFriends.approved;

    return (
      <Layout {...props}>
        <div id="myHub">
          <div className="my-tribe">
            <div className="sg_tribe_section">
              <h3 className="big">Pending Request</h3>
              <div className="hub_tribe_container">
                {pendingFriends.map((request) => (
                  <div className="tribe_box">
                    <UserConnectCard
                      {...props}
                      type="tribeMember"
                      user={request.sender}
                      friendshipId={request.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(null)(TribeFriendRequest);
