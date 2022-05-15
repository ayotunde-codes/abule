import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import Layout from '../../../../../components/general/Layout';
import { updateHeader, setInfo } from '../../../../../redux/settings/action';
import PageLoader from '../../../../../components/general/PageLoader';
import SwitchPage from '../../../../../components/SwitchPage';
import BarteringRequest from '../../../../../components/barter/BarteringRequest';

class MyBarterRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: null,
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
        url: `${process.env.REACT_APP_API}/barter/${props.isOthers ? 'others' : 'my'}-requests/${Router.query.type}`,
        method: 'GET',
      });

      if (this._isMounted) {
        console.log({
          request: data,
          loading: false,
        });
        this.setState({
          requests: data,
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
    const { props } = this;
    return (
      <>
        <div className="hmv-hero">
          <div className="banner">
            <div className="left">
              <h1 className="big">{props.isOthers ? 'others' : 'my'} {Router.query.type} Requests</h1>
            </div>
          </div>
        </div>
      </>
    );
  }

  render() {
    const { props, state } = this;
    const { settings: { sessionUser } } = props;
    const { requests } = state;
    const { type } = Router.query;
    const pre = props.isOthers ? 'other-' : '';
    return (
      <Layout {...props}>
        <div id="myBarterRequestType">
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
              {requests ? (
                <>
                  {this.bannerJSX()}
                  <div className="requests">
                    {requests.map((req) => (
                      <>
                        <BarteringRequest
                          {...props}
                          status={`${pre}${type}`}
                          request={req}
                        />
                      </>
                    ))}
                  </div>
                </>
              )
                : (
                  <div>
                    <div id="barterRequestNotFound">
                      <span>Barter request type not found</span>
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
