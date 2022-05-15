import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  PopMessage, InputSelect, InputPicker,
  Fn,
} from '@abule-common/components';
import { sessionUserDeleteKid, sessionUserUpdateKid } from '../../redux/settings/action';
import { Grades } from '../../datastore';
import UpdateSupportType from './UpdateSupportType';

const {
  capitalize, getAllWeekDays, padString, ucFirst,
} = Fn;

const doubNumb = (value) => padString(value, '0', 2);
class SupportPreview extends Component {
  constructor(props) {
    super(props);

    let focusedDay = '';
    // Set the default focused day
    const { days } = props.support;
    for (const day of getAllWeekDays()) {
      if (days[day].length) {
        focusedDay = day;
        break;
      }
    }
    this.state = {
      focusedDay,
      showGrades: false,
      showSubjects: false,
      showSupportUpdate: false,
    };

    this._isMounted = false;
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

  render() {
    const { state, props } = this;
    const { support } = this.props;
    const { focusedDay } = state;
    const WeekDays = getAllWeekDays();
    const focusedTimeline = support.days[focusedDay];

    return (
      <>
        <div className={`support-preview ${props.className}`}>
          <div className="support-preview-header">
            <span className="support-type">{support.type}</span>
            <div className="support-info">
              {support.type === 'tutoring'
                ? (
                  <div className="support-actions">
                    <div
                      className="support-action"
                      onClick={() => {
                        this.setState({
                          showGrades: true,
                        });
                      }}
                    >Grades
                    </div>
                    <div
                      className="support-action"
                      onClick={() => {
                        this.setState({
                          showSubjects: true,
                        });
                      }}
                    >Subjects
                    </div>
                  </div>
                )
                : <span>{support.age.start} - {support.age.end} yrs</span>}
            </div>
          </div>
          <InputSelect
            value={focusedDay}
            options={WeekDays.map((day) => {
              const label = capitalize(`${day[0]}${day[1]}${day[2]}`);
              return {
                label,
                value: day,
                disable: support.days[day].length === 0,
              };
            })}
            onChange={(value) => {
              this.setState({
                focusedDay: value,
              });
            }}
          />
          <div className="time-list">
            {focusedTimeline && focusedTimeline.map((timeRange, index) => {
              const { start, end } = timeRange;
              return (
                <span className="support-time">
                  <span>
                    {doubNumb(start.hour)}:{doubNumb(start.minute)} {start.period} - {doubNumb(end.hour)}:{doubNumb(end.minute)} {end.period}
                  </span>

                </span>
              );
            })}
          </div>
          {props.editable && (
            <button
              id="updateBtn"
              type="button"
              className="btn btn-glass no-shadow bordered"
              onClick={() => {
                this.setState({
                  showSupportUpdate: true,
                });
              }}
            >Update
            </button>
          )}
        </div>

        {support.grades && (
          <PopMessage
            show={state.showGrades}
            style={{ zIndex: '2' }}
            message={(
              <div id="updateInterestsPopUp">
                <div className="title">
                  <div className="label">Grades</div>
                </div>
                <div className="pickers">
                  <InputPicker
                    values={support.grades}
                    options={support.grades.map((gradeId) => {
                      const grade = Grades.find(gradeId);
                      return {
                        value: grade.id,
                        label: ucFirst(grade.title),
                      };
                    })}
                  />
                </div>

              </div>
            )}
            confirmButton={{
              show: false,
              label: 'CLOSE',
              onClick: async (closer, hideLoader) => {
                closer();
              },
              className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                showGrades: false,
              });
            }}
          />
        )}

        {support.subjects && (
          <PopMessage
            show={state.showSubjects}
            style={{ zIndex: '2' }}
            message={(
              <div id="updateInterestsPopUp">
                <div className="title">
                  <div className="label">Subjects</div>
                </div>
                <div className="pickers">
                  <InputPicker
                    values={support.subjects}
                    options={support.subjects.map((subject) => ({
                      value: subject,
                      label: capitalize(subject),
                    }))}
                  />
                </div>

              </div>
            )}
            confirmButton={{
              show: false,
              label: 'CLOSE',
              onClick: async (closer, hideLoader) => {
                closer();
              },
              className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                showSubjects: false,
              });
            }}
          />
        )}

        <PopMessage
          show={state.showSupportUpdate}
          style={{ zIndex: '2' }}
          message={(
            <div id="updateInterestsPopUp">
              <div className="title">
                <div className="label">{support.type}</div>
              </div>
              <UpdateSupportType
                support={support}
                onChange={(supportt) => {
                  console.log('final', { supportt });
                  // alert('supportt');
                  this.props.onChange(supportt);
                }}
              />
            </div>
          )}
          confirmButton={{
            show: false,
            label: 'CLOSE',
            onClick: async (closer, hideLoader) => {
              closer();
            },
            className: 'btn btn-1',
          }}
          onCancel={() => {
            this.setState({
              showSupportUpdate: false,
            });
          }}
        />

      </>

    );
  }
}

SupportPreview.propTypes = {
  onSignInSuccess: PropTypes.func,
  onSignInFail: PropTypes.func,
  onLoad: PropTypes.func,
  onChange: PropTypes.func,
  actions: PropTypes.array,
  className: PropTypes.string,
};

SupportPreview.defaultProps = {
  onChange: () => { },
  onSignInFail: () => { },
  onLoad: () => { },
  className: '',
  editable: false,
  actions: [
    /*
      {
        label: "name on button",
        className: "button class",
        onClick: ()=>{

        }
      }
    */
  ],
};

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SupportPreview);
