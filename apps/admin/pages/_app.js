import '../less/styles.less';
import Head from 'next/head';
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/store';
import Booter from '../components/general/Booter';


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    // const storeData = store.getState();
    console.log({ Component });

    return (
      <>
        <Head runat="server">
          <link rel="shortcut icon" type="image/icon" href="/favicon.svg" />
        </Head>
        <Provider store={store}>
          <Booter {...pageProps}  >
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
