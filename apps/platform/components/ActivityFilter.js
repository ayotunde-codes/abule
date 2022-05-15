import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { capitalize } from '@material-ui/core';
import {
  InputDatePicker, Dropdown, InputPicker, Fn,
} from '@abule-common/components';
import { AgeGroups, Categories } from '../datastore';
import {
  setSearchProps, loadResult, resultLoaded, resetSearchProps,
} from '../redux/search/action';

const {
  isEmail, devalueString, isDescendant, getMonth, isEmpty, delay,
} = Fn;

class ActivityFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.dropdown = {
      categories: null,
      ageGroups: null,
    };
    this._isMounted = false;
    this.fetchActivities = this.fetchActivities.bind(this);
    this.formatRelativeDate = this.formatRelativeDate.bind(this);
    this.activityGroupList = null;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.fetchResult) {
      let {
        type,
        categories,
        ageGroups,
        startDate,
        stopDate,
      } = Router.query;
      const query = [];
      if (categories) {
        categories = categories.split(',');
      }
      if (ageGroups) {
        ageGroups = ageGroups.split(',');
      }
      if (startDate) {
        startDate = new Date(startDate);
        if (startDate.getTime()) {
          startDate = {
            weekDay: startDate.getDay(),
            month: startDate.getMonth() + 1,
            day: startDate.getDate(),
            year: startDate.getFullYear(),
          };
        } else {
          startDate = null;
        }
      }
      if (stopDate) {
        stopDate = new Date(stopDate);
        if (stopDate.getTime()) {
          stopDate = {
            weekDay: stopDate.getDay(),
            month: stopDate.getMonth() + 1,
            day: stopDate.getDate(),
            year: stopDate.getFullYear(),
          };
        } else {
          stopDate = null;
        }
      }

      console.log('first check', {
        type,
        categories,
        ageGroups,
        startDate,
        stopDate,
      });
      const filters = {
        type: type || '',
        categories: categories || [],
        ageGroups: ageGroups || [],
        startDate: startDate || '',
        stopDate: stopDate || '',
        // startDate: startDate.getTime() ? startDate : null,
      };
      this.onFilterUpdate(filters);
      this.commitSearch(filters, false);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.resetSearchProps();
  }

  fetchActivities(queryObj) {
    this._isMounted = true;
    const { props } = this;
    const { search } = props;
    const {
      type,
      categories,
      ageGroups,
      startDate,
      stopDate,
    } = (queryObj || Router.query);
    console.log({ search });
    // alert('component mounted');
    props.loadResult();
    // alert('1');
    const query = [];
    if (type) {
      query.push(`type=${type}`);
    }
    if (categories) {
      query.push(`categories=${categories}`);
    }
    if (ageGroups) {
      query.push(`ageGroups=${ageGroups}`);
    }
    if (startDate) {
      query.push(`startDate=${startDate ? `${startDate.year}-${startDate.month}-${startDate.day}` : startDate}`);
      // query.push(`startDate=${}`);
    }
    if (stopDate) {
      // query.push(`stopDate=${stopDate}`);
      query.push(`stopDate=${stopDate ? `${stopDate.year}-${stopDate.month}-${stopDate.day}` : stopDate}`);
    }

    props.FetchRequest({
      url: `${process.env.REACT_APP_API}/activities-search?${query.join('&')}`,
      method: 'GET',
    }).then((data) => {
      if (this._isMounted) {
        console.log('get an activity ', { data, keys: Object.keys(data)[0] });
        // const value = Object.keys(data)[0];
        props.resultLoaded(data.data.data);
      }
    }).catch((erroRes) => {
      Router.push(`${props.AppUrl}/`);
    });
  }

  onFilterUpdate(filterProps, callback = () => { }) {
    const { props } = this;
    const { search } = props;
    const { filters } = search;
    const newFilters = {
      ...filters,
      ...filterProps,
    };

    props.setSearchProps(newFilters);
    callback();
  }

  commitSearch(filtersExtra, updateUrl = true) {
    const { props } = this;
    const { search } = props;
    let { filters } = search;
    filters = {
      ...filters,
      ...filtersExtra,
    };

    const {
      type,
      categories,
      ageGroups,
      startDate,
      stopDate,
    } = filters;
    const pagePath = Router.route.split('/');
    console.log('the page path is ', {
      categories,
      ageGroups,
      startDate,
      stopDate,
      pagePath,
    });

    if (
      isEmpty(type)
      && categories.length === 0
      && ageGroups.length === 0
      && isEmpty(startDate)
      && pagePath.length === 4
      && pagePath[1] === 'app'
      && pagePath[2] === 'activities'
      && pagePath[3] === 'search'
    ) {
      // alert('the alert');
      Router.replace(`${props.AppUrl}/activities`);
    } else {
      const query = [];
      query.push(`categories=${categories.join(',')}`);
      query.push(`ageGroups=${ageGroups.map((ag) => encodeURIComponent(ag)).join(',')}`);
      query.push(`startDate=${startDate ? `${startDate.year}-${startDate.month}-${startDate.day}` : startDate}`);
      query.push(`stopDate=${stopDate ? `${stopDate.year}-${stopDate.month}-${stopDate.day}` : stopDate}`);
      // query.push(`stopDate=${stopDate}`);

      if (updateUrl) Router.push(`${props.AppUrl}/activities/search?${query.join('&')}`);
      this.fetchActivities(filters);
    }
  }

  showLocation() {
    // alert('clieked');
    this.setState({ showLocation: true });

    const hideInputTimeModal = (event) => {
      if (!isDescendant(event.target, this.locationFilter)) {
        this.setState({ showLocation: false });
        window.document.removeEventListener('click', hideInputTimeModal);
      }
    };

    window.document.addEventListener('click', hideInputTimeModal);
  }

  formatRelativeDate(dates) {
    const [startDate, endDate] = dates;
    const start = {
      ...startDate,
    };
    const end = endDate ? {
      month: '',
      day: '',
      year: '',
      ...endDate,
    } : null;

    if (!startDate) return '';

    const parseMonth = (month) => {
      if (!month) return '';
      let Month = getMonth(month - 1);
      Month = capitalize(`${Month[0]}${Month[1]}${Month[2]}`);
      return Month;
    };

    const currentYear = new Date().getFullYear();
    if (start && end) {
      if (currentYear === start.year && start.year === end.year) {
        start.year = '';
        end.year = '';

        if (start.month === end.month) {
          end.month = '';
        }
      } else {
        start.year = ` ${start.year}`;
        end.year = ` ${end.year}`;
      }
    } else if (start) {
      if (currentYear === start.year) {
        start.year = '';
      } else {
        start.year = ` ${start.year}`;
      }
    }
    // ${date.day}, ${date.year}`;
    /* (dates) => (dates.map((date) => (
      date ? this.formatRelativeDate(date) : ''
    ))).join(' - ') */
    return `${parseMonth(start.month)} ${start.day}${start.year}${end ? ` - ${parseMonth(end.month)} ${end.day}${end.year}` : ''}`;
  }

  render() {
    const { state, props } = this;
    const { search } = props;
    const { filters } = search;
    // Get filter info from url

    // alert('the props');

    const suggestions = [
      12,
      123,
      1234,
      12345,
      123456,
      1234567,
      12345678,
      123456789,
      1234567890,
    ];

    return (
      <div id="activitiesFilter">
        <div className="activities-actions">
          <div className="filters">
            <div className="filter" ref={(e) => { this.categoriesFilter = e; }}>
              <Dropdown
                onLoad={(e) => {
                  this.dropdown.categories = e;
                }}
                controller={(
                  <button
                    type="button"
                    className={`filter-cntrl btn btn-default bordered no-shadow __pill${filters.categories.length ? ' active' : ''}`}
                  >Categories
                  </button>
                )}
                content={(
                  <div className="activity-filter-dropdown">
                    <InputPicker
                      controls
                      values={filters.categories}
                      options={Categories.data.map((activity) => ({
                        label: capitalize(activity.title),
                        value: activity.id,
                        // className: state.categoryError ? 'error' : '',
                      }))}
                      onChange={(categories) => {
                        this.onFilterUpdate({
                          categories,
                        });
                      }}
                      onSave={() => {
                        this.dropdown.categories.hideDropdown();
                      }}
                      onReset={(categories) => {
                        this.onFilterUpdate(
                          {
                            categories,
                          }, async () => {
                            await delay(100);
                            this.dropdown.categories.hideDropdown();
                          },
                        );
                      }}
                    />
                  </div>
                )}
                onClose={() => {
                  this.commitSearch();
                }}
              />
            </div>

            <div className="filter" ref={(e) => { this.ageFilter = e; }}>
              <Dropdown
                onLoad={(e) => {
                  if (e && !this.dropdown.ageGroups) {
                    // alert('setting the fucker');
                    this.dropdown.ageGroups = e;
                  }
                }}
                controller={(
                  <button
                    type="button"
                    className={`filter-cntrl btn btn-default bordered no-shadow __pill${filters.ageGroups.length ? ' active' : ''}`}
                  >Age
                  </button>
                )}
                content={(
                  <div className="activity-filter-dropdown">
                    <InputPicker
                      controls
                      values={filters.ageGroups}
                      options={AgeGroups.data.map((ageGroup) => ({
                        label: `${ageGroup.start} - ${ageGroup.end}`,
                        value: ageGroup.id,
                        // className: state.ageGroupError ? 'error' : '',
                      }))}
                      onChange={(ageGroups) => {
                        this.onFilterUpdate({
                          ageGroups,
                        });
                      }}
                      onSave={() => {
                        this.dropdown.ageGroups.hideDropdown();
                      }}
                      onReset={(ageGroups) => {
                        this.onFilterUpdate(
                          {
                            ageGroups,
                          }, async () => {
                            await delay(100);
                            this.dropdown.ageGroups.hideDropdown();
                          },
                        );
                      }}
                    />
                    <div />
                  </div>
                )}
                onClose={() => {
                  this.commitSearch();
                }}
              />
            </div>

            <div className="filter">
              <InputDatePicker
                // multichoice
                pickRange
                placeholder="Date"
                minDate={new Date()}
                className={`filter-cntrl btn btn-default bordered no-shadow __pill${filters.startDate ? ' active' : ''}`}
                values={(() => {
                  const datesFilter = [];
                  if (filters.startDate) {
                    datesFilter.push(filters.startDate);
                  }
                  if (filters.stopDate) {
                    datesFilter.push(filters.stopDate);
                  }
                  return datesFilter;
                })()}
                labelFormatter={this.formatRelativeDate}
                onChange={(dates) => {
                  this.onFilterUpdate({
                    startDate: dates && dates[0] ? dates[0] : '',
                    stopDate: dates && dates[1] ? dates[1] : '',
                  });
                }}
                onSave={() => {
                  this.commitSearch();
                }}
                onClose={() => {
                  this.commitSearch();
                }}
              />
            </div>
            {/*
            <div className="filter" ref={(e) => { this.locationFilter = e; }}>
              <button
                type="button"
                className={`filter-cntrl btn btn-default bordered no-shadow __pill${filters.location ? ' active' : ''}`}
                onClick={(ev) => {
                  ev.stopPropagation();
                  this.showLocation();
                }}
              >{filters.location || 'Location'}

              </button>
              <div className={`filter-options${state.showLocation ? '' : ' hide'}`}>
                <InputField
                  placeholder="city"
                  value={state.locationQuery}
                  onChange={(locationQuery) => {
                    this.setState({ locationQuery });
                  }}
                />
                <div className="suggestions">
                  {suggestions.map((item) => (
                    <div
                      className="item"
                      onClick={() => {
                        this.setState((prev) => ({
                          showLocation: false,
                          locationQuery: '',
                          filters: {
                            ...prev.filters,
                            location: item,
                          },
                        }));
                      }}
                    >{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
 */}
          </div>
          {/* <div className="search">
            <SearchBar />
          </div> */}
        </div>
      </div>
    );
  }
}

ActivityFilter.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  values: PropTypes.array,
  options: PropTypes.array,
  mandatory: PropTypes.bool,
  isEditable: PropTypes.bool,
  multichoice: PropTypes.bool,
  fetchResult: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

ActivityFilter.defaultProps = {
  className: '',
  values: [],
  options: [{}],
  mandatory: false,
  fetchResult: true,
  multichoice: true,
  style: {},
  onChange: () => { },
};

const mapStateToProps = (state) => ({
  search: state.search,
});
const mapDispatchToProps = (dispatch) => ({
  loadResult: (props) => dispatch(loadResult(props)),
  resultLoaded: (props) => dispatch(resultLoaded(props)),
  setSearchProps: (props) => dispatch(setSearchProps(props)),
  resetSearchProps: (props) => dispatch(resetSearchProps(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ActivityFilter);
