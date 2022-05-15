import Link from 'next/link';
import React, { Children } from 'react';
import { withRouter } from 'next/router';

class NavLink extends React.Component {
  render() {
    const { props } = this;
    const { router, children } = props;
    const child = Children.only(children);

    let className = child.props.className || null;
    if (router.pathname === props.href) {
      className = `${className !== null ? className : ''} ${'active'}`.trim();
    }

    delete 'active';

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
  }
}

export default withRouter(NavLink);
