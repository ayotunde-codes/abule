import React from 'react';
import PropTypes from 'prop-types';
import {
  isEmail, capitalize, isDescendant, milSecToMinutes, lightenDarkenColor, getRelativePosition, getPosition,
} from './Fn';

/**
  * It allows the user to create System Activity
  * @augments {Component<Props, State>}
  * @param {me} dlkjsnclksn
*/
class TimelineView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 15,
      activeDay: 0,
    };
    this.defaultEarliestSelection = {
      day: 'sunday',
      start: new Date(null, null, null, 23, 59),
      selection: 0,
    };

    this.timeline = null;
    this.focusEarliestSelectionCMD = true;
    this.earliestSelection = this.defaultEarliestSelection;
    this.focusEarliestSelection = this.focusEarliestSelection.bind(this);
  }

  UNSAFE_componentWillUpdate(prevProps, prevState) {
    const { props } = this;
    if (JSON.stringify(prevProps.timeline) !== JSON.stringify(props.timeline)) {
      this.focusEarliestSelection();
    }
  }

  focusEarliestSelection(e) {
    // this.focusInput();
    this.focusEarliestSelectionCMD = true;
    this.earliestSelection = this.defaultEarliestSelection;
  }

  render() {
    const { props } = this;
    const { state } = this;
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const Duration = props.value || state.duration;
    let duration = Math.floor(Duration / 60);
    if (duration === 0) {
      duration = `${Duration}mins`;
    } else {
      const mins = Duration % 60;
      duration = `${duration}hr${duration > 1 ? 's' : ''} ${mins > 0 ? `${mins}mins` : ''}`;
    }

    const { timeline } = props;
    const timelineDays = Object.keys(timeline);
    const timelineData = {};
    timelineDays.forEach((day, index) => {
      const data = [];
      timeline[day].forEach((timeRange) => {
        const dayData = {
          spanRight: 1,
          timeRange: JSON.stringify(timeRange),
        };
        // check if previous day
        if (timelineDays[index - 1]) {
          //  previous day timline data
          const prevDay = timelineDays[index - 1];
          const prevTimelineData = timelineData[prevDay];
          for (let i = 0; i < prevTimelineData.length; i += 1) {
            // check if previous day has a time range that matches the current time range in order to merge them
            if (prevTimelineData[i].timeRange === dayData.timeRange) {
              // if previous timeline had been merged then merge with the main timeline
              if (prevTimelineData[i].merged) {
                dayData.merged = prevTimelineData[i].merged;
                timelineData[prevTimelineData[i].merged.day][prevTimelineData[i].merged.index].spanRight += 1;
              } else {
                // merge with previous timeline
                dayData.merged = {
                  day: prevDay,
                  index: i,
                };
                timelineData[prevDay][i].spanRight += 1;
              }
              // alert('we are to merge man');
              break;
            }
          }
        }
        data.push(dayData);
      });

      timelineData[day] = data;
    });

    console.log('TIME INE DATa', timelineData);

    const getTimeRangeData = (day, start, end, log) => {
      const rangeData = [];

      if (timelineData[day]) {
        timelineData[day].forEach((timeRange) => {
          if (!timeRange.merged) {
            const range = JSON.parse(timeRange.timeRange);
            let rangeStartHour = Number(range.start.hour);
            if (rangeStartHour === 12 && range.start.period === 'AM') {
              rangeStartHour = 0;
            } else if (rangeStartHour !== 12 && range.start.period === 'PM') {
              rangeStartHour += 12;
            }
            const rangeStart = new Date(null, null, null, rangeStartHour, range.start.minute);

            if (rangeStart >= start && rangeStart <= end) {
              rangeData.push({
                ...timeRange,
                timeRange: range,
              });
            }
            if (log) {
              console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ', {
                day,
                range,
                rangeStart,
                start,
                end,
                rangeStartHour,
              });
            }
          }
        });
      }

      return rangeData;
    };
    return (
      <div className="timeline-view">

        <div
          className="timeline"
          ref={(e) => {
            if (!this.timeline) {
              this.timeline = e;
            }
            if (this.focusEarliestSelectionCMD) {
              const rowIndex = this.earliestSelection.start.getHours();
              const row = this.timeline.getElementsByClassName('row')[rowIndex + 1];
              const dayColumn = days.indexOf(this.earliestSelection.day);
              //  add 1 column index to account for the time colunn
              const column = row.getElementsByTagName('div')[dayColumn + 1];
              const selection = column.getElementsByClassName('selection')[this.earliestSelection.selection];
              const selectionPosition = $(selection).position();
              const { top, left } = $(column).position();
              const pageFontSize = $('body').css('font-size').split('px')[0];
              /*  column.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start',
              }); */
              console.log('pagefontso:', pageFontSize);
              // alert(`pagefontso: ${pageFontSize}`);
              /* this.timeline.scroll({
                top: top - pageFontSize * 3.118,
                left,
                behavior: 'smooth',
              }); */
              console.log({
                CMD: this.focusEarliestSelectionCMD,
                earliestSelection: this.earliestSelection,
                column,
                columnPosition: {
                  top, left,
                },
                columnPosition2: getPosition(column),
                selectionPosition,
              });
              this.focusEarliestSelectionCMD = false;
            }
          }}
        >
          <div className="row week-days">
            <div />
            {days.map((day, index) => (
              <div>
                <div className={`week-day${timelineData[day].length ? ' active' : ''}`}>
                  <span>{capitalize(`${day[0]}${day[1]}${day[2]}`)}</span>
                  <span>•</span>
                </div>
              </div>
            ))}
          </div>
          {(() => {
            const data = [];

            for (let i = 0; i < 24; i += 1) {
              let time = i;
              let period = 'AM';
              if (time === 0) {
                time = 12;
              } else if (time >= 12) {
                period = 'PM';
                if (time > 12) {
                  time -= 12;
                }
              }

              data.push(
                <div className="row">
                  <div>{time}{period}</div>
                  {days.map((day) => {
                    const boxStartTime = new Date(null, null, null, i);
                    let log = false;
                    if (day === 'saturday' && i === 12) {
                      log = true;
                    }

                    const timeRangeData = getTimeRangeData(day, boxStartTime, new Date(null, null, null, i + 1), log);

                    if (log) {
                      console.log('time range data  : ', { day, boxStartTime, timeRangeData });
                    }
                    return (
                      <div>
                        {timeRangeData.map((timeRange, inedx) => {
                          const range = timeRange.timeRange;

                          let rangeStartHour = Number(range.start.hour);
                          if (rangeStartHour === 12 && range.start.period === 'AM') {
                            rangeStartHour = 0;
                          } else if (rangeStartHour !== 12 && range.start.period === 'PM') {
                            rangeStartHour += 12;
                          }

                          const rangeStart = new Date(null, null, null, rangeStartHour, range.start.minute);
                          let rangeEndHour = Number(range.end.hour);
                          if (rangeEndHour === 12 && range.end.period === 'AM') {
                            rangeEndHour = 0;
                          } else if (rangeEndHour !== 12 && range.end.period === 'PM') {
                            rangeEndHour = Number(rangeEndHour) + 12;
                          }
                          const rangeEnd = new Date(null, null, null, rangeEndHour, range.end.minute);

                          const diffInMinutes = milSecToMinutes(rangeEnd - rangeStart);
                          const height = (diffInMinutes / 60) * 100;
                          const boxCovered = parseInt(height / 100, 10);
                          const gapFromBox = milSecToMinutes(rangeStart - boxStartTime);

                          if (this.earliestSelection.start > rangeStart) {
                            this.earliestSelection = {
                              day,
                              start: rangeStart,
                              selection: inedx,
                            };
                          }
                          if (log) {
                            console.log({
                              rangeStartHour,
                              rangeStart,
                              rangeEndHour,
                              rangeEnd,
                              boxStartTime,
                            });
                          }
                          return (
                            <div
                              className="selection"
                              tabIndex={0}
                              style={{
                                width: `calc(${timeRange.spanRight * 100}% + ${timeRange.spanRight}px)`,
                                height: `calc(${height}% + ${boxCovered}px)`,
                                top: `${(gapFromBox / 60) * 100}%`,
                                background: props.selectionColor || '',
                                borderColor: lightenDarkenColor(props.selectionColor, -10) || '',
                              }}
                            >
                              <p>{range.start.hour}:{range.start.minute}{range.start.period} - {range.end.hour}:{range.end.minute}{range.end.period}</p>
                            </div>
                          );
                        })}

                      </div>
                    );
                  })}

                </div>,
              );
            }

            return data;
          })()}

        </div>
      </div>
    );
  }
}

TimelineView.defaultProps = {
  label: '',
  className: '',
  globalClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  readOnly: false,
  style: {},
  onEnterKey: () => { },
  onLoad: () => { },
  onChange: () => { },
  onKeyDown: () => { },
};

export default TimelineView;
