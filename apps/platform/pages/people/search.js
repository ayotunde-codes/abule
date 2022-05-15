import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Layout from '../../components/general/Layout';
import PageLoader from '../../components/general/PageLoader';
import PeopleFilter from '../../components/people/PeopleFilter';
import UserConnectCard from '../../components/UserConnectCard';

class ViewActivity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: [],
    };

    this.banner = null;
    this._isMounted = false;
    // this.register = this.register.bind(this);
    // this.getUserKidById = this.getUserKidById.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { type } = Router.query;
    props.onPageLoad();
    console.log({ ...Router });
    // alert('component mounted');
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { props, state } = this;
    const { users } = state;

    return (
      <Layout
        {...props}
        header={{
          backButton: {
            show: true,
          },
        }}
      >
        <div id="people" style={{ marginTop: '0px' }}>

          <PeopleFilter
            {...props}
            onChange={(people) => {
              this.setState({ users: people });
            }}
            setLoading={(loading) => {
              this.setState({ loading });
            }}
          />

          <div className="result-heading">
            <div className="result-category">
              SEARCH RESULTS
            </div>
            <div>{users ? users.length : 0} results based on your filters</div>
          </div>

          {state.loading ? (
            <PageLoader inline />
          ) : (
            <>
              <div className="people-container">
                {/* <div className="tribe_container_list"> */}
                {users && users.length > 0 && users.map((user, index) => (
                  <UserConnectCard
                    {...props}
                    updateHeight={index === 0 ? props.updateHeight : null}
                    user={user}
                  />

                ))}
              </div>
              {/* </div> */}
            </>
          )}
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({ search: state.search });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity);
