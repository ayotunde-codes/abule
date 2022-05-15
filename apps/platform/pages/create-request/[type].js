import React from 'react';
import RequestForm from '../../components/barter/RequestFormComponent';
// import 'react-datepicker/dist/react-datepicker.css';

class PostBarterRequest extends React.Component {
  render() {
    return (
      <RequestForm
        {...this.props}
      />
    );
  }
}
export default PostBarterRequest;
