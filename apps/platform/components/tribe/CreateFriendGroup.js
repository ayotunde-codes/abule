/* eslint-disable react/prop-types */
/* eslint-disable react/style-prop-object */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  InputField, PopMessage, InputSelectUser
} from '@abule-common/components';

class CreateFriendGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || '',
      description: props.description || '',
      members: [],
      showUsersSelectionPage: false,
      showNewGroupForm: true,
    };

    this.saveNewGroup = this.saveNewGroup.bind(this);
  }

  async saveNewGroup() {
    try {
      const { props, state } = this;
      const { sessionUser } = props.settings;
      const { name, description, members } = state;
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/tribe/groups`,
        method: 'POST',
        body: JSON.stringify({
          name,
          description,
          userIds: members.map((user) => user.userId),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      props.onSuccess({
        name,
        description,
        members,
      });
      props.onCancel();
      /*  popAlert({
        title: 'Group Created',
        description: `${capitalize(name)} group created successfully`,
      }); */
      props.setSessionUser({
        ...sessionUser,
        ...data,
      });
    } catch (erroRes) {
      console.log('the ress', erroRes);
      // alert('got error');
    }
  }

  render() {
    const { props, state } = this;

    const { sessionUser } = props.settings;
    const userFriends = sessionUser.friends;
    const approvedFriends = userFriends.approved;
    const pendingFriends = userFriends.pending;
    const groupUsers = userFriends.approved.groups;
    const { unassigned } = userFriends.approved;
    const { name, description, members } = state;
    // console.log(members);
    for (const i of []) {

    }
    const allowSubmit = name.length > 3;
    const allApprovedFriendsProfile = Object.values(userFriends.all);// .filter((friend) => !pendingFriends.includes(friend.userId));

    return (
      <div id="AddGroupModal">
        <PopMessage
          show={state.showNewGroupForm}
          message={(
            <>
              <p className="lable">{props.groupId ? 'Update' : 'Create'} Group</p>
              <div>
                <InputField
                  type="text"
                  label="Name"
                  value={name}
                  maxLength={25}
                  onChange={(value) => {
                    this.setState({ name: value });
                  }}
                /><InputField
                  type="textarea"
                  label="Description"
                  maxLength={150}
                  value={description}
                  onChange={(value) => {
                    this.setState({ description: value });
                  }}
                />
              </div>
              {/* </div> */}
            </>
          )}
          confirmButton={{
            label: props.groupId ? 'SAVE' : 'NEXT',
            className: allowSubmit ? 'btn btn-1' : 'btn btn-1 disabled',
            onClick: async (closer, hideLoader) => {
              if (allowSubmit) {
                if (props.groupId) {
                  const data = await props.fetchRequest({
                    url: `${process.env.REACT_APP_API}/tribe/groups/${props.groupId}`,
                    method: 'PATCH',
                    body: JSON.stringify({
                      name: state.name,
                      description: state.description,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });

                  props.setSessionUser({
                    ...sessionUser,
                    ...data,
                  });
                  props.onSuccess({
                    name,
                    description,
                  });
                  closer();
                } else {
                  this.setState({
                    showUsersSelectionPage: true,
                    showNewGroupForm: false,

                  });
                }
              }
              hideLoader();
            },
          }}
          onCancel={() => {
            props.onCancel();
          }}
        />

        {state.showUsersSelectionPage && (
          <div id="picker_tribe">
            <PopMessage
              message={(
                <div id="addNewMember">
                  <InputSelectUser
                    title="Select people to add"
                    values={members}
                    users={[
                      ...allApprovedFriendsProfile,
                    ]}
                    onChange={(value) => {
                      this.setState({ members: value });
                    }}
                  />
                </div>
              )}
              confirmButton={{
                className: members.length > 0 ? 'btn btn-1' : 'btn btn-1 disabled',
                label: 'SAVE',
                onClick: async (closer, hideLoader) => {
                  if (members.length > 0) {
                    await this.saveNewGroup();
                  }
                  hideLoader();
                },
              }}
              cancelButton={{
                show: true,
                label: 'BACK',
                onClick: (closer) => {
                  this.setState({
                    showNewGroupForm: true,
                    showUsersSelectionPage: false,
                  });
                },
              }}
              onCancel={() => {
                props.onCancel();
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

CreateFriendGroup.propTypes = {
  modal: PropTypes.bool,
  user: PropTypes.object,
  groups: PropTypes.array,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

CreateFriendGroup.defaultProps = {
  onCancel: () => { },
  onSuccess: () => { },
};
export default CreateFriendGroup;
