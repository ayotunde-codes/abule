import React from 'react';
import NavLink from '../general/NavLink';
import NavItem from './NavItem';

export default class NavItemGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drop: false,
    };

    this.dropdown = null;
    this.toogleDropdown = this.toogleDropdown.bind(this);
  }

  componentDidUpdate() {
    const { props, state } = this;
    if (!props.canOpen && state.drop) {
      this.setState({ drop: false });
    }
  }

  toogleDropdown() {
    const { drop } = this.state;
    this.props.closeNavItemGroups(() => {
      this.setState({ drop: !drop });
    });
    // this.props.toogleMobileNavDropList();
  }

  render() {
    const { props, state } = this;
    const { nav } = props;
    const show = state.drop;
    return (
      <li className={`nav-item group ${nav.className || ''}`}>
        <button
          type="button"
          className={`nav-link${show ? ' show' : ''}`}
          onClick={this.toogleDropdown}
          // onFocus={() => {
          //   this.setState({ drop: true });
          // }}
          // onBlur={() => {
          //   setTimeout(() => {
          //     this.setState({ drop: false });
          //   }, 150);
          // }}
        >
          <div className="left">
            {nav.icon || '' }
            <span className="label"> {nav.label} </span>
          </div>
          <span className="icons">
            <span className="icon icon-hmv-nav-line" />
            <span className="icon icon-hmv-nav-line" />
          </span>
        </button>

        <div
          className={`nav-group-drop${show ? ' show' : ''}`}
          ref={(e) => { this.dropdown = e; }}
        >
          {nav.group.map((groupItem, id) => (
            <li key={id} className="nav-item">
              <NavItem
                nav={{
                  ...groupItem,
                  toogleMobileNavDropList: props.toogleMobileNavDropList,
                }}
              />
            </li>
          ))}
        </div>
      </li>
    );
  }
}
