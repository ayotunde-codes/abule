import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import socketIOClient from 'socket.io-client';
import {
  Fn,
  PopMessage,
} from '@abule-common/components';

import AppLoader from './AppLoader';
import { setInfo, documentLoaded } from '../../redux/settings/action';
import { setConversations } from '../../redux/inbox/action';
import {
  setItems as setGallery,
  hideGallery,
} from '../../redux/gallery/action';
import {
  ActivityFrequencies,
  ActivityTypes,
  AgeGroups,
  Categories,
  Grades,
  Personas,
  SubscriptionPlans,
  Utils,
} from '../../datastore';
import { Messages } from '../../public/data/assets';
import eventHandlers from '../../event-handlers';
import { setProps, updateEvents } from '../../redux/calendar/action';
import { closePayment, makePayment } from '../../redux/payment/action';
import {
  closeAccessDenied,
  showAccessDenied,
} from '../../redux/access-denied/action';
import {
  closeLogin,
  closeSignUp,
  showLogin,
  showSignUp,
} from '../../redux/auth/action';
import { set } from '../../redux/toast-alert/action';
import ToastAlert from '../ToastAlert';

const {
  delay,
  FetchRequest,
  popAlert,
} = Fn;

const publicAppPages = [
  'login',
  'signup',
  'forgot-password',
  'password-recovery',
  'reset-password',
  'activities',
  'activities/search',
  'activities/[id]',
  'notifications',
];

class Booter extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      showMobileFraqment: false,
    };

    this.fetchRequest = this.fetchRequest.bind(this);
    this.loadDataBase = this.loadDataBase.bind(this);
    this.onPageLoad = this.onPageLoad.bind(this);
    this.processFiles = this.processFiles.bind(this);
    this.onPageUpdate = this.onPageUpdate.bind(this);
    this.refreshUserToken = this.refreshUserToken.bind(this);
    this.showGallery = this.showGallery.bind(this);
    this.emitEvent = this.emitEvent.bind(this);
    this.sessionStarted = this.sessionStarted.bind(this);
    this.connectSocket = this.connectSocket.bind(this);
    this.showMobileFraqment = this.showMobileFraqment.bind(this);
    this.hideMobileFraqment = this.hideMobileFraqment.bind(this);
    this.becomeCaregiver = this.becomeCaregiver.bind(this);
    this.switchUserToCaregiver = this.switchUserToCaregiver.bind(this);
    this.fragmentContent = null;
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

    // get neccessary data from the database
    await this.loadDataBase();

    // verify user
    const profileId = localStorage.getItem('sessionUserProfileId');

    // props.setIsSubscribed(true);

    this.fetchRequest({
      url: `${process.env.REACT_APP_API}/profiles/${profileId}`,
    })
      .then((data) => {
        console.log('says We a valid user with token', data);
        if (this._isMounted) {
          props.setSessionUser({
            ...data,
            // imageUrl: allData.imageUrl ? allData.imageUrl : null,
          });

          window.heap.identify(data.userId);
          this.sessionStarted();
        }
      })
      .catch((error) => {
        if (this._isMounted) {
          props.setSessionUser(false);
        }
        console.log('GOT ULTIMATE ERROR', error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getActivityCredit(duration, getDurationFromCredit = false) {
    // duration in minutes
    // 1 hour of activity eqauls 2 credit
    const creditPerMinute = 0.02666667;

    if (isNaN(duration)) {
      return 0;
    }

    if (getDurationFromCredit) {
      // in this case duration = credits
      return Number((duration / creditPerMinute).toFixed(0));
    }

    // return parseFloat(duration * creditPerMinute).toFixed(2);
    return Number((parseInt(duration, 10) * creditPerMinute).toFixed(2));
  }

  usdToCredit(amount) {
    return amount / 5;
  }

  creditToUsd(credit) {
    return credit * 5;
  }

  getActivityMinServiceFee() {
    const serviceFee = Number(
      (
        this.getActivityCredit(15)
        * (Utils.getValue('ActivityServiceFee') / 100)
      ).toFixed(2),
    ); // 10 percent

    return serviceFee;
  }

  sessionStarted() {
    this.connectSocket();
    this.loadConversations();
    this.loadCalendar();
  }

  async loadDataBase() {
    try {
      const {
        data: { data: database },
      } = await FetchRequest({
        url: `${process.env.REACT_APP_API}/data`,
      });
      SubscriptionPlans.setData = database.subscriptions;
      ActivityFrequencies.setData = database.activityFrequencies;
      ActivityTypes.setData = database.activityTypes;
      AgeGroups.setData = database.ageGroups;
      Grades.setData = database.grades;
      Personas.setData = database.personas;
      Categories.setData = database.categories;
      Utils.setData = database.utils;
    } catch (error) {
      console.log('GOT ERROR TRYING TO GET ', error);
    }
  }

  async loadConversations() {
    const { props } = this;
    const data = await this.fetchRequest({
      url: `${process.env.REACT_APP_API}/inbox/conversations`,
    });

    console.log('CONVERSATIONS LOAD DATA', data);
    props.setConversations(data);
  }

  async loadCalendar() {
    const { props } = this;
    const eventsData = await this.fetchRequest({
      url: `${process.env.REACT_APP_API}/calendar`,
      method: 'GET',
    });
    console.log(
      { eventsData, type: typeof eventsData },
      'these are the events',
    );
    if (this._isMounted) {
      props.updateCalendar(eventsData, {
        // events: orderedEvent,
        loading: false,
      });
    }
  }

  async loadPagesData() {
    // fetch and connect to messages
  }

  async switchUserToCaregiver() {
    const { props, state } = this;

    const { children, settings, reduxStore } = props;
    const { sessionUser } = settings;
    try {
      await this.fetchRequest({
        url: `${process.env.REACT_APP_API}/become-caregiver`,
        method: 'POST',
      });
      if (this._isMounted) {
        props.setSessionUser({
          ...sessionUser,
          accountType: 'caregiver',
          finishedSetUp: false,
        });
      }
    } catch (e) {
      console.log('AN UNESPECTED ERROR OCCURED');
    }
  }

  async becomeCaregiver() {
    const { props, state } = this;
    props.showAccessDenied({
      type: 'not-caregiver',
      feature: 'host-activity',
    });
    /*  const { children, settings, reduxStore } = props;
    const { sessionUser } = settings;
    try {
      await this.fetchRequest({
        url: `${process.env.REACT_APP_API}/become-caregiver`,
        method: 'POST',
      });
      if (this._isMounted) {
        props.setSessionUser({
          ...sessionUser,
          accountType: 'caregiver',
          finishedSetUp: false,
        });
      }
    } catch (e) {
      console.log('AN UNESPECTED ERROR OCCURED');
    } */
  }

  connectSocket() {
    const { props } = this;
    let socket = null;
    const setSocket = () => {
      socket = socketIOClient(process.env.SERVER_URL, {
        extraHeaders: {
          authorization: `Bearer: ${localStorage.getItem('sessionUserToken')}`,
        },
        /*
      query: {
      }, */
      });

      this.setState({
        socket,
      });

      console.log('sokect object is :', {
        socket,
        severUrl: process.env.SERVER_URL,
      });
      socket.on('connect', () => {
        // alert('says connectedhgf');
      });

      socket.on('disconnect', (response) => {
        console.log(`says disconnected: ${response}`);
        // alert(`says disconnected: ${response}`);
        // setSocket();
      });

      // Listens for incoming messages
      socket.on('event', (data) => {
        console.log('the booter props in here ', props);
        // alert('got a emit');
        eventHandlers(data, this.props.dispatch, this.props.reduxStore);
      });
      socket.on('reconnect', async (message) => {
        // alert(`we gonna reconnect now : ${message}`);
        if (message === 'Invalid token') {
          // const data = await this.refreshUserToken();
          if (data) {
            setSocket();
          }
        } else {
          setSocket();
        }
      });
    };
    setSocket();
  }

  emitEvent(data) {
    const { socket } = this.state;
    if (socket) {
      socket.emit('event', {
        authToken: localStorage.getItem('sessionUserToken'),
        ...data,
      });
    }
  }

  async refreshUserToken() {
    const { props } = this;
    try {
      const data = await this.fetchRequest({
        url: `${process.env.REACT_APP_API}/auth/refreshToken`,
      });
      localStorage.setItem('sessionUserToken', data.refreshToken);

      return data;
    } catch (error) {
      console.log('NO NO NO NO NO NO NO NO NO NO REFRESH TOKEN', error);
      if (this._isMounted) {
        props.setSessionUser(false);
      }
      return false;
    }
  }

  /**
    Request Method that verify user session before doing anything
  */
  isRedirectPage() {
    const appFullPath = Router.route.split('/').filter((v, i) => ![0].includes(i)).join('/');

    console.log({ appFullPath });
    if (!publicAppPages.includes(appFullPath)) {
      return true;
    }
    return false;
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
          if (Object.keys(res).includes('ok')) {
            resolve(res);
          } else {
            const { data } = res;
            console.log('raw res', response);
            // alert('raw res');
            resolve(data);
          }
        })
        .catch((err) => {
          const error = err.response;
          const { props } = this;
          if ([403, 401].indexOf(error.status) > -1) {
            const redirectPage = this.isRedirectPage();
            if (error.data.message === 'Invalid token') {
              // alert('now we renew token');
              this.refreshUserToken()
                .then((data) => {
                  if (this._isMounted && data) {
                    this.fetchRequest(params)
                      .then(resolve)
                      .catch(reject);
                  }
                });
              // reject(error);
            } else if (error.data.message === 'Not permitted') {
              reject(error);
            } else {
              if (
                error.data.message
                === 'Email not verified, check your mail to verify'
              ) {
                popAlert({
                  title: Messages.requests.userNotVerified.title,
                  description: Messages.requests.userNotVerified.message,
                  error: true,
                });
              }

              props.setSessionUser(false);
              if (redirectPage) {
                Router.push(`${process.env.APP_URL}/login`);
              }
              reject(error);
            }
          } else reject(error);
        });
    });
  }

  /**
   * @return {{
   *   type: string{"dlsk"};
   *   files: string[];
   * }} data
   */
  async processFiles(type, files, d) {
    try {
      const { signature, params } = await this.fetchRequest({
        url: `${process.env.REACT_APP_API}/utils/get-file-processor-params?type=${type}`,
      });

      console.log('all done man', { signature, params });
      const form = new FormData();
      form.append('signature', signature);
      form.append('params', params);
      files.forEach((file) => {
        console.log(file);
        form.append(
          'file',
          file,
          `${file.lastModified}${file.size}${file.name}`,
        );
      });
      const {
        data: { assembly_id: assemblyId },
      } = await FetchRequest({
        url: `${process.env.TRANSLOADIT_API}/assemblies`,
        method: 'POST',
        body: form,
      });
      console.log(assemblyId);
      const checkAssembly = async () => {
        // alert('checking assemnly');
        const { data } = await FetchRequest({
          url: `${process.env.TRANSLOADIT_API}/assemblies/${assemblyId}`,
        });

        console.log('re-checked assembly and the res is : ', data);
        if (data.ok) {
          if (['ASSEMBLY_EXECUTING', 'ASSEMBLY_UPLOADING'].includes(data.ok)) {
            await delay(2000);
            return checkAssembly();
          }
          return data;
        }
        console.log(`something fishy going on:${JSON.stringify(data)}`);
      };

      const assembly = await checkAssembly();
      return { assemblyId, assembly };
      // now that assembly has succcessfully been completed, we send
    } catch (e) {
      return e;
    }
  }

  showGallery(items, focusedIndex) {
    this.props.setGallery(items, focusedIndex);
  }

  onPageLoad() {
    document.querySelector('html').scrollTop = 0;
  }

  onPageUpdate() { }

  showMobileFraqment(content) {
    // alert('got here');
    this.fragmentContent = content;
    // this.setState({
    //   showMobileFraqment: true,
    // });
    return '';
  }

  hideMobileFraqment() {
    this.fragmentContent = undefined;
    this.setState({
      dateNow: Date.now(), // just to trigger a re-render
    });
    return '';
  }

  render() {
    const { props, state } = this;
    const { children, settings, reduxStore } = props;
    const { sessionUser } = settings;
    const appLoading = sessionUser === 'loading' || !settings.documentLoaded;
    // console.log('PROFILE STORE : ', props.settings);
    let showWaiver = sessionUser && !sessionUser.signedWaiver;
    if (appLoading) {
      return <AppLoader />;
    }
    const page = Router.route
      .split('/')
      .filter((v, i) => i !== 0)
      .join('/');
    // alert(`page is : ${page}`);
    const redirectPage = this.isRedirectPage();

    if (sessionUser) {
      this.loadPagesData();
      if (
        redirectPage
        /* !sessionUser.isModified || */ && !sessionUser.finishedSetUp
        && page !== 'onboarding'
      ) {
        // alert('still entering');
        showWaiver = false;
        Router.push(`${process.env.APP_URL}/onboarding`);
        return '';
      }

      if (sessionUser.finishedSetUp && page === 'onboarding') {
        Router.push(process.env.APP_URL);
        return '';
      }
    } else if (redirectPage && page !== 'login') {
      // props.showLogin();
      // alert('should redirect here');
      Router.push(`${process.env.APP_URL}/login`);
      return '';
    }

    const AllProps = {
      ...props,
      // reduxStore: null,
      appLoading,
      getActivityCredit: this.getActivityCredit,
      usdToCredit: this.usdToCredit,
      creditToUsd: this.creditToUsd,
      getActivityMinServiceFee: this.getActivityMinServiceFee,
      FetchRequest,
      onPageLoad: this.onPageLoad,
      onPageUpdate: this.onPageUpdate,
      fetchRequest: this.fetchRequest,
      processFiles: this.processFiles,
      setGallery: this.showGallery,
      emitEvent: this.emitEvent,
      loadCalendar: this.loadCalendar,
      sessionStarted: this.sessionStarted,
      showMobileFraqment: this.showMobileFraqment,
      hideMobileFraqment: this.hideMobileFraqment,
      becomeCaregiver: this.becomeCaregiver,
      switchUserToCaregiver: this.switchUserToCaregiver,
      fragmentContent: this.fragmentContent,
      AppUrl: process.env.APP_URL,
    };
    return (
      <div
        ref={() => {
          if (sessionUser && sessionUser.email === 'toyosi@abule.io') {
            document.getElementsByClassName('marker-app')[0].style.display = 'block';
          }
        }}
      >
        {React.cloneElement(children, AllProps)}

        {redirectPage
          && sessionUser
          && !sessionUser.signedWaiver
          && page !== 'onboarding' && (
            <PopMessage
              // show={state.initregistration}
              style={{ zIndex: '3' }}
              mainStyle={{ zIndex: '3' }}
              message={(
                <div id="waiverPromt">
                  In consideration of being permitted by Abulé, Inc. (the “
                  <b>Company</b>”) to access the Services (as defined in the
                  Terms of Service), I, the above-named individual or entity,
                  hereby, on behalf of myself and my child or dependent (“
                  <b>Dependent</b>”), expressly waive and release any and all
                  claims, now known or hereafter known, against the Company, and
                  its officers, directors, managers, employees, agents,
                  affiliates, shareholders/members, childcare providers,
                  successors, and assigns (collectively, "<b>Releasees</b>"), on
                  account of injury, illness, disability, death, or property
                  damage arising out of or attributable to the Services,
                  including those relating to the Dependent’s participation in
                  the Services, whether arising out of the ordinary negligence
                  of the Company or any Releasees or otherwise. Notwithstanding
                  any precautions and/or preventive measures the Company may
                  take, including without limitation conducting background
                  checks on persons involved in the performance of some or all
                  of the Services, I understand and acknowledge the risks to the
                  Dependent’s participation in connection with the Services and
                  I covenant not to make or bring any such claim against the
                  Company or any other Releasee, and forever release and
                  discharge the Company and all other Releasees from liability
                  under such claims. This waiver and release shall apply to the
                  fullest extent permitted by law. I further agree to indemnify,
                  save and hold Company and Releasees harmless from any loss,
                  liability, attorney fees, damage or cost that they may incur
                  arising out of or related to my or Dependent’s use of the
                  Services.
                </div>
              )}
              confirmButton={{
                show: true,
                label: 'I AGREE',
                onClick: async (closer) => {
                  await this.fetchRequest({
                    url: `${process.env.REACT_APP_API}/sign-waiver`,
                    method: 'POST',
                  });

                  props.setSessionUser({
                    ...sessionUser,
                    signedWaiver: true,
                  });
                  closer();
                },
              }}
              onCancel={() => {
                // props.onClose();
                // this.setState({
                // showPlans: false,
                // });
              }}
            />
          )}
        <ToastAlert />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reduxStore: { ...state },
  settings: state.settings,
  payment: state.payment,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  setSessionUser: (user) => dispatch(setInfo({ sessionUser: user })),
  documentLoaded: () => dispatch(documentLoaded()),
  updateCalendar: (events, props) => dispatch(updateEvents(events, props)),
  setConversations: (conversations) => dispatch(setConversations(conversations)),
  setGallery: (items, focusedIndex) => dispatch(setGallery(items, focusedIndex)),
  makePayment: (props) => dispatch(makePayment(props)),
  closePayment: (props) => dispatch(closePayment(props)),
  showAccessDenied: (props) => dispatch(showAccessDenied(props)),
  closeAccessDenied: (props) => dispatch(closeAccessDenied(props)),
  showLogin: (props) => dispatch(showLogin(props)),
  closeLogin: (props) => dispatch(closeLogin(props)),
  showSignUp: (props) => dispatch(showSignUp(props)),
  closeSignUp: (props) => dispatch(closeSignUp(props)),
  toastAlert: (props) => dispatch(set(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Booter);
