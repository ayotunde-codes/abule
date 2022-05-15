import React from 'react';
import PropTypes from 'prop-types';
// import { SearchBar } from "antd-mobile";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: '',
    };

    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
  }

  focus(value = true) {
    this.setState(() => ({
      focused: value,
    }));

    this.props.onFocus();
  }

  blur() {
    this.setState(() => ({
      focused: false,
    }));

    this.props.onBlur();
  }

  render() {
    const { focused, value } = this.state;
    const { props } = this;
    const { className } = props;
    return (
      <div className={`search-bar${focused ? ' focused' : ''} ${className || ''}`}>
        <button
          type="button"
          onClick={() => {
            props.onEnter(value);
          }}
        >
          <i className="icon-search-normal-1" />
        </button>
        <input
          type="text"
          placeholder={props.placeholder}
          className="input"
          value={props.value || value}
          onFocus={this.focus}
          onChange={(e) => {
            const value_ = e.target.value;
            this.setState({ value: value_ });
            this.props.onChange(value_);
          }}
          style={props.style}
          onBlur={this.blur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value_ = e.target.value;
              props.onEnter(value);
            }
          }}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

SearchBar.defaultProps = {
  placeholder: 'search',
  onEnter: () => {},
  onFocus: () => {},
  onChange: () => {},
  onBlur: () => {},
};

export default SearchBar;
