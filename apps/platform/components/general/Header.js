import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { connect } from 'react-redux';
import $ from 'jquery';
import Router from 'next/router';
import { Fn } from '@abule-common/components';

import {
  signOut, updateFooter, updateHeader, updateScreen,
} from '../../redux/settings/action';
import NavLink from './NavLink';
import NavItem from '../header/NavItem';
import NavItemGroup from '../header/NavItemGroup';

const {
  isDescendant,
} = Fn;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNavbar: false,
      mobileShowNavbar: false,
      closeNavItemGroups: false,
    };

    this.header = null;
    this.NavDropdown = null;
    this.closeNavItemGroups = this.closeNavItemGroups.bind(this);
    this.regReduxProps = this.regReduxProps.bind(this);
    this.showHeaderDrop = this.showHeaderDrop.bind(this);
    this.headerDropHandler = this.headerDropHandler.bind(this);
    this.clearSession = this.clearSession.bind(this);
    this.toogleMobileNavDropList = this.toogleMobileNavDropList.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.regReduxProps();
    });
    this.regReduxProps();
  }

  componentDidUpdate() {
    // this.regReduxProps();
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.onResize, false);
    window.removeEventListener('click', this.headerDropHandler, false);
  }

  clearSession() {
    const { props } = this;
    if (this.props.setSessionUser) {
      this.props.setSessionUser(false);
    }
    localStorage.removeItem('sessionUserToken');
    localStorage.removeItem('sessionUserProfileId');
    // this.props.signOut();
    this.toogleMobileNavDropList();
    Router.push(`${props.AppUrl}/login`);
  }

  regReduxProps(header = this.header) {
    const { header: propsHeader, screen } = this.props.settings;
    if (header) {
      const height = $(header).outerHeight();
      if (height !== this.props.settings.header.height && height !== 0) {
        this.props.updateHeader({
          height,
          marginBottom: parseInt($(header.parentElement).css('margin-bottom').split('px')[0], 10),
        });

        this.header = header;
      }
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const device = (() => {
      if (width <= process.env.MOBILE_PORTRAIT_BREAKPOINT) {
        return 'mobile-portrait';
      }
      if (width <= process.env.MOBILE_BREAKPOINT) {
        return 'mobile';
      }

      if (width <= process.env.IPAD_MINI_BREAKPOINT) {
        return 'iPad-mini';
      }
      if (width <= process.env.IPAD_PORTRAIT_BREAKPOINT) {
        return 'iPad-portrait';
      }

      if (width <= process.env.IPAD_BREAKPOINT) {
        return 'iPad';
      }

      return 'desktop';
      // width <= process.env.MOBILE_BREAKPOINT ? 'mobile' : 'desktop';
    })();
    const orientation = width <= process.env.MOBILE_PORTRAIT_BREAKPOINT ? 'portrait' : 'landscape';

    this.props.updateScreen({
      width,
      height,
      device,
      orientation,
    });

    if (screen.width > process.env.MOBILE_BREAKPOINT && !propsHeader.show) {
      this.props.updateHeader({
        show: true,
      });
      this.props.updateFooter({
        show: true,
      });
    }
  }

  closeNavItemGroups(callback) {
    this.setState({
      closeNavItemGroups: true,
    }, () => {
      this.setState({
        closeNavItemGroups: false,
      }, callback);
    });
  }

  toogleMobileNavDropList() {
    const { props } = this;
    const { settings } = props;
    const { screen } = settings;
    const { device, width } = screen;
    if (width <= process.env.MOBILE_BREAKPOINT) {
      this.setState((prev) => ({
        mobileShowNavbar: !prev.mobileShowNavbar,
      }));
    } else {
      this.setState({ showNavbar: false });
    }

    this.closeNavItemGroups();
  }

  headerDropHandler(event) {
    if (this.NavDropdown && !isDescendant(event.target, this.NavDropdown)) {
      this.setState({ showNavbar: false });
      window.removeEventListener('click', this.headerDropHandler, false);
    }
  }

  showHeaderDrop() {
    const { showNavbar } = this.state;

    if (!showNavbar) {
      this.setState({ showNavbar: true });
      window.addEventListener('click', this.headerDropHandler, false);
    }
  }

  render() {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser, screen } = settings;
    const { device, width } = screen;
    const propsHeader = {
      ...props.header,

    };
    propsHeader.backButton = settings.header.backButton;

    const header = {
      ...settings.header,
      ...propsHeader,
    };

    const RouterQuery = {};
    const queries = Router.asPath.split('?');
    if (queries[1]) {
      queries[1].split(',').forEach((data) => {
        const v = data.split('=');
        [, RouterQuery[v[0]]] = v;
      });
    }

    console.log('our router is : ', { Router, RouterQuery });
    const urlGoback = RouterQuery['go-back'];
    if (urlGoback) {
      header.backButton = {
        show: true,
        onClick: () => {
          Router.back();
        },
      };
    } else if (
      !this.props.settings.header.backButton.show
      && props.header.backButton
      && props.header.backButton.show
    ) {
      console.log('we changing', this.props.settings.header);
      // alert('we changing');
      header.backButton = props.backButton;
    }

    const navDropListHeight = state.mobileShowNavbar ? `calc(100vh - ${header.height}px)` : '';
    const navDropListTop = state.mobileShowNavbar ? `${header.height}px` : '';

    let NavList = !sessionUser ? [
      /* {
        icon: (
          <div className="image avi">
            <span className="icon-user default-image" />
          </div>
        ),
        label: 'Profile',
        className: 'display-image mobile-hide',
        href: '/profile',
      }, */
      {
        label: 'Log In',
        className: '',
        onClick: () => {
          props.showLogin();
        },
        // href: '/profile',
      },
      {
        label: 'Sign Up',
        linkClass: 'btn btn-glass no-shadow bordered-black',
        className: '',
        onClick: () => {
          props.showSignUp();
        },
        // href: '/profile',
      },
    ] : [
      ...(props.navList || []),
      ...(sessionUser.accountType !== 'caregiver' ? [
        {
          type: 'button',
          label: 'BECOME A CAREGIVER',
          dropdown: true,
          className: 'mobile-hide ',
          btnClassName: 'btn btn-3 no-shadow bordered',
          onClick: () => {
            props.becomeCaregiver();
          },
        }] : []),
      {
        label: 'My Hub',
        href: `${props.AppUrl}/my-hub/tribe`,
        className: 'mobile-hide',
      },
      {
        label: 'People',
        className: 'mobile-hide',
        dropdown: true,
        group: [
          {
            label: 'My Tribe',
            href: `${props.AppUrl}/my-hub/tribe`,
          },
          {
            label: 'Find People',
            href: `${props.AppUrl}/people`,
          },
        ],
      },
      {
        label: 'Activities',
        className: 'mobile-hide',
        dropdown: true,
        group: [
          {
            label: 'My Activities',
            href: `${props.AppUrl}/my-hub/activities`,
          },
          {
            label: 'Find an Activity',
            href: `${props.AppUrl}/activities`,
          },
          {
            label: 'Host an Activity',
            href: `${props.AppUrl}/host-activity`,
            onClick: (e) => {
            },
          },
        ],
      },
      {
        label: 'Calendar',
        href: `${props.AppUrl}/calendar`,
        className: 'mobile-hide',
      },
      {
        label: 'Inbox',
        href: `${props.AppUrl}/inbox`,
        className: 'mobile-hide',
      },
      {
        icon: <span className="icon-notification big-font" />,
        className: 'nav-notification mobile-hide',
        label: 'Notifications',
        href: `${props.AppUrl}/notifications`,
      },
      {
        icon: (
          <div className="image avi">
            {!sessionUser.imageThumbUrl
              ? <span className="icon-user default-image" />
              : <img src={sessionUser.imageThumbUrl} alt="" />}
          </div>
        ),
        label: 'Profile',
        className: 'display-image mobile-hide',
        href: `${props.AppUrl}/profile`,
      },
      {
        label: 'Settings',
        dropdown: true,
        href: `${props.AppUrl}/settings`,
        className: 'mobile-hide',
      },
      {
        label: 'Sign Out',
        dropdown: true,
        onClick: this.clearSession,
        className: 'mobile-hide',
      },
      /// /////////   MOBILE  ////////////////////////////////////////
      ...(sessionUser.accountType !== 'caregiver' ? [
        {
          type: 'button',
          label: 'BECOME A CAREGIVER',
          className: 'mobile-show',
          btnClassName: 'btn btn-3 no-shadow bordered',
          style: { margin: 0 },
          onClick: () => {
            props.becomeCaregiver();
          },
        }] : []),
      {
        label: 'My Hub',
        icon: <span className="icon-share1 icon" />,
        href: `${props.AppUrl}/my-hub/tribe`,
        className: 'mobile-show',
      },
      {
        label: 'People',
        icon: <span className="icon-profile-2user icon" />,
        className: 'mobile-show',
        group: [
          {
            label: 'My Tribe',
            href: `${props.AppUrl}/my-hub/tribe`,
          },
          {
            label: 'Find People',
            href: `${props.AppUrl}/people`,
          },
        ],
      },
      {
        label: 'Activities',
        icon: <span className="icon-activity1 icon" />,
        className: 'mobile-show',
        group: [
          {
            label: 'My Activities',
            href: `${props.AppUrl}/my-hub/activities`,
          },
          {
            label: 'Find an Activity',
            href: `${props.AppUrl}/activities`,
          },
          {
            label: 'Host an Activity',
            href: `${props.AppUrl}/host-activity`,
            onClick: (e) => {
            },
          },
        ],
      },
      {
        label: 'Settings',
        icon: <span className="icon-setting-2 icon" />,
        className: 'mobile-show',
        group: [
          {
            label: 'General',
            href: `${props.AppUrl}/settings?page=general`,
            onClick: this.toogleMobileNavDropList,
          },
          {
            label: 'Payments',
            href: `${props.AppUrl}/settings?page=payments`,
            onClick: this.toogleMobileNavDropList,
          },
          {
            label: 'History',
            href: `${props.AppUrl}/settings?page=history`,
            onClick: this.toogleMobileNavDropList,
          },
          {
            label: 'Preferences',
            href: `${props.AppUrl}/settings?page=preferences`,
            onClick: this.toogleMobileNavDropList,
          },
          {
            label: 'Refer a Friend',
            href: `${props.AppUrl}/settings?page=refer a friend`,
            onClick: this.toogleMobileNavDropList,
          },
        ],
      },
      {
        quickLink: true,
        icon: <span className="icon-user icon" />,
        href: `${props.AppUrl}/profile`,
        className: 'mobile-show',
      },
      {
        quickLink: true,
        icon: <span className="icon-notification icon" />,
        href: `${props.AppUrl}/notifications`,
      },
      {
        icon: <span className="icon-messages-2 icon" />,
        href: `${props.AppUrl}/inbox`,
        quickLink: true,
      },
      {
        href: `${props.AppUrl}/calendar`,
        icon: <span className="icon-calendar-1 icon" />,
        quickLink: true,
      },
      {
        type: 'button',
        label: 'Sign Out',
        icon: <span className="icon-logout icon" />,
        style: {
          marginTop: '4em',
          /*
          position: 'absolute',
          bottom: '3em',
          paddingLeft: '1em', */
        },
        className: 'mobile-show',
        btnClassName: 'inline thin btn btn-glass __pill no-shadow bordered-black',
        onClick: this.clearSession,
      },
    ];

    const outerNavList = [];
    const dropNavList = [];
    const quickLinkList = [];
    const centerNavList = [];
    let dropControl = sessionUser && (
      <button
        type="button"
        className="drop-cntrl-button nav-link"
        onClick={this.showHeaderDrop}
      >
        <span className="icon-hmv-chevron-down" />
      </button>
    );

    if (header.darkTheme) {
      // alert('we in dark');
      dropControl = (
        <div
          className="pill-control mobile-hide"
          onClick={this.showHeaderDrop}
        >
          <span className="icon fa fa-bars" />
          <div className="image avi">
            {!sessionUser.imageThumbUrl || !sessionUser
              ? <span className="icon-user default-image" />
              : <img src={sessionUser.imageThumbUrl} alt="" />}
          </div>
        </div>
      );
      NavList = sessionUser ? [
        {
          label: 'Go to App',
          className: '',
          dropdown: true,
          href: `${props.AppUrl}/`,
        },
        ...(header.navList || []),
        {
          label: 'Host an Activitiy',
          href: `${props.AppUrl}/host-activity`,
          className: '',
          dropdown: true,
        },
        /*  {
          label: 'Create a Pod',
          className: '',
          dropdown: true,
          onClick: () => {
            props.showSignUp();
          },
        }, */
        {
          label: 'Sign Out',
          className: '',
          dropdown: true,
          onClick: this.clearSession,
        },
      ] : [
        {
          label: 'Sign Up',
          className: '',
          dropdown: true,
          onClick: () => {
            props.showSignUp();
          },
        },
        {
          label: 'Log In',
          className: '',
          dropdown: true,
          onClick: () => {
            props.showLogin();
          },
        },
        {
          breakLine: true,
        },
        ...(header.navList || []),
        {
          label: 'Host an Activitiy',
          className: '',
          dropdown: true,
          onClick: () => {
            props.showSignUp({
              accountType: 'caregiver',
            });
          },
        },
        /* {
          label: 'Create a Pod',
          className: '',
          dropdown: true,
          onClick: () => {
            props.showSignUp();
          },
        }, */
      ];
    }

    NavList.forEach((nav, index) => {
      let navItem = nav.type === 'button' ? (
        <div className={`nav-item ${nav.className}`} style={nav.style || {}}>
          <div
            className="nav-link"
            style={{
              /*           padding: '0 1em',
          margin: '1em 0 0',
        */ }}
          >
            <button
              type="button"
              className={nav.btnClassName}
              onClick={() => {
                if (nav.onClick) {
                  nav.onClick();
                }

                this.toogleMobileNavDropList();
              }}
            >
              {nav.icon || ''}
              {nav.label}
            </button>
          </div>
        </div>
      ) : (
        <NavItem
          nav={nav}
          toogleMobileNavDropList={this.toogleMobileNavDropList}
        />
      );

      if (nav.breakLine) {
        navItem = '';
        dropNavList.push(
          <li className="nav-item break-line">
            <span className="nav-link" href="/">
              <span className="label" />
            </span>
          </li>,
        );
      } else if (nav.group) {
        navItem = (
          <NavItemGroup
            nav={nav}
            canOpen={!state.closeNavItemGroups}
            toogleMobileNavDropList={this.toogleMobileNavDropList}
            closeNavItemGroups={this.closeNavItemGroups}

          />
        );
      }

      if (nav.dropdown) {
        dropNavList.push(navItem);
      } else if (nav.align === 'center') {
        centerNavList.push(
          <Link href={nav.href}>
            <a
              target={nav.target || ''}
              className={nav.className}
              onClick={(e) => {
                if (nav.onClick) {
                  e.preventDefault();
                  // nav.onClick();
                }
              }}
            >
              <span>{nav.label} </span>
              <span className="underline" />
            </a>
          </Link>,
        );
      } else if (nav.quickLink) {
        quickLinkList.push(navItem);
      } else {
        outerNavList.push(navItem);
      }
    });

    return (
      <>
        <Head runat="server">
          <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());

                    gtag('config', '${process.env.GOOGLE_ANALYTICS_TRACKING_ID}');
                  `,
            }}
          />

          {/* <!-- Hotjar Tracking Code for www.abule.io --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:2502935,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                    `,
            }}
          />

          <meta charSet="utf-8" />
          <title>Abule</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Collaboration for change" />

          <script src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/tgs-player.js" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"> </script>
          {/*  Required vendor scripts (Do not remove)  */}
          <script type="text/javascript" src="/js/jquery.min.js" />
          {/* <script type="text/javascript" src="/js/bootstrap.js" /> */}
          <script
            async
            src="https://bugcrowd.com/a14e688f-73ca-4ca2-830c-7e29eb6c8a91/external/script"
            data-bugcrowd-program="https://bugcrowd.com/a14e688f-73ca-4ca2-830c-7e29eb6c8a91/external/report"
          />

        </Head>
        {header.show && (
          <header
            className={props.darkTheme ? 'dark ' : ''}
            style={{
              height: header.height,
            }}
          >
            <div
              id="header"
              ref={this.regReduxProps}
            >
              <nav className={`${state.mobileShowNavbar ? ' open' : ''}`}>
                <div className="left">
                  {width <= process.env.MOBILE_BREAKPOINT && (header.backButton && header.backButton.show) ? (
                    <span
                      className="go-back icon-arrow-left-2"
                      onClick={() => {
                        if (header.backButton.onClick) {
                          header.backButton.onClick();
                        } else {
                          Router.back();
                        }
                      }}
                    />
                  ) : (

                    <Link href={`${props.AppUrl}/`}>
                      <div
                        className="logo"
                        onClick={(e) => {
                          if (header.homeClick && typeof header.homeClick === 'function') {
                            e.preventDefault();
                            e.stopPropagation();
                            header.homeClick();
                          }
                        }}
                      >
                        {props.darkTheme
                          ? <span className="timberline-font">Abulé</span>
                          : ''}
                        <img
                          alt="Abule"
                          src={props.darkTheme ? '/logo_white.png' : '/logo.png'}
                          onLoad={() => { this.regReduxProps(); }}
                        />
                        {!props.darkTheme
                          ? <span className="timberline-font">Abulé</span>
                          : ''}
                      </div>
                    </Link>
                  )}
                </div>
                {props.NavList ? (
                  <div
                    id="NavList"
                    style={{
                      height: navDropListHeight,
                      top: navDropListTop,
                    }}
                  >{props.NavList}
                  </div>
                ) : (
                  <>
                    <div className="center">
                      <div className="content">
                        {centerNavList}
                        {/* {} */}
                      </div>
                    </div>

                    <>
                      <div
                        className="navbar-nav"
                        style={{
                          height: navDropListHeight,
                          top: navDropListTop,
                        }}
                      >
                        <ul className="nav-items">
                          {!header.hideNavList ? (
                            <>
                              {sessionUser !== 'loading' && (
                                <>
                                  {outerNavList}

                                  {dropControl && (
                                    <li
                                      className="nav-item drop-cntrl"
                                      ref={(e) => { this.NavDropdown = e; }}
                                    >
                                      {dropControl}

                                      <div className={`nav-drop-list${state.showNavbar ? ' show' : ''}`}>
                                        {dropNavList}
                                      </div>
                                    </li>
                                  )}

                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {sessionUser && (
                                <div className="nav-item">
                                  <div className="nav-link">
                                    <button
                                      type="button"
                                      className="label btn btn-glass no-shadow bordered-black"
                                      onClick={() => {
                                        this.clearSession();
                                      }}
                                    >
                                      Sign Out
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </ul>
                        {quickLinkList.length > 0 && (
                          <div className="quick-links mobile-show">
                            {quickLinkList}

                          </div>
                        )}
                      </div>
                    </>
                  </>
                )}
                {sessionUser !== 'loading' && (
                  <div id="sm-cntrl" onClick={this.toogleMobileNavDropList}>
                    <div className="holder">
                      <p className="icon-hmv-nav-line" />
                      <p className="icon-hmv-nav-line" />
                      <p className="icon-hmv-nav-line" />
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </header>
        )}
        <div id="PageWidthGetter" className="" style={{ padding: '0px' }} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  updateFooter: (props) => dispatch(updateFooter(props)),
  updateScreen: (props) => dispatch(updateScreen(props)),
  signOut: () => dispatch(signOut()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
