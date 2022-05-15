/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import {
  Fn,
  PopMessage, InputField, Dropdown, InputSelectUser,
} from '@abule-common/components';
import Layout from '../../../components/general/Layout';

import { updateHeader, setInfo } from '../../../redux/settings/action';
import TribeGroup from '../../../components/tribe/TribeGroup';
import HubHeader from '../../../components/myHub/header';
import TribeFilter from '../../../components/tribe/TribeFilter';
import CreateFriendGroup from '../../../components/tribe/CreateFriendGroup';

const {
  popPrompt, popAlert,
} = Fn;

class TribeFriendGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditForm: false,
      showNewMembersPopUp: false,
      group: {
        id: '',
        name: '',
        members: [],
      },
      viewType: 'grid',
      newMembers: [],
      newMembersSearch: '',
      searchResult: false,
    };

    this.addUsersToGroup = this.addUsersToGroup.bind(this);
    this.loadGroup = this.loadGroup.bind(this);
  }

  componentDidMount() {
    this.loadGroup();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.settings.sessionUser) !== JSON.stringify(this.props.settings.sessionUser)) {
      this.loadGroup();
    }
  }

  loadGroup() {
    const { props } = this;
    const { sessionUser } = props.settings;
    const userFriends = sessionUser.friends;
    const groupUsers = userFriends.approved.groups;
    const groupId = Router.query.id;
    const { unassigned } = userFriends.approved;

    let group = null;
    if (groupId === 'unassigned') {
      group = {
        id: 'Unassigned',
        name: 'Unassigned',
        description: 'Tribe not yet assigned',
        members: unassigned,
      };
    } else {
      for (const grp of groupUsers) {
        if (grp.id === groupId) {
          group = grp;
          break;
        }
      }
    }

    if (!group) {
      Router.push(`${props.AppUrl}/my-hub/tribe`);
    }
    this.setState({ group });
  }

  async addUsersToGroup() {
    const { props, state } = this;
    const { sessionUser } = props.settings;
    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/tribe/groups/${state.group.id}/add-users`,
        method: 'POST',
        body: JSON.stringify({
          friendsId: state.newMembers.map((user) => user.userId),
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
      alert('got error');
      console.log('the ress', erroRes);
    }
  }

  render() {
    const { props, state } = this;
    const { sessionUser } = props.settings;
    const userFriends = sessionUser.friends;

    const { newMembers, group } = state;
    const isUnassigned = ['Unassigned', 'unassigned'].includes(group.id);
    const allowSubmit = group.name.length > 3;
    const allApprovedFriendsProfile = Object.values(userFriends.all);// .filter((friend) => !pendingFriends.includes(friend.userId));
    const users = state.searchResult || group.members;

    const newMembersSuggessions = (() => {
      let suggestions = allApprovedFriendsProfile;
      if (state.newMembersSearch.length > 0) {
        suggestions = allApprovedFriendsProfile.filter((user) => new RegExp(state.newMembersSearch, 'gi').test(user.firstName) || new RegExp(state.newMembersSearch, 'gi').test(user.lastName));
      }
      return suggestions;
    })();

    return (
      <>
        <Layout {...props}>
          <div id="myHub">
            <div id="myTribe" className="group">
              <HubHeader {...props} />

              <TribeFilter
                {...props}
                groupId={group.id}
                onResult={(result) => {
                  const newUsers = result.map((user) => user.userId);

                  this.setState({
                    searchResult: newUsers,
                  });
                }}
              />

              <div className="content-label-and-actions ">
                <div className="left">
                  {!isUnassigned ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-1 create-group"
                        onClick={() => {
                          this.setState({
                            showNewMembersPopUp: true,
                          });
                        }}
                      >
                        <span className="icon icon-add" />
                        <span className="text">Add A Friend</span>
                      </button>

                      <Dropdown
                        className="more-actions"
                        onLoad={(e) => {
                          // this.dropdown.categories = e;
                        }}
                        controller={(
                          <span
                            className="controller icon-setting-2"
                          />
                        )}
                        content={(
                          <div className="dropdown">
                            <button
                              type="button"
                              className="no-shadow bordered btn btn-glass"
                              onClick={() => this.setState({ showEditForm: true })}
                            >
                              EDIT GROUP
                            </button>
                            <button
                              type="button"
                              style={{ margin: '0' }}
                              className="no-shadow bordered btn btn-glass"
                              onClick={() => {
                                popPrompt({
                                  warning: true,
                                  message: 'Are you sure you want to delete this group ?',
                                  confirmButton: {
                                    label: 'CONFIRM',
                                    onClick: async (closer) => {
                                      try {
                                        const data = await props.fetchRequest({
                                          url: `${process.env.REACT_APP_API}/tribe/groups/${group.id}`,
                                          method: 'DELETE',
                                          headers: {
                                            'Content-Type': 'application/json',
                                          },
                                        });
                                        Router.push(`${props.AppUrl}/my-hub/tribe`);
                                        popAlert({
                                          title: 'Group Deleted',
                                          // description: `Group has been removed from your tribe successfully`,
                                        });
                                        closer();
                                        props.setSessionUser({
                                          ...sessionUser,
                                          ...data,
                                        });
                                      } catch (error) {
                                        // alert('error we got erre');
                                        // console.log('error', error);
                                        window.location.reload();
                                      }
                                    },
                                  },
                                });
                              }}
                            >
                              DELETE GROUP
                            </button>
                          </div>
                        )}
                        onClose={() => {
                          // this.commitSearch();
                        }}
                      />
                    </>
                  ) : (
                    <div className="all-group-label">
                      Unassigned
                    </div>
                  )}
                </div>
                <div className="right">
                  <div className="view-toogle">
                    <span
                      className={`icon icon-category${state.viewType === 'grid' ? ' active' : ''}`}
                      onClick={() => {
                        this.setState({
                          viewType: 'grid',
                        });
                      }}
                    />
                    <span
                      className={`icon icon-menu-1${state.viewType === 'rows' ? ' active' : ''}`}
                      onClick={() => {
                        this.setState({
                          viewType: 'rows',
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* {group.description && isUnassigned && <div className="tribe-description"> {group.description}</div>} */}

              <div className="main-content">
                <TribeGroup
                  {...props}
                  showDescription
                  viewType={state.viewType}
                  group={{
                    ...group,
                    name: isUnassigned ? null : group.name,
                    members: users.map((friendId) => userFriends.all[friendId]),
                  }}
                />
              </div>

            </div>
          </div>

          {state.showEditFvorm && (
            <div id="AddGroupModal">
              <PopMessage
                message={(
                  <>
                    <p className="lable">Update Group</p>
                    <div>
                      <InputField
                        type="text"
                        label="Name"
                        value={group.name}
                        maxLength={25}
                        onChange={(value) => {
                          this.setState({
                            group: {
                              ...group,
                              name: value,
                            },
                          });
                        }}
                      /><InputField
                        type="textarea"
                        label="Description"
                        maxLength={150}
                        value={group.description}
                        onChange={(value) => {
                          this.setState({
                            group: {
                              ...group,
                              description: value,
                            },
                          });
                        }}
                      />
                    </div>
                    {/* </div> */}
                  </>
                )}
                confirmButton={{
                  label: 'SAVE',
                  className: allowSubmit ? 'btn btn-1' : 'btn btn-1 disabled',
                  onClick: async (closer, hideLoader) => {
                    if (allowSubmit) {
                      const data = await props.fetchRequest({
                        url: `${process.env.REACT_APP_API}/tribe/groups/${group.id}`,
                        method: 'PATCH',
                        body: JSON.stringify({
                          name: group.name,
                          description: group.description,
                        }),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });

                      props.setSessionUser({
                        ...sessionUser,
                        ...data,
                      });
                      closer();
                    }
                    hideLoader();
                  },
                }}
                onCancel={() => {
                  this.setState({ showEditForm: false });
                }}
              />
            </div>

          )}
          {(state.showEditForm) && (
            <CreateFriendGroup
              {...props}
              groupId={group.id}
              name={group.name}
              description={group.description}
              onSuccess={({ name, description }) => {
                this.setState({
                  group: {
                    ...group,
                    name,
                    description,
                  },
                });
              }}
              onCancel={() => {
                this.setState({
                  showEditForm: false,
                });
              }}
            />
          )}

          {state.showNewMembersPopUp
            && (
              <PopMessage
                message={(
                  <div id="addNewMember">
                    <InputSelectUser
                      allowSearch
                      title="Add friends"
                      rejectUsers={group.members}
                      values={newMembers}
                      users={newMembersSuggessions}
                      onSearchInput={(search) => {
                        this.setState({
                          newMembersSearch: search,
                        });
                      }}
                      onChange={(value) => {
                        this.setState({ newMembers: value });
                      }}
                    />
                  </div>
                )}
                confirmButton={{
                  className: newMembers.length > 0 ? 'btn btn-1' : 'btn btn-1 disabled',
                  label: 'SAVE',
                  onClick: async (closer, hideLoader) => {
                    if (newMembers.length > 0) {
                      await this.addUsersToGroup();
                      closer();
                    }
                    hideLoader();
                  },
                }}
                onCancel={() => {
                  // props.onCancel();
                  this.setState({
                    showNewMembersPopUp: false,
                    newMembers: [],
                  });
                }}
              />
            )}

        </Layout>
      </>
    );
  }
}

// const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
});
export default connect(null, mapDispatchToProps)(TribeFriendGroup);
