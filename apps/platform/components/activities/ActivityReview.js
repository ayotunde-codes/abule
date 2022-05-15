import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  Fn,
  Dropdown, InputField, InputPicker,
} from '@abule-common/components';
import { updateHeader, setInfo } from '../../redux/settings/action';
import {
  ActivityFrequencies,
} from '../../datastore';
import { setActivity } from '../../redux/view-activity/action';
import { updateEvents } from '../../redux/calendar/action';

const {
  popPrompt,
  capitalize,
  getMonth,
  popAlert,
  padString,
  parseDuration,
} = Fn;

const parseDate = (date) => {
  const d = new Date(date);
  let month = getMonth(d.getMonth());
  month = `${month[0]}${month[1]}${month[2]}`;
  let h = d.getHours();
  const m = d.getMinutes();
  let p = 'AM';
  console.log('the daye', d);
  if (h >= 12) {
    h -= 12;
    p = 'PM';
  }
  if (h === 0) {
    h = 12;
  }
  return `${capitalize(month)} ${d.getDate()}, ${d.getFullYear()} @ ${padString(h, '0', 2)}:${padString(m, '0', 2)}${p}`;
};
class ActivityReview extends React.Component {
  constructor(props) {
    super(props);

    this.reviewCategories = [
      {
        label: '- Select Rejection Reason -',
        value: false,
        disabled: true,
      },
      {
        label: 'Inappropriate Content',
      },
      {
        label: 'Images Is Too Blurry',
      },
      {

        label: 'Images Don’t Match Description ',
      },
      {

        label: 'Typographical Errors ',
      },
      {

        label: 'Description Is Too Ambiguous  ',
      },
      {

        label: 'Description Is Too Vague  ',
      },
      {
        label: 'Title Is Too Vague ',
      },
      {

        label: 'Title Is Too Ambiguous  ',
      },
      {

        label: 'Others',
      },
    ];
    this.state = {
      category: this.reviewCategories[0].label,
      message: '',
      submitting: false,
    };
    this.banner = null;
    this._isMounted = false;
    this.timerHandler = null;
    this.submitReview = this.submitReview.bind(this);
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const { props } = this;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async submitReview(action) {
    const { props, state } = this;
    const { category, message } = state;
    if (state.submitting) {
      return true;
    }
    if (action === 'reject' && category === this.reviewCategories[0].label) {
      popAlert({
        title: "Can't submit review",
        description: 'you need to select the rejection reason',
        error: true,
      });

      return true;
    }
    const { activity } = props.viewActivity;

    this.setState({
      submitting: action,
    });
    try {
      await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/admin/activities/${activity.id}/review`,
        method: 'PATCH',
        body: JSON.stringify({
          review: action,
          reason: category,
          message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      popAlert({
        title: 'Activity reviewed successfully',
      });
      Router.push(`${props.AppUrl}/admin`);
    } catch (erroRes) {
      console.log('the ress', erroRes);
      // alert('we error');
      // Router.push('/');
    }
    this.setState({
      submitting: false,
    });
  }

  render() {
    const { state, props } = this;
    const { date, activity, settings } = props;
    const { sessionUser } = settings;
    let { category, message } = state;
    const { canJoinActivity, canStartActivity, startingActivity } = state;
    const { host } = activity;
    const isHost = sessionUser.userId === activity.userId;

    if (!props.isAdminReview) {
      category = activity.reviews[0].reason;
      message = activity.reviews[0].message;
    }

    let button1 = {
      onClick: () => {
        this.submitReview('approve');
      },
      label: (
        <>
          APPROVE{
            state.submitting
            && state.submitting === 'approve'
            && <span className="icon icon-refresh spinner" />
          }
        </>
      ),
    };
    let button2 = {
      onClick: () => {
        this.submitReview('reject');
      },
      label: (
        <>
          REJECT{
            state.submitting
            && state.submitting === 'reject'
            && <span className="icon icon-refresh spinner" />
          }
        </>
      ),
    };

    if (!props.isAdminReview) {
      button1 = {
        label: 'EDIT',
        onClick: () => {
          Router.push(`${props.AppUrl}/edit-activity/${activity.id}`);
        },
      };
      button2 = {
        label: 'CANCEL',
        onClick: () => {
          popPrompt({
            message: (
              <div>
                <p>Are you sure you want to cancel this activity?</p>
              </div>
            ),
            confirmButton: {
              label: 'YES',
              onClick: async (clser) => {
                await props.fetchRequest({
                  url: `${process.env.REACT_APP_API}/activities/${activity.id}`,
                  method: 'DELETE',
                });
                clser();
                popAlert({
                  title: 'Activity deleted',
                  description: 'Your participants will be notified of the cancellation.',
                });
                Router.push(`${props.AppUrl}/activities`);
              },
            },
            cancelButton: {
              label: 'NO',
            },
          });
        },
      };
    }

    return (
      <div id="activityRegistration">
        <div className="content details">
          <div className="detail">
            <span className="info">Duration:</span>
            <span className="value">{parseDuration(activity.duration || 90)}</span>
          </div>
          <div className="detail">
            <span className="info">Start:</span>
            <span className="value">{parseDate(activity.startDate)}</span>
          </div>
          <div className="detail">
            <span className="info">End:</span>
            <span className="value">{parseDate(activity.endDate)}</span>
          </div>
          <div className="detail">
            <span className="info">Freq:</span>
            <span className="value">{capitalize(ActivityFrequencies.find(activity.frequency).title)}</span>
          </div>
          <div className="detail">
            <span className="info">Credits:</span>
            <span className="value">
              {props.getActivityCredit(activity.duration)}
            </span>
          </div>
        </div>
        <div id="adminReview" className="content">

          {props.isAdminReview ? (
            <>
              <div className="header">
                <p className="label">Activity {!props.isAdminReview ? 'Status' : 'Review'}</p>
                {/* <p>Please review reason(s) for rejection and revise so we can get your </p> */}
              </div>

              <Dropdown
                onLoad={(e) => {
                  if (e && !this.rejectionDrop) {
                    this.rejectionDrop = e;
                  }
                }}
                controller={(
                  <button
                    type="button"
                    className="filter-cntrl btn btn-default bordered no-shadow __pill"
                  >{category}
                  </button>
                )}
                content={(
                  <div className="activity-filter-dropdown">
                    <InputPicker
                      controls
                      multichoice={false}
                      values={[category]}
                      placeholder="select"
                      options={this.reviewCategories}
                      onChange={([value]) => {
                        // alert('we on change');
                        this.setState(() => ({
                          category: value,
                        }));
                      }}
                      onSave={() => {
                        this.rejectionDrop.hideDropdown();
                      }}
                    />
                  </div>
                )}
              />

              <InputField
                type="textarea"
                label="Message"
                value={message}
                onChange={(value) => {
                  this.setState({
                    message: value,
                  });
                }}
              />

            </>
          ) : (
            <>
              <div className="review-detail">
                <div className="label">Rejection Reason</div>
                <div className="value">{category}</div>
              </div>
              <div className="review-detail">
                <div className="label">Message</div>
                <div className="value">{message}</div>
              </div>
            </>
          )}
          <div className="actions">
            <button
              type="button"
              className="btn btn-1"
              onClick={button1.onClick}
            >{button1.label}
            </button>
            <button
              type="button"
              className="btn btn-glass bordered no-shadow"
              onClick={button2.onClick}
            >{button2.label}
            </button>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
});
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
  setActivity: (props) => dispatch(setActivity(props)),
  updateCalendarEvents: (events) => dispatch(updateEvents(events)),
  deleteCalendarEvents: (events) => dispatch(updateEvents(events, {}, 'remove')),

});
export default connect(mapStateToProps, mapDispatchToProps)(ActivityReview);
