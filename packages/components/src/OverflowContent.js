import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';


class OverflowContent extends React.Component {
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
        console.log('the activity group list ', this.activityGroupList.scrollLeft);
        scrollLeft = this.activityGroupList.scrollLeft + width;
        // alert('you clicked right');
      }
      console.log('the activity group list new ', scrollLeft);
      this.updateActivityGroupListMeasurement(scrollLeft);
      // this.activityGroupList.scrollLeft = scrollLeft;
      this.activityGroupList.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { props } = this;
    const { state } = this;


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
      <div className={`overflow-content-container ${props.className}`}>
        {props.header && (
          <div
            className="overflow-content-header"
            onClick={() => {
              if (window.innerWidth <= process.env.MOBILE_BREAKPOINT) {
                props.headerSwitchClick();
              }
            }}
          >
            <span className="label">{props.header}</span>
            <div className="controls">
              {window.innerWidth > process.env.MOBILE_BREAKPOINT ? (
                <>
                  {props.headerSwitchPage}
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
                    onClick={props.headerSwitchClick}
                  />
                  // </div>
                )}
            </div>
          </div>
        )}
        {props.description && (
          <p className="description">{props.description}</p>
        )}
        <div
          className="content"

        >
          <div
            className="content-slider"
            ref={(e) => {
              if (e && !this.activityGroupList) {
                this.activityGroupList = e;
                this.updateActivityGroupListMeasurement();
              }
            }}
          >
            {props.content}
          </div>
        </div>
      </div>
    );
  }
}

OverflowContent.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.string,
  values: PropTypes.array,
  options: PropTypes.array,
  mandatory: PropTypes.bool,
  isEditable: PropTypes.bool,
  multichoice: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
  headerSwitchClick: PropTypes.func,
};

OverflowContent.defaultProps = {
  className: '',
  content: '',
  values: [],
  options: [{}],
  mandatory: false,
  isEditable: true,
  multichoice: true,
  style: {},
  onChange: () => { },
  headerSwitchClick: () => { },
};

export default OverflowContent;
