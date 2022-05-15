import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sessionUserDeleteKid, sessionUserUpdateKid } from '../redux/settings/action';

class Community extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { settings } = props;
  }

  componentDidUpdate() {
    const { props } = this;
    const { settings } = props;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { state, props } = this;
    const { settings } = this.props;
    const { community } = props;
    return (
      <div className={`community ${community.className}`}>
        <div className={`content ${community.className}`}>
          <span>{community.title}</span>
        </div>
      </div>
    );
  }
}

Community.propTypes = {
  request: PropTypes.object,
};

Community.defaultProps = {
  request: {},
};

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Community);
