import React, { useEffect } from 'react';
import Head from 'next/head';

import Header from './Header';
import '../../less/styles.less';

const Layout = ({ children }) => {
  useEffect(() => {
    $('html').addClass('website');
    // $('html').removeClass('website');
  });

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
