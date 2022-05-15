import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { connect } from 'react-redux';
import {
  setItems as setGallery, hideGallery,
} from '../../redux/gallery/action';
import ActivitySlideShowItem from './Item';

class ActivitySlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbHeight: 'auto',
      thumbHeightExtra: 0,
      fullWidth: 0,
      width: 0,
      scrollLeft: 0,
      focusedIndex: 0,
      activeItem: 0,
    };
    this.activityGroupList = null;
    this.Items = [];
    this.updateHeight = this.updateHeight.bind(this);
    this.scrollItems = true;
    this.showMediaInGallery = this.showMediaInGallery.bind(this);
    this.onItemsScroll = this.onItemsScroll.bind(this);
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
    let { focusedIndex } = this.state;
    if (dir === 'left') {
      focusedIndex -= 1;
    } else {
      focusedIndex += 1;
    }

    if (focusedIndex < 0) {
      focusedIndex = 0;
    }
    if (focusedIndex > (this.props.items.length - 1)) {
      focusedIndex = this.props.items.length - 1;
    }

    this.setState({
      focusedIndex,
    }, () => {
      this.scrollItems = true;
    });
  }

  showMediaInGallery(index) {
    const { props } = this;

    const { activities, settings } = props;
    const { screen } = settings;
    props.setGallery(props.items, index);
  }

  onItemsScroll(e) {
    const el = e.target;
    const { scrollLeft } = el;
    const width = el.offsetWidth;
    const focusedIndex = Math.round(scrollLeft / width);
    // alert(focusedIndex);
    this.setState({
      focusedIndex,
    }, () => {
      this.scrollItems = false;
    });
  }

  render() {
    const { props } = this;
    const { state } = this;

    const { activities, settings } = props;
    const { screen } = settings;

    const {
      fullWidth,
      width,
      scrollLeft,
      focusedIndex,
    } = state;
    let { activeItem } = state;
    if (this.activityGroupList) {
      if (this.scrollItems) {
        this.activityGroupList.scrollLeft = this.activityGroupList.offsetWidth * focusedIndex;
        this.scrollItems = false;
      }

      console.log('thw group list container with is : ', {
        guy: this.activityGroupList.scrollLeft,
        fullWidth,
        width,
        scrollLeft,
        checkLeft: scrollLeft + width,
      });
    }

    return (
      <div className="activity-slide-show">
        <div className="content">

          <div className="screen">
            <div
              className={`items len-${props.items.length}`}
              // onScrollCapture={this.onItemsScroll}
              ref={(e) => {
                if (e && !this.activityGroupList) {
                  this.activityGroupList = e;
                  this.updateActivityGroupListMeasurement();
                }
              }}
            >
              {
                props.items.map((item, index) => (
                  <ActivitySlideShowItem
                    media={item}
                    onClick={() => {
                      this.showMediaInGallery(index);
                    }}
                    onLoad={(e) => {
                      this.Items.push(e);
                    }}
                  />
                ))
              }
            </div>
            <div className="indicators">
              {
                props.items.map((item, index) => (
                  <span className={`indicator${activeItem === index ? ' active' : ''}`} />
                ))
              }
            </div>
          </div>
          {activeItem > 0 && (
            <div
              className="control left"
              onClick={() => {
                activeItem -= 1;
                this.Items[activeItem].scrollIntoView(false);
                this.setState({
                  activeItem,
                });
              }}
            >
              <span className="icon fa fa-chevron-left" />
            </div>
          )}
          {activeItem < (this.Items.length - 1) && (
            <div
              className=" control right"
              onClick={() => {
                activeItem += 1;
                this.Items[activeItem].scrollIntoView(false);
                this.setState({
                  activeItem,
                });
              }}
            >
              <span className="icon fa fa-chevron-right" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

ActivitySlideShow.propTypes = {
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

ActivitySlideShow.defaultProps = {
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
const mapDispatchToProps = (dispatch) => ({
  setGallery: (items, focusedIndex) => dispatch(setGallery(items, focusedIndex)),

});
export default connect(mapStateToProps, mapDispatchToProps)(ActivitySlideShow);
