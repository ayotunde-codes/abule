import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { connect } from 'react-redux';
import ActivityPreview from './ActivityPreview';

class ActivityGroupYAM extends React.Component {
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

    return (
      <div className="activity-group-container">
        {props.header && (
          <div
            className="activity-group-header"
            onClick={() => {
              if (screen.width <= process.env.MOBILE_BREAKPOINT) {
                props.OnCounterClick();
              }
            }}
          >
            <span className="label">{props.header}</span>
            <div className="controls">
              {screen.width > process.env.MOBILE_BREAKPOINT ? (
                <>
                  {!isNaN(props.counter) && (
                    <div
                      className="show-more"
                      onClick={props.OnCounterClick}
                    >show all({props.counter})
                    </div>
                  )}
                  <div className="sliders">
                    <span
                      className={`icon left icon-arrow-left-2${scrollLeft <= 0 ? ' in-active' : ''}`}
                      onClick={() => {
                        this.moveSlide('left');
                      }}
                    />
                    <span
                      // className="icon right icon-arrow-right-3"
                      className={`icon right icon-arrow-right-3${(scrollLeft + width) >= fullWidth ? ' in-active' : ''}`}
                      onClick={() => {
                        this.moveSlide('right');
                      }}
                    />
                  </div>
                </>
              )
                : (
                  // <div className="sliders">
                  <span
                    className="mobile-show-more icon-arrow-right-3"
                    onClick={props.OnCounterClick}
                  />
                  // </div>
                )}
            </div>
          </div>
        )}
        <div className={`activity-group ${props.className}`}>
          {/* {props.title ? (
            <h5 className="activity-group-title">
              <span>{props.title} </span>
            </h5>
          ) : ''} */}
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
                  updateHeight={index === 0 ? this.updateHeight : null}
                  activity={activity}
                />
              ))}
            </div>
          </div>
          {/* <SlideShow
          className="activity-group-list"
          controllerLeft={<span className="activity-group-list-controller icon-arrow-left" />}
          controllerRight={<span className="activity-group-list-controller icon-arrow-right" />}
          setControllerTop={(cntrlLeft) => {
            console.log({
              thumbHeight: state.thumbHeight,
              leftHeight: $(cntrlLeft).outerHeight(),
            });
            return ((state.thumbHeight - $(cntrlLeft).outerHeight()) / 2) + state.thumbHeightExtra;
          }}
          items={activities.map((activity, index) => (
            {
              // label: 'the',
              content: (
                <ActivityPreview
                  updateHeight={index === 0 ? this.updateHeight : null}
                  activity={activity}
                />
              ),
            }
          ))}
        /> */}
        </div>
      </div>
    );
  }
}

ActivityGroupYAM.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  values: PropTypes.array,
  options: PropTypes.array,
  mandatory: PropTypes.bool,
  isEditable: PropTypes.bool,
  multichoice: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

ActivityGroupYAM.defaultProps = {
  className: '',
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
export default connect(mapStateToProps)(ActivityGroupYAM);
