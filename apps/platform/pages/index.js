import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import {
  Fn,
  OverflowContent, Dropdown,
} from '@abule-common/components';
import Layout from '../components/general/Layout';
import { updateHeader, setInfo } from '../redux/settings/action';
import ActivityPreview from '../components/ActivityPreview';
import PageLoader from '../components/general/PageLoader';
import UserConnectCard from '../components/UserConnectCard';

const {
  capitalize, popAlert,
} = Fn;

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      users: [],
      userId: '',
      barteringRequests: [],
      loading: true,
      userLoading: true,
    };

    this.banner = null;
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    // eslint-disable-next-line react/prop-types
    const { onPageLoad, fetchRequest } = props;
    onPageLoad();
    fetchRequest({
      url: `${process.env.REACT_APP_API}/home`,
      method: 'GET',
    }).then((data) => {
      if (this._isMounted) {
        console.log('get all activity ', { data });
        this.setState({
          ...data,
          loading: false,
        });
      }
    }).catch((erroRes) => {

    });
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // eslint-disable-next-line class-methods-use-this
  bannerJSX() {
    const { props, state } = this;
    const { sessionUser, firstSession } = props.settings;
    const links = {
      findActivities: {
        href: `${props.AppUrl}/activities`,
        // onClick:()=>{},
        className: 'btn btn-5',
        label: 'FIND ACTIVITIES',
      },
      hostActivity: {
        href: `${props.AppUrl}/host-activity`,
        // onClick:()=>{},
        className: 'btn btn-5',
        label: 'HOST AN ACTIVITY',
      },
      postRequest: {
        // href: `${props.AppUrl}/create-request`,
        onClick: () => {
          popAlert({
            title: 'Coming soon!',
          });
        },
        className: 'btn btn-3',
        label: 'POST A REQUEST',
      },
      pickUpRequest: {
        // href: `${props.AppUrl}/barter`,
        onClick: () => {
          popAlert({
            title: 'Coming soon!',
          });
        },
        className: 'btn btn-3',
        label: 'PICK-UP A REQUEST',
      },
      buildYourTribe: {
        href: `${props.AppUrl}/people`,
        // onClick: () => {
        //   Router.push('/people');
        // },
        className: 'btn btn-2',
        label: 'CONNECT WITH PEOPLE',
      },
      createFindPods: {
        href: `${props.AppUrl}/communities`,
        onClick: () => {
          popAlert({
            title: 'Coming soon!',
          });
        },
        className: 'btn btn-5',
        label: 'CREATE / FIND PODS',
      },
      broswePods: {
        href: `${props.AppUrl}/communities`,
        onClick: () => {
          popAlert({
            title: 'Coming soon!',
          });
        },
        className: 'btn btn-5',
        label: 'BROWSE PODS',
      },
      createPod: {
        href: `${props.AppUrl}/communities`,
        onClick: () => {
          popAlert({
            title: 'Coming soon!',
          });
        },
        className: 'btn btn-5',
        label: 'CREATE A POD',
      },
      joinCommunity: {
        href: `${props.AppUrl}/communities`,
        onClick: () => {
          popAlert({
            title: 'Coming soon!',
          });
        },
        className: 'btn btn-neutral',
        label: 'JOIN A COMMUNITY',
      },
    };

    links.findHostActivities = {
      label: 'FIND / HOST ACTIVITIES',
      className: 'btn btn-5',
      options: [
        {
          label: "I'm looking for Activities",
          href: links.findActivities.href,
        },
        {
          label: 'I want to host an Activity',
          href: links.hostActivity.href,
        },
      ],
    };

    links.postPickUpRequests = {
      label: 'POST / PICK UP REQUESTS',
      className: 'btn btn-3',
      options: [
        {
          label: 'I want to post a Request',
          // href: links.postRequest.href,
          onClick: () => {
            popAlert({
              title: 'Coming soon!',
            });
          },
        },
        {
          label: 'I want to pick up a Request',
          // href: links.pickUpRequest.href,
          onClick: () => {
            popAlert({
              title: 'Coming soon!',
            });
          },
        },
      ],
    };

    const userLinks = [
      links.findHostActivities,
      links.postPickUpRequests,
      links.buildYourTribe,
      // links.createFindPods,
      links.joinCommunity,
    ];

    /*  if (sessionUser.accountType === 'caregiver') {
      if (!firstSession && sessionUser.signedWaiver && sessionUser.kids.length > 0) {
        userLinks = [
          links.findHostActivities,
          links.buildYourTribe,
          links.postPickUpRequests,
          // links.createFindPods,
          links.joinCommunity,
        ];
      } else {
        userLinks = [
          links.hostActivity,
          links.buildYourTribe,
          links.pickUpRequest,
          // links.createPod,
          links.joinCommunity,
        ];
      }
    } */

    const verbalSupportRequest = sessionUser.accountType === 'caregiver' && sessionUser.kids.length === 0
      ? (
        <>
          <h3 className="big top"> How can you support</h3>
          <h3 className="big bottom">The Village today? </h3>
        </>
      )
      : (
        <>
          <h3 className="big top"> How can The Village</h3>
          <h3 className="big bottom"> support you today? </h3>
        </>
      );

    const lowerThird = (className = '') => (
      <div className={`lower ${className}`}>
        <h5 className="small">Need to get the hang of how our </h5>
        <h5 className="small"> community works? See our <a
          href="https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/Abul%C3%A9+-+FAQs.pdf"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          FAQs
        </a>
        </h5>
      </div>
    );

    return (
      <div className="hmv-hero">
        <div className="banner">
          <div className="left">
            <div className="top mobile-hide">
              {verbalSupportRequest}
            </div>
            {lowerThird()}
          </div>
          <img src="/img/mom_thoughts.png" className="bk mobile-show image-1" alt="" />
          <div className="right">
            <div className="content">
              <h1 className="timberline-font welcome-note">Welcome, {capitalize(sessionUser.firstName)}! </h1>
              <div className="support ipad-mini-show">
                {verbalSupportRequest}
              </div>
              <div className="welcome-actions">
                <img src="/img/mom_thoughts.png" className="bk ipad-mini-show image-2" alt="" />
                <div>
                  {/* {userLinks.map((link) => (

                  ))} */}

                  {userLinks.map((link) => (
                    link.options
                      ? (
                        <Dropdown
                          onLoad={(e) => {
                            // this.dropdown.categories = e;
                          }}
                          controller={(
                            <button type="button" className={`welcome-action ${link.className || ''}`}>{link.label}</button>
                          )}
                          content={({ controller }) => (
                            <div
                              className="welcome-action-options"
                              style={{
                                width: `${controller.width}px`,
                              }}
                            >
                              {link.options.map((option, index) => {
                                const k = '';
                                return (
                                  <Link href={option.href || ''}>
                                    <a
                                      onClick={(e) => {
                                        if (option.onClick) {
                                          e.preventDefault();
                                          option.onClick();
                                        }
                                      }}
                                    >
                                      <button
                                        type="button"
                                        className={`btn ${option.className || ''} ${index === 0 ? 'btn-glass' : 'btn-glass'}`}
                                      >{option.label}
                                      </button>
                                    </a>

                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        />
                      )
                      : (
                        <Link href={link.href || ''}>
                          <a onClick={(e) => {
                            if (link.onClick) {
                              e.preventDefault();
                              link.onClick();
                            }
                          }}
                          >
                            <button type="button" className={`welcome-action ${link.className || ''}`}>{link.label}</button>
                          </a>

                        </Link>
                      )
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  render() {
    const { props, state } = this;
    const { sessionUser } = props.settings;
    // console.log(sessionUser);

    const communities = [
      {
        title: (
          <div>
            <p>Beat</p>
            <p>The Blues</p>
          </div>
        ),
        className: 'blue',
      },
      {
        title: (
          <div>
            <p>Build</p>
            <p>Your Tribe</p>
          </div>
        ),
        className: 'yellow',
      },
      {
        title: (
          <div>
            <p>Working</p>
            <p>Moms</p>
          </div>
        ),
        className: 'pink',
      },
      {
        title: (
          <div>
            <p>Doting</p>
            <p>Dads</p>
          </div>
        ),
        className: 'grey',
      },
    ];
    return (
      <Layout {...props}>
        <div id="homePage">
          {state.loading ? (
            <>
              {this.bannerJSX()}
              <PageLoader inline />
            </>
          ) : (
            <>
              {this.bannerJSX()}
              {state.activities.length > 0 && (
                <OverflowContent
                  header="Browse Children’s Activities"
                  headerSwitchClick={() => {
                    Router.push(`${props.AppUrl}/activities`);
                  }}
                  headerSwitchPage={(
                    <div
                      className="show-more"
                      onClick={() => {
                        Router.push(`${props.AppUrl}/activities`);
                      }}
                    >Show more
                    </div>
                  )}
                  className="first page-container"
                  content={(
                    <div className={`activity-group ${props.className}`}>
                      <div className="activity-group-list-container">
                        <div
                          className="activity-group-list"
                        >
                          {state.activities.map((activity, index) => (
                            <ActivityPreview
                              {...props}
                              updateHeight={index === 0 ? this.updateHeight : null}
                              activity={activity}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                />
              )}

              {/* <OverflowContent
                header="Pick up Open Requests"
                headerSwitchClick={() => {
                  Router.push(props.AppUrl+'/activities');
                }}
                headerSwitchPage={(
                  <div
                    className="show-more"
                    onClick={() => {
                      // Router.push('/');
                    }}
                  >Show more
                  </div>
                )}
                className="block-content"
                content={(
                  <div className="barter-request-group">
                    <div className="barter-request-group-list-container">
                      <div
                        className="barter-request-group-list"
                      >
                        {users.map((request, index) => (
                          <BarteringRequest
                            {...props}
                            status="open"
                            updateHeight={index === 0 ? this.updateHeight : null}
                            request={request}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              /> */}

              {/*  <OverflowContent
                header="Find Learning or Social Pods"
                headerSwitchClick={() => {
                  Router.push('/');
                }}
                headerSwitchPage={(
                  <div
                    className="show-more"
                    onClick={() => {
                      // Router.push('/');
                    }}
                  >Show more
                  </div>
                )}
                className="block-content"
                content={(
                  <div className="barter-request-group">
                    <div className="barter-request-group-list-container">
                      <div
                        className="barter-request-group-list"
                      >
                        {users.map((request, index) => (
                          <PodCard
                            {...props}
                            status="upcoming"
                            updateHeight={index === 0 ? this.updateHeight : null}
                            request={request}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              /> */}
              <OverflowContent
                header="Connect with Other People"
                headerSwitchClick={() => {
                  Router.push(`${props.AppUrl}/people?go-back=true`);
                }}
                headerSwitchPage={(
                  <div
                    className="show-more"
                    onClick={() => {
                      Router.push(`${props.AppUrl}/people?go-back=true`);
                    }}
                  > Show more
                  </div>
                )}
                className="second page-container"
                content={(
                  <div className="people-group">
                    <div className="people-group-list-container">
                      <div
                        className="people-group-list"
                      >
                        {state.users.map((user, index) => (
                          <UserConnectCard
                            {...props}
                            updateHeight={index === 0 ? this.updateHeight : null}
                            user={user}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              />
              {/*  <OverflowContent
                header="Join Communities"
                headerSwitchClick={() => {
                  Router.push('/');
                }}
                headerSwitchPage={(
                  <div
                    className="show-more"
                    onClick={() => {
                      // Router.push('/');
                    }}
                  >Show more
                  </div>
                )}
                className="block-content"
                content={(
                  <div className="barter-request-group">
                    <div className="barter-request-group-list-container">
                      <div
                        className="barter-request-group-list"
                      >
                        {communities.map((community, index) => (
                          <Community
                            {...props}
                            status="upcoming"
                            updateHeight={index === 0 ? this.updateHeight : null}
                            community={community}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              /> */}

            </>
          )}
        </div>
      </Layout>
    );
  }
}

// const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
});
export default connect(null, mapDispatchToProps)(Index);
