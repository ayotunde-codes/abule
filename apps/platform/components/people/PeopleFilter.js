import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  InputPicker, PopMessage, InputSlider, InputLocation, SearchBar,
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
} = Fn;

class PeopleFilter extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      location: null,
      locationRadius: 0,
      locationInput: '',
      kidsAge: {
        start: 0,
        end: AgeGroups.data[AgeGroups.data.length - 1].end,
      },
      kidsSchool: [],
      parentInterests: [],
      kidsInterests: [],
      coreValues: [],
      searchQuery: '',
      showInterests: false,
      showKidsInterests: false,
      showValues: false,
      showLocation: false,
      showAgeGroups: false,
      showKidsSchool: false,

    };

    this.state = {
      ...this.defaultState,
    };

    this.makeSearch = this.makeSearch.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    if (this.props.fetchResult) {
      let {
        coreValues,
        interests: parentInterests,
        location,
        locationInput,
        kidsInterests,
        kidsAge,
        schoolId: kidsSchool,
        q: searchQuery,
      } = Router.query;

      const query = [];
      if (coreValues) {
        coreValues = coreValues.split(',');
      }
      if (parentInterests) {
        parentInterests = parentInterests.split(',');
      }
      if (kidsInterests) {
        kidsInterests = kidsInterests.split(',');
      }
      if (kidsSchool) {
        kidsSchool = kidsSchool.split(',');
      }
      if (kidsAge) {
        kidsAge = JSON.parse(kidsAge);
      }

      if (location) {
        location = JSON.parse(location);
      }

      console.log('first check', {
        Router,
        raw: Router.query,
        coreValues,
        parentInterests,
        location,
        locationInput,
        kidsInterests,
        kidsAge,
        kidsSchool,
        searchQuery,
      });

      const filters = {
        coreValues: coreValues || this.defaultState.coreValues,
        parentInterests: parentInterests || this.defaultState.parentInterests,
        location: location || this.defaultState.location,
        locationRadius: location && location.radius && !isNaN(location.radius) ? location.radius : this.defaultState.locationRadius,
        locationInput: locationInput || this.defaultState.locationInput,
        kidsInterests: kidsInterests || this.defaultState.kidsInterests,
        kidsSchool: kidsSchool || this.defaultState.kidsSchool,
        kidsAge: kidsAge || this.defaultState.kidsAge,
        searchQuery: searchQuery || this.defaultState.searchQuery,
      };

      console.log('2nd check', filters, this.defaultState, { kidsAge: JSON.stringify(filters.kidsAge), defaultKidsAge: JSON.stringify(this.defaultState.kidsAge) });
      if ((
        filters.coreValues.join(',') === this.defaultState.coreValues.join(',')
        && filters.parentInterests.join(',') === this.defaultState.parentInterests.join(',')
        && filters.location === this.defaultState.location
        && filters.locationInput === this.defaultState.locationInput
        && filters.locationRadius === this.defaultState.locationRadius
        && filters.kidsInterests.join(',') === this.defaultState.kidsInterests.join(',')
        && filters.kidsSchool.join(',') === this.defaultState.kidsSchool.join(',')
        && JSON.stringify(filters.kidsAge) === JSON.stringify(this.defaultState.kidsAge)
        && filters.searchQuery === this.defaultState.searchQuery
      )) {
        // props.setLoading(false);
        Router.replace(`${props.AppUrl}/people`);
      } else {
        this.setState(filters, () => {
          this.makeSearch();
        });
      }
    }
  }

  async makeSearch() {
    const { state, props } = this;
    try {
      console.log({ state, default: this.defaultState });
      /*  if ((
        state.coreValues.join(',') === this.defaultState.coreValues.join(',')
        && state.parentInterests.join(',') === this.defaultState.parentInterests.join(',')
        && state.location === this.defaultState.location
        && state.locationInput === this.defaultState.locationInput
        && state.locationRadius === this.defaultState.locationRadius
        && state.kidsInterests.join(',') === this.defaultState.kidsInterests.join(',')
        && state.kidsSchool.join(',') === this.defaultState.kidsSchool.join(',')
        && JSON.stringify(state.kidsAge) === JSON.stringify(this.defaultState.kidsAge)
        && state.searchQuery === this.defaultState.searchQuery
      )) {
        alert('its default one');
        // props.setLoading(false);
      } else { */
      props.setLoading(true);
      const query = [];
      if (state.coreValues.length > 0) {
        query.push(`coreValues=${encodeURIComponent(state.coreValues.join(','))}`);
      }
      if (state.parentInterests.length > 0) {
        query.push(`interests=${encodeURIComponent(state.parentInterests.join(','))}`);
      }

      if (state.location) {
        const { location, locationInput } = state;
        if (state.locationRadius > 0) {
          location.radius = state.locationRadius;
        }
        query.push(`location=${JSON.stringify(location, null, 0)}`);
        query.push(`locationInput=${encodeURIComponent(locationInput)}`);
      }

      if (state.kidsInterests.length > 0) {
        query.push(`kidsInterests=${encodeURIComponent(state.kidsInterests.join(','))}`);
      }

      query.push(`kidsAge=${encodeURIComponent(JSON.stringify(state.kidsAge, null, 0))}`);

      if (state.kidsSchool.length > 0) {
        query.push(`schoolId=${encodeURIComponent(state.kidsSchool.join(','))}`);
      }

      query.push(`q=${encodeURIComponent(state.searchQuery)}`);

      Router.push(`${props.AppUrl}/people/search?${query.join('&')}`);
      const people = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/users/all?${query.join('&')}`,
      });

      console.log('the people returned from filter', people);

      props.onChange(people);
      props.setLoading(false);
      // }
    } catch (e) {
      props.setLoading(false);
      console.log('error filtering people', e);
    }
  }

  render() {
    const { state, props } = this;
    const { search, settings } = props;
    const UserInterests = Utils.getValue('UserInterests');
    const KidInterests = Utils.getValue('KidInterests');
    const CoreValues = Utils.getValue('CoreValues');

    const allAgeGroup = AgeGroups.data;
    const Subjects = Utils.getValue('Subjects');
    const { sessionUser } = settings;

    return (
      <>
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

        <PopMessage
          show={state.showLocation}
          style={{ zIndex: '2' }}
          message={(
            <div id="filterMoreInfor">
              <div className="title">
                <div className="label">Location</div>
              </div>
              <div className="main-content">

                <div className="single filter">
                  <p className="name">Place</p>
                  <InputLocation
                    placeholder="select place"
                    value={state.locationInput}
                    // className={`${editProfile.streetAddressError !== false ? ' error' : ''}`}
                    onChange={(value) => {
                      this.setState({
                        location: null,
                        locationInput: value,
                      });
                    }}
                    onSelect={(loc) => {
                      console.log('LOCATION ON SELECT : ', loc);
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

                <div className={`single filter${!state.location ? ' disabled' : ''}`}>
                  <p className="name">Radius <span style={{ fontSize: '.8em', fontWeight: '400' }}>(in miles)</span></p>

                  <InputSlider
                    readOnly={!state.location}
                    hideMax
                    minPreviewLabel={null}
                    max={250}
                    values={{ start: state.locationRadius }}
                    onChange={({ start }) => {
                      this.setState((prevSate) => ({
                        locationRadius: start,
                      }));
                    }}
                  />
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
              showLocation: false,
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
          show={state.showKidsInterests}
          style={{ zIndex: '2' }}
          message={(
            <div id="updateInterestsPopUp">
              <div className="title">
                <div className="label">Kids Interests</div>
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
              showKidsInterests: false,
            }, this.makeSearch);
          }}
        />

        <PopMessage
          show={state.showAgeGroups}
          style={{ zIndex: '2' }}
          message={(
            <div id="updateInterestsPopUp">
              <div className="title">
                <div className="label">Kids Age</div>
              </div>

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
              showAgeGroups: false,
            }, this.makeSearch);
          }}
        />

        <PopMessage
          show={state.showKidsSchool}
          style={{ zIndex: '2' }}
          message={(
            <div id="kidsSchoolPopUp">
              <div className="title">
                <div className="label">Kids School</div>
                <div className="sub help-info" style={{ marginTop: '1em' }}>connect with parents in your kids school</div>
              </div>

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
              showKidsSchool: false,
            }, this.makeSearch);
          }}
        />

        <div id="tribeFilter">
          <div className="filters-container">
            <div className="tribe-actions primary">
              <div className="filters">

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
                  <button
                    type="button"
                    className={`filter-cntrl ${state.parentInterests.length ? ' active' : ''}`}
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
                    className={`filter-cntrl${state.location ? ' active' : ''}`}
                    onClick={() => {
                      this.setState({
                        showLocation: true,
                      });
                    }}
                  >
                    <span>Location</span>
                  </button>
                </div>

              </div>
            </div>

            <div className="tribe-actions secondary">
              <div className="filters">
                <div className="label">Kids</div>
                <div className="filter-data">
                  <button
                    type="button"
                    className={`filter-cntrl${state.kidsInterests.length > 0 ? ' active' : ''}`}
                    onClick={() => {
                      this.setState({
                        showKidsInterests: true,
                      });
                    }}
                  >Interests
                  </button>
                </div>

                <div className="filter-data">
                  <button
                    type="button"
                    className={`filter-cntrl${!(state.kidsAge.start === this.defaultState.kidsAge.start && state.kidsAge.end === this.defaultState.kidsAge.end)
                      > 0 ? ' active' : ''}`}
                    onClick={() => {
                      this.setState({
                        showAgeGroups: true,
                      });
                    }}
                  >Age
                  </button>
                </div>

                {sessionUser.kids.length > 0 && (
                  <div className="filter-data">
                    <button
                      type="button"
                      className={`filter-cntrl${state.kidsSchool.length > 0 ? ' active' : ''}`}
                      onClick={() => {
                        this.setState({
                          showKidsSchool: true,
                        });
                      }}
                    >School
                    </button>
                  </div>
                )}

              </div>

            </div>

            <div className="tribe-actions search">
              <SearchBar
                value={state.searchQuery}
                className="search-bar"
                onChange={(value) => {
                  this.setState({
                    searchQuery: value,
                  });
                }}
                onBlur={() => {
                  this.makeSearch();
                }}
                onEnter={() => {
                  this.makeSearch();
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

PeopleFilter.propTypes = {
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

PeopleFilter.defaultProps = {
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
export default connect(mapStateToProps, mapDispatchToProps)(PeopleFilter);
