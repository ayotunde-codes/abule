/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { Fn } from '@abule-common/components';
import MeetingTile from './Tile';
import MeetingChat from './MeetingChat';
import MeetingMoreActions from './MeetingMoreAction';

const {
  isDescendant, popPrompt,
} = Fn;

const defaultState = {
  localTile: null,
  buttons: {
    participants: false,
    chat: false,
    moreActions: false,
  },
  attendees: [],
  showControls: false,
};

class MeetingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this._isMounted = false;
    this.controls = null;
    this.chat = null;
    this.showControlsTimer = null;
    this.toggleButton = this.toggleButton.bind(this);
    this.formatTiles = this.formatTiles.bind(this);
    this.onShareVideo = this.onShareVideo.bind(this);
    this.onAudioShare = this.onAudioShare.bind(this);
    this.onScreenShare = this.onScreenShare.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.endCall = this.endCall.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.delayHideControls = this.delayHideControls.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setChat = this.setChat.bind(this);
    this.clearShowControlsTimer = this.clearShowControlsTimer.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { settings } = props;
    props.onPageLoad();
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('click', this.onClick);
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.getElementsByTagName('body')[0].style.overflow = '';
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('click', this.onClick, false);
  }

  clearShowControlsTimer() {
    clearTimeout(this.showControlsTimer);
  }

  onClick(e) {
    const { target } = e;
    const { showControls, buttons } = this.state;
    const isChat = isDescendant(target, this.chat);
    if (!isChat && buttons.chat) {
      this.toggleButton('chat', false);
    }
    if (this.controls) {
      const isControls = isDescendant(target, this.controls);
      console.log('the descendant result is ; ', isControls);
      // alert('the descendant result is ; ');
      if (!isControls && !isChat) {
        if (!showControls) {
          this.showControls();
        } else if (!buttons.moreActions) {
          this.clearShowControlsTimer();
          this.setState({ showControls: !showControls });
        }
      }
    }
  }

  onMouseMove(e) {
    const { target } = e;
    const isChat = isDescendant(target, this.chat);
    const { showControls } = this.state;
    if (!isChat && this.controls && !showControls) {
      this.setState({ showControls: true });
      this.delayHideControls();
    }
  }

  showControls() {
    this.clearShowControlsTimer();
    this.setState({ showControls: true });
    this.delayHideControls();
  }

  delayHideControls() {
    this.showControlsTimer = setTimeout(() => {
      const { moreActions } = this.state.buttons;
      if (!moreActions) {
        this.setState({
          showControls: false,
        });
      }
    }, 3000);
  }

  setChat(e) {
    this.chat = e;
  }

  toggleButton(button, value = null) {
    const { buttons } = this.state;
    if (Object.keys(buttons).includes(button)) {
      this.setState({
        buttons: {
          ...buttons,
          [button]: value === null ? !buttons[button] : value,
        },
      });
    }
  }

  formatTiles(tiles) {
    const formatTiles = [];
    const tilesLength = tiles.length;
    let divider = 2;

    if (tilesLength > 1) {
      while (divider <= tilesLength) {
        if ((tilesLength / divider) <= 3 && (tilesLength % divider) <= divider) {
          break;
        }
        divider += 1;
      }
    } else {
      divider = 1;
    }

    tiles.forEach((tile) => {
      if (formatTiles.length > 0) {
        const lastFormatTilesRow = formatTiles[formatTiles.length - 1];
        if (lastFormatTilesRow.length < divider) {
          formatTiles[formatTiles.length - 1].push(tile);
        } else {
          formatTiles.push([tile]);
        }
      } else {
        formatTiles.push([tile]);
      }
    });

    return { colLength: divider, formatTiles };
  }

  async onShareVideo(isActive) {
    const { props } = this;
    if (!isActive) {
      try {
        let camera = props.videoInput.value;
        if (props.videoInput.value === 'None') {
          camera = this.cameraDeviceIds.length ? this.cameraDeviceIds[0] : 'None';
        }

        console.log('the selected camera is : ', camera);
        await props.openVideoInputFromSelection(camera, false);
        props.audioVideo.startLocalVideoTile();
      } catch (err) {
        console.log(err);
      }
    } else {
      props.audioVideo.stopLocalVideoTile();
      // this.hideTile(this.DemoTileOrganizer.MAX_TILES);
    }
  }

  onAudioShare(muted) {
    const { props } = this;
    if (muted) {
      props.audioVideo.realtimeUnmuteLocalAudio();
    } else {
      props.audioVideo.realtimeMuteLocalAudio();
    }
  }

  async onScreenShare(screenShare, currentAttendee) {
    const { props } = this;
    if (screenShare && screenShare.boundExternalUserId !== currentAttendee.boundExternalUserId) {
      return;
    }
    if (!screenShare) {
      await props.audioVideo.startContentShareFromScreenCapture();
    } else {
      await props.audioVideo.stopContentShare();
      props.contentShareDidStop();
    }
  }

  async contentShareStart(videoUrl) {
    switch (this.contentShareType) {
      case this.ContentShareType.ScreenCapture:
        this.state.audioVideo.startContentShareFromScreenCapture();
        break;
      case this.ContentShareType.VideoFile: {
        const videoFile = document.getElementById('content-share-video');
        if (videoUrl) {
          videoFile.src = videoUrl;
        }
        await videoFile.play();
        let mediaStream = null;
        if (this.defaultBrowserBehaviour.hasFirefoxWebRTC()) {
          // @ts-ignore
          mediaStream = videoFile.mozCaptureStream();
        } else {
          // @ts-ignore
          mediaStream = videoFile.captureStream();
        }
        this.state.audioVideo.startContentShare(mediaStream);
        break;
      }
      default: true;
    }
  }

  async contentShareStop() {
    if (this.isButtonOn('button-pause-content-share')) {
      this.toggleButton('button-pause-content-share');
    }
    this.toggleButton('button-content-share');
    this.state.audioVideo.stopContentShare();
    if (this.contentShareType === this.ContentShareType.VideoFile) {
      const videoFile = document.getElementById('content-share-video');
      videoFile.pause();
      videoFile.style.display = 'none';
    }
  }

  getCurrentUser() {
    const { props } = this;
    const { localTile, participants } = props;
    let user = null;
    try {
      user = participants[localTile.boundExternalUserId];
    } catch (e) {
      console.log('get current user error ', { localTile, participants });
      alert('get current user error ');
    }
    return user;
  }

  endCall() {
    console.log('the props here is: ', this.props);
    const user = this.getCurrentUser();
    popPrompt({
      message: (
        <div>
          <p>Are you sure you want to {user.isHost ? 'end' : 'leave'} this meeting?</p>
        </div>
      ),
      confirmButton: {
        label: 'YES',
        onClick: async (clser) => {
          await this.props.endMeeting();
          clser();
        },
      },
      cancelButton: {
        label: 'NO',
      },
    });
  }

  render() {
    const { props, state } = this;
    const { settings } = props;
    const { buttons, showControls } = state;
    const arr = [
    ];
    let screenShare = null;
    console.log('ate least the props is : ', props);
    if (!props.localTile) {
      // return 'owo loading din din din loading';
    }

    let host = props.getHostParticipant();
    console.log('host at first', host);
    let currentAttendee = {};
    if (props.audioVideo) {
      // const allTiles = props.audioVideo.getAllVideoTiles();
      const allTiles = Object.values(props.roster);
      // remove local tile from list
      for (const tileState of allTiles) {
        if (tileState.localTile) {
          currentAttendee = tileState;
        }

        if (tileState.isContent) {
          screenShare = tileState.boundVideoStream.active ? tileState : null;
        } else if (tileState.boundExternalUserId === host.id) {
          host = {
            ...host,
            ...tileState,
          };
        } else {
          arr.push(tileState);
        }
        // alert('going tru tiles and tile is : ', tile);
      }
    } else return '';
    console.log('host at end', host);
    if (host.boundExternalUserId && (props.settings.screen.width > process.env.MOBILE_BREAKPOINT || screenShare)) {
      arr.unshift(host);
    }
    const { colLength, formatTiles: tilesRows } = this.formatTiles(arr);
    console.log('tilesRow is : ', tilesRows);
    console.log('the current attendeee and share screen : ', { host, screenShare, currentAttendee });
    return (
      // <Layout {...props}>
      <div
        id="meetingScreen"
        style={{
          display: props.hide ? 'none' : '',
        }}
      >
        <div
          id="flow-meeting"
          className={`flow${screenShare ? ' sharing-content' : ''}`}
        >
          <div className="head-content" cols={colLength}>
            {tilesRows.map((row) => (
              <div className="tiles">
                {row.map((tileState) => (
                  <MeetingTile {...props} tileState={tileState} />
                ))}
              </div>
            ))}
          </div>

          {screenShare ? (
            <>
              {screenShare.boundExternalUserId === currentAttendee.boundExternalUserId
                ? (
                  <div className="user-presenting">
                    <div className="content">
                      <span className="icon icon-hmv-share-screen" />
                      <p className="text">You are presenting to everyone</p>
                      <button
                        type="button"
                        className="btn btn-3"
                        onClick={() => {
                          this.onScreenShare(screenShare, currentAttendee);
                        }}
                      >STOP SHARING
                      </button>
                    </div>
                  </div>
                )
                : (
                  <div className="middle-content">
                    <MeetingTile
                      {...props}
                      isScreenShare
                      tileState={screenShare}
                    />
                  </div>
                )}
            </>
          ) : (
            <>
              {props.settings.screen.width <= process.env.MOBILE_BREAKPOINT && host.boundExternalUserId
                ? (
                  <MeetingTile {...props} tileState={host} />
                )
                : <div />}
            </>
          )}

          <div
            className={`foot-content${showControls ? ' show' : ''}`}
            ref={(e) => {
              if (e && !this.controls) {
                this.controls = e;
              }
            }}
            onMouseEnter={this.clearShowControlsTimer}
            onMouseLeave={this.delayHideControls}
          >
            <div className="actions">
              <MeetingMoreActions
                {...props}
                toggleButton={this.toggleButton}
                currentAttendee={currentAttendee}
                controller={(
                  <abbr className="action-holder more-options" title="settings">
                    <span
                      className={`action ${buttons.moreActions ? ' active' : ''}`}
                      onClick={() => { this.toggleButton('moreActions', true); }}
                    >
                      <span className="icon icon-hmv-options" />
                    </span>
                  </abbr>
                )}
                onClose={() => {
                  this.setState({
                    buttons: {
                      ...this.state.buttons,
                      moreActions: false,
                    },
                  });
                }}
              />

            </div>
            <div className="actions">
              <abbr className="action-holder" title={currentAttendee.muted ? 'unmute' : 'mute'}>
                <span
                  className={`action${!currentAttendee.muted ? ' active' : ''}`}
                  onClick={() => {
                    this.onAudioShare(currentAttendee.muted);
                  }}
                >
                  <span className="icon icon-hmv-mic" />
                  <span className="slash" />
                </span>
              </abbr>

              <abbr className="action-holder" title={currentAttendee.active ? 'stop video' : 'start video'}>
                <span
                  id="button-camera"
                  className={`action${currentAttendee.active ? ' active' : ''}`}
                  onClick={() => {
                    this.onShareVideo(currentAttendee.active);
                  }}
                >
                  <span className="icon icon-hmv-video-fill" />
                  <span className="slash" />
                </span>
              </abbr>
              <abbr className="action-holder end-call" title="end call">
                <span
                  className="action "
                  onClick={this.endCall}
                >
                  <span className="icon icon-hmv-end-call" />
                </span>
              </abbr>
              <abbr className="action-holder share-screen" title={`${screenShare && screenShare.boundExternalUserId === currentAttendee.boundExternalUserId ? 'stop sharing' : 'share screen'}`}>
                <span
                  className={`action${screenShare ? screenShare.boundExternalUserId === currentAttendee.boundExternalUserId ? ' active' : ' disabled' : ''}`}
                  onClick={() => {
                    this.onScreenShare(screenShare, currentAttendee);
                  }}
                >
                  <span className="icon icon-hmv-share-screen" />
                </span>
              </abbr>
              <abbr className="action-holder chat" title="chat">
                <span
                  className={`action ${buttons.chat ? ' active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.toggleButton('chat');
                  }}
                >
                  <span className="icon icon-hmv-chat-bubble" />
                  {props.chatsNewMessages > 0 && <span className="icon info">•</span>}
                </span>
              </abbr>
            </div>

            {/* <MeetingTile
              {...props}
              isLocalTile
              tileState={props.localTile}
            /> */}
          </div>
        </div>

        {buttons.chat && (
          <MeetingChat
            onLoad={this.setChat}
            participants={props.participants}
            chatsNewMessages={props.chatsNewMessages}
            resetChatsNewMessages={props.resetChatsNewMessages}
            roster={props.roster}
            chats={props.chats}
            audioVideo={props.audioVideo}
            chatsScrollToBottom={props.chatsScrollToBottom}
            meetingSession={props.meetingSession}
            dataMessageHandler={props.dataMessageHandler}
            resetChatsScrollToBottom={props.resetChatsScrollToBottom}
            hideChats={() => { this.toggleButton('chat'); }}
          />
        )}
      </div>
      // </Layout>
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
export default connect(mapStateToProps, mapDispatchToProps)(MeetingScreen);
