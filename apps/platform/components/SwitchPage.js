import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class SwitchPage extends React.Component {
  render() {
    const { props } = this;
    const label = <span className="label">{props.label}</span>;
    return (
      <Link href={props.href || ''} as={props.as}>
        <a
          className={`switch-page ${props.direction} ${props.className}`}
          onClick={(e) => {
            if (props.onClick) {
              e.preventDefault();
              props.onClick();
            }
          }}
        >
          {
            props.direction === 'right' ? (
              <>
                {label}
                <button type="button" className={`icon btn btn-1 back-button icon-arrow-right ${props.iconClassName}`} />

              </>
            ) : (
              <>
                <button type="button" className={`icon btn btn-1 back-button icon-arrow-left ${props.iconClassName}`} />
                {label}
              </>
            )
          }
        </a>
      </Link>
    );
  }
}

SwitchPage.defaultProps = {
  icon: 'btn btn-1 back-button icon-arrow-right',
  iconClassName: '',
  label: '',
  href: '',
  className: '',
  direction: 'right',
  as: '',
  onClick: null,
};

export default SwitchPage;
