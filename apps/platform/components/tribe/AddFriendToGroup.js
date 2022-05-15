/* eslint-disable react/style-prop-object */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { capitalize } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  InputPicker, PopMessage, Fn,
} from '@abule-common/components';

const {
  getUniqueValues,
} = Fn;

class AddFriendToGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupsId: [],
    };
  }

  async addUserToGroup() {
    const { props, state } = this;
    const { user } = props;

    const { firstName, userId } = user;
    const { sessionUser } = props.settings;
    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/tribe/friends/${userId}/addToGroups`,
        method: 'POST',
        body: JSON.stringify({
          groupsId: state.groupsId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      /* popAlert({
        title: 'Added Successfully',
        description: `${capitalize(firstName)} has been added to group(s)`,
      }); */
      props.setSessionUser({
        ...sessionUser,
        ...data,
      });
    } catch (erroRes) {
      // alert('got error');
      console.log('the ress', erroRes);
    }
  }

  render() {
    const { props, state } = this;
    const { user, type, settings } = props;
    const { sessionUser } = settings;
    const userFriends = sessionUser.friends;
    const userFriendGroups = userFriends.approved.groups;
    // console.log(userFriendGroups);
    const { firstName, userId } = user;

    const groupsAlreadyAMember = userFriendGroups.filter((group) => group.members.includes(userId)).map((group) => group.id);

    const allowSubmit = state.groupsId.length > 0;
    return (
      <>
        <PopMessage
          rootClassName="picker-tribe"
          message={(
            <>
              <p className="picker-tribe-header">Add {capitalize(firstName)} to groups</p>
              <div className="picker-tribe-list">
                <InputPicker
                  picker
                  values={getUniqueValues([...state.groupsId])}
                  className="active"
                  direction="center"
                  rowCount={10}
                  activeType="default"
                  multichoice
                  options={userFriendGroups.map((group) => ({
                    label: capitalize(group.name),
                    value: group.id,
                    disabled: groupsAlreadyAMember.includes(group.id),
                  }))}
                  onChange={(value) => {
                    this.setState({
                      groupsId: [
                        ...value,
                      ],
                    });
                  }}
                  onSave={() => {
                  }}
                />
              </div>
            </>
          )}
          confirmButton={{
            label: 'ADD',
            className: allowSubmit ? 'btn btn-1' : 'btn btn-1 disabled',
            onClick: async (closer, hideLoader) => {
              if (allowSubmit) {
                await this.addUserToGroup();
                closer();
              }

              hideLoader();
            },
          }}
          onCancel={() => {
            props.onCancel();
          }}
        />
      </>
    );
  }
}

AddFriendToGroup.propTypes = {
  tribe: PropTypes.bool,
  tribe: PropTypes.object,
  otherProps: PropTypes.object,
  user: PropTypes.object,
  userFriendGroups: PropTypes.array,
  groupUsers: PropTypes.array,
  usersGroup: PropTypes.array,
  fetchRequest: PropTypes.func,
};

export default AddFriendToGroup;
