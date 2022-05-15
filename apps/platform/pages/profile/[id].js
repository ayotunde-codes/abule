import React from 'react';
import Router from 'next/router';
import Profile from './index';

class ProfilePreview extends React.Component {
  render() {
    const { id, tribeCheck } = Router.query;
    return (
      <Profile
        {...this.props}
        loadProfile
        profileId={id}
        tribeCheck={tribeCheck}
      />
    );
  }
}

export default ProfilePreview;
