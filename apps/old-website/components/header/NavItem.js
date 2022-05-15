import Link from 'next/link';
import React from 'react';
import NavLink from '../general/NavLink';

export default class NavItem extends React.Component {
  render() {
    const { props, state } = this;
    const {
      nav,
      toogleMobileNavDropList,
    } = props;

    return (
      <li
        className={`nav-item ${nav.className || ''}`}
      >
        <NavLink href={nav.href || '#'}>
          <a
            onClick={(e) => {
              if (toogleMobileNavDropList) toogleMobileNavDropList();
              if (nav.onClick) {
                nav.onClick();
                if (!nav.href) {
                  e.preventDefault();
                }
              }
            }}
            className={`nav-link${nav.icon ? ' is-icon' : ''}`}
          >
            <div className="left">
              {nav.icon || ''}
              <span className={`label ${nav.linkClass || ''}`}> {nav.label} </span>
            </div>
          </a>
        </NavLink>
      </li>
    );
  }
}
