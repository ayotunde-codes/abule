import React from 'react';
import ViewRequestType from './index';

class OthersBarterRequest extends React.Component {
  render() {
    return (
      <ViewRequestType {...this.props} isOthers />
    );
  }
}

export default OthersBarterRequest;
