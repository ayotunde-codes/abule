import React from 'react';

class MeetingTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false,
    };

    this.tileBoundToVideo = false;
    this.tile = null;
    this.tileVideo = null;
    this.bindVideoElement = this.bindVideoElement.bind(this);
  }

  componentDidMount() {
    this.bindVideoElement();
  }

  componentDidUpdate() {
    this.bindVideoElement();
  }

  bindVideoElement() {
    const { props } = this;

    const { tileState, audioVideo } = props;
    if (tileState && tileState.tileId && tileState.boundVideoStream &&/*  !this.tileBoundToVideo && */ this.tileVideo) {
      this.tileBoundToVideo = true;
      console.log(' we binding our guy', {
        audioVideo,
        tileState,
        tileVideo: this.tileVideo,
        tileBoundToVideo: this.tileBoundToVideo,
      });
      // this.log(`binding video tile ${tileState.tileId} to ${videoElement.id}`);
      audioVideo.bindVideoElement(tileState.tileId, this.tileVideo);
    } else {
      console.log(' we binding our guy', {
        audioVideo,
        tileState,
        tileVideo: this.tileVideo,
        tileBoundToVideo: this.tileBoundToVideo,
      });
    }
  }

  onPause() {
    const { props } = this;
    const { tileState, audioVideo } = props;
    if (!tileState.paused) {
      audioVideo.pauseVideoTile(tileState.tileId);
      // pauseButtonElement.innerText = 'Resume';
    } else {
      audioVideo.unpauseVideoTile(tileState.tileId);
      // pauseButtonElement.innerText = 'Pause';
    }
  }

  render() {
    const { props } = this;
    const {
      tileState, audioVideo, isLocalTile, isScreenShare, participants,
    } = props;
    /*  if (!tileState && isLocalTile) {
      return (
        <div className="host tile">
          <img src="" alt="" />
        </div>
      );
    } */
    // const attendeeName = tileState.boundExternalUserId.split('#')[1];
    // const attendeeId = tileState.boundAttendeeId;
    const user = participants[tileState.boundExternalUserId];
    return (
      <div
        className={`${isLocalTile ? 'host ' : ''}${isScreenShare ? 'screen-share ' : ''}${isScreenShare ? 'screen-share ' : ''}tile`}
        ref={(e) => {
          this.tile = e;
        }}
      >
        {!isScreenShare && (
          <div className="overlay">
            <div className={`avatar ${user && user.imageThumbUrl ? 'is-user' : ''}`}>
              <img src={user && user.imageThumbUrl ? user.imageThumbUrl : '/img/user.svg'} alt="" />
            </div>
          </div>
        )}
        <video
          src=""
          ref={(e) => {
            this.tileVideo = e;
          }}
        />
        {!isScreenShare && user && (
          <div className="info">
            <span className="name">{user.firstName} {user.lastName}</span>
            <span
              className={`icon icon-hmv-mic${tileState.muted ? ' in-active' : ''}`}
              onClick={() => {
                props.hostMuteParticipant([tileState.boundAttendeeId]);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
export default MeetingTile;
