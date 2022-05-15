import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import $ from 'jquery';
import { Fn } from '@abule-common/components';
import { ActivityTypes, AgeGroups } from '../datastore';

const {
  ucFirst,
} = Fn;

class ActivityPreview extends React.Component {
  constructor(props) {
    super(props);

    this.height = 'auto';
    this.activityPreview = null;
    this.thumb = null;
    this.getThumb = this.getThumb.bind(this);
    this.onResize = this.onResize.bind(this);
    console.log('ACTIVITY PREVIEW PROPS IS : ', props);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }

  onResize() {
    const { props } = this;
    if (props.updateHeight && this.thumb && this.activityPreview) {
      /*  console.log('thte afci prev', {
        height: $(this.thumb).outerHeight(),
        top: $(this.activityPreview).css('padding-top').split('px')[0],
      }); */
      const previewPaddingTop = parseInt($(this.activityPreview).css('padding-top').split('px')[0], 10);
      // add the padding top to it to
      props.updateHeight($(this.thumb).outerHeight(), previewPaddingTop);
    }
  }

  getThumb() {
    const { props } = this;
    const { activity } = props;

    const { mediaUrls } = activity;

    let thumb = false;
    for (const media of mediaUrls) {
      const { type } = media;
      if (type === 'image') {
        thumb = `${media.url}`;
        break;
      }
    }
    return thumb || '/img/activity.jpg';
  }

  render() {
    const { props } = this;
    const { state } = this;

    const { activity } = props;
    if (!activity) {
      return '';
    }

    const {
      name, type, mediaUrls, ageGroups,
    } = activity;

    const AgeGroupsValues = [];
    AgeGroups.data.forEach((group) => {
      if (ageGroups.includes(group.id)) {
        AgeGroupsValues.push(group.start);
        AgeGroupsValues.push(group.end);
      }
    });
    return (
      <div
        className="activity-preview"
        ref={(e) => {
          if (this.activityPreview === null) {
            this.activityPreview = e;
            this.onResize();
          }
        }}
      >
        <div className="activity-preview-content">
          <div>
            <Link href={`${props.AppUrl}/activities/[id]`} as={`${props.AppUrl}/activities/${activity.id}`}>
              <a className="activity-preview-content-thumb">
                <img
                  alt=""
                  ref={(e) => {
                    if (this.thumb === null) {
                      this.thumb = e;
                      this.onResize();
                    }
                  }}
                  src={this.getThumb()}
                  className="activity-preview-content-thumb-img"
                />
              </a>
            </Link>
            <p className="activity-preview-content-label"> {ucFirst(name)}</p>
          </div>
          <div className="activity-preview-content-info">
            <p className="activity-preview-content-type"> {ActivityTypes.find(type).title}</p>
            <div className="activity-preview-content-range">
              Ages {AgeGroupsValues[0]} - {AgeGroupsValues[AgeGroupsValues.length - 1]}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ActivityPreview.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  values: PropTypes.array,
  options: PropTypes.array,
  mandatory: PropTypes.bool,
  isEditable: PropTypes.bool,
  multichoice: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

ActivityPreview.defaultProps = {
  className: '',
  values: [],
  options: [{}],
  mandatory: false,
  isEditable: true,
  multichoice: true,
  style: {},
  onChange: () => { },
};

export default ActivityPreview;
