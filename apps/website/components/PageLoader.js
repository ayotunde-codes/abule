import React from 'react';
import PropTypes from 'prop-types';

class PageLoader extends React.Component {
  render() {
    const { props } = this;
    const { className, style, inline } = props;
    return (
      <div
        id="pageLoader"
        className={`${inline ? 'inline' : ''} ${className}`}
        style={style}

      >
        <span className={`icon-refresh spinner ${props.type}`} />
      </div>
    );
  }
}

PageLoader.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

PageLoader.defaultProps = {
  type: 'big',
  className: '',
};
export default PageLoader;
