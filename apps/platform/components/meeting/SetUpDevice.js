import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { AsyncScheduler } from 'amazon-chime-sdk-js';
import { Fn } from '@abule-common/components';
import { sessionUserDeleteKid, sessionUserUpdateKid } from '../../redux/settings/action';
import { Categories, Utils } from '../../datastore';

const {
  addToTime, getGenderIcon, milSecToYears,
} = Fn;

class SetUpMeetingDevice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      willDelete: false,
    };
    this._isMounted = false;
    this.pageLoaded = false;
    this.audioInput = null;
    this.videoInput = null;
    this.videoInputQuality = null;
    this.audioOutput = null;
    this.loadPage = this.loadPage.bind(this);
  }

  componentDidMount() {
    const { props } = this;
    this._isMounted = true;
    const { settings } = props;
  }

  loadPage() {
    const { props } = this;
    if (this.audioInput && this.videoInput && this.videoInputQuality && this.audioOutput && !this.pageLoaded) {
      this.pageLoaded = true;
      props.LoadPage();
    } else {
      console.log({
        'this.pageLoaded': this.pageLoaded,
        'this.audioInput': this.audioInput,
        'this.videoInput': this.videoInput,
        'this.videoInputQuality': this.videoInputQuality,
        'this.audioOutput': this.audioOutput,
      });
    }
  }

  componentDidUpdate() {
    const { props } = this;
    const { settings } = props;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getKidIcon(gender) {
    return getGenderIcon(gender);
  }

  render() {
    const { state, props } = this;
    const { kid } = this.props;
    const meetingSetUpVideoPreview = (
      <video
        id="video-preview"
        className="w-100 h-100"
        ref={(e) => {
          if (!this.videoPreview) {
            this.videoPreview = e;
            props.setVideoPreview(e);
            this.loadPage();
          }
        }}
      />
    );
    return (
      <div
        id="flow-devices"
        className="flow"
        style={{
          display: props.hide ? 'none' : '',
        }}
      >
        <h1 className="page-container header-label">Select devices</h1>
        <div className="container">
          <form id="form-devices">
            <div className="row mt-3">
              <div className="col-12 col-sm-8">
                <label htmlFor="video-input block">Camera</label>
                <select
                  id="video-input"
                  ref={(e) => {
                    if (!this.videoInput) {
                      this.videoInput = e;
                      props.setVideoInput(e);
                      this.loadPage();
                    }
                  }}
                  className="custom-select hmv-element btn btn-glass bordered"
                  style={{ width: '100%' }}
                  onChange={async (e) => {
                    const el = e.target;
                    // this.log('video input device is changed');
                    try {
                      await props.openVideoInputFromSelection(el.value, true);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-sm-8">
                <select
                  id="video-input-quality"
                  value={props.videoQuality}
                  ref={(e) => {
                    if (!this.videoInputQuality) {
                      this.videoInputQuality = e;
                      props.setVideoInputQuality(e);
                      this.loadPage();
                    }
                  }}
                  className="custom-select hmv-element btn btn-glass bordered"
                  style={{ width: '100%' }}
                  onChange={async (e) => {
                    const el = e.target;
                    const { value } = el;
                    // this.log('Video input quality is changed');
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
                      await props.openVideoInputFromSelection(this.videoInput.value, true);
                      props.setVideoQuality(value);
                    } catch (err) {
                      console.log('no video input device selected', err);
                      // alert('got there');
                    }
                  }}
                >
                  <option value="360p">360p (nHD) @ 15 fps (600 Kbps max)</option>
                  <option value="540p" selected>540p (qHD) @ 15 fps (1.4 Mbps max)</option>
                  <option value="720p">720p (HD) @ 15 fps (1.4 Mbps max)</option>
                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-sm-8">
                <label htmlFor="audio-input block">Microphone</label>
                <select
                  id="audio-input"
                  ref={(e) => {
                    if (!this.audioInput) {
                      this.audioInput = e;
                      props.setAudioInput(e);
                      this.loadPage();
                    }
                  }}
                  className="custom-select hmv-element btn btn-glass bordered"
                  style={{ width: '100%' }}
                  onChange={async () => {
                    // this.log('audio input device is changed');
                    await props.openAudioInputFromSelectionAndPreview();
                  }}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 col-sm-8">
                <label htmlFor="audio-output block">Speaker</label>
                <select
                  id="audio-output"
                  ref={(e) => {
                    this.loadPage();
                    if (!this.audioOutput) {
                      this.audioOutput = e;
                      props.setAudioOutput(e);
                      this.loadPage();
                    }
                  }}
                  className="custom-select hmv-element btn btn-glass bordered"
                  style={{ width: '100%' }}
                  onChange={async (_ev) => {
                    // this.log('audio output device is changed');
                    await props.openAudioOutputFromSelection();
                  }}
                />
              </div>
              <div className="col-sm-4">
                <button
                  type="button"
                  id="button-test-sound"
                  className="btn btn-glass"
                  onClick={async (e) => {
                    e.preventDefault();
                    await props.testSound();
                  }}
                >
                  <span className="icon icon-volume-high" /> Test
                </button>
              </div>
            </div>

          </form>

          <div className="video-preview">
            {meetingSetUpVideoPreview}
          </div>
        </div>
        <button
          id="joinButton"
          type="submit"
          className="btn btn-1"
          ref={(e) => {
            this.startMeetingButton = e;
          }}
          onClick={(e) => {
            e.preventDefault();
            props.joinMeeting();
          }}
        >JOIN
        </button>
      </div>
    );
  }
}

SetUpMeetingDevice.propTypes = {
  onSignInSuccess: PropTypes.func,
  onSignInFail: PropTypes.func,
  onLoad: PropTypes.func,
  showActions: PropTypes.bool,
};

SetUpMeetingDevice.defaultProps = {
  onSignInSuccess: () => { },
  onSignInFail: () => { },
  onLoad: () => { },
  showActions: true,
};

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetUpMeetingDevice);
