import React from 'react';
import { connect } from 'react-redux';
import {
  Fn,
  InputPicker,
} from '@abule-common/components';

import Layout from '../../../components/general/Layout';
import { updateHeader, setInfo } from '../../../redux/settings/action';
import PageLoader from '../../../components/general/PageLoader';
import BarteringRequest from '../../../components/barter/BarteringRequest';
import SwitchPage from '../../../components/SwitchPage';

const {
  isDescendant,
} = Fn;

class UserBarteringRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      filters: {
        source: 'my-requests',
        all: true,
        open: false,
        pending: false,
        upcoming: null,
        completed: null, // {
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

    this.getRequests();
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getRequests(source = this.state.filters.source) {
    const { props, state } = this;
    this.setState({
      loading: true,
      requests: [],
    });
    this.updateFilter({
      source,
    });

    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/barter/${source}`,
        method: 'GET',
      });
      if (this._isMounted) {
        console.log({
          requests: data,

        });
        this.setState({
          requests: data,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  updateFilter(props = {}, callback = () => { }) {
    this.setState({
      filters: {
        ...this.state.filters,
        ...props,
      },
    }, callback);
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
              <h5 className="small">View</h5>
              <h1 className="big bottom top"> My Requests</h1>
              <h5 className="small">Track the status of your requests and requests</h5>
              <h5 className="small">from others that you have accepted</h5>
            </div>
            <div className="right">
              <img src="/img/heros/people_barter.png" alt="virtual activities" />
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
                    label: 'My Requests',
                    value: 'my-requests',
                    className: 'filter-cntrl',
                  },
                  {
                    label: 'Other\'s Requests',
                    value: 'others-requests',
                    className: 'filter-cntrl',
                  },
                ]}
                onChange={(values) => {
                  console.log('values', values);
                  // if (values[0]) {
                  this.getRequests(values[0]);
                  // }
                }}
              />
            </div>
          </div>
          <div className="activities-actions">
            <div className="filters">
              <div className="filter">
                <div
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${filters.all ? ' active' : ''}`}
                  onClick={(e) => {
                    this.updateFilter({
                      all: !filters.all,
                    });
                  }}
                >
                  All
                </div>
              </div>

              <div className="filter">
                <div
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${filters.open ? ' active' : ''}`}
                  onClick={(e) => {
                    this.updateFilter({
                      open: !filters.open,
                    });
                  }}
                >
                  Open
                </div>
              </div>

              <div className="filter">
                <div
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${filters.pending ? ' active' : ''}`}
                  onClick={(e) => {
                    this.updateFilter({
                      pending: !filters.pending,
                    });
                  }}
                >
                  Pending
                </div>
              </div>

              <div className="filter">
                <div
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${filters.upcoming ? ' active' : ''}`}
                  onClick={(e) => {
                    this.updateFilter({
                      upcoming: !filters.upcoming,
                    });
                  }}
                >
                  Upcoming
                </div>
              </div>

              <div className="filter">
                <div
                  className={`filter-cntrl btn btn-default bordered thin no-shadow __pill${filters.completed ? ' active' : ''}`}
                  onClick={(e) => {
                    this.updateFilter({
                      completed: !filters.completed,
                    });
                  }}
                >
                  Completed
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }

  normalizeRequests(array) {
    const arr = [];
    array.forEach((v) => {
      if (v) arr.push(v);
    });
    return arr;
  }

  render() {
    const { props, state } = this;

    const { requests, filters } = state;
    const pre = filters.source === 'others-requests' ? 'other-' : '';

    return (
      <Layout {...props}>
        <div id="barteringRequests">
          {this.bannerJSX()}

          {state.loading ? (
            <>
              <PageLoader inline />
            </>
          ) : (
            <>
              {Object.keys(requests).map((group) => {
                const groupRequests = this.normalizeRequests(requests[group]);
                return (
                  <>
                    <h3 className="section-header">{group}</h3>
                    {groupRequests.length > 0 && (
                      <div className="view-all">
                        <SwitchPage
                          href={`/barter/my-requests/all/[type]${pre ? '/others' : ''}`}
                          as={`/barter/my-requests/all/${group}${pre ? '/others' : ''}`}
                          label="View All"
                        />
                      </div>
                    )}
                    <div className="request-section">
                      {groupRequests.length > 0 ? groupRequests.map((req) => (
                        req ? (
                          <>
                            <BarteringRequest
                              {...props}
                              status={`${pre}${group}`}
                              request={req}
                            />
                          </>
                        ) : ''
                      )) : <span className="page-container placeholder">You have no {group} requests at the moment</span>}
                    </div>
                  </>
                );
              })}

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
export default connect(null, mapDispatchToProps)(UserBarteringRequests);
