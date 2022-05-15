/* eslint-disable no-multi-assign */
/* eslint-disable max-len */
/* eslint-disable react/react-in-jsx-scope */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import {
  Fn,
  InputSelect,
} from '@abule-common/components';
import Layout from '../../../components/general/Layout';

import { updateHeader, setInfo } from '../../../redux/settings/action';
import PageLoader from '../../../components/general/PageLoader';
import HubHeader from '../../../components/myHub/header';
import CreateFriendGroup from '../../../components/tribe/CreateFriendGroup';
import TribeFilter from '../../../components/tribe/TribeFilter';

import {
  AgeGroups, Grades, Utils,
} from '../../../datastore';
import TribeGroup from '../../../components/tribe/TribeGroup';

const {
  popAlert,
} = Fn;

class MyTribe extends React.Component {
  constructor(props) {
    super(props);
    const { sessionUser } = props.settings;
    const userFriends = sessionUser.friends;
    const pendingFriends = userFriends.pending;

    this.defaultFilters = {
      locationInput: '',
      location: null,
      locationRadius: 0,
      kidsAge: {
        start: 0,
        end: AgeGroups.data[AgeGroups.data.length - 1].end,
      },
      kidsSchool: [],
      parentInterests: [],
      kidsInterests: [],
      coreValues: [],
      supportType: null,
      supportGrades: [],
      supportSubjects: [],
      supportPrice: {
        start: 0,
        end: 1000,
      },
      supportDayTime: {
        days: {
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
        },
        isAvailable: false,
      },
      searchQuery: '',
    };
    this.state = {
      filters: this.defaultFilters,
      users: null,
      resultType: 'all',
      viewType: 'inline-grid',
      loading: false,
      showCreateGroup: false,
      newRequests: pendingFriends.length,
    };
  }

  async componentDidMount() {
    // alert(Router.route);
    /*  try {
      const data = await this.props.fetchRequest({
        url: `${process.env.REACT_APP_API}/tribe/users${Router.query.acceptTribe ? `?tribeId=${Router.query.acceptTribe}` : ''}`,
      });

      this.setState({
        ...data,
        loading: false,
      });

      if (Router.query.acceptTribe) {
        // setAcceptModal(true);
      }
    } catch (e) {
      alert('catch error');
      console.log(e);
    } */
  }

  componentDidUpdate() {
    /* popAlert({
      title: 'update',
    }); */
  }

  render() {
    const { state, props } = this;
    const { sessionUser } = props.settings;
    const userFriends = sessionUser.friends;
    const pendingFriends = userFriends.pending;

    const { filters } = state;
    let filtersSet = false;
    if (
      filters.location
      || !(filters.kidsAge.start === this.defaultFilters.kidsAge.start && filters.kidsAge.end === this.defaultFilters.kidsAge.end)
      || !(filters.supportPrice.start === this.defaultFilters.supportPrice.start && filters.supportPrice.end === this.defaultFilters.supportPrice.end)
      || [
        ...filters.supportGrades,
        ...filters.supportSubjects,
        ...filters.kidsSchool,
      ].length > 0
    ) {
      filtersSet = true;
    }

    /*     const triggeredSearch = (() => (
          filtersSet || [...filters.parentInterests, ...filters.kidsInterests].length > 0
            || filters.coreValues.length > 0 || filters.supportDayTime.isAvailable
            || filters.supportType || filters.searchQuery.length > 0
        ))(); */
    const RouterQuery = {};
    const queries = Router.asPath.split('?');
    if (queries[1]) {
      queries[1].split('&').forEach((filterString) => {
        const data = filterString.split('=');
        let value = decodeURIComponent(data[1]);
        const [key] = data;

        console.log('query data : ', {
          filterString,
          data,
          key,
          value,
        });

        if ([
          'interests',
          'coreValues',
          'kidsInterests',
          'schoolId',
          'supportGrades',
          'supportSubjects',
        ].includes(key)) {
          value = value.split(',');
        } else if ([
          'location',
          'kidsAge',
          'supportPrice',
          'supportDayTime',
        ].includes(key)) {
          value = JSON.parse(value);
        }

        RouterQuery[key] = value;
      });
    }

    console.log('our router is here : ', { Router, RouterQuery });

    const triggeredSearch = Object.keys(RouterQuery).length > 0;

    const users = state.users && triggeredSearch ? state.users : userFriends.all;
    let groups = [];
    let friendIdsInGroup = [];
    userFriends.approved.groups.forEach((group) => {
      friendIdsInGroup = [
        ...friendIdsInGroup,
        ...group.members,
      ];
    });
    console.log('friend in group', friendIdsInGroup);
    const friendsIdInNoGroup = Object.keys(users).filter((userId) => !friendIdsInGroup.includes(userId));
    if (state.resultType === 'pending') {
      console.log('all pending requests', pendingFriends);
      if (pendingFriends.length > 0) {
        groups = [{
          name: '',
          type: 'friendRequest',
          members: pendingFriends.map((request) => ({
            ...request.sender,
            friendshipId: request.id,
          })),
        }];
      }
    } else if (state.resultType === 'groups') {
      userFriends.approved.groups.forEach((group) => {
        const k = '';
        console.log('gourp is : ', group);
        const members = group.members.filter((memberId) => users[memberId]).map((memberId) => users[memberId]);
        if (members.length > 0) {
          groups.push({
            name: group.name,
            id: group.id,
            description: group.description,
            members,
          });
        }
      });

      if (friendsIdInNoGroup.length > 0) {
        groups.push({
          name: 'unassigned',
          id: 'unassigned',
          // description: group.description,
          members: [
            ...friendsIdInNoGroup.map((memberId) => users[memberId]),
          ],
        });
      }
    } else if (Object.values(users).length > 0) {
      groups = [{
        name: '',
        members: [
          ...Object.values(users),
        ],
      }];
    }

    return (
      <Layout {...props}>
        <div id="myHub">
          <div id="myTribe">
            <HubHeader {...props} />
            <InputSelect
              className="primary-filters"
              value={state.resultType}
              options={[
                {
                  label: 'all',
                },
                {
                  label: 'groups',
                },
                {
                  label: <>pending {state.newRequests > 0 && <span className="counter">{state.newRequests}</span>}</>,
                  value: 'pending',
                },
              ]}
              onChange={(value) => {
                this.setState({
                  resultType: value,
                  users: null,
                  newRequests: value === 'pending' ? 0 : state.newRequests,
                  filters: this.defaultFilters,
                });
              }}
            />
            {!['pending'].includes(state.resultType) && (
              <TribeFilter
                {...props}
                filters={state.filters}
                /* onChange={(filts) => {
                  this.setState((prev) => ({
                    filters: {
                      ...prev.filters,
                      ...filts,
                    },
                  }));
                }} */
                onResult={(result, query, filts) => {
                  const newUsers = {};
                  Router.push(`${Router.route}?${query.join('&')}`);

                  result.forEach((user) => {
                    newUsers[user.userId] = user;
                  });

                  this.setState((prev) => ({
                    users: newUsers,
                    filters: {
                      ...prev.filters,
                      ...filts,
                    },
                  }));
                }}
              />
            )}
            {state.loading ? (
              <>
                <div style={{ marginTop: '20%' }}>
                  <PageLoader inline />
                </div>
              </>
            ) : (
              <>
                {groups.length === 0 ? (
                  <div className="main-content">
                    <div className="empty_group">
                      {state.resultType === 'pending'
                        ? <p className="placeholder">You don't have any request at the moment.</p>
                        : <p className="placeholder">No friend was found.</p>}
                      <p className="placeholder">Start connecting with <Link href={`${props.AppUrl}/people`}><b className="link"> people</b></Link>.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`content-label-and-actions ${state.resultType}`}>
                      <div className="left">
                        {state.users && triggeredSearch ? (
                          <div className="all-group-label">
                            RESULTS
                          </div>
                        )
                          : (
                            <>

                              {['all', 'pending'].includes(state.resultType)
                                ? (
                                  <div className="all-group-label">
                                    <>
                                      {state.resultType === 'all' ? 'ALL FRIENDS' : 'PENDING REQUESTS'}
                                    </>
                                  </div>
                                )
                                : (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-1 create-group"
                                      onClick={() => {
                                        if (Object.keys(userFriends.all).length > 0) {
                                          this.setState({
                                            showCreateGroup: true,
                                          });
                                        } else {
                                          popAlert({
                                            title: 'Can\'t create group',
                                            description: (
                                              <>
                                                <p>You need at least one user in your Tribe</p>
                                                <p>
                                                  <b className="link">Connect with like minded People</b>
                                                </p>
                                              </>
                                            ),
                                          });
                                        }
                                      }}
                                    >
                                      <span className="icon icon-add" />
                                      <span className="text">CREATE GROUP</span>
                                    </button>
                                    <div className="all-group-label">
                                      GROUPS
                                    </div>
                                  </>
                                )}
                            </>
                          )}
                      </div>
                      <div className="right">
                        <div className="view-toogle">
                          <span
                            className={`icon icon-category${state.viewType === 'inline-grid' ? ' active' : ''}`}
                            onClick={() => {
                              this.setState({
                                viewType: 'inline-grid',
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
                    <div className="main-content">
                      {groups.length > 0 ? groups.map((group, index) => (
                        <TribeGroup
                          {...props}
                          viewType={state.viewType}
                          group={group}
                        />

                      )) : 'No Friends Were Found!'}
                    </div>
                  </>
                )}

                <div className="main-content">
                  {/*  {unassigned.length > 0 && (
                  <section>
                    <OverflowContent
                      header="unassigned"
                      description="Tribe members that have not yet been assigned to a group"
                      headerSwitchClick={() => {
                        Router.push(`${props.AppUrl}/my-hub/tribe/unassigned?go-back=true`);
                      }}
                      headerSwitchPage={(
                        <div
                          className="show-more"
                          onClick={() => {
                            Router.push(`${props.AppUrl}/my-hub/tribe/unassigned?go-back=true`);
                          }}
                        >{`show all (${unassigned.length})`}
                        </div>
                        )}
                      className=""
                      content={(
                        <div className="tribe-group">
                          <div className="tribe-group-list-container">
                            <div
                              className="tribe-group-list"
                            >
                              {unassigned.map((friendId) => (
                                // <div className="tribe_box">
                                <UserConnectCard
                                  {...props}
                                  type={group.type}
                                  section="unassignedGroup"
                                  user={userFriends.all[friendId]}
                                />
                                // </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        )}
                    />
                  </section>
                  )} */}

                </div>
              </>
            )}
          </div>
        </div>
        {(state.showCreateGroup) && (
          <CreateFriendGroup
            {...props}
            onCancel={() => {
              this.setState({
                showCreateGroup: false,
              });
            }}
          />
        )}
      </Layout>
    );
  }
}
// const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
});
export default connect(null, mapDispatchToProps)(MyTribe);
