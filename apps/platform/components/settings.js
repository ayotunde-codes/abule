import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from './general/Layout';
/* import General from '../components/settings/General';
import Credits from '../components/settings/Credits';
import { setInfo } from '../redux/settings/action';
import Preferences from '../components/settings/Preferences';
import Referrals from '../components/settings/Referrals';
import Subscription from '../components/settings/Subscription';
import Menu from '../components/settings/Menu';

const settings = (props) =>
/*  const router = useRouter();
  const { page } = router.query;
  const isMobile = window.screen.width <= 767;
  const [windows, setWindows] = useState('general');

  useEffect(() => {
    if (isMobile) {
      setWindows(page);
    }
  }, [page]);
 */
(
  <Layout {...props}>
    {/*  <div className="settings page-container">
        <h1 className={isMobile ? 'settings-text-center' : 'settings-text-left'}>Settings</h1>
        <div className="settings-container">
          {!isMobile && <Menu windows={windows} setWindows={setWindows} />}
          <div className="info-container">
            { windows === 'general' && <General {...props} /> }
            { windows === 'credits' && <Credits isMobile={isMobile} {...props} /> }
            { windows === 'subscription' && <Subscription {...props} /> }
            { windows === 'preferences' && <Preferences /> }
            { windows === 'referrals' && <Referrals {...props} /> }
          </div>
        </div>
      </div> */}
  </Layout>
);
/* const mapStateToProps = (state) => ({ settings: state.settings });

const mapDispatchToProps = (dispatch) => ({
  setSessionUser: (user) => dispatch(setInfo({ sessionUser: user })),
});
 */
export default /* connect(mapStateToProps, mapDispatchToProps)( */settings;// );
