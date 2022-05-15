import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import {
  PopMessage, InputPicker,
  Fn,
} from '@abule-common/components';
import { sessionUserDeleteKid, sessionUserUpdateKid } from '../../redux/settings/action';
import { AgeGroups, Categories, Utils } from '../../datastore';
import { AgeGroupIcons } from '../../public/data/assets';

const {
  addToTime, getGenderIcon, milSecToYears, ucFirst,
} = Fn;

class KidProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      willDelete: false,
      showInterests: false,
    };
    this._isMounted = false;
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

  getKidIcon(gender) {
    return getGenderIcon(gender);
  }

  getAgeGroupIcon(age) {
    const ageGroup = AgeGroups.getGroup(age);
    return AgeGroupIcons[ageGroup.value];
  }

  render() {
    const { state, props } = this;
    const { kid } = this.props;

    if (!kid) {
      return null;
    }

    const age = milSecToYears(new Date() - new Date(kid.dob));
    return (
      <>
        <div className={`kid-profile   ${state.willDelete ? ' will-delete' : ''}`}>
          <div className="actions">
            <div>
              {props.showActions
                ? (
                  <span
                    className="action icon-edit-2"
                    onClick={() => {
                      props.onEdit();
                    }}
                  />
                )
                : ''}
            </div>
          </div>
          <div className="content">
            <div className="details">
              <div className="top">
                <div className="left">
                  <div className={`age-group ${this.getAgeGroupIcon(age)}`} />
                  <p className="name">{kid.preferredName}</p>
                </div>
                <span className="color kid-indicator" color={kid.color} />
              </div>
              <p className="age">
                <span><b>Age</b>: {age > 0 ? age : '< 1'}</span>
                <span><b>Gender</b>: {kid.gender[0].toUpperCase()}</span>
              </p>
              <div
                className="interests"
                onClick={() => {
                  this.setState({
                    showInterests: true,
                  });
                }}
              >
                <span className="lbl">INTERESTS</span>
                <span className="list">{[...kid.interests].join(' , ')}</span>
              </div>
            </div>
          </div>
        </div>
        {state.showInterests && (() => (
          <PopMessage
            style={{ zIndex: '2' }}
            message={(
              <div id="updateInterestsPopUp">
                <div className="title">
                  <div className="label">Kid's Interests</div>
                </div>
                <div className="pickers">
                  <InputPicker
                    // values={support.grades}
                    options={kid.interests.map((interest) => ({
                      value: interest,
                      label: ucFirst(interest),
                    }))}
                  />
                </div>

              </div>
            )}
            confirmButton={{
              show: false,
              label: 'CLOSE',
              onClick: async (closer, hideLoader) => {
                closer();
              },
              className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                showInterests: false,
              });
            }}
          />
        )
        )()}
      </>
    );
  }
}

KidProfile.propTypes = {
  onSignInSuccess: PropTypes.func,
  onSignInFail: PropTypes.func,
  onLoad: PropTypes.func,
  showActions: PropTypes.bool,
};

KidProfile.defaultProps = {
  onSignInSuccess: () => { },
  onSignInFail: () => { },
  onLoad: () => { },
  showActions: true,
};

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(KidProfile);
