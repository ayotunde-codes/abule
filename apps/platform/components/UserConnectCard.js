import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  PopMessage, Dropdown,
  Fn,
} from '@abule-common/components';
import {
  sessionUserDeleteKid,
  sessionUserUpdateKid,
} from '../redux/settings/action';
import AddTribeModal from './tribe/AddUserToTribe';
import PeopleList from './PeopleList';
import AddFriendToGroup from './tribe/AddFriendToGroup';

const {
  capitalize,
  popAlert,
  popPrompt,
} = Fn;

class UserConnectCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddToGroup: false,
      showMutualFriends: false,
      buttonOneLoading: false,
      buttonTwoLoading: false,
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { settings } = props;
  }

  componentDidUpdate() {
    const { props } = this;
    const { settings } = props;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  closeModal() {
    this.setState({ modal: false });
  }

  async reactToFriendRequest(status) {
    const { props, state } = this;
    if (!state.buttonOneLoading && !state.buttonTwoLoading) {
      const { user } = props;
      const { sessionUser } = props.settings;

      const buttonOneLoading = status === 'approve';
      const buttonTwoLoading = status === 'ignore';
      this.setState({
        buttonOneLoading,
        buttonTwoLoading,
      });
      const userProfile = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/tribe/friends/${user.userId}`,
        body: JSON.stringify({
          status,
        }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setState({
        buttonOneLoading: false,
        buttonTwoLoading: false,
      });
      props.setSessionUser({
        ...sessionUser,
        ...userProfile,
      });
    }
  }

  render() {
    const { props, state } = this;
    const {
      user, type, settings, searchTribe, selected,
    } = props;
    // note the searchTribe and selected props are added for the use cases of search tribe in events on calendar
    const { sessionUser } = settings;
    const userFriends = sessionUser.friends;
    const {
      sentRequests,
      all: allUserFriends,
      pending: pendingFriends,
      approved: approvedFriends,
    } = userFriends;
    const userFriendGroups = approvedFriends.groups;
    const pendingFriendsId = pendingFriends.map(
      (friend) => friend.sender.userId,
    );
    const sentRequestsId = (sentRequests || []).map(
      (friend) => friend.friend.userId,
    );
    const { unassigned } = userFriends.approved;

    // const { mutualFriends } = user;
    const mutualFriends = user.mutualFriends || [];
    const allActions = {
      addToTribe: {
        label: 'Add to Tribe',
        className: 'btn btn-glass no-shadow bordered',
        onClick: () => this.setState({ modal: true }),
      },
      removeFromTribe: {
        label: 'Remove',
        className: 'btn btn-glass no-shadow bordered',
        onClick: () => {
          console.log('the user ', { user, userId: user.userId });
          if (!state.buttonOneLoading && !state.buttonTwoLoading) {
            popPrompt({
              warning: true,
              // title: 'WARNING',
              message: (
                <>
                  <p>
                    Are you sure you want to remove {capitalize(user.firstName)}{' '}
                    from your friend list
                  </p>
                </>
              ),
              confirmButton: {
                label: 'CONFIRM',
                onClick: async (closer) => {
                  this.setState({
                    buttonTwoLoading: true,
                  });
                  const userProfile = await props.fetchRequest({
                    url: `${process.env.REACT_APP_API}/tribe/friends/${user.userId}`,
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  this.setState({
                    buttonTwoLoading: false,
                  });
                  props.setSessionUser({
                    ...sessionUser,
                    ...userProfile,
                  });
                  closer();
                },
              },
            });
          }
        },
      },
      pending: {
        label: 'Pending',
        className: 'btn btn-glass',
        disabled: true,
        // href: `${props.AppUrl}/profile/[id]`,
        // as: `${props.AppUrl}/profile/${user.id}?go-back=true`,
      },
      viewProfile: {
        label: 'View Profile',
        className: 'btn btn-black',
        href: `${props.AppUrl}/profile/[id]`,
        as: `${props.AppUrl}/profile/${user.id}?go-back=true`,
      },
      addToGroup: {
        label: 'Add',
        className: 'btn btn-black no-shadow bordered',
        onClick: () => this.setState({ showAddToGroup: true }),
      },
      removeFromGroup: {
        label: 'Remove',
        className: 'btn btn-glass no-shadow bordered',
        onClick: () => {
          popPrompt({
            warning: true,
            message: `Are you sure you want to remove ${capitalize(
              user.firstName,
            )} from this group ?`,
            confirmButton: {
              label: 'CONFIRM',
              onClick: async (closer) => {
                try {
                  const data = await props.fetchRequest({
                    url: `${process.env.REACT_APP_API}/tribe/groups/${props.groupId}/${user.userId}`,
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });

                  popAlert({
                    title: 'Tribe Removed',
                    description: `${capitalize(
                      user.firstName,
                    )} has been removed from your tribe successfully`,
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
        },
      },
      approveFriendRequest: {
        label: (
          <>
            Approve{' '}
            {state.buttonOneLoading && (
              <span className="icon-refresh icon spinner" />
            )}
          </>
        ),
        className: 'btn btn-black',
        onClick: () => this.reactToFriendRequest('approve'),
      },
      ignoreFriendRequest: {
        label: (
          <>
            Ignore{' '}
            {state.buttonTwoLoading && (
              <span className="icon-refresh icon spinner" />
            )}
          </>
        ),
        className: 'btn btn-glass no-shadow bordered',
        onClick: () => this.reactToFriendRequest('ignore'),
      },
    };

    let totalGroupsUserbelong = 0;
    userFriendGroups.forEach((group) => {
      if (group.members.includes(user.userId)) {
        totalGroupsUserbelong += 1;
      }
    });

    const actions = (() => {
      switch (type) {
        case 'friendRequest': {
          return [
            allActions.approveFriendRequest,
            allActions.ignoreFriendRequest,
          ];
        }
        case 'tribeMember': {
          if (props.as && props.as === 'unassigned') {
            return [allActions.removeFromTribe];
          }

          if (unassigned.includes(user.userId)) {
            if (userFriendGroups.length === 0) {
              return [allActions.removeFromTribe];
            }
            return [
              // allActions.addToGroup,
              allActions.removeFromTribe,
            ];
          }

          if (totalGroupsUserbelong === userFriendGroups.length) {
            return [allActions.removeFromGroup];
          }
          return [
            // allActions.addToGroup,
            allActions.removeFromGroup,
          ];
        }
        default: {
          if (sentRequestsId.includes(user.userId)) {
            return [allActions.pending];
          }
          if (
            pendingFriendsId.includes(user.userId)
            || Object.keys(allUserFriends).includes(user.userId)
          ) {
            return [allActions.viewProfile];
          }
          return [allActions.addToTribe];
        }
      }
    })();

    const mutualConnection = (extraClassName = '') => (
      <div className={`mutual ${extraClassName}`}>
        <span className="icon icon-link-bold iLink" />
        {mutualFriends.length > 0 ? (
          <p
            className="description"
            onClick={() => {
              this.setState({
                showMutualFriends: true,
              });
            }}
          >
            {mutualFriends.length === 1
              ? `${mutualFriends.length} mutual connection`
              : `${mutualFriends.length} mutual connections`}
          </p>
        ) : (
          <p className="description">no mutual connection</p>
        )}
      </div>
    );

    const distanceInMiles = (
      <p className={`distance ${searchTribe ? 'grid-none' : ''}`}>
        {/* the searchTribe is for the search for tribe on events in the calendar */}
        <span className="fa fa-map-pin icon" />
        {Number(user.mileAway).toFixed(2)} miles away
      </p>
    );
    return (
      <>
        <div
          className={`user-connect-card ${props.viewType || ''} `}
          type={type || ''}
        >
          <div
            className={`user-connect-card-content ${selected ? 'selected-border' : ''
              }`}
          >
            <div
              className="details"
              onClick={() => {
                props.onClick();
              }}
            >
              <div className="main">
                <div className="top">
                  <div className="left">
                    <Link
                      href={`${props.AppUrl}/profile/[id]`}
                      as={`${props.AppUrl}/profile/${user.id}?go-back=true`}
                    >
                      <a className="avi">
                        <img src={user.imageUrl} alt="" />
                      </a>
                    </Link>
                  </div>

                  <div className="right">
                    <Link
                      href={`${props.AppUrl}/profile/[id]`}
                      as={`${props.AppUrl}/profile/${user.id}?go-back=true`}
                    >
                      <a>
                        <abbr
                          title={`${capitalize(user.firstName)} ${capitalize(
                            user.lastName,
                          )}`}
                          className="name"
                        >{`${user.firstName} ${user.lastName}`}
                        </abbr>
                      </a>
                    </Link>
                    {/* note the searchTribe prop is added for the use cases of search tribe in events on calendar */}
                    {!searchTribe && (
                      <p>
                        {' '}
                        {user.city}, {user.state}
                      </p>
                    )}

                    {distanceInMiles}
                    {/* note the searchTribe prop is added for the use cases of search tribe in events on calendar */}
                    {!searchTribe && mutualConnection('')}
                  </div>
                </div>

                {/* {mutualConnection('mobile-show-flex')} */}
                {/* note the searchTribe prop is added for the use cases of search tribe in events on calendar */}
                {!searchTribe && (
                  <div className="bottom">
                    <div
                      className={`btn-container-user len-${actions.length}`}
                      style={
                        {
                          // gridTemplateColumns: `repeat(${actions.length}, 1fr)`,
                        }
                      }
                    >
                      {actions.map((action) => {
                        const button = (
                          <button
                            type="button"
                            className={`action ${action.className}${action.disabled ? ' disabled' : ''
                              }`}
                            onClick={action.onClick}
                          >
                            {action.label}
                          </button>
                        );

                        if (action.href) {
                          return (
                            <Link
                              href={action.href}
                              as={action.as || action.href}
                            >
                              {button}
                            </Link>
                          );
                        }
                        return button;
                      })}
                    </div>

                    <Dropdown
                      className="more-actions"
                      onLoad={(e) => {
                        // this.dropdown.categories = e;
                      }}
                      controller={
                        <span className="controller icon-more-bold" />
                      }
                      content={(
                        <div className="dropdown">
                          {distanceInMiles}
                          {mutualConnection()}
                          {actions[1] && (
                            <>
                              {(() => {
                                const action = actions[1];
                                const button = (
                                  /*    <button
                                  type="button"
                                  className={`action ${action.className}`}
                                  onClick={action.onClick}
                                  >
                                  {}
                                </button> */
                                  <div className="mutual">
                                    {/* <span className="icon icon-link-bold iLink" /> */}

                                    <p
                                      className="description"
                                      onClick={action.onClick}
                                    >
                                      {action.label}
                                    </p>
                                  </div>
                                );

                                if (action.href) {
                                  return (
                                    <Link
                                      href={action.href}
                                      as={action.as || action.href}
                                    >
                                      {button}
                                    </Link>
                                  );
                                }
                                return button;
                              })()}
                            </>
                          )}
                        </div>
                      )}
                      onClose={() => {
                        // this.commitSearch();
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {state.showAddToGroup && (
          <AddFriendToGroup
            {...props}
            user={user}
            onCancel={() => {
              this.setState({
                showAddToGroup: false,
              });
            }}
          />
        )}
        {this.state.modal && (
          <AddTribeModal
            {...props}
            setModalState={this.closeModal}
            // groups={groups && groups}
            user={user}
          />
        )}
        {state.showMutualFriends && (
          <PopMessage
            rootClassName="mutual-friends-pop-up-container"
            show={state.showMutualFriends}
            style={{ zIndex: '2' }}
            message={(
              <div id="mutualFriendsPopUp">
                <div className="title">
                  <div className="label">Mutual Friends</div>
                </div>
                <PeopleList
                  {...props}
                  people={mutualFriends.map((friend) => friend)}
                />
              </div>
            )}
            confirmButton={{
              show: false,
            }}
            onCancel={() => {
              this.setState({
                showMutualFriends: false,
              });
            }}
          />
        )}
      </>
    );
  }
}

UserConnectCard.propTypes = {
  user: PropTypes.object,
  settings: PropTypes.object,
  groups: PropTypes.array,
  friendshipId: PropTypes.string,
};

UserConnectCard.defaultProps = {
  user: {},
  friendshipId: '',
  onClick: () => { },
};

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserConnectCard);
