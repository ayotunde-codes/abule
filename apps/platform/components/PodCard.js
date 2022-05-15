import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { sessionUserDeleteKid, sessionUserUpdateKid } from '../redux/settings/action';

class PodCard extends Component {
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

    return (
      <div className="pod-card">
        <div className="pod-card-content">
          <div className="details">
            <div className="main">
              <div className="top">
                <img src="/img/square-2.jpg" alt="" />
              </div>
              <div className="bottom">
                <div className="date">2/28/21 - 5/28/21</div>
                <div className="name">
                  <p>Latin Rhythmic Barre</p>
                </div>
                <div className="age-group">
                  <span className="icon icon-hmv-baby" />
                  <span className="icon icon-hmv-socks" />
                  <span className="icon icon-hmv-apple" />
                  <span className="icon icon-hmv-lower-elem" />
                  <span className="icon icon-hmv-upper-elem" />
                </div>
                <p className="description">
                  In this series, students will learn the fundamental techniques of belly dancing…
                </p>

                <div className="action">
                  <span> see details </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PodCard.propTypes = {
  request: PropTypes.object,
};

PodCard.defaultProps = {
  request: {},
};

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PodCard);
