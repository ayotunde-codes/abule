import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import AppLoader from './AppLoader';
import { documentLoaded } from '../../redux/settings/action';
import { Fn } from '@abule-common/components';
const { FetchRequest } = Fn

class Booter extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.fetchRequest = this.fetchRequest.bind(this);
    // this.loadDataBase = this.loadDataBase.bind(this);
    this.onPageLoad = this.onPageLoad.bind(this);
    this.onPageUpdate = this.onPageUpdate.bind(this);
  }

  async componentDidMount() {
    const { props } = this;
    this._isMounted = true;
    const domain = location.href
      .substring(location.protocol.length)
      .split('/')[2];
    if (
      process.env.ENV !== 'dev'
      && domain !== 'localhost:3000'
      && location.protocol !== 'https:'
    ) {
      console.log('env', process.env.ENV, domain);
      location.replace(`https:${domain}`);
    }

    console.log('THE ROUTER IS : ', Router);
    const handler = setInterval(() => {
      if (document.readyState === 'complete') {
        this.props.documentLoaded();
        clearInterval(handler);
      }
    }, 100);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchRequest(
    params = {
      url: '',
      method: 'GET',
      body: {},
      params: {},
      headers: {},
      checkUser: true,
    },
  ) {
    return new Promise((resolve, reject) => {
      const d = new Date(); /* toISOString */
      const offset = d.getTimezoneOffset() * 60 * 1000;
      FetchRequest({
        checkUser: true,
        ...params,
        headers: {
          x_time_offset: offset * -1, // <== in milliseconds
          ...params.headers,
        },
      })
        .then((response) => {
          const res = response.data;
          resolve(res);
        })
        .catch((err) => {
          const error = err.response;
          reject(error);
        });
    });
  }

  onPageLoad() {
    document.querySelector('html').scrollTop = 0;
  }

  onPageUpdate() { }

  render() {
    const { props, state } = this;
    const { children, settings } = props;
    const appLoading = !settings.documentLoaded;
    // console.log('PROFILE STORE : ', props.settings);
    if (appLoading) {
      return <AppLoader />;
    }
    // alert(`page is : ${page}`);

    const AllProps = {
      ...props,
      // reduxStore: null,
      appLoading,
      FetchRequest,
      onPageLoad: this.onPageLoad,
      onPageUpdate: this.onPageUpdate,
      fetchRequest: this.fetchRequest,
      AppUrl: process.env.APP_URL,
    };
    return (
      <div
        ref={() => {
          // document.getElementsByClassName('marker-app')[0].style.display = 'block';
        }}
      >
        {React.cloneElement(children, AllProps)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reduxStore: { ...state },
  settings: state.settings,

});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  documentLoaded: () => dispatch(documentLoaded()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Booter);
