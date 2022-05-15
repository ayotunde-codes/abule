import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Fn } from '@abule-common/components';
import Layout from '../../../components/general/Layout';
import { updateHeader, setInfo } from '../../../redux/settings/action';
import PageLoader from '../../../components/general/PageLoader';
// import UserCard from '../../../components/profile/UserCard';
import SwitchPage from '../../../components/SwitchPage';
import { Messages } from '../../../public/data/assets';

const {
  getRelativeTime, parseDuration, parseTimeToGMT, popAlert, capitalize,
} = Fn;

class MyBarterRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      request: null,
      loading: true,
    };
    this.banner = null;
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    props.onPageLoad();
    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/barter/my-requests/all/${Router.query.id}`,
        method: 'GET',
      });

      if (this._isMounted) {
        console.log({
          request: data,
          loading: false,
        });
        this.setState({
          request: data,
          loading: false,
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
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
    return (
      <>
        <div className="hmv-hero">
          <div className="banner">
            <div className="left">
              <h1 className="big">Accepted Requests</h1>
            </div>
            {/* <div className="right">
              <SearchBar />
            </div> */}
          </div>
        </div>
      </>
    );
  }

  async acceptHelp(bid) {
    const { props, state } = this;
    const { request } = state;
    try {
      await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/barter/all/${request.id}/bid/${bid.id}`,
        method: 'POST',
      });
      popAlert({
        title: 'Request Accepted',
        description: (
          <div>
            <p>{capitalize(bid.user.firstName)} will be notified</p>

            <p>* Once a barter exchange is complete, you need to confirm that the service</p>
            <p>occurred in order to compensate your caregiver.</p>

          </div>
        ),
      });
      Router.push('/barter/my-requests');
    } catch (e) {
      popAlert({
        title: Messages.requests.serverError.title,
        description: Messages.requests.serverError.message,
        error: true,
      });
    }
  }

  getType(bartering) {
    switch (bartering) {
      case ('sitting'): {
        return 'sitter';
      }
      case ('tutoring'): {
        return 'tutor';
      }
      case ('driving'): {
        return 'driver';
      }
      default: {
        return '';
      }
    }
  }

  render() {
    const { props, state } = this;
    const { settings: { sessionUser } } = props;
    const { request } = state;

    return (
      <Layout {...props}>
        <div id="myBarterRequest">
          <div className="page-container">
            <SwitchPage
              label="Back"
              direction="left"
              onClick={() => {
                Router.back();
              }}
            />
          </div>

          {state.loading ? (
            <>
              <PageLoader inline />
            </>
          ) : (
            <>
              {request ? (
                <>
                  {this.bannerJSX()}
                  <div className="page-container">
                    <div className="barter-request">
                      <div className="avi">
                        <img src={sessionUser.imageThumbUrl} alt="" />
                      </div>
                      <div className="info">
                        <p className="header">{this.getType(request.bartering)} needed</p>
                        <p className="date">{getRelativeTime(request.date, false, 'fullText-without-time')}</p>
                        <p>starts at {getRelativeTime(parseTimeToGMT(request.date), false, 'time')}</p>
                        <p>will last for {parseDuration(request.duration, true)}</p>
                      </div>
                      <div className="description">
                        {request.description}
                      </div>
                    </div>
                  </div>

                  <div className="cards">
                    {request.bid.map((oneBid) => (
                      // <UserCard
                      //   user={oneBid.user}
                      //   actions={[
                      //     {
                      //       label: 'ACCEPT',
                      //       className: 'btn btn-1',
                      //       onClick: async (hideLoader) => {
                      //         await this.acceptHelp(oneBid);
                      //         hideLoader();
                      //       },
                      //     },
                      //     {
                      //       label: 'VIEW PROFILE',
                      //       className: 'btn btn-glass no-shadow bordered',
                      //       onClick: () => {
                      //         Router.push('/profile/[id]', `/profile/${oneBid.user.userId}`);
                      //       },
                      //     },
                      //   ]}
                      ''// />
                    ))}
                  </div>
                </>
              )
                : (
                  <div>
                    <div id="barterRequestNotFound">
                      <span>Barter request not found or has been deleted</span>
                      <Link href={`${props.AppUrl}/`}>
                        <a
                          type="button"
                          className="btn btn-1 inline"
                        >Go Home
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
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
export default connect(null, mapDispatchToProps)(MyBarterRequest);
