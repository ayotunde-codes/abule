import React from 'react';
import { connect } from 'react-redux';
import {
  Fn,
  OverflowContent, InputSelect,
} from '@abule-common/components';

import HubHeader from '../../../components/myHub/header';
import Layout from '../../../components/general/Layout';
import { updateHeader, setInfo } from '../../../redux/settings/action';
import { Categories } from '../../../datastore';
import ActivityFilter from '../../../components/ActivityFilter';
import MyActivity from '../../../components/myHub/MyActivity';

const {
  capitalize, lcFirst, ucFirst,
} = Fn;

class MyActivities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: {
        pending: [],
        approved: [],
        rejected: [],
      },
      filters: {
        primary: 'Hosting',
        secondary: 'Upcoming',
      },
      loading: true,
    };
    this.banner = null;
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    props.onPageLoad();
    const categoriesTitle = Categories.values;
    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/my-activities`,
      method: 'GET',
    }).then((data) => {
      if (this._isMounted) {
        console.log({
          activities: data,

        });
        this.setState({
          activities: data,
          loading: false,
        });
      }
    }).catch((erroRes) => {
      console.log('the error : ', erroRes);
      alert('got error');
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
    const { state, props } = this;

    return (
      <>
        <div className="hmv-hero">
          <div className="banner">
            <div className="left">
              <h5 className="small">INTRODUCING</h5>
              <h1 className="big top"> Virtual Interactive </h1>
              <h1 className="big bottom"> Children’s Activities </h1>
              <h5 className="small">Hosted by parents, children,</h5>
              <h5 className="small">volunteers and trusted providers.</h5>
            </div>
            <div className="right">
              <img src="/img/heros/virtual_activities.png" alt="virtual activities" />
            </div>
          </div>
        </div>
        <ActivityFilter
          {...props}
          fetchResult={false}
        />

      </>
    );
  }

  updateFilters(data) {
    this.setState((prev) => ({
      filters: {
        ...prev.filters,
        ...data,
      },
    }));
  }

  treatCategoryTitle(str) {
    const strArr = str.replace('&', ' ').split(' ');
    return strArr.map((word, index) => (index === 0 ? lcFirst(word) : ucFirst(word))).join('');
  }

  render() {
    const { props, state } = this;
    const { settings } = props;
    const { screen } = settings;
    const { filters, activities } = state;

    const primaryFilters = [
      {
        label: 'Hosting',
      },
      {
        label: 'Attending',
      },
    ];
    const secondaryFilters = [
      {
        label: 'Upcoming',
      },
      {
        label: 'Past',
      },
      {
        label: 'Saved',
      },
    ];

    return (
      <Layout {...props}>
        <div id="myHub">
          <div className="my-activities">
            <HubHeader {...props} />
            <InputSelect
              className="primary-filters"
              value={filters.primary}
              options={primaryFilters}
              onChange={(value) => {
                this.updateFilters({
                  primary: value,
                });
              }}
            />
            <div className="tribe-actions">
              <div className="filters">
                {secondaryFilters.map((filter) => (
                  <div className="filter-data">
                    <button
                      type="button"
                      className={`filter-cntrl${filters.secondary === filter.label ? ' active' : ''}`}
                      onClick={() => {
                        this.updateFilters({
                          secondary: filters.secondary === filter.label ? '' : filter.label,
                        });
                      }}
                    >{capitalize(filter.label)}
                    </button>
                  </div>
                ))}

              </div>

            </div>

            <div className="main-content">
              {activities.draft && activities.draft.length > 0 && (
                <section>
                  <OverflowContent
                    header="DRAFT"
                    headerSwitchClick={() => {
                      // Router.push('/activities');
                    }}
                    headerSwitchPage={(
                      <div
                        className="show-more"
                        onClick={() => {
                          // Router.push('/activities');
                        }}
                      >Show more
                      </div>
                    )}
                    className=""
                    content={(
                      <div className="my-activity-group">
                        {activities.draft.map((activity) => (
                          <MyActivity
                            {...props}
                            activity={activity}
                          />
                        ))}
                      </div>
                    )}
                  />
                </section>
              )}

              {activities.pending && activities.pending.length > 0 && (
                <section>
                  <OverflowContent
                    header="PENDING"
                    headerSwitchClick={() => {
                      // Router.push('/activities');
                    }}
                    headerSwitchPage={(
                      <div
                        className="show-more"
                        onClick={() => {
                          // Router.push('/activities');
                        }}
                      >Show more
                      </div>
                    )}
                    className=""
                    content={(
                      <div className="my-activity-group">
                        {activities.pending.map((activity) => (
                          <MyActivity
                            {...props}
                            activity={activity}
                          />
                        ))}
                      </div>
                    )}
                  />
                </section>
              )}

              {activities.approved && activities.approved.length > 0 && (
                <section>
                  <OverflowContent
                    header="APPROVED"
                    headerSwitchClick={() => {
                      // Router.push('/activities');
                    }}
                    headerSwitchPage={(
                      <div
                        className="show-more"
                        onClick={() => {
                          // Router.push('/activities');
                        }}
                      >Show more
                      </div>
                    )}
                    className=""
                    content={(
                      <div className="my-activity-group">
                        {activities.approved.map((activity) => (
                          <MyActivity
                            {...props}
                            activity={activity}
                          />
                        ))}
                      </div>
                    )}
                  />
                </section>
              )}

              {activities.rejected && activities.rejected.length > 0 && (

                <section>
                  <OverflowContent
                    header="REJECTED"
                    headerSwitchClick={() => {
                      // Router.push('/activities');
                    }}
                    headerSwitchPage={(
                      <div
                        className="show-more"
                        onClick={() => {
                          // Router.push('/activities');
                        }}
                      >Show more
                      </div>
                    )}
                    className=""
                    content={(
                      <div className="my-activity-group">
                        {activities.rejected.map((activity) => (
                          <MyActivity
                            {...props}
                            activity={activity}
                          />
                        ))}
                      </div>
                    )}
                  />
                </section>
              )}
            </div>
          </div>
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
export default connect(null, mapDispatchToProps)(MyActivities);
