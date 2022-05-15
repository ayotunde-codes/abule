import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  Fn,
  PopMessage, InputField,
} from '@abule-common/components';
import { sessionUserDeleteKid, sessionUserUpdateKid } from '../../redux/settings/action';

import { Messages } from '../../public/data/assets';
import ViewBarteringRequestDetails from './ViewBarteringRequestDetails';

const {
  capitalize,
  getRelativeTime, isEmpty, milSecToYears, parseDuration, parseTimeToGMT, popAlert, popPrompt,
} = Fn;

class BarteringRequest extends Component {
  constructor(props) {
    super(props);
    const { settings: { sessionUser } } = props;
    let { request } = props;
    if (request.barterRequest) {
      request = {
        ...request.barterRequest,
        bid: [{
          ...request,
          barterRequest: undefined,
        }],
      };
      if (request.bid[0].userId === sessionUser.userId) request.bid[0].user = sessionUser;
    }
    if (request.userId === sessionUser.userId) {
      request.user = sessionUser;
    }

    this.state = {
      request,
      viewRequest: false,
      pendingRespond: false,
      completedRespond: false,
      viewDetails: false,
      raiseDispute: false,
      disputeForm: {
        subject: '',
        subjectError: false,
        details: '',
        detailsError: false,
        submitting: false,
      },
      viewDetailsFocusKid: 0,
    };

    this._isMounted = false;
    this.viewRequestPopMessage = false;
    this.viewDetailsPopMessage = false;
    this.pendingRespondPopMessage = false;
    this.completedRespondPopMessage = false;
    this.raiseDisputePopMessage = false;
    this.viewRequest = this.viewRequest.bind(this);
    this.updateDisputeForm = this.updateDisputeForm.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { settings } = props;
    if (settings.sessionUser === false) Router.push('/');
  }

  componentDidUpdate() {
    const { props } = this;
    const { settings } = props;
    if (settings.sessionUser === false) Router.push('/');
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getActions() {
    const { state, props } = this;
    const { request } = state;
    const { settings: { sessionUser }, status } = props;
    const { user } = request;
    let type = request.userId === sessionUser.userId ? 'owner' : 'normal';
    if (status.split('-')[0] === 'other') {
      type = 'other';
    }

    const viewRequestBtn = (type = 'secondary') => (
      <button
        type="button"
        className={`action btn ${type === 'primary' ? 'btn-1' : 'btn-glass no-shadow bordered'}`}
        onClick={() => {
          this.setState({
            viewRequest: true,
          });
        }}
      >VIEW REQUEST
      </button>
    );

    switch (status) {
      case ('other-pending'): {
        return (
          <>
            {viewRequestBtn('primary')}
          </>
        );
      }
      case ('other-upcoming'): {
        return (
          <>
            <button
              type="button"
              className="action btn btn-1"
              onClick={() => {
                this.setState({
                  viewDetails: true,
                });
              }}
            >VIEW DETAILS
            </button>
            {/*   ADD A START MESSAGE BUTTON IN THE VIEW DETAILS POP */}
            {/* <button type="button" className="btn btn-glass no-shadow bordered"></button> */}
            {viewRequestBtn()}
          </>
        );
      }
      case ('pending'): {
        return (
          <>
            <Link href="/barter/my-requests/[id]" as={`/barter/my-requests/${request.id}`}>
              <a
                className="action btn btn-1"
              >RESPOND
              </a>
            </Link>
            {viewRequestBtn()}
          </>
        );
      }
      case ('upcoming'): {
        return (
          <>
            <button type="button" className="action btn btn-1">START MESSAGE</button>
            {viewRequestBtn()}
          </>
        );
      }
      case ('completed'):
      case ('other-completed'):
        {
          console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ', request);
          let isDone = false;
          if (type === 'other') {
            isDone = request.bid[0].completed;
          } else {
            isDone = request.completed;
          }

          return (
            <>
              <button
                type="button"
                className={`action ${isDone ? 'btn btn-neutral disabled' : 'btn btn-1'}`}
                onClick={() => {
                  if (!isDone) {
                    this.setState({
                      completedRespond: true,
                    });
                  }
                }}
              >{isDone ? 'CONFIRMED' : 'RESPOND'}
              </button>
              {viewRequestBtn()}
            </>
          );
        }
      default: {
        return (
          viewRequestBtn('primary')
        );
      }
    }
  }

  getKidFromKids(kids, kidId) {
    for (const kid of kids) {
      if (kid.id === kidId) return kid;
    }
    return false;
  }

  getBanner(status, request) {
    const { sessionUser } = this.props.settings;

    switch (status) {
      case ('other-pending'):
      case ('other-upcoming'): return (
        <div className="banner">
          <div className="left">
            <div className="avi">
              <img src={sessionUser.imageThumbUrl} alt="" />
            </div>
          </div>

          <div className="right">
            <p>YOU ACCEPTED TARA'S REQUEST!</p>
          </div>
        </div>
      );
      case ('pending'): {
        const { bid } = request;
        if (!bid) return '';
        return (
          <div className="banner">
            <div className="left">
              {bid.map((oneBid) => (
                <div className="avi">
                  <img src={oneBid.user.imageThumbUrl} alt="" />
                </div>
              ))}
            </div>

            <div className="right">
              <p>{bid.length > 1 ? `${bid.length} PEOPLE` : bid[0].user.firstName} ACCEPTED YOUR REQUEST!</p>
            </div>
          </div>
        );
      }
      case ('upcoming'): {
        let { bid } = request;
        [bid] = bid;
        if (!bid) return '';
        return (
          <div className="banner">
            <div className="left">
              <div className="avi">
                <img src={bid.user.imageThumbUrl} alt="" />
              </div>
            </div>

            <div className="right">
              <p>YOU ACCEPTED {bid.user.firstName}'s HELP!</p>
            </div>
          </div>
        );
      }
      case ('completed'):
      case ('other-completed'): return (
        <div className="banner">
          <div className="left">
            <div className="avi">
              <img src={request.bid[0].user.imageThumbUrl} alt="" />
            </div>
          </div>

          <div className="right">
            {status === 'completed'
              ? <p>PLEASE CONFIRM {request.bid[0].user.firstName} COMPLETED YOUR REQUEST!</p>
              : <p>PLEASE CONFIRM YOU COMPLETED {request.user.firstName}'s REQUEST!</p>}
          </div>
        </div>
      );
      default: return '';
    }
  }

  getType(bartering) {
    switch (bartering) {
      case ('sitting'): {
        return 'sitter';
      }
      case ('tutoring'): {
        return 'tutor';
      }
      case ('driving'): {
        return 'driver';
      }
      default: {
        return '';
      }
    }
  }

  getKidsReference(user, kidIds) {
    return kidIds.map((kidId, index) => (
      <>
        {index > 0 ? ' , ' : ''}
        <span>
          {this.getKidFromKids(user.kids, kidId).preferredName}
        </span>
      </>
    ));
  }

  viewRequest() {
    const { state, props } = this;
    const { request } = state;
    const { settings: { sessionUser }, status } = props;
    const { user } = request;
    let type = request.userId === sessionUser.userId ? 'owner' : 'normal';
    if (status.split('-')[0] === 'other') {
      type = 'other';
    }

    let onConfirm = {
      show: false,
    };
    let cancelButton = {
      show: false,
    };
    if (!['completed', 'other-completed'].includes(status)) {
      if (type === 'normal') {
        onConfirm = {
          label: 'ACCEPT REQUEST',
          onClick: async (closer, hideLoader) => {
            try {
              await props.fetchRequest({
                url: `${process.env.REACT_APP_API}/barter/all/${request.id}/bid`,
                method: 'POST',
              });
              popAlert({
                title: 'Pending Approval',
                description: `${capitalize(user.firstName)} will be notified`,
              });
            } catch (err) {
              hideLoader();
              popAlert({
                title: Messages.requests.serverError.title,
                description: Messages.requests.serverError.message,
                error: true,
              });
            }
            closer();
          },
        };
      } else if (type === 'owner') {
        onConfirm = {
          label: 'EDIT REQUEST',
          onClick: (closer) => {
            Router.push('/edit-barter/[id]', `/edit-barter/${request.id}`);
            closer();
          },
        };
      } else if (type === 'other') {
        onConfirm = {
          label: 'CANCEL OFFER',
          onClick: async (closer, hideLoader) => {
            try {
              popPrompt({
                message: (
                  <div>
                    <p>Are you sure you want to cancel your offer?</p>
                    <p>you will lose 10 credits</p>
                  </div>
                ),
                confirmButton: {
                  label: 'YES',
                  onClick: async (clser) => {
                    await props.fetchRequest({
                      url: `${process.env.REACT_APP_API}/barter/all/${request.id}/bid/${props.request.id}`,
                      method: 'DELETE',
                    });
                    clser();
                  },
                },
                cancelButton: {
                  label: 'NO',
                },
              });
            } catch (err) {
              hideLoader();
              popAlert({
                title: Messages.requests.serverError.title,
                description: Messages.requests.serverError.message,
                error: true,
              });
            }
            closer();
          },
        };
      }

      cancelButton = {
        show: type === 'owner',
        label: 'DELETE REQUEST',
        onClick: (closer) => {
          if (type === 'owner') {
            popPrompt({
              message: (
                <div>
                  <p>Are you sure you want to delete your request?</p>
                  <p>you will lose 10 credits</p>
                </div>
              ),
              confirmButton: {
                label: 'YES, DELETE',
                onClick: async (clser) => {
                  await props.fetchRequest({
                    url: `${process.env.REACT_APP_API}/barter/all/${request.id}`,
                    method: 'DELETE',
                  });
                  clser();
                },
              },
              cancelButton: {
                label: 'NO',
              },
            });
          }
          closer();
        },
      };
    }

    return (
      <PopMessage
        ref={(e) => {
          this.viewRequestPopMessage = e;
        }}
        message={(
          <div id="barterRequestViewRequest" className="pop-message">
            <div className="closer">
              <span
                className="icon icon-cross"
                onClick={() => {
                  if (this.viewRequestPopMessage) {
                    this.viewRequestPopMessage.hide();
                  }
                }}
              />
            </div>

            <div className="top">
              <div className="left">
                <Link href="/profile/[id]" as={`/profile/${user.id}`}>
                  <a className="avi">
                    <img src={user.imageThumbUrl} alt="" />
                  </a>
                </Link>
                <div className="info">
                  <p className="help header">{this.getType(request.bartering)} NEEDED</p>
                  <abbr title={`${user.firstName} ${user.lastName}`} className="name">{user.firstName} {user.lastName}</abbr>
                  <p className="loc">{user.city}, {user.state}</p>
                </div>
              </div>

              <div className="right">
                <p className="header">OVERVIEW</p>
                <table>
                  <tbody>
                    <tr>
                      <td>Kid's Name : </td>
                      <td>{this.getKidsReference(user, request.kids)}</td>
                    </tr>
                    <tr>
                      <td>Date : </td>
                      <td>{getRelativeTime(request.date, false, 'fullText-without-time')}</td>
                    </tr>
                    <tr>
                      <td>Start Time : </td>
                      <td>{getRelativeTime(parseTimeToGMT(request.date), false, 'time')}</td>
                    </tr>
                    <tr>
                      <td>Duration : </td>
                      <td>{parseDuration(request.duration, true)} </td>
                    </tr>
                    <tr>
                      <td>Distance : </td>
                      <td>0 miles</td>
                    </tr>
                    <tr>
                      <td>Credits : </td>
                      <td>{props.getActivityCredit(request.duration) * request.kids.length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bottom">
              <p className="header">DETAILS</p>
              <p>{request.description}</p>
            </div>
          </div>
        )}
        confirmButton={onConfirm}
        cancelButton={cancelButton}
        onCancel={() => {
          this.setState({
            viewRequest: false,
          });
        }}
      />
    );
  }

  viewDetails() {
    const { props } = this;
    let { request } = props;
    if (request.barterRequestId) {
      request = request.barterRequest;
    }
    return (
      <ViewBarteringRequestDetails
        {...this.props}
        request={request}
        onCancel={() => {
          this.setState({
            viewDetails: false,
          });
        }}
      />
    );
  }

  pendingRespond() {
    const { state, props } = this;
    const { request: { id, bid } } = props;
    const { user } = bid;
    return (
      <PopMessage
        ref={(e) => {
          this.pendingRespondPopMessage = e;
        }}
        message={(
          <div id="barterRequestPendingRespond" className="pop-message">
            <div className="closer">
              <span
                className="icon icon-cross"
                onClick={() => {
                  if (this.pendingRespondPopMessage) {
                    this.pendingRespondPopMessage.hide();
                  }
                }}
              />
            </div>

            <p>Please click the accept to continue.</p>
            <div className="banner">NOTE: Once a barter exchange is complete, you will also need confirm
              that the service occurred to initiate transfer of credits to your caregiver.
            </div>
          </div>
        )}
        confirmButton={{
          label: 'ACCEPT',
          onClick: async (closer, hideLoader) => {
            try {
              await props.fetchRequest({
                url: `${process.env.REACT_APP_API}/barter/all/${id}/bid/${bid.id}`,
                method: 'POST',
              });
              popAlert({
                title: 'Request Accepted',
                description: (
                  <div>
                    <p>{capitalize(user.firstName)} will be notified</p>

                    <p>* Once a barter exchange is complete, you need to confirm that the service</p>
                    <p>occurred in order to compensate your caregiver.</p>

                  </div>
                ),
              });
              closer();
            } catch (err) {
              popAlert({
                title: Messages.requests.serverError.title,
                description: Messages.requests.serverError.message,
                error: true,
              });
            }
          },
        }}
        cancelButton={{
          label: 'DECLINE',
          show: true,
        }}
        onCancel={() => {
          this.setState({
            pendingRespond: false,
          });
        }}
      />
    );
  }

  completedRespond() {
    const { state, props } = this;
    const { settings: { sessionUser }, status } = props;
    const { request } = state;
    let { user } = request.bid[0];
    let type = request.userId === sessionUser.userId ? 'owner' : 'normal';
    if (status.split('-')[0] === 'other') {
      type = 'other';
      user = request.user;
    }

    return (
      <PopMessage
        ref={(e) => {
          this.completedRespondMessage = e;
        }}
        message={(
          <div id="barterRequestCompletedRespond" className="pop-message">
            <div className="closer">
              <span
                className="icon icon-cross"
                onClick={() => {
                  if (this.completedRespondMessage) {
                    this.completedRespondMessage.hide();
                  }
                }}
              />
            </div>

            {
              type === 'other'
                ? <p>Please confirm that you completed {capitalize(user.firstName)}'s request.</p>
                : <p>Please confirm that {capitalize(user.firstName)} completed your request.</p>
            }
            <p>Press Dispute if you would like to raise a concern with customer service.</p>
          </div>
        )}
        confirmButton={{
          label: 'CONFIRM',
          onClick: async (closer, hideLoader) => {
            try {
              let url = `${process.env.REACT_APP_API}/barter/confirm/${request.id}`;
              if (type === 'other') {
                url = `${process.env.REACT_APP_API}/barter/all/${request.id}/bid/${request.bid[0].id}/confirm`;
              }
              await props.fetchRequest({
                url,
                method: 'POST',
              });
              closer();
              popAlert({
                title: 'Exchange Complete',
                description: (
                  <div>
                    <p style={{ margin: '0 0 2em', fontSize: '1.2em' }}>This confirms that your service was successfully completed.</p>
                    <p>* No further action is needed from you. </p>
                    {type === 'other'
                      ? <p>You will receive your credits once the requestor confirms.</p>
                      : <p>Your caregiver will be compensated accordingly.</p>}
                  </div>
                ),
              });
            } catch (err) {
              popAlert({
                title: Messages.requests.serverError.title,
                description: Messages.requests.serverError.message,
                error: true,
              });
            }
          },
        }}
        cancelButton={{
          label: 'DISPUTE',
          show: true,
          onClick: () => {
            this.setState({
              raiseDispute: true,
              completedRespond: false,
            });
          },
        }}
        onCancel={() => {
          this.setState({
            completedRespond: false,
          });
        }}
      />
    );
  }

  updateDisputeForm(props) {
    this.setState({
      ...this.state,
      disputeForm: {
        ...this.state.disputeForm,
        ...props,
      },
    });
  }

  raiseDispute() {
    const { state, props } = this;
    const { settings: { sessionUser }, status } = props;
    const { request, disputeForm } = state;
    let { user } = request.bid[0];
    let type = request.userId === sessionUser.userId ? 'owner' : 'normal';
    if (status.split('-')[0] === 'other') {
      type = 'other';
      user = request.user;
    }

    return (
      <PopMessage
        ref={(e) => {
          this.raiseDisputePopMessage = e;
        }}
        message={(
          <div id="raiseDisputeRespond" className="pop-message">
            <div className="closer">
              <span
                className="icon icon-cross"
                onClick={() => {
                  if (this.raiseDisputePopMessage) {
                    this.raiseDisputePopMessage.hide();
                  }
                }}
              />
            </div>

            <p className="desc">Please describe the issue with the service request. A customer service agent will reach out to you shortly.</p>

            <InputField
              type="text"
              label={(
                <>
                  Subject <span className="error"> {disputeForm.subjectError ? `: ${disputeForm.subjectError}` : ''}</span>
                </>
              )}
              placeholder="subject"
              value={disputeForm.firstName}
              className={`${disputeForm.subjectError !== false ? ' error' : ''}`}
              onChange={(value) => {
                this.updateDisputeForm({
                  subject: value,
                  subjectError: !isEmpty(value) ? false : disputeForm.subjectError,
                });
              }}
            />

            <InputField
              type="textarea"
              label={(
                <>
                  Details <span className="error"> {disputeForm.detailsError ? `: ${disputeForm.detailsError}` : ''}</span>
                </>
              )}
              placeholder="details"
              value={disputeForm.firstName}
              className={`${disputeForm.detailsError !== false ? ' error' : ''}`}
              onChange={(value) => {
                this.updateDisputeForm({
                  details: value,
                  detailsError: !isEmpty(value) ? false : disputeForm.detailsError,
                });
              }}
            />
          </div>
        )}
        confirmButton={{
          label: 'SUBMIT',
          onClick: async (closer, hideLoader) => {
            try {
              /*  await props.fetchRequest({
                url: `${process.env.REACT_APP_API}/barter/confirm/${request.id}`,
                method: 'POST',
              }); */
              closer();
              popAlert({
                title: 'Dispute Submitted Successfully',
              });

              this.setState({
                raiseDispute: false,
              });
            } catch (err) {
              popAlert({
                title: Messages.requests.serverError.title,
                description: Messages.requests.serverError.message,
                error: true,
              });
            }
          },
        }}

        onCancel={() => {
          this.setState({
            raiseDispute: false,
          });
        }}
      />
    );
  }

  render() {
    const { state, props } = this;
    const { settings } = this.props;
    const { request } = state;

    const { user } = request;

    let alert = '';
    if (props.status === 'completed' || props.status === 'other-completed') {
      if (props.status === 'completed') {
        alert = !request.completed ? ' alert' : '';
      } else {
        alert = !request.bid[0].completed ? ' alert' : '';
      }
    }

    return (
      <div className="batering-request">
        {alert && <span className="alert-icon icon-request-alert " />}
        <div className={`batering-request-content${alert}`}>
          {this.getBanner(props.status, request)}
          <div className="details">
            <div className="main">
              <div className="top">
                <div className="left">
                  <Link href="/profile/[id]" as={`/profile/${user.id}`}>
                    <a className="avi">
                      <img src={user.imageThumbUrl} alt="" />
                    </a>
                  </Link>
                </div>

                <div className="right">
                  <p className="help header"> {this.getType(request.bartering)} NEEDED</p>
                  <abbr title={`${user.firstName} ${user.lastName}`} className="name">{user.firstName} {user.lastName}</abbr>
                  <p className="loc">{user.city}, {user.state}</p>
                </div>
              </div>
              <div className="bottom">
                <p className="description">
                  {request.description}
                </p>

              </div>
            </div>
            <div className="actions">
              {this.getActions(props.status)}
            </div>
          </div>
        </div>
        {state.viewRequest && this.viewRequest()}
        {state.pendingRespond && this.pendingRespond()}
        {state.completedRespond && this.completedRespond()}
        {state.viewDetails && this.viewDetails()}
        {state.raiseDispute && this.raiseDispute()}
      </div>
    );
  }
}

BarteringRequest.propTypes = {
  request: PropTypes.object,
};

BarteringRequest.defaultProps = {
  request: {},
};

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarteringRequest);
