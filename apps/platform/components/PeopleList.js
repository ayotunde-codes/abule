import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Fn } from '@abule-common/components';

const {
  capitalize,
} = Fn;

class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: '',
    };
  }

  render() {
    const { props } = this;
    console.log('PEOPLE : ', props.people);
    return (
      <div className="people-list">
        {props.people.map((friendProfile) => (
          <Link href={`${props.AppUrl}/profile/[id]`} as={`${props.AppUrl}/profile/${friendProfile.id}?go-back=true`}>
            <div className="user">
              <a className="avi">
                <img src={friendProfile.imageUrl} alt="" />
              </a>

              <abbr
                className="name"
                title={`${capitalize(friendProfile.firstName)} ${capitalize(friendProfile.lastName)}`}
              >{capitalize(`${friendProfile.firstName} ${friendProfile.lastName}`, true)}
              </abbr>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

PeopleList.propTypes = {
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

PeopleList.defaultProps = {
  placeholder: 'search',
  onEnter: () => { },
  onFocus: () => { },
  onChange: () => { },
  onBlur: () => { },
};

export default PeopleList;
