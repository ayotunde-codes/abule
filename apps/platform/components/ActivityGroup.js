import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { connect } from 'react-redux';
import ActivityPreview from './ActivityPreview';
import {
  OverflowContent
} from '@abule-common/components';
class ActivityGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbHeight: 'auto',
      thumbHeightExtra: 0,
      fullWidth: 0,
      width: 0,
      scrollLeft: 0,
    };
    this.activityGroupList = null;
    this.updateHeight = this.updateHeight.bind(this);
    this.updateActivityGroupListMeasurement = this.updateActivityGroupListMeasurement.bind(this);
  }

  updateHeight(thumbHeight = 'auto', thumbHeightExtra = 0) {
    this.setState({ thumbHeight, thumbHeightExtra });
  }

  updateActivityGroupListMeasurement(scrollLeft) {
    if (this.activityGroupList) {
      if (!scrollLeft) scrollLeft = this.activityGroupList.scrollLeft;
      this.setState({
        fullWidth: this.activityGroupList.scrollWidth,
        width: this.activityGroupList.offsetWidth,
        scrollLeft: scrollLeft < 0 ? 0 : scrollLeft,
      });
    }
  }

  moveSlide(dir) {
    if (this.activityGroupList) {
      const width = $(this.activityGroupList).outerWidth();
      let { scrollLeft } = this.activityGroupList;
      if (dir === 'left') {
        scrollLeft = this.activityGroupList.scrollLeft - width;
      }
      if (dir === 'right') {
        scrollLeft = this.activityGroupList.scrollLeft + width;
      }
      this.updateActivityGroupListMeasurement(scrollLeft);
      this.activityGroupList.scrollLeft = scrollLeft;
    }
  }

  render() {
    const { props } = this;
    const { state } = this;

    const { activities, settings } = props;
    const { screen } = settings;

    if (!activities || activities.length === 0) {
      return '';
    }

    const {
      fullWidth,
      width,
      scrollLeft,
    } = state;

    if (this.activityGroupList) {
      console.log('thw group list container with is : ', {
        guy: this.activityGroupList.scrollLeft,
        fullWidth,
        width,
        scrollLeft,
        checkLeft: scrollLeft + width,
      });
    }

    let headerSwitchPage = null;
    if (!isNaN(props.counter)) {
      headerSwitchPage = props.counter === null ? true : (
        <div
          className="show-more"
          onClick={props.OnCounterClick}
        >show all({props.counter})
        </div>
      );
    }
    return (
      <OverflowContent
        header={props.header}
        className={props.rootClassName || ' page-container'}
        headerSwitchPage={headerSwitchPage}
        headerSwitchClick={props.OnCounterClick}
        content={(
          <div className={`activity-group ${props.className}`}>
            <div className="activity-group-list-container">
              <div
                className="activity-group-list"
                ref={(e) => {
                  if (e && !this.activityGroupList) {
                    this.activityGroupList = e;
                    this.updateActivityGroupListMeasurement();
                  }
                }}
              >
                {activities.map((activity, index) => (
                  <ActivityPreview
                    {...props}
                    updateHeight={index === 0 ? this.updateHeight : null}
                    activity={activity}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      />

    );
  }
}

ActivityGroup.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  values: PropTypes.array,
  options: PropTypes.array,
  mandatory: PropTypes.bool,
  isEditable: PropTypes.bool,
  multichoice: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

ActivityGroup.defaultProps = {
  className: '',
  rootClassName: '',
  values: [],
  options: [{}],
  mandatory: false,
  isEditable: true,
  multichoice: true,
  style: {},
  onChange: () => { },
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});
export default connect(mapStateToProps)(ActivityGroup);
