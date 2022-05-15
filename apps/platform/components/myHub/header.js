/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';

const HubHeader = (props) => {
  const router = window.location;
  console.log('hub', router);
  const links = [
    {
      id: 1,
      href: `${props.AppUrl}/my-hub/tribe`,
      className: '',
      label: 'Tribe',
    },
    {
      id: 2,
      href: `${props.AppUrl}/my-hub/activities`,
      className: '',
      target: '',
      label: 'Activities',
    },
  ];

  const path = router.pathname.split('/');
  const rootPath = `${path[1]}/${path[2]}/${path[3]}`;
  return (
    <div className="headers">
      {links.map((nav) => {
        const navHref = nav.href.split('/');
        const navRootPath = `${navHref[1]}/${navHref[2]}/${navHref[3]}`;
        return (
          <Link href={nav.href}>
            <a
              target={nav.target || ''}
              className={nav.className}
              onClick={(e) => {
                if (nav.onClick) {
                  e.preventDefault();
                  nav.onClick();
                }
              }}
            >
              <span className={rootPath === navRootPath ? 'labelActive' : 'notActive'}>{nav.label}</span>
              <span className={rootPath === navRootPath ? 'active' : 'underline'} />
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default HubHeader;
