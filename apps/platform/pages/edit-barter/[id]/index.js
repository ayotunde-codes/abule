import React from 'react';
import Router from 'next/router';
import RequestForm from '../../../components/barter/RequestFormComponent';

class EditBarterRequest extends React.Component {
  render() {
    const { type, id } = Router.query;
    return (
      <RequestForm
        {...this.props}
        bartering={type}
        requestId={id}
        editRequest
      />
    );
  }
}

export default EditBarterRequest;
