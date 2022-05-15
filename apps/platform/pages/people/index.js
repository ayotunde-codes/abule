/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/general/Layout';
import { updateHeader, setInfo } from '../../redux/settings/action';
import PageLoader from '../../components/general/PageLoader';
import PeopleFilter from '../../components/people/PeopleFilter';
import UserConnectCard from '../../components/UserConnectCard';

class TribesShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: [],
    };
  }

  async componentDidMount() {
    const { state, props } = this;

    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/users/all`,
      });
      // const unassignedGroup = groups.find((item) => item.name.toLowerCase() === 'unassigned');

      this.setState({
        users: data,
        loading: false,
      });
    } catch (e) {
      console.error(e);
      this.setState({ loading: false });
    }
  }

  bannerJSX() {
    const { state, props } = this;
    return (
      <>
        <div className="hmv-hero">
          <div className="banner">
            <div className="left">
              <h1 className="big bottom"> Build Your Tribe </h1>
              <h5 className="small"> Connect with like minded people</h5>
              <h5 className="small">to establish your pillars of support</h5>
            </div>
            <div className="right">
              <img src="/img/heros/tribe_about.png" alt="virtual activities" />
            </div>
          </div>
        </div>

        <PeopleFilter
          {...props}
        />
      </>
    );
  }

  render() {
    const { props, state } = this;
    const { users } = state;

    return (
      <Layout {...props}>
        <div id="people">

          {state.loading ? (
            <>
              {this.bannerJSX()}
              <PageLoader inline />
            </>
          ) : (
            <>
              {this.bannerJSX()}
              <div className="people-container">
                {/* <div className="tribe_container_list"> */}
                {users && users.length > 0 ? users.map((user, index) => (
                  <UserConnectCard
                    {...props}
                    updateHeight={index === 0 ? props.updateHeight : null}
                    user={user}
                  />

                )) : 'No Search Results Were Found!!'}
              </div>
              {/* </div> */}
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
export default connect(null, mapDispatchToProps)(TribesShow);
