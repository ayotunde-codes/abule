import React from 'react';
import { connect } from 'react-redux';
import {
  InputPicker,
} from '@abule-common/components';
import Layout from '../components/general/Layout';
import { updateHeader, setInfo } from '../redux/settings/action';
import PageLoader from '../components/general/PageLoader';
import NotificationBar from '../components/notifications/NoticationBar';

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ['All'],
      loading: false,
    };

    this.dropdown = {};
    this.banner = null;
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    props.onPageLoad();
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
              <h1 className="big top bottom"> Chatters you missed</h1>
              <h5 className="small">Catch-up on musings, ramblings, and </h5>
              <h5 className="small"> happenings in The Village. </h5>
            </div>
            <div className="right">
              <img src="/img/heros/notifications.png" alt="notifications" />
            </div>
          </div>
        </div>

        <div className="filters">
          <InputPicker
            maxSelection={1}
            values={state.filter}
            options={[
              {
                label: 'All',
              },
              {
                label: 'Inbox',
              },
              {
                label: 'Activities',
              },
              {
                label: 'Others',
              },
            ]}
            onChange={(values) => {
              this.setState({
                filter: values,
              });
            }}
          />

          <button
            id="markAll"
            type="button"
            className="btn inline btn-neutral __pill no-shadow thin"
          >Mark all as read
          </button>
        </div>

      </>
    );
  }

  render() {
    const { props, state } = this;

    const { activities } = state;

    return (
      <Layout {...props}>
        <div id="notifications">
          {state.loading ? (
            <>
              {this.bannerJSX()}
              <PageLoader inline />
            </>
          ) : (
            <>
              {this.bannerJSX()}
              <div className="main-content">

                <NotificationBar
                  read
                  {...props}
                />
                <NotificationBar
                  {...props}
                />
                <NotificationBar
                  read
                  {...props}
                />
                <NotificationBar
                  {...props}
                />
                <NotificationBar
                  read
                  {...props}
                />
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
export default connect(null, mapDispatchToProps)(Notifications);
