import React from 'react';

class ActivitySlideShowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
    };
    this.activityGroupList = null;
    this.item = null;
    this.Item = null;
    this.playMedia = this.playMedia.bind(this);
    this.refItem = this.refItem.bind(this);
  }

  playMedia(event) {
    event.stopPropagation();
    console.log('the item is : ', this.item);
    if (this.item) {
      const { state } = this;
      if (state.paused) {
        this.item.play();
      } else {
        this.item.pause();
      }
      this.setState({ paused: !state.paused });
    } else {
      // alert('item not found');
    }
  }

  refItem(e) {
    if (e && !this.item) {
      this.item = e;
    }
  }

  render() {
    const { props, state } = this;
    const { media } = props;

    const [type] = media.type.split('/');
    return (
      <div
        className="item"
        onClick={props.onClick}
        ref={(e) => {
          if (e && !this.Item) {
            this.Item = e;
            props.onLoad(e);
          }
        }}
      >
        {type === 'video'
          ? (
            <>
              <video
                src={media.url}
                ref={this.refItem}
              />
              <div className="video-controls overlay">
                <span
                  className={`${state.paused ? 'icon-hmv-play' : 'icon-hmv-pause'} icon`}
                  onClick={this.playMedia}
                />
              </div>
            </>
          )
          : (
            <img
              alt=""
              ref={this.refItem}
              src={media.url}
            />
          )}
      </div>
    );
  }
}

ActivitySlideShowItem.defaultProps = {
  onLoad: () => {

  },
};

export default ActivitySlideShowItem;
