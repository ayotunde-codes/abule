import React from 'react';
import { connect } from 'react-redux';
import {
  Fn, InputTime, SearchBar, InputPicker, InputDatePicker, InputField,
} from '@abule-common/components';

import Layout from '../../components/general/Layout';
import { updateHeader, setInfo } from '../../redux/settings/action';
import PageLoader from '../../components/general/PageLoader';
import BarteringRequest from '../../components/barter/BarteringRequest';

const {
  isDescendant,
} = Fn;

class BarterIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      filters: {
        source: 'village',
        tutor: false,
        driver: false,
        sitter: false,
        dates: null,
        time: null, // {
        // hour: 12,
        // minute: 00,
        // period: "AM",
        // }
        location: null, // location id
      },
      locationQuery: '',
      showLocation: false,
      loading: true,
    };
    this.banner = null;
    this._isMounted = false;
    this.updateFilter = this.updateFilter.bind(this);
    this.showLocation = this.showLocation.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    props.onPageLoad();
    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/barter/open`,
      method: 'GET',
    }).then((data) => {
      if (this._isMounted) {
        console.log('ALL OPEN REQUESTS ARE : ', {
          requests: data,

        });
        this.setState({
          requests: data,
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

  updateFilter(props = {}) {
    this.setState({
      filters: {
        ...this.state.filters,
        ...props,
      },
    });
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

  // eslint-disable-next-line class-methods-use-this
  bannerJSX() {
    const { state, props } = this;
    const { filters } = state;

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

    let time = {
      hour: null,
      minute: null,
      period: null,
    };

    if (filters.time) {
      time = {
        ...filters.time,
      };
    }

    return (
      <>
        <div className="hmv-hero">
          <div className="banner">
            <div className="left">
              <h5 className="small">Pick-Up</h5>
              <h1 className="big top"> Requests from </h1>
              <h1 className="big bottom"> Fellow Villagers </h1>
              <h5 className="small">Keep the ecosystem alive by giving</h5>
              <h5 className="small">back to the community</h5>
            </div>
            <div className="right">
              <img src="/img/heros/village_barter.png" alt="virtual activities" />
            </div>
          </div>
        </div>

        <div className="activities-actions-holder">
          <div className="activities-actions">
            <div className="">
              <InputPicker
                multichoice={false}
                values={[filters.source]}
                className="filters"
                options={[
                  {
                    label: 'Village',
                    value: 'village',
                    className: 'filter-cntrl',
                  },
                  {
                    label: 'Tribe',
                    value: 'tribe',
                    className: 'filter-cntrl',
                  },
                  {
                    label: 'Person',
                    value: 'person',
                    className: 'filter-cntrl',
                  },
                ]}
                onChange={(values) => {
                  console.log('values', values);
                  // if (values[0]) {
                  this.updateFilter({ source: values[0] });
                  // }
                }}
              />
            </div>
          </div>
          <div className="activities-actions">
            <div className="filters">
              <div className="filter">
                <div
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${filters.tutor ? ' active' : ''}`}
                  onClick={(e) => {
                    this.updateFilter({
                      tutor: !filters.tutor,
                    });
                  }}
                >
                  Tutor
                </div>
              </div>

              <div className="filter">
                <div
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${filters.driver ? ' active' : ''}`}
                  onClick={(e) => {
                    this.updateFilter({
                      driver: !filters.driver,
                    });
                  }}
                >
                  Driver
                </div>
              </div>

              <div className="filter">
                <div
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${filters.sitter ? ' active' : ''}`}
                  onClick={(e) => {
                    this.updateFilter({
                      sitter: !filters.sitter,
                    });
                  }}
                >
                  Sitter
                </div>
              </div>

              <div className="filter">
                <InputDatePicker
                  placeholder="Dates"
                  value={state.filters.dates}
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${state.filters.dates ? ' active' : ''}`}
                  onChange={(dates) => {
                    this.setState((prev) => ({
                      filters: {
                        ...prev.filters,
                        dates,
                      },
                      // dateError: this.isValidDate({ date }) ? false : state.dateError,
                    }));
                  }}
                />
              </div>

              <div className="filter">
                <InputTime
                  hour={time.hour || null}
                  minute={time.minute}
                  period={time.period}
                  placeholder="Time"
                  className=""
                  buttonClassName="filter-cntrl btn btn-default bordered thin no-shadow __pill"
                  onChange={(t) => {
                    this.updateFilter({
                      time: t,
                    });
                  }}
                />
              </div>

              <div className="filter" ref={(e) => { this.locationFilter = e; }}>
                <button
                  type="button"
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${state.filters.location ? ' active' : ''}`}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    this.showLocation();
                  }}
                >{state.filters.location || 'Location'}

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

            </div>
            <div className="search">
              <SearchBar />
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {
    const { props, state } = this;

    const { requests } = state;
    const request = [
      'other-upcoming',
      'other-upcoming',
      'other-upcoming',
      'other-pending',
      'other-pending',
      'other-pending',
      'pending',
      'pending',
      'pending',
      'upcoming',
      'upcoming',
      'upcoming',
      'completed',
      'completed',
      'completed',
      'done',
      'done',
      'done',
      '',
      '',
      '',
    ];

    return (
      <Layout {...props}>
        <div id="HMVbarteringRequests">

          {state.loading ? (
            <>
              {this.bannerJSX()}
              <PageLoader inline />
            </>
          ) : (
            <>
              {this.bannerJSX()}

              <div className="request-section">
                {requests.map((req) => (
                  <>
                    <BarteringRequest
                      {...props}
                      status="open"
                      request={req}
                    />
                  </>
                ))}

              </div>
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
export default connect(null, mapDispatchToProps)(BarterIndex);
