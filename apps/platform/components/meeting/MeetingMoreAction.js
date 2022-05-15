/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  Dropdown
} from '@abule-common/components';
// import { range } from "moment-range";

class MeetingMoreActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentType: 'actions',
      settingsAudioOutputDevices: [],
      settingsAudioInputDevices: [],
      settingsVideoInputDevices: [],
    };

    this.preview = null;
    this.inputDate = null;
    this.dropdown = null;
    this.settingsAudioInput = null;
    this.settingsAudioOutput = null;
    this.settingsVideoInput = null;
    this.setContentType = this.setContentType.bind(this);
  }

  setContentType(type) {
    this.setState({
      contentType: type,
    });
  }

  render() {
    const { state, props } = this;
    let contentId = 'more-action';
    let content = (
      <div id="ongoingMeetingMoreActions" className="">
        <div className="content">
          <div className="action-holder">
            <div
              className="action item"
              onClick={() => {
                this.setContentType('participants');
              }}
            >
              <span className="icon icon-hmv-users" />
              <span>participants</span>
            </div>
          </div>
          <div className="action-holder">
            <div
              className="action item"
              onClick={() => {
                this.setContentType('settings');
              }}
            >
              <span className="icon icon-hmv-settings" />
              <span>settings</span>
            </div>
          </div>
        </div>
      </div>
    );

    if (state.contentType === 'participants') {
      contentId = 'participants';
      const currentUser = props.getCurrentParticipant();
      console.log('the current is ', currentUser);
      const { participants, roster } = props;
      const attendeeIds = Object.keys(roster);
      const otherAttendeeIds = [];
      attendeeIds.forEach((attendeeId) => {
        const attendee = roster[attendeeId];
        console.log('the attendeeeee in test is: ', attendee);
        if (attendee.boundExternalUserId !== currentUser.id) {
          otherAttendeeIds.push(attendeeId);
        }
      });
      content = (
        <div id="ongoingMeetingParticipants" className="">
          <div className="head">
            <p>Participants</p>
          </div>
          <div className="content">
            {attendeeIds.map((attendeeId) => {
              const attendee = roster[attendeeId];
              const participant = participants[attendee.boundExternalUserId];
              console.log('A participant is : ', {
                attendee, attendeeIds, attendeeId, participant, participants,
              });
              if (!participant || attendee.isContent) return '';
              const { isHost } = participant;
              const isCurrentUser = currentUser.id === participant.id;
              const showBrace = isHost || isCurrentUser;
              return (
                <div className="participant item">
                  <span>
                    {participant.firstName} {participant.lastName}
                    {showBrace ? ' (' : ''}
                    {isCurrentUser ? 'You' : ''}
                    {isCurrentUser && isHost ? ', ' : ''}
                    {isHost ? 'Host' : ''}
                    {showBrace ? ')' : ''}
                  </span>
                  <span className="actions">
                    <abbr title={currentUser.isHost ? 'mute participant' : ''}>
                      <span
                        className={`action icon-hmv-mic${attendee.muted ? ' in-active' : ''}`}
                        onClick={() => {
                          props.hostMuteParticipant([attendeeId]);
                        }}
                      />
                    </abbr>
                    <abbr title={currentUser.isHost ? 'stop participant video' : ''}>
                      <span
                        className={`action icon-hmv-video-fill${!(attendee.boundVideoStream && attendee.boundVideoStream.active) ? ' in-active' : ''}`}
                        onClick={() => {
                          props.hostStopParticipantVideo([attendeeId]);
                        }}
                      />
                    </abbr>
                  </span>
                </div>
              );
            })}
          </div>
          {currentUser.isHost
            && (
              <div className="bottom">
                <button
                  type="button"
                  className="btn btn-glass mute-all"
                  onClick={() => {
                    props.hostMuteParticipant(otherAttendeeIds);
                  }}
                >Mute All
                </button>
              </div>
            )}
        </div>
      );
    }

    if (state.contentType === 'settings') {
      contentId = 'settings';
      content = (
        <div id="ongoingMeetingSettings">
          <div className="head">
            <p>Settings</p>
          </div>
          <div className="content">
            <div className="setting-row">
              <div className="label">
                <p>Microphone</p>
              </div>
              <div className="field">
                <select
                  value={props.audioInputDevice}
                  id="audio-output"
                  ref={async (e) => {
                    if (e && !this.settingsAudioInput && props.audioVideo) {
                      this.settingsAudioInput = e;
                      const settingsAudioInputDevices = await this.props.audioVideo.listAudioInputDevices() || [];
                      console.log('settingsAudioInputDevices : ', settingsAudioInputDevices);
                      this.setState({ settingsAudioInputDevices });
                    }
                  }}
                  className="custom-select hmv-element btn btn-glass bordered"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    props.openAudioInputFromSelection(e.target.value);
                  }}
                >
                  {state.settingsAudioInputDevices.map((device) => (
                    <option value={device.deviceId}>{device.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="setting-row">
              <div className="label">
                <p>Camera</p>
              </div>
              <div className="field">
                <select
                  id="audio-output"
                  value={props.videoInputDevice}
                  ref={async (e) => {
                    if (e && !this.settingsVideoInput && props.audioVideo) {
                      this.settingsVideoInput = e;
                      const settingsVideoInputDevices = await this.props.audioVideo.listVideoInputDevices();
                      console.log('settingsVideoInputDevices : ', settingsVideoInputDevices);
                      this.setState({ settingsVideoInputDevices: [...settingsVideoInputDevices] });
                    }
                  }}
                  className="custom-select hmv-element btn btn-glass bordered"
                  style={{ width: '100%' }}
                  onChange={async (e) => {
                    const { value } = e.target;
                    // this.log('audio output device is changed');
                    try {
                      await props.openVideoInputFromSelection(value, false);
                    } catch (err) {
                      console.log('no video input device selected');
                    }
                  }}
                >
                  {state.settingsVideoInputDevices.map((device) => (
                    <option value={device.deviceId}>{device.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="setting-row">
              <div className="label">
                {/* <p>Camera</p> */}
              </div>
              <div className="field">
                <select
                  id="video-input-quality"
                  value={props.videoQuality}
                  ref={(e) => {
                    if (!this.videoInputQuality) {
                      this.videoInputQuality = e;
                    }
                  }}
                  className="custom-select hmv-element btn btn-glass bordered"
                  style={{ width: '100%' }}
                  onChange={async (e) => {
                    const el = e.target;
                    const { value } = el;
                    // this.log('Video input quality is changed');
                    // eslint-disable-next-line default-case
                    switch (value) {
                      case '360p':
                        props.audioVideo.chooseVideoInputQuality(640, 360, 15, 600);
                        break;
                      case '540p':
                        props.audioVideo.chooseVideoInputQuality(960, 540, 15, 1400);
                        break;
                      case '720p':
                        props.audioVideo.chooseVideoInputQuality(1280, 720, 15, 1400);
                        break;
                    }
                    try {
                      await props.openVideoInputFromSelection(props.videoInputDevice, false);
                      props.setVideoQuality(value);
                    } catch (err) {
                      console.log('no video input device selected', err);
                    }
                  }}
                >
                  <option value="360p">360p (nHD) @ 15 fps (600 Kbps max)</option>
                  <option value="540p" selected>540p (qHD) @ 15 fps (1.4 Mbps max)</option>
                  <option value="720p">720p (HD) @ 15 fps (1.4 Mbps max)</option>
                </select>
              </div>
            </div>

            <div className="setting-row">
              <div className="label">
                <p>Speaker</p>
              </div>
              <div className="field">
                <select
                  id="audio-output"
                  value={props.audioOuputDevice}
                  ref={async (e) => {
                    if (e && !this.settingsAudioOutput && props.audioVideo) {
                      this.settingsAudioOutput = e;
                      const settingsAudioOutputDevices = await this.props.audioVideo.listAudioOutputDevices() || [];
                      console.log('settingsAudioOutputDevices : ', settingsAudioOutputDevices);
                      this.setState({ settingsAudioOutputDevices });
                    }
                  }}
                  className="custom-select hmv-element btn btn-glass bordered"
                  style={{ width: '100%' }}
                  onChange={async (e) => {
                    // this.log('audio output device is changed');
                    await props.openAudioOutputFromSelection(e.target.value);
                  }}
                >
                  {state.settingsAudioOutputDevices.map((device) => (
                    <option value={device.deviceId}>{device.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

      );
    }

    return (
      <div
        tabIndex={0}
        className="input-date"
        ref={(e) => {
          if (e && !this.inputDate) {
            this.inputDate = e;
          }
          props.onLoad(this);
        }}
      >

        <Dropdown
          readOnly={props.readOnly}
          ref={(e) => {
            this.dropdown = e;
          }}
          defaultPosition={{ y: 'top' }}
          controller={props.controller}
          content={content}
          contentId={contentId}
          onClose={() => {
            this.setState({
              contentType: 'actions',
            });
            props.onClose();
          }}
        />
      </div>
    );
  }
}

MeetingMoreActions.defaultProps = {
  values: [],
  participants: {},
  autoClose: false,
  showControls: true,
  onSave: () => { },
  onClose: () => { },
  onLoad: () => { },
  multichoice: false,
  readOnly: false,
  controller: 'controller',
};

export default MeetingMoreActions;
