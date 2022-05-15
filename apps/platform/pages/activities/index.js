import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Layout from '../../components/general/Layout';
import { updateHeader, setInfo } from '../../redux/settings/action';
import ActivityGroup from '../../components/ActivityGroup';
import PageLoader from '../../components/general/PageLoader';
import { Categories } from '../../datastore';
import ActivityFilter from '../../components/ActivityFilter';

class ActivitiesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: {

      },
      filters: {
        categories: [],
        age: [],
        dates: null,
        location: '',
      },
      locationQuery: '',
      showCategories: false,
      showAge: false,
      showLocation: false,
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
      url: `${process.env.REACT_APP_API}/activities?params=dailyLineUp,featured,${categoriesTitle.join(',')}`,
      method: 'GET',
      checkUser: false,
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
              <h5 className="small">Hosted by parents, educators</h5>
              <h5 className="small">volunteers and children.</h5>
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

  render() {
    const { props, state } = this;

    const { activities } = state;

    return (
      <Layout {...props}>
        <div id="activities">

          {state.loading ? (
            <>
              {this.bannerJSX()}
              <PageLoader inline />
            </>
          ) : (
            <>
              {this.bannerJSX()}
              {activities.dailyLineUp && activities.dailyLineUp.length > 0 ? (
                <>
                  <ActivityGroup
                    {...props}
                    header="THE DAILY LINE-UP"
                    counter={activities.dailyLineUp ? activities.dailyLineUp.length : null}
                    OnCounterClick={() => {
                      Router.push(`${props.AppUrl}/activities/search?type=dailyLineUp&title=Daily Line-Up`);
                    }}
                    activities={activities.dailyLineUp}
                  />
                </>
              ) : ''}

              {activities.featured && activities.featured.length > 0 ? (
                <>
                  <ActivityGroup
                    {...props}
                    header="FEATURED"
                    counter={activities.featured ? activities.featured.length : null}
                    OnCounterClick={() => {
                      Router.push(`${props.AppUrl}/activities/search?type=featured&title=Featured`);
                    }}
                    activities={activities.featured}
                  />
                </>
              ) : ''}

              {Categories.data.map((category, index) => {
                // console.log('ACTIVITY GROUP PROPS', { category, activities });
                const activitiesArr = activities[category.value];
                return (
                  <ActivityGroup
                    {...props}
                    header={category.title.toUpperCase()}
                    counter={activitiesArr ? activitiesArr.length : null}
                    OnCounterClick={() => {
                      Router.push(`${props.AppUrl}/activities/search?categories=${category.id}&title=${encodeURIComponent(category.title)}`);
                    }}
                    className="category"
                    activities={activitiesArr}
                  />
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
export default connect(null, mapDispatchToProps)(ActivitiesIndex);
