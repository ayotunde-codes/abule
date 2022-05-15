/* eslint-disable react/no-danger */
import React from 'react';
import InputLocation from './InputLocation';

class InputSchool extends React.Component {
  render() {
    const { props } = this;

    return (
      <InputLocation
        {...props}
        locationType="school"
      />
    );
  }
}

export default InputSchool;
