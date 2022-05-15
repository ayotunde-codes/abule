import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';

const General = (props) => {
  const {
    settings, className,
  } = props;
  const { sessionUser } = settings;

  return (
    <div id="generalSettings" className={`settings-section-data-group ${className}`}>
      <button
        type="button"
        className="btn btn-default no-shadow bordered-black"
        onClick={() => {
          Router.push(`${props.AppUrl}/update-password`);
        }}
      >Id Verification
      </button>
      <button
        type="button"
        className="btn btn-default no-shadow bordered-black"
        onClick={() => {
          Router.push(`${props.AppUrl}/update-password`);
        }}
      >Background Check
      </button>
      <button
        type="button"
        className="btn btn-default no-shadow bordered-black"
        onClick={() => {
          Router.push(`${props.AppUrl}/update-password`);
        }}
      >Update Password
      </button>
      <button
        type="button"
        className="btn btn-default no-shadow bordered-black"
      >Delete Account
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  editProfile: state.editProfile,
});

export default connect(mapStateToProps)(General);
