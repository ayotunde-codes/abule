import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  InputPicker, SearchBar, PopMessage, InputSupport, InputSlider, InputLocation,
  Fn,
} from '@abule-common/components';
import {
  AgeGroups, Grades, Utils,
} from '../../datastore';
import {
  setSearchProps, loadResult, resultLoaded, resetSearchProps,
} from '../../redux/search/action';

const {
  capitalize,
  creditToUsd,
  ucFirst,
  isEmpty,
} = Fn;

const primaryFilterItems = [
  'driving',
  'sitting',
  'tutoring',
];

class TribeFilter extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
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
      showInterests: false,
      showValues: false,
      showFilters: false,
    };

    const { sessionUser } = props.settings;
    const userFriends = sessionUser.friends;

    this.state = {
      ...this.defaultState,
      users: Object.values(userFriends.all),
      resultType: 'all',
      loading: false,
      showCreateGroup: false,
    };

    this.makeSearch = this.makeSearch.bind(this);
  }

  async makeSearch() {
    const { state, props } = this;
    try {
      this.setState({ loading: true });
      const query = [];
      if (state.coreValues.length > 0) {
        query.push(`coreValues=${state.coreValues.join(',')}`);
      }
      if (state.parentInterests.length > 0) {
        query.push(`interests=${state.parentInterests.join(',')}`);
      }

      if (state.location) {
        const { location } = state;
        if (state.locationRadius > 0) {
          location.radius = state.locationRadius;
        }
        query.push(`location=${JSON.stringify(location, null, 0)}`);
      }

      if (state.kidsInterests.length > 0) {
        query.push(`kidsInterests=${state.kidsInterests.join(',')}`);
      }

      query.push(`kidsAge=${JSON.stringify(state.kidsAge, null, 0)}`);

      if (state.kidsSchool.length > 0) {
        query.push(`schoolId=${state.kidsSchool.join(',')}`);
      }

      if (!isEmpty(state.supportType)) {
        query.push(`supportType=${state.supportType}`);
      }

      if (state.supportGrades.length > 0) {
        query.push(`supportGrades=${state.supportGrades.join(',')}`);
      }

      if (state.supportSubjects.length > 0) {
        query.push(`supportSubjects=${state.supportSubjects.join(',')}`);
      }

      query.push(`supportPrice=${JSON.stringify(state.supportPrice, null, 0)}`);

      if (state.supportDayTime.isAvailable) {
        query.push(`supportDayTime=${JSON.stringify(state.supportDayTime.days, null, 0)}`);
      }

      query.push(`q=${state.searchQuery}`);

      const people = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/tribe/search?${query.join('&')}`,
      });

      console.log('the people returned from filter', people);
      this.setState({ users: people });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ loading: false });
      console.log('error filtering people', e);
    }
  }

  render() {
    const { state, props } = this;
    const { users } = state;
    const { sessionUser } = props.settings;
    const userFriends = sessionUser.friends;
    const approvedFriends = userFriends.approved;
    const pendingFriends = userFriends.pending;
    const groupUsers = userFriends.approved.groups;
    const { unassigned } = userFriends.approved;

    const { search, settings } = props;
    const UserInterests = Utils.getValue('UserInterests');
    const KidInterests = Utils.getValue('KidInterests');
    const CoreValues = Utils.getValue('CoreValues');
    const allAgeGroup = AgeGroups.data;
    const Subjects = Utils.getValue('Subjects');

    let filtersSet = false;
    if (
      state.location
      || !(state.kidsAge.start === this.defaultState.kidsAge.start && state.kidsAge.end === this.defaultState.kidsAge.end)
      || !(state.supportPrice.start === this.defaultState.supportPrice.start && state.supportPrice.end === this.defaultState.supportPrice.end)
      || [
        ...state.supportGrades,
        ...state.supportSubjects,
        ...state.kidsSchool,
      ].length > 0
    ) {
      filtersSet = true;
    }

    let showAge = true;
    let showPrice = true;
    let showGrades = false;
    let showSubjects = false;
    if (['driving', 'sitting'].includes(state.supportType)) {
      showAge = true;
    }
    if (['tutoring', 'sitting'].includes(state.supportType)) {
      showPrice = true;
    }
    if (['tutoring'].includes(state.supportType)) {
      showGrades = true;
      showSubjects = true;
    }

    return (
      <>

        <div id="tribeFilter">
          <div className="filters-container">
            <div className="tribe-actions primary">
              <div className="filters">
                <div className="filter-data">
                  <button
                    type="button"
                    className={`filter-cntrl${filtersSet ? ' active' : ''}`}
                    // className={`filter-cntrl ${state.parentInterest.length ? ' active' : ''}`}
                    onClick={() => {
                      this.setState({
                        showFilters: true,
                      });
                    }}
                  >
                    <span className="icon icon-hmv-filter" /><span>Filters</span>
                  </button>
                </div>

                <div className="filter-data">

                  <button
                    type="button"
                    className={`filter-cntrl${[...state.parentInterests, ...state.kidsInterests].length > 0 ? ' active' : ''}`}
                    // className={`filter-cntrl ${state.parentInterest.length ? ' active' : ''}`}
                    onClick={() => {
                      this.setState({
                        showInterests: true,
                      });
                    }}
                  >Interests
                  </button>
                </div>

                <div className="filter-data">
                  <button
                    type="button"
                    className={`filter-cntrl${state.coreValues.length > 0 ? ' active' : ''}`}
                    onClick={() => {
                      this.setState({
                        showValues: true,
                      });
                    }}
                  >Values
                  </button>
                </div>

                <div className="filter-data">
                  <InputSupport
                    controller={(
                      <button
                        type="button"
                        className={`filter-cntrl${state.supportDayTime.isAvailable ? ' active' : ''}`}
                      >
                        Day & Time
                      </button>
                    )}
                    support={state.supportDayTime}
                    onChange={(support) => {
                      this.setState({ supportDayTime: support });
                    }}
                    onCancel={() => {
                      this.makeSearch();
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="tribe-actions secondary">
              <div className="filters">
                <div className="filter-data">
                  <button
                    type="button"
                    className={`filter-cntrl${state.supportType === 'driving' ? ' active' : ''}`}
                    onClick={() => {
                      showAge = true;

                      this.setState({
                        supportType: 'driving',
                      }, this.makeSearch);
                    }}
                  >Driving
                  </button>
                </div>

                <div className="filter-data">
                  <button
                    type="button"
                    className={`filter-cntrl${state.supportType === 'sitting' ? ' active' : ''}`}
                    onClick={() => {
                      showPrice = true;
                      showGrades = true;
                      showSubjects = true;
                      this.setState({
                        supportType: 'sitting',
                      }, this.makeSearch);
                    }}
                  >Sitting
                  </button>
                </div>

                <div className="filter-data">
                  <button
                    type="button"
                    className={`filter-cntrl${state.supportType === 'tutoring' ? ' active' : ''}`}
                    onClick={() => {
                      showAge = true;
                      showPrice = true;
                      this.setState({
                        supportType: 'tutoring',
                      }, this.makeSearch);
                    }}
                  >Tutoring
                  </button>
                </div>

              </div>

            </div>

            <div className="tribe-actions search">
              <SearchBar
                className=" search-bar"
                onChange={(value) => {
                  this.setState({
                    searchQuery: value,
                  });
                }}
                onBlur={() => {
                  this.makeSearch();
                }}
              />
            </div>
          </div>
        </div>

        <PopMessage
          show={state.showFilters}
          style={{ zIndex: '2' }}
          message={(
            <div id="filterMoreInfor">
              <div className="title">
                <div className="label">Filters</div>
              </div>
              <div className="main-content">

                <div className="single filter">
                  <p className="name">Location</p>
                  <div className="single filter">
                    <InputLocation
                      placeholder="select location"
                      value={state.locationInput}
                      // className={`${editProfile.streetAddressError !== false ? ' error' : ''}`}
                      onChange={(value) => {
                        this.setState({
                          location: null,
                          locationInput: value,
                        });
                      }}
                      onSelect={(loc) => {
                        this.setState({
                          location: {
                            longitude: loc.geometry.location.lng,
                            latitude: loc.geometry.location.lat,
                          },
                          locationInput: loc.formatted_address,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className={`single filter${!state.location ? ' disabled' : ''}`}>
                  <p className="name">Radius <span style={{ fontSize: '.8em', fontWeight: '400' }}>(in miles)</span></p>

                  <InputSlider
                    readOnly={!state.location}
                    hideMax
                    minPreviewLabel={null}
                    max={1000}
                    values={state.locationRadius}
                    onChange={({ start }) => {
                      this.setState((prevSate) => ({
                        locationRadius: start,
                      }));
                    }}
                  />
                </div>

                {showAge
                  && (
                    <div className="single filter">
                      <p className="name">Age</p>
                      <InputSlider
                        maxPreviewLabel="max"
                        minPreviewLabel="min"
                        min={allAgeGroup[0].start}
                        max={allAgeGroup[allAgeGroup.length - 1].end}
                        values={state.kidsAge}
                        onChange={(values) => {
                          this.setState({
                            kidsAge: values,
                          });
                        }}
                      />
                    </div>
                  )}

                {showPrice
                  && (
                    <div className="single filter">
                      <p className="name">Price</p>
                      <p className="description">The price unit is in credits (1 credit = ${creditToUsd(1)} USD)</p>
                      <InputSlider
                        minPreviewLabel={`min ($${creditToUsd(state.supportPrice.start)} USD)`}
                        maxPreviewLabel={`max ($${creditToUsd(state.supportPrice.end)} USD)`}
                        min={0}
                        max={100}
                        values={state.supportPrice}
                        onChange={(values) => {
                          this.setState({
                            supportPrice: values,
                          });
                        }}
                      />
                    </div>
                  )}
                {showGrades

                  && (
                    <div className="single filter">
                      <p className="name">Grades</p>
                      <div className="single filter">
                        <InputPicker
                          controls={false}
                          values={state.supportGrades}
                          options={Grades.data.map((grade) => ({
                            value: grade.id,
                            label: ucFirst(grade.title),
                          }))}
                          onChange={(values) => {
                            this.setState({
                              supportGrades: values,
                            });
                          }}
                        />
                      </div>
                    </div>
                  )}

                {showSubjects && (
                  <div className="single filter">
                    <p className="name">Subjects</p>
                    <div className="single filter">
                      <InputPicker
                        controls={false}
                        values={state.supportSubjects}
                        options={Subjects.map((subject) => ({
                          value: subject,
                          label: capitalize(subject),
                        }))}
                        onChange={(values) => {
                          this.setState({
                            supportSubjects: values,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="single filter">
                  <p className="name">Kids School</p>
                  <div className="single filter">
                    <InputPicker
                      controls={false}
                      // maxSelection={1}
                      values={state.kidsSchool}
                      options={sessionUser.kids.map((kid) => ({
                        value: kid.id,
                        label: capitalize(kid.preferredName),
                        className: 'kid-indicator',
                        props: {
                          // color: kid.color,
                        },
                      }))}
                      onChange={(values) => {
                        this.setState({
                          kidsSchool: values,
                        });
                      }}
                    />
                  </div>
                </div>

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
              showFilters: false,
              locationInput: state.location ? state.locationInput : '',
              locationRadius: state.location ? state.locationRadius : 0,
            }, this.makeSearch);
            // const MinUserInterests = Utils.getValue('MinUserInterests');
            // if (editProfile.interests.length < MinUserInterests) {
            //   props.updateFormState({
            //     interestsError: `you need to pick at least ${MinUserInterests}`,
            //     interestsErrorBad: true,
            //   });
            // } else {

            // }
          }}
        />

        <PopMessage
          show={state.showInterests}
          style={{ zIndex: '2' }}
          message={(
            <div id="updateInterestsPopUp">
              <div className="title">
                <div className="label"> Interests</div>
              </div>
              <div className="pickers">
                {Object.keys(UserInterests).map((group, i) => (
                  <InputPicker
                    label={capitalize(group)}
                    direction="right"
                    rowCount={2}
                    values={state.parentInterests}
                    options={UserInterests[group].map((interest) => ({
                      value: interest,
                      label: capitalize(interest),
                    }))}
                    onChange={(values) => {
                      this.setState({
                        parentInterests: values,
                      });
                    }}
                  />
                ))}
              </div>

              <div className="kid-interests">
                <div className="title">
                  <div className="label"> Kids Interests</div>
                </div>
                <div className="pickers">
                  {Object.keys(KidInterests).map((group, i) => (
                    <InputPicker
                      label={capitalize(group)}
                      direction="right"
                      rowCount={2}
                      values={state.kidsInterests}
                      options={KidInterests[group].map((interest) => ({
                        value: interest,
                        label: capitalize(interest),
                      }))}
                      onChange={(values) => {
                        this.setState({
                          kidsInterests: values,
                        });
                      }}
                    />
                  ))}
                </div>
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
              showInterests: false,
            }, this.makeSearch);
          }}
        />

        <PopMessage
          show={state.showValues}
          style={{ zIndex: '2' }}
          message={(
            <div id="updateInterestsPopUp">
              <div className="title">
                <div className="label">Core Values</div>
                {/* {editProfile.interestsError && <div className={`sub ${editProfile.interestsErrorBad ? 'Error' : 'help-info'}`}>{editProfile.interestsError}</div>} */}
              </div>
              <div className="pickers">
                {Object.keys(CoreValues).map((group, i) => (
                  <InputPicker
                    label={capitalize(group)}
                    direction="right"
                    rowCount={2}
                    values={state.coreValues}
                    options={CoreValues[group].map((interest) => ({
                      value: interest,
                      label: capitalize(interest),
                    }))}
                    onLoad={(e) => {
                      if (e && i === 0) {
                        // this.fields.interests = e.pickers;
                      }
                    }}
                    onChange={(values) => {
                      this.setState({
                        coreValues: values,
                      });
                    }}
                  />
                ))}
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
              showValues: false,
            }, this.makeSearch);
            // const MinUserInterests = Utils.getValue('MinUserInterests');
            // if (editProfile.interests.length < MinUserInterests) {
            //   props.updateFormState({
            //     interestsError: `you need to pick at least ${MinUserInterests}`,
            //     interestsErrorBad: true,
            //   });
            // } else {
            // }
          }}
        />
      </>

    );
  }
}

TribeFilter.propTypes = {
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

TribeFilter.defaultProps = {
  className: '',
  values: [],
  options: [{}],
  mandatory: false,
  fetchResult: true,
  multichoice: true,
  style: {},
  onChange: () => { },
  setLoading: () => { },
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
export default connect(mapStateToProps, mapDispatchToProps)(TribeFilter);
