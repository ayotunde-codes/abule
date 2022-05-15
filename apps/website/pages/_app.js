import '../less/styles.less';
import Head from 'next/head';
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import Router from 'next/router';
import mixpanel from 'mixpanel-browser';
import store from '../redux/store';
import Booter from '../components/Booter';
import {
  Fn
} from '@abule-common/components';
const { isEmpty } = Fn

class MyApp extends App {
  componentDidMount() {
    console.log('the heap we know is : ', window.heap.load);
    /*  mixpanel.init(process.env.MIXPANEL_TOKEN);
    mixpanel.track('App Load'); */
    Router.events.on('routeChangeComplete', (url) => {
      if (window.gtag) {
        window.gtag('config', process.env.GOOGLE_ANALYTICS_TRACKING_ID, {
          page_path: url,
        });
      }
    });
    if (window.heap.load && typeof window.heap.load === 'function') {
      window.heap.load('4021084171');
    } else {
      console.log('cant load heap ', window.heap);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    // const storeData = store.getState();
    console.log({ Component });
    return (
      <>
        <Head runat="server">
          <link rel="shortcut icon" type="image/icon" href="/favicon.svg" />

          <script
            script
            dangerouslySetInnerHTML={{
              __html: `
              window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};   
              `,
            }}
          />
          {process.env.MARKER_DESTINATION && !isEmpty(process.env.MARKER_DESTINATION) ? (
            <>
              <script
                script
                dangerouslySetInnerHTML={{
                  __html: `
                window.markerConfig = {
                  destination: "${process.env.MARKER_DESTINATION}",
                  source: "snippet",
                }
              `,
                }}
              />
              <script
                script
                dangerouslySetInnerHTML={{
                  __html: `
              !(function (e, r, a) {
                if (!e.__Marker) {
                  e.__Marker = {};
                  var t = [],
                    n = { __cs: t };
                  [
                    "show",
                    "hide",
                    "isVisible",
                    "capture",
                    "cancelCapture",
                    "unload",
                    "reload",
                    "isExtensionInstalled",
                    "setReporter",
                    "setCustomData",
                    "on",
                    "off",
                  ].forEach(function (e) {
                    n[e] = function () {
                      var r = Array.prototype.slice.call(arguments);
                      r.unshift(e), t.push(r);
                    };
                  }),
                    (e.Marker = n);
                  var s = r.createElement("script");
                  (s.async = 1), (s.src = "https://edge.marker.io/latest/shim.js");
                  var i = r.getElementsByTagName("script")[0];
                  i.parentNode.insertBefore(s, i);
                }
              })(window, document);
            `,
                }}
              />
            </>
          )
            : ''}
        </Head>
        <Provider store={store}>
          <Booter {...pageProps} >
            <Component />
          </Booter>
        </Provider>
      </>
    );
  }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
