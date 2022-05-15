import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { updateHeader, setInfo } from '../../redux/settings/action';

class ActivitiesIndex extends React.Component {
  render() {
    const { props, state } = this;

    Router.push(`${props.AppUrl}/`);
    return '';
  }
}

// const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
});
export default connect(null, mapDispatchToProps)(ActivitiesIndex);
