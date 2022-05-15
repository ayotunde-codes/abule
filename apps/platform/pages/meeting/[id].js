import React from 'react';
import { connect } from 'react-redux';


const doubTime = (s) => (`${s}`.length === 1 ? `0${s}` : s);
class Dashboard extends React.Component {
  /* constructor(props) {
    super(props);

    this.state = {
      hostBio: '',
      hostBioError: false,
      materials: '',
      materialsError: false,
      description: '',
      descriptionError: false,
      name: '',
      nameError: false,
      type: ['virtual'],
      date: new Date(),
      dateError: false,
      startHour: '12',
      startMinute: '0',
      startPeriod: 'AM',
      duration: 15,
      frequency: ['Single'],
      category: [],
      categoryError: false,
      ageGroup: [],
      ageGroupError: false,
      photos: [],
      /// ///////////////////////////////////////////////
      revealStartTimeModal: false,
      startTimeToolTipGap: 0,
      submitting: false,
    };

    this._isMounted = false;
    this.maxMedia = 3;
    this.mediaPicker = null;
    this.startTime = null;
    this.startTimeToolTip = null;
  } */

  render() {
    const { props, state } = this;
    const { settings } = props;

    return (
      <Layout {...props}>
        {/* <Meeting {...props} /> */}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  sessionUserAddKid: (kid) => dispatch(sessionUserAddKid(kid)),
  sessionUserUpdateKid: (kidId, props) => dispatch(sessionUserUpdateKid(kidId, props)),
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
