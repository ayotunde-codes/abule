/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import {
  AsyncScheduler,
  AudioInputDevice,
  AudioProfile,
  AudioVideoFacade,
  AudioVideoObserver,
  ClientMetricReport,
  ClientVideoStreamReceivingReport,
  ConsoleLogger,
  ContentShareObserver,
  DataMessage,
  DefaultActiveSpeakerPolicy,
  DefaultAudioMixController,
  DefaultDeviceController,
  DefaultMeetingSession,
  DefaultModality,
  DefaultBrowserBehavior,
  Device,
  DeviceChangeObserver,
  EventName,
  EventAttributes,
  LogLevel,
  Logger,
  MultiLogger,
  MeetingSession,
  MeetingSessionConfiguration,
  MeetingSessionPOSTLogger,
  MeetingSessionStatus,
  MeetingSessionStatusCode,
  MeetingSessionVideoAvailability,
  RemovableAnalyserNode,
  SimulcastLayers,
  TimeoutScheduler,
  Versioning,
  VideoInputDevice,
  VideoSource,
  VideoTileState,
  VoiceFocusDeviceTransformer,
  VoiceFocusPaths,
  VoiceFocusTransformDevice,
  isAudioTransformDevice,
} from 'amazon-chime-sdk-js';
// import '../styleV2.scss';
import Router from 'next/router';
import { Fn } from '@abule-common/components';
// import WebRTCStatsCollector from './webrtcstatscollector_uguyguy/WebRTCStatsCollector.ts';
import SetUpDevice from './SetUpDevice';
import MeetingScreen from './MeetingScreen';

const {
  milSecToMinutes, milSecToSeconds, popAlert,
} = Fn;

// Support a set of query parameters to allow for testing pre-release versions of
// Amazon Voice Focus. If none of these parameters are supplied, the SDK default
// values will be used.
// let search = '';
// let VOICE_FOCUS_CDN = '';
// let VOICE_FOCUS_ASSET_GROUP = '';
// let VOICE_FOCUS_REVISION_ID = '';
let search = null;
let VOICE_FOCUS_CDN = null;
let VOICE_FOCUS_ASSET_GROUP = null;
let VOICE_FOCUS_REVISION_ID = null;

let VOICE_FOCUS_PATHS = null;

let VOICE_FOCUS_SPEC = null;

class Meeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      flow: '',
      meetingId: '',
      roster: {},
      chats: [],
      chatsNewMessages: 0,
      endsAt: null,
      participants: {},
      chatsScrollToBottom: true,
      audioInputDevice: 'default',
      videoInputDevice: 'default',
      audioOuputDevice: 'default',
      videoQuality: 'default',
      audioVideo: null,
      screenShare: null,
      localTile: null,
      showEndMeetingCountDown: false,
      showedReminder: false,
      loading: false,
      reRender: false,
    };
    /// ///////////////////////////////////////////////////////////
    this.startMeetingButton = null;
    this.videoPreview = null;

    /// /////////////////////////////////////////////////////////////////////////////
    search = new URLSearchParams(document.location.search);
    VOICE_FOCUS_CDN = search.get('voiceFocusCDN') || undefined;
    VOICE_FOCUS_ASSET_GROUP = search.get('voiceFocusAssetGroup') || undefined;
    VOICE_FOCUS_REVISION_ID = search.get('voiceFocusRevisionID') || undefined;

    VOICE_FOCUS_PATHS = VOICE_FOCUS_CDN && {
      processors: `${VOICE_FOCUS_CDN}processors/`,
      wasm: `${VOICE_FOCUS_CDN}wasm/`,
      workers: `${VOICE_FOCUS_CDN}workers/`,
      models: `${VOICE_FOCUS_CDN}wasm/`,
    };

    VOICE_FOCUS_SPEC = {
      assetGroup: VOICE_FOCUS_ASSET_GROUP,
      revisionID: VOICE_FOCUS_REVISION_ID,
      paths: VOICE_FOCUS_PATHS,
    };
    this.DemoTileOrganizer = {
      MAX_TILES: 17,
      tiles: {},
      tileStates: {},
      remoteTileCount: 0,

      acquireTileIndex: (tileId) => {
        console.log('aquiring but all tiles are : ', this.DemoTileOrganizer.tiles, this.DemoTileOrganizer.tileStates);
        // alert('aquiring tile index');
        for (let index = 0; index <= this.DemoTileOrganizer.MAX_TILES; index++) {
          if (this.DemoTileOrganizer[index] === tileId) {
            return index;
          }
        }
        for (let index = 0; index <= this.DemoTileOrganizer.MAX_TILES; index++) {
          if (!(index in this.DemoTileOrganizer)) {
            this.DemoTileOrganizer[index] = tileId;
            this.DemoTileOrganizer.remoteTileCount++;
            return index;
          }
        }
        throw new Error('no tiles are available');
      },

      releaseTileIndex: (tileId) => {
        for (let index = 0; index <= this.DemoTileOrganizer.MAX_TILES; index++) {
          if (this.DemoTileOrganizer[index] === tileId) {
            this.remoteTileCount--;
            delete this.DemoTileOrganizer[index];
            return index;
          }
        }
        return this.DemoTileOrganizer.MAX_TILES;
      },
    };
    this.ContentShareType = {
      ScreenCapture: 1,
      VideoFile: 1,
    };

    this.DID = '+17035550122';
    this.BASE_URL = [location.protocol, '//', location.host, location.pathname.replace(/\/*$/, '/').replace('/v2', '')].join('');
    this.testVideo = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.vp9.webm';
    this.LOGGER_BATCH_SIZE = 85;
    this.LOGGER_INTERVAL_MS = 2000;
    this.MAX_MEETING_HISTORY_MS = 5 * 60 * 1000;
    this.hostCommandTimeout = 300000;
    this.DATA_MESSAGE_TOPIC = 'chat';
    this.HOST_CMD = 'host-command';
    this.DATA_MESSAGE_LIFETIME_MS = 300000;

    this.showActiveSpeakerScores = false;
    this.activeSpeakerLayout = true;
    this.meeting = null;
    this.name = null;
    this.voiceConnectorId = null;
    this.sipURI = null;
    this.region = null;
    this.meetingSession = null;
    this.audioVideo = null;
    this.audioInput = null;
    this.videoInput = null;
    this.videoInputQuality = null;
    this.audioOutput = null;
    this.tileOrganizer = this.DemoTileOrganizer;
    this.canStartLocalVideo = true;
    this.defaultBrowserBehaviour = new DefaultBrowserBehavior();

    // eslint-disable-next-line
    this.tileIndexToTileId = {};
    this.tileIdToTileIndex = {};
    this.tileArea = document.getElementById('tile-area');

    this.cameraDeviceIds = [];
    this.microphoneDeviceIds = [];
    // this.currentAudioInputDevice: AudioInputDevice | undefined;
    this.currentAudioInputDevice = null;

    this.buttonStates = {
      'button-microphone': true,
      'button-camera': false,
      'button-speaker': true,
      'button-content-share': false,
      'button-pause-content-share': false,
      'button-video-stats': false,
    };

    this.contentShareType = this.ContentShareType.ScreenCapture;

    // feature flags
    this.enableWebAudio = false;
    this.enableUnifiedPlanForChromiumBasedBrowsers = true;
    this.enableSimulcast = false;

    this.supportsVoiceFocus = false;
    this.enableVoiceFocus = false;
    this.voiceFocusIsActive = false;

    this.markdown = require('markdown-it')({ linkify: true });
    this.lastMessageSender = null;
    this.lastReceivedMessageTimestamp = 0;
    this.meetingEventPOSTLogger = null;
    // meetingEventPOSTLogger: MeetingSessionPOSTLogger;

    this.hasChromiumWebRTC = this.defaultBrowserBehaviour.hasChromiumWebRTC();

    // this.statsCollector = new WebRTCStatsCollector();
    this.statsCollector = null;
    // voiceFocusTransformer: VoiceFocusDeviceTransformer | undefined;
    this.voiceFocusTransformer = null;
    // voiceFocusDevice: VoiceFocusTransformDevice | undefined;
    this.voiceFocusDevice = null;

    // This is an extremely minimal reactive programming approach: these elements
    // will be updated when the Amazon Voice Focus display state changes.
    this.voiceFocusDisplayables = [];
    // analyserNode: RemovableAnalyserNode;
    this.analyserNode = null;
    this.analyserNodeCallback = () => { };

    this.selectedVideoInput = null;
    this.defaultBrowserBehaviour = new DefaultBrowserBehavior();

    this.SimulcastLayerMapping = {
      [SimulcastLayers.Low]: 'Low',
      [SimulcastLayers.LowAndMedium]: 'Low and Medium',
      [SimulcastLayers.LowAndHigh]: 'Low and High',
      [SimulcastLayers.Medium]: 'Medium',
      [SimulcastLayers.MediumAndHigh]: 'Medium and High',
      [SimulcastLayers.High]: 'High',
    };

    this.endCallTimer = null;
    this.endCallCountDownTimer = null;
    this.LoadPage = this.LoadPage.bind(this);
    this.setAudioInput = this.setAudioInput.bind(this);
    this.setVideoInput = this.setVideoInput.bind(this);
    this.setVideoPreview = this.setVideoPreview.bind(this);
    this.stopAudioPreview = this.stopAudioPreview.bind(this);
    this.joinMeetingFromSetUp = this.joinMeetingFromSetUp.bind(this);
    this.setAudioOutput = this.setAudioOutput.bind(this);
    this.setVideoInputQuality = this.setVideoInputQuality.bind(this);
    this.openAudioInputFromSelectionAndPreview = this.openAudioInputFromSelectionAndPreview.bind(this);
    this.openVideoInputFromSelection = this.openVideoInputFromSelection.bind(this);
    this.openAudioOutputFromSelection = this.openAudioOutputFromSelection.bind(this);
    this.videoTileDidUpdate = this.videoTileDidUpdate.bind(this);
    this.videoTileWasRemoved = this.videoTileWasRemoved.bind(this);
    this.dataMessageHandler = this.dataMessageHandler.bind(this);
    this.openAudioInputFromSelection = this.openAudioInputFromSelection.bind(this);
    this.resetChatsScrollToBottom = this.resetChatsScrollToBottom.bind(this);
    this.setVideoQuality = this.setVideoQuality.bind(this);
    this.resetChatsNewMessages = this.resetChatsNewMessages.bind(this);
    this.hostCommandHandler = this.hostCommandHandler.bind(this);
    this.getHostParticipant = this.getHostParticipant.bind(this);
    this.contentShareDidStop = this.contentShareDidStop.bind(this);
    this.hostMuteParticipant = this.hostMuteParticipant.bind(this);
    this.hostStopParticipantVideo = this.hostStopParticipantVideo.bind(this);
    this.executeHostCommand = this.executeHostCommand.bind(this);
    this.getCurrentParticipant = this.getCurrentParticipant.bind(this);
    this.endMeeting = this.endMeeting.bind(this);
  }

  async LoadPage() {
    // alert('in loade page');
    // global.app = this;
    // document.getElementById('sdk-version').innerText = `amazon-chime-sdk-js@${Versioning.sdkVersion}`;
    this.initEventListeners();
    this.initParameters();
    this.setMediaRegion();
    this.setUpVideoTileElementResizer();

    let chimeMeetingId = '';
    try {
      chimeMeetingId = await this.authenticate();
    } catch (error) {
      console.error(error);
      const httpErrorMessage = 'UserMedia is not allowed in HTTP sites. Either use HTTPS or enable media capture on insecure sites.';
      (document.getElementById(
        'failed-meeting',
      )).innerText = `Meeting ID: ${this.meeting}`;
      (document.getElementById('failed-meeting-error')).innerText = window.location.protocol === 'http:' ? httpErrorMessage : error.message;
      this.switchToFlow('flow-failed-meeting');
      return;
    }

    // (document.getElementById('info-meeting')).innerText = this.meeting;
    // (document.getElementById('info-name')).innerText = this.name;

    await this.initVoiceFocus();

    this.switchToFlow('flow-devices');
    await this.openAudioInputFromSelectionAndPreview();
    try {
      const videoInputDevice = document.getElementById('video-input').value;
      await this.openVideoInputFromSelection(videoInputDevice, true);
      this.setState({
        videoInputDevice,
      });
    } catch (err) {
      this.log('no video input device selected');
    }
    await this.openAudioOutputFromSelection();
  }

  componentWillUnmount() {
    this.setState({
      showedReminder: true,
    });
    clearInterval(this.endCallTimer);
    this.setState({
      showEndMeetingCountDown: 0,
    });
    clearInterval(this.endCallCountDownTimer);
  }

  setAudioInput(e) {
    this.audioInput = e;
  }

  setVideoInput(e) {
    this.videoInput = e;
  }

  setVideoPreview(e) {
    this.videoPreview = e;
  }

  setVideoInputQuality(e) {
    this.videoInputQuality = e;
  }

  setAudioOutput(e) {
    this.audioOutput = e;
  }

  showProgress(id) {
    (document.getElementById(id)).style.visibility = 'visible';
  }

  async TestSound(
    logger = Logger,
    sinkId = null,
    frequency = 440,
    durationSec = 1,
    rampSec = 0.1,
    maxGainValue = 0.1,
  ) {
    // @ts-ignore
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0;
    const oscillatorNode = audioContext.createOscillator();
    oscillatorNode.frequency.value = frequency;
    oscillatorNode.connect(gainNode);
    const destinationStream = audioContext.createMediaStreamDestination();
    gainNode.connect(destinationStream);
    const { currentTime } = audioContext;
    const startTime = currentTime + 0.1;
    gainNode.gain.linearRampToValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(maxGainValue, startTime + rampSec);
    gainNode.gain.linearRampToValueAtTime(maxGainValue, startTime + rampSec + durationSec);
    gainNode.gain.linearRampToValueAtTime(0, startTime + rampSec * 2 + durationSec);
    oscillatorNode.start();
    const audioMixController = new DefaultAudioMixController(logger);
    try {
      // @ts-ignore
      await audioMixController.bindAudioDevice({ deviceId: sinkId });
    } catch (e) {
      logger.error(`Failed to bind audio device: ${e}`);
    }
    try {
      await audioMixController.bindAudioElement(new Audio());
    } catch (e) {
      logger.error(`Failed to bind audio element: ${e}`);
    }
    await audioMixController.bindAudioStream(destinationStream.stream);
    new TimeoutScheduler((rampSec * 2 + durationSec + 1) * 1000).start(() => {
      audioContext.close();
    });
  }

  initEventListeners() {

  }

  async onVoiceFocusSettingChanged() {
    this.log('[DEMO] Amazon Voice Focus setting toggled to', this.enableVoiceFocus);
    this.openAudioInputFromSelectionAndPreview();
  }

  async authenticate() {
    const { props } = this;

    try {
      const { meeting: joinInfo, participants, endsAt } = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/meeting/${Router.query.id}`,
        method: 'POST',
      });

      const participantsObj = {};
      participants.forEach((participant) => {
        participantsObj[participant.id] = participant;
      });
      this.setState({
        participants: participantsObj,
        endsAt,
      });
      const configuration = new MeetingSessionConfiguration(joinInfo.meeting, joinInfo.attendee);
      console.log('the weird configuration is ; ', configuration);
      await this.initializeMeetingSession(configuration);
      // const url = new URL(window.location.href);
      // url.searchParams.set('m', this.meeting);
      // history.replaceState({}, `${this.meeting}`, url.toString());
      this.setState({
        meetingId: configuration.meetingId,
      });
      return configuration.meetingId;
    } catch (e) {
      console.log('sure got error', e);
      if (e.status) {
        if (e.status === 404) {
          if (e.data.message === "Can't join this meeting") {
            Router.push(`${props.AppUrl}/`);
            popAlert({
              title: "You can't join this meeting",
              description: 'Please register for the meeting',
              error: true,
            });
          }
        } else if (e.status === 400) {
          console.log('the init router is : ', { Router });
          // alert('e enter');
          Router.push(`${props.AppUrl}/`);
          // Router.back();
          switch (e.data.message) {
            case ("Can't join this meeting"): {
              popAlert({
                title: "You can't join this meeting",
                description: 'Please register for the meeting',
                error: true,
              });
              break;
            }
            case ('Meeting not found'): {
              popAlert({
                title: 'Host is yet to start this meeting',
                error: true,
              });
              break;
            }
            case ('Meeting no longer active'): {
              popAlert({
                title: 'This meeting already ended',
                error: true,
              });
              break;
            }
            default: break;
          }
        }
      }
    }
  }

  async initializeMeetingSession(configuration) {
    let logger = null;
    const logLevel = LogLevel.INFO;
    logger = new ConsoleLogger('SDK', logLevel);
    const consoleLogger = logger;
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      logger = consoleLogger;
    } else {
      /*  await Promise.all([
        this.createLogStream(configuration, 'create_log_stream'),
        this.createLogStream(configuration, 'create_browser_event_log_stream'),
      ]);

      logger = new MultiLogger(
        consoleLogger,
        new MeetingSessionPOSTLogger(
          'SDK',
          configuration,
          this.LOGGER_BATCH_SIZE,
          this.LOGGER_INTERVAL_MS,
          `${this.BASE_URL}logs`,
          logLevel,
        ),
      );
      this.meetingEventPOSTLogger = new MeetingSessionPOSTLogger(
        'SDKEvent',
        configuration,
        this.LOGGER_BATCH_SIZE,
        this.LOGGER_INTERVAL_MS,
        `${this.BASE_URL}log_meeting_event`,
        logLevel,
      ); */
    }
    const deviceController = new DefaultDeviceController(logger, { enableWebAudio: this.enableWebAudio });
    configuration.enableUnifiedPlanForChromiumBasedBrowsers = this.enableUnifiedPlanForChromiumBasedBrowsers;
    configuration.attendeePresenceTimeoutMs = 5000;
    configuration.enableSimulcastForUnifiedPlanChromiumBasedBrowsers = this.enableSimulcast;
    this.meetingSession = new DefaultMeetingSession(configuration, logger, deviceController);
    if (true) {
      this.meetingSession.audioVideo.setAudioProfile(AudioProfile.fullbandSpeechMono());
      this.meetingSession.audioVideo.setContentAudioProfile(AudioProfile.fullbandSpeechMono());
    }
    this.audioVideo = this.meetingSession.audioVideo;
    this.setState({
      audioVideo: this.meetingSession.audioVideo,
      meetingSession: this.meetingSession,
      videoTiles: this.meetingSession.audioVideo.getAllVideoTiles(),
    });

    this.meetingSession.audioVideo.addDeviceChangeObserver(this);
    this.setupDeviceLabelTrigger();
    await this.populateAllDeviceLists();
    this.setupMuteHandler();
    this.setupCanUnmuteHandler();
    this.setupSubscribeToAttendeeIdPresenceHandler();
    this.setupDataMessage();
    this.state.audioVideo.addObserver(this);
    this.state.audioVideo.addContentShareObserver(this);
    this.initContentShareDropDownItems();
    this.updateRoster();
  }

  async endMeeting() {
    const user = this.getCurrentParticipant();
    const { props, state } = this;

    this.state.audioVideo.stopLocalVideoTile();
    this.state.audioVideo.stop();
    if (this.voiceFocusDevice) {
      this.voiceFocusDevice.stop();
    }

    this.setState({
      showedReminder: true,
    });
    clearInterval(this.endCallTimer);
    this.setState({
      showEndMeetingCountDown: 0,
    });
    clearInterval(this.endCallCountDownTimer);
    Router.push(`${props.AppUrl}/`);
    // alert('ending meeting');
    if (user.isHost) {
      // alert('host ending meeting');
      // v== send request to end request in backend
      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/meeting/${state.meetingId}`,
        method: 'DELETE',
      });
    }
  }

  async joinMeetingFromSetUp() {
    new AsyncScheduler().start(async () => {
      try {
        // this.showProgress('progress-join');
        await this.stopAudioPreview();
        this.state.audioVideo.stopVideoPreviewForVideoInput(this.videoPreview);
        await this.join();
        // this.state.audioVideo.chooseVideoInputDevice(null);
        // this.hideProgress('progress-join');
        this.displayButtonStates();
        this.switchToFlow('flow-meeting');
        if (this.videoInput.value !== 'None') {
          await this.openVideoInputFromSelection(this.videoInput.value, false);
          this.state.audioVideo.startLocalVideoTile();
        }
        // alert(`joined meeting successfully :${this.state.endsAt}`);
        // set timer to automatically end call
        const reminderTime = 10; // <== minutes
        const countDownTime = 60; // <== seconds
        this.endCallTimer = setInterval(() => {
          // time difference in seconds
          let timeDiff = Number(milSecToSeconds(new Date(this.state.endsAt).getTime() - new Date().getTime()));

          if ((timeDiff === countDownTime || timeDiff < countDownTime) && this.state.showEndMeetingCountDown === false) {
            this.setState({
              showEndMeetingCountDown: timeDiff,
            });
            this.endCallCountDownTimer = setInterval(() => {
              const newCount = this.state.showEndMeetingCountDown - 1;
              this.setState({
                showEndMeetingCountDown: newCount,
              });
              if (newCount === 0) {
                clearInterval(this.endCallCountDownTimer);
              }
            }, 1000);
          }

          // timeDiff in minutes
          timeDiff = Number(milSecToMinutes(new Date(this.state.endsAt).getTime() - new Date().getTime()));
          console.log('timer timeDiff', { timeDiff, endsAt: new Date(this.state.endsAt), now: new Date() });
          // popAlert({
          //   title: `time dif is : ${timeDiff}`,
          // });
          if ((timeDiff === reminderTime || timeDiff < reminderTime) && !this.state.showedReminder) {
            this.props.toastAlert({
              content: `This meeting will end in ${(reminderTime - timeDiff) > 1 ? timeDiff.toFixed(0) : reminderTime.toFixed(0)} minutes`,
              timeout: 5000,
            });
            this.setState({
              showedReminder: true,
            });
          }
          if (new Date() >= new Date(this.state.endsAt)) {
            console.log({
              noew: new Date(),
              endsAt: new Date(this.state.endsAt),
            });
            // alert('meeting ending now');
            this.endMeeting();
            clearInterval(this.endCallTimer);
          }
        }, 1000);
      } catch (error) {
        console.log(error);
        // alert('got an error');
        document.getElementById('failed-join').innerText = `Meeting ID: ${this.meeting}`;
        document.getElementById('failed-join-error').innerText = `Error: ${error.message}`;
      }
    });
  }

  async getAttendee(attendeeId) {
    const response = await fetch(`${this.BASE_URL}attendee?title=${encodeURIComponent(this.meeting)}&attendee=${encodeURIComponent(attendeeId)}`);
    const json = await response.json();
    if (json.error) {
      throw new Error(`Server error: ${json.error}`);
    }
    return json;
  }

  dataMessageHandler(dataMessage) {
    if (!dataMessage.throttled) {
      this.lastReceivedMessageTimestamp = dataMessage.timestampMs;
      this.setState((prev) => ({
        chats: [
          ...prev.chats,
          dataMessage,
        ],
        chatsNewMessages: prev.chatsNewMessages + 1,
        chatsScrollToBottom: true,
      }));
      // messageTextSpan.innerHTML = this.markdown.render(dataMessage.text()).replace(/[<]a /g, '<a target="_blank" ');
    } else {
      this.log('Message is throttled. Please resend');
    }
  }

  getHostParticipant() {
    const { participants } = this.state;
    for (const key of Object.keys(participants)) {
      const user = participants[key];
      if (user && user.isHost) {
        return user;
      }
    }

    return false;
  }

  getCurrentParticipant() {
    const { participants } = this.state;
    for (const key of Object.keys(participants)) {
      const user = participants[key];
      if (user && user.id === this.state.localTile.boundExternalUserId) {
        return user;
      }
    }

    return false;
  }

  hostCommandHandler(dataMessage) {
    const host = this.getHostParticipant();
    if (host) {
      const command = JSON.parse(dataMessage.text());
      // console.log('new host command is : ', { dataMessage, command });
      if (!dataMessage.throttled
        && command.attendeeIds.includes(this.state.localTile.boundAttendeeId)
        && dataMessage.senderExternalUserId === host.id
      ) {
        switch (command.cmd) {
          case ('mute-audio'): {
            // alert('new host comand to mute audio');
            this.state.audioVideo.realtimeMuteLocalAudio();
            break;
          }
          case ('stop-video'): {
            // alert('new host comand to stop video');
            this.state.audioVideo.stopLocalVideoTile();
            break;
          }
          default: break;
        }
      } else {
        console.log({
          host,
        });
        this.log('Message is throttled. Please resend');
      }
    } else {
      // alert('unable to find host');
    }
  }

  executeHostCommand(cmd = '', attendeeIds = []) {
    const host = this.getHostParticipant();
    if (host && (host.id === this.state.localTile.boundExternalUserId)) {
      const { props, state } = this;
      state.audioVideo.realtimeSendDataMessage(this.HOST_CMD, {
        cmd,
        attendeeIds,
      }, this.hostCommandTimeout);
      this.hostCommandHandler(new DataMessage(
        Date.now(),
        this.HOST_CMD,
        new TextEncoder().encode(JSON.stringify({
          cmd, attendeeIds,
        })),
        this.meetingSession.configuration.credentials.attendeeId,
        this.meetingSession.configuration.credentials.externalUserId,
      ));
      // echo the message to the handler
    }
  }

  hostMuteParticipant(attendeeIds = []) {
    this.executeHostCommand('mute-audio', attendeeIds);
  }

  hostStopParticipantVideo(attendeeIds = []) {
    this.executeHostCommand('stop-video', attendeeIds);
  }

  resetChatsScrollToBottom() {
    this.setState((prev) => ({

      chatsScrollToBottom: false,
    }));
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

  displayButtonStates() {
    for (const button in this.buttonStates) {
      const element = document.getElementById(button);
      console.log('displayButtonStates button element : ', element);
      const drop = document.getElementById(`${button}-drop`);
      const on = this.buttonStates[button];
      // element.classList.add(on ? 'btn-success' : 'btn-outline-secondary');
      // element.classList.remove(on ? 'btn-outline-secondary' : 'btn-success');
      // (element.firstElementChild).classList.add(on ? 'svg-active' : 'svg-inactive');
      // (element.firstElementChild).classList.remove(
      // on ? 'svg-inactive' : 'svg-active',
      // );
      if (drop) {
        drop.classList.add(on ? 'btn-success' : 'btn-outline-secondary');
        drop.classList.remove(on ? 'btn-outline-secondary' : 'btn-success');
      }
    }
  }

  videoTileDidUpdate(tileState) {
    // console.log('video tiles just updated : ', tileState);
    // this.log(`video tile updated: ${JSON.stringify(tileState, null, '  ')}`);
    if (!tileState.boundAttendeeId) {
      return;
    }
    if (tileState.localTile) {
      this.setState({
        localTile: tileState,
      });
    } else if (tileState.isContent) {
      // alert('found a screen share local tile');
      this.setState({
        screenShare: tileState.boundVideoStream.active ? tileState : null,
      });
    }

    this.setState({
      videoTiles: this.state.audioVideo.getAllVideoTiles(),
    });
    // alert('video tile did updated');
    this.updateRoster();
  }

  showTile(tileElement, tileState) {
    tileElement.classList.add('active');

    if (tileState.isContent) {
      tileElement.classList.add('content');
    }
  }

  async join() {
    window.addEventListener('unhandledrejection', (event) => {
      this.log(event.reason);
      // alert('something went wrong ohh');
    });

    if (this.state.audioVideo.start) {
      await this.state.audioVideo.start();
      return true;
    }
  }

  hideTile(tileIndex) {
    const tileElement = document.getElementById(`tile-${tileIndex}`);
    tileElement.classList.remove('active', 'featured', 'content');
  }

  async joinMeeting() {
    const response = await fetch(
      `${process.env.REACT_APP_API}/meetingjoin?title=${encodeURIComponent(this.meeting)}&name=${encodeURIComponent(this.name)}&region=${encodeURIComponent(this.region)}`,
      {
        method: 'POST',
      },
    );
    const json = await response.json();
    console.log('the data at the end of the day is : ', json);
    // alert('we here');
    if (json.error) {
      throw new Error(`Server error: ${json.error}`);
    }
    return json;
  }

  setupDeviceLabelTrigger() {
    // Note that device labels are privileged since they add to the
    // fingerprinting surface area of the browser session. In Chrome private
    // tabs and in all Firefox tabs, the labels can only be read once a
    // MediaStream is active. How to deal with this restriction depends on the
    // desired UX. The device controller includes an injectable device label
    // trigger which allows you to perform custom behavior in case there are no
    // labels, such as creating a temporary audio/video stream to unlock the
    // device names, which is the default behavior. Here we override the
    // trigger to also show an alert to let the user know that we are asking for
    // mic/camera permission.
    //
    // Also note that Firefox has its own device picker, which may be useful
    // for the first device selection. Subsequent device selections could use
    // a custom UX with a specific device id.
    if (this.state.audioInputDevice) {
      this.state.audioVideo.setDeviceLabelTrigger(
        async () => {
          if (this.isRecorder() || this.isBroadcaster()) {
            throw new Error('Recorder or Broadcaster does not need device labels');
          }
          this.switchToFlow('flow-need-permission');
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          this.switchToFlow('flow-devices');
          return stream;
        },
      );
    }
  }

  acquireTileIndex(tileId) {
    for (let index = 0; index <= this.DemoTileOrganizer.MAX_TILES; index++) {
      if (this.tiles[index] === tileId) {
        return index;
      }
    }
    for (let index = 0; index <= this.DemoTileOrganizer.MAX_TILES; index++) {
      if (!(index in this.tiles)) {
        this.tiles[index] = tileId;
        this.DemoTileOrganizer.remoteTileCount++;
        return index;
      }
    }
    throw new Error('no tiles are available');
  }

  releaseTileIndex(tileId) {
    for (let index = 0; index <= this.DemoTileOrganizer.MAX_TILES; index++) {
      if (this.tiles[index] === tileId) {
        this.DemoTileOrganizer.remoteTileCount--;
        delete this.tiles[index];
        return index;
      }
    }
    return this.DemoTileOrganizer.MAX_TILES;
  }

  setUpVideoTileElementResizer() {
    /*  for (let i = 0; i <= this.DemoTileOrganizer.MAX_TILES; i++) {
      const videoElem = document.getElementById(`video-${i}`);
      videoElem.onresize = () => {
        if (videoElem.videoHeight > videoElem.videoWidth) {
          // portrait mode
          videoElem.style.objectFit = 'contain';
          this.log(`video-${i} changed to portrait mode resolution ${videoElem.videoWidth}x${videoElem.videoHeight}`);
        } else {
          videoElem.style.objectFit = 'cover';
        }
      };
    } */
  }

  isRecorder() {
    return (new URL(window.location.href).searchParams.get('record')) === 'true';
  }

  isBroadcaster() {
    return (new URL(window.location.href).searchParams.get('broadcast')) === 'true';
  }

  initParameters() {
    // const meeting = new URL(window.location.href).searchParams.get('m');
    // if (/* meeting */) {
    //   // (document.getElementById('inputMeeting')).value = meeting;
    //   // (document.getElementById('inputName')).focus();
    // } else {
    //   // (document.getElementById('inputMeeting')).focus();
    // }
  }

  getSupportedMediaRegions() {
    const supportedMediaRegions = [];
    const mediaRegion = (document.getElementById('inputRegion'));
    for (let i = 0; i < mediaRegion.length; i++) {
      supportedMediaRegions.push(mediaRegion.value);
    }
    return supportedMediaRegions;
  }

  async getNearestMediaRegion() {
    const nearestMediaRegionResponse = await fetch(
      'https://nearest-media-region.l.chime.aws',
      {
        method: 'GET',
      },
    );
    const nearestMediaRegionJSON = await nearestMediaRegionResponse.json();
    const nearestMediaRegion = nearestMediaRegionJSON.region;
    return nearestMediaRegion;
  }

  async createLogStream(configuration, pathname) {
    const body = JSON.stringify({
      meetingId: configuration.meetingId,
      attendeeId: configuration.credentials.attendeeId,
    });
    try {
      /*       const response = await fetch(`${this.BASE_URL}${pathname}`, {
        method: 'POST',
        body,
      });
      if (response.status === 200) {
        console.log('[DEMO] log stream created');
      }
      */
    } catch (error) {
      this.log(error.message);
    }
  }

  setMediaRegion() {
    new AsyncScheduler().start(
      async () => {
        try {
          const nearestMediaRegion = await this.getNearestMediaRegion();
          if (nearestMediaRegion === '' || nearestMediaRegion === null) {
            throw new Error('Nearest Media Region cannot be null or empty');
          }
          const supportedMediaRegions = this.getSupportedMediaRegions();
          if (supportedMediaRegions.indexOf(nearestMediaRegion) === -1) {
            supportedMediaRegions.push(nearestMediaRegion);
            const mediaRegionElement = (document.getElementById('inputRegion'));
            const newMediaRegionOption = document.createElement('option');
            newMediaRegionOption.value = nearestMediaRegion;
            newMediaRegionOption.text = `${nearestMediaRegion} (${nearestMediaRegion})`;
            mediaRegionElement.add(newMediaRegionOption, null);
          }
          (document.getElementById('inputRegion')).value = nearestMediaRegion;
        } catch (error) {
          this.log(`Default media region selected: ${error.message}`);
        }
      },
    );
  }

  async initVoiceFocus() {
    const logger = new ConsoleLogger('SDK', LogLevel.DEBUG);
    if (!this.enableWebAudio) {
      logger.info('[DEMO] Web Audio not enabled. Not checking for Amazon Voice Focus support.');
      return;
    }

    try {
      this.supportsVoiceFocus = await VoiceFocusDeviceTransformer.isSupported(VOICE_FOCUS_SPEC, { logger });
      if (this.supportsVoiceFocus) {
        this.voiceFocusTransformer = await this.getVoiceFocusDeviceTransformer();
        this.supportsVoiceFocus = this.voiceFocusTransformer && this.voiceFocusTransformer.isSupported();
        if (this.supportsVoiceFocus) {
          logger.info('[DEMO] Amazon Voice Focus is supported.');
          document.getElementById('voice-focus-setting').classList.remove('hidden');
          await this.populateAllDeviceLists();
          return;
        }
      }
    } catch (e) {
      // Fall through.
      logger.warn(`[DEMO] Does not support Amazon Voice Focus: ${e.message}`);
    }
    logger.warn('[DEMO] Does not support Amazon Voice Focus.');
    this.supportsVoiceFocus = false;
    document.getElementById('voice-focus-setting').classList.toggle('hidden', true);
    await this.populateAllDeviceLists();
  }

  async getVoiceFocusDeviceTransformer() {
    if (this.voiceFocusTransformer) {
      return this.voiceFocusTransformer;
    }
    const logger = new ConsoleLogger('SDK', LogLevel.DEBUG);
    const transformer = await VoiceFocusDeviceTransformer.create(VOICE_FOCUS_SPEC, { logger });
    this.voiceFocusTransformer = transformer;
    return transformer;
  }

  async populateAllDeviceLists() {
    await this.populateAudioInputList();
    await this.populateVideoInputList();
    await this.populateAudioOutputList();
  }

  populateInMeetingDeviceList(
    elementId,
    genericName,
    devices,
    additionalOptions,
    additionalToggles,
    callback,
  ) {
    const menu = document.getElementById(elementId);
    while (menu.firstElementChild) {
      menu.removeChild(menu.firstElementChild);
    }
    for (let i = 0; i < devices.length; i++) {
      this.createDropdownMenuItem(menu, devices[i].label || `${genericName} ${i + 1}`, () => {
        callback(devices[i].deviceId);
      });
    }
    if (additionalOptions.length) {
      this.createDropdownMenuItem(menu, '──────────', () => { }).classList.add('text-center');
      for (const additionalOption of additionalOptions) {
        this.createDropdownMenuItem(
          menu,
          additionalOption,
          () => {
            callback(additionalOption);
          },
          `${elementId}-${additionalOption.replace(/\s/g, '-')}`,
        );
      }
    }
    if (additionalToggles && additionalToggles.length) {
      this.createDropdownMenuItem(menu, '──────────', () => { }).classList.add('text-center');
      for (const { name, oncreate, action } of additionalToggles) {
        const id = `toggle-${elementId}-${name.replace(/\s/g, '-')}`;
        const elem = this.createDropdownMenuItem(
          menu,
          name,
          action,
          id,
        );
        oncreate(elem);
      }
    }
    if (!menu.firstElementChild) {
      this.createDropdownMenuItem(menu, 'Device selection unavailable', () => { });
    }
  }

  async toggleVoiceFocusInMeeting() {
    const elem = (document.getElementById('add-voice-focus'));
    this.enableVoiceFocus = this.supportsVoiceFocus && !this.enableVoiceFocus;
    elem.checked = this.enableVoiceFocus;
    this.log('Amazon Voice Focus toggle is now', elem.checked);

    await this.reselectAudioInputDevice();
  }

  async populateAudioInputList() {
    const genericName = 'Microphone';
    const additionalDevices = ['None', '440 Hz'];
    const additionalToggles = [];

    // This can't work unless Web Audio is enabled.
    if (this.enableWebAudio && this.supportsVoiceFocus) {
      additionalToggles.push({
        name: 'Amazon Voice Focus',
        oncreate: (elem) => {
          this.voiceFocusDisplayables.push(elem);
        },
        action: () => this.toggleVoiceFocusInMeeting(),
      });
    }

    this.populateDeviceList(
      'audio-input',
      genericName,
      await this.state.audioVideo.listAudioInputDevices(),
      additionalDevices,
    );

    this.populateInMeetingDeviceList(
      'dropdown-menu-microphone',
      genericName,
      await this.state.audioVideo.listAudioInputDevices(),
      additionalDevices,
      additionalToggles,
      async (name) => {
        await this.selectAudioInputDeviceByName(name);
      },
    );
  }

  async selectAudioInputDeviceByName(name) {
    this.log('Selecting audio input device by name:', name);
    const device = await this.audioInputSelectionToDevice(name);
    return this.selectAudioInputDevice(device);
  }

  async populateVideoInputList() {
    const genericName = 'Camera';
    let additionalDevices = ['None', 'Blue', 'SMPTE Color Bars'];
    additionalDevices = [];
    this.populateDeviceList(
      'video-input',
      genericName,
      await this.state.audioVideo.listVideoInputDevices(),
      additionalDevices,
    );
    this.populateInMeetingDeviceList(
      'dropdown-menu-camera',
      genericName,
      await this.state.audioVideo.listVideoInputDevices(),
      additionalDevices,
      undefined,
      async (name) => {
        try {
          await this.openVideoInputFromSelection(name, false);
        } catch (err) {
          this.log('no video input device selected');
        }
      },
    );
    const cameras = await this.state.audioVideo.listVideoInputDevices();
    this.cameraDeviceIds = cameras.map((deviceInfo) => deviceInfo.deviceId);
  }

  async openVideoInputFromSelection(selection, showPreview) {
    if (selection) {
      this.selectedVideoInput = selection;
    }
    this.log(`Switching to: ${this.selectedVideoInput}`);
    const device = this.videoInputSelectionToDevice(this.selectedVideoInput);
    if (device === null) {
      if (showPreview) {
        this.state.audioVideo.stopVideoPreviewForVideoInput(this.videoPreview);
      }
      this.state.audioVideo.stopLocalVideoTile();
      this.toggleButton('button-camera', 'off');
      // choose video input null is redundant since we expect stopLocalVideoTile to clean up
      try {
        await this.state.audioVideo.chooseVideoInputDevice(device);
        this.setState({
          videoInputDevice: selection,
        });
      } catch (e) {
        console.log('failure is : ', e);
        this.log(`failed to chooseVideoInputDevice ${device}`, e);
      }

      throw new Error('no video device selected');
    }
    try {
      await this.state.audioVideo.chooseVideoInputDevice(device);
      this.setState({
        videoInputDevice: selection,
      });
      // alert('sucessfully selected the device');
    } catch (e) {
      console.log('failure is : ', e);
      this.log(`failed to chooseVideoInputDevice ${device}`, e);
    }

    if (showPreview) {
      this.state.audioVideo.startVideoPreviewForVideoInput(this.videoPreview);
    }
  }

  videoInputSelectionToDevice(value) {
    if (this.isRecorder() || this.isBroadcaster()) {
      return null;
    }

    if (value === 'Blue') {
      return DefaultDeviceController.synthesizeVideoDevice('blue');
    }

    if (value === 'SMPTE Color Bars') {
      return DefaultDeviceController.synthesizeVideoDevice('smpte');
    }

    if (value === 'None') {
      return null;
    }

    return value;
  }

  createDropdownMenuItem(
    menu,
    title,
    clickHandler,
    id,
  ) {
    const button = document.createElement('button');
    menu.appendChild(button);
    button.innerText = title;
    button.classList.add('dropdown-item');
    this.updateProperty(button, 'id', id);
    button.addEventListener('click', () => {
      clickHandler();
    });
    return button;
  }

  updateProperty(obj, key, value) {
    if (value !== undefined && obj[key] !== value) {
      obj[key] = value;
    }
  }

  log(str, ...args) {
    console.log.apply(console, [`[DEMO] ${str}`, ...args]);
  }

  async updateRoster() {
    const videoTiles = this.state.audioVideo.getAllVideoTiles();
    const { roster, participants } = this.state;
    for (const tile of videoTiles) {
      const { tileState } = tile;
      if (!tileState.isContent) {
        const attendee = roster[tileState.boundAttendeeId] || {};
        roster[tileState.boundAttendeeId] = {
          ...(roster[tileState.boundAttendeeId] || {}),
          ...attendee,
          ...tileState,
        };

        if (!participants[tileState.boundExternalUserId]) {
          // alert(`participant not found so sending request :${tileState.boundExternalUserId}`);
          const newParticipant = await this.props.fetchRequest({
            url: `${process.env.REACT_APP_API}/children/${tileState.boundExternalUserId}`,
          });
          console.log('mew participant gotten : ', newParticipant);
          // alert(`adding new particpnat : ${tileState.boundExternalUserId}`);
          participants[tileState.boundExternalUserId] = newParticipant;
        } else {
          // alert(`participant found ${tileState.boundExternalUserId}`);
        }
      } else {
        roster.shareScreen = tileState;
      }
    }
    this.setState({
      roster,
      participants,
    });
  }

  allowMaxContentShare() {
    const allowed = (new URL(window.location.href).searchParams.get('max-content-share')) === 'true';
    if (allowed) {
      return true;
    }
    return false;
  }

  isButtonOn(button) {
    return this.buttonStates[button];
  }

  localTileId() {
    return this.state.audioVideo.hasStartedLocalVideoTile() ? this.state.audioVideo.getLocalVideoTile().state().tileId : null;
  }

  tileIdForAttendeeId(attendeeId) {
    for (const tile of this.state.audioVideo.getAllVideoTiles()) {
      const state = tile.state();
      if (state.boundAttendeeId === attendeeId) {
        return state.tileId;
      }
    }
    return null;
  }

  toggleButton(button, state) {
    // state = state !== 'off' ? 'on' : state;
    if (state === 'on') {
      this.buttonStates[button] = true;
    } else if (state === 'off') {
      this.buttonStates[button] = false;
    } else {
      this.buttonStates[button] = !this.buttonStates[button];
    }
    this.displayButtonStates();
    return this.buttonStates[button];
  }

  findContentTileId() {
    for (const tile of this.state.audioVideo.getAllVideoTiles()) {
      const state = tile.state();
      if (state.isContent) {
        return state.tileId;
      }
    }
    return null;
  }

  activeTileId() {
    const contentTileId = this.findContentTileId();
    if (contentTileId !== null) {
      return contentTileId;
    }
    for (const attendeeId in this.state.roster) {
      if (this.state.roster[attendeeId].active) {
        return this.tileIdForAttendeeId(attendeeId);
      }
    }
    return null;
  }

  layoutFeaturedTile() {
    if (!this.meetingSession) {
      return;
    }
    const tilesIndices = this.visibleTileIndices();
    const localTileId = this.localTileId();
    const activeTile = this.activeTileId();

    for (let i = 0; i < tilesIndices.length; i++) {
      const tileIndex = tilesIndices[i];
      const tileElement = document.getElementById(`tile-${tileIndex}`);
      const tileId = this.tileIndexToTileId[tileIndex];

      if (tileId === activeTile && tileId !== localTileId) {
        tileElement.classList.add('featured');
      } else {
        tileElement.classList.remove('featured');
      }
    }

    this.updateGridClasses();
  }

  visibleTileIndices() {
    const tileKeys = Object.keys(this.tileOrganizer.tiles);
    const tiles = tileKeys.map((tileId) => parseInt(tileId));
    return tiles;
  }

  availablelTileSize() {
    return this.tileOrganizer.remoteTileCount
      + (this.state.audioVideo.hasStartedLocalVideoTile() ? 1 : 0);
  }

  updateGridClasses() {
    const localTileId = this.localTileId();
    const activeTile = this.activeTileId();
    this.tileArea = document.getElementById('tile-area');

    if (this.tileArea) {
      this.tileArea.className = `v-grid size-${this.availablelTileSize()}`;
    } else {
      console.log('console.log this.tile-area', this.tileArea);
    }

    if (activeTile && activeTile !== localTileId) {
      this.tileArea.classList.add('featured');
    } else {
      this.tileArea.classList.remove('featured');
    }
  }

  setupSubscribeToAttendeeIdPresenceHandler() {
    const handler = (attendeeId, present, externalUserId, dropped) => {
      this.log(`${attendeeId} present = ${present} (${externalUserId})`);
      const isContentAttendee = new DefaultModality(attendeeId).hasModality(DefaultModality.MODALITY_CONTENT);
      const isSelfAttendee = new DefaultModality(attendeeId).base() === this.meetingSession.configuration.credentials.attendeeId;
      if (!present) {
        const { roster } = this.state;
        // delete this.roster[attendeeId];
        delete roster[attendeeId];
        this.setState({ roster });
        this.updateRoster();
        this.log(`${attendeeId} dropped = ${dropped} (${externalUserId})`);
        return;
      }
      // If someone else share content, stop the current content share
      if (!this.allowMaxContentShare() && !isSelfAttendee && isContentAttendee && this.isButtonOn('button-content-share')) {
        this.contentShareStop();
      }
      const videoTiles = this.state.audioVideo.getAllVideoTiles();
      const tiles = {};
      videoTiles.forEach((tile) => {
        const { tileState } = tile;
        if (!tileState.isContent) {
          tiles[tileState.boundAttendeeId] = tileState;
        }
      });
      if (!isContentAttendee) {
        this.setState((prev) => ({
          roster: {
            ...prev.roster,
            [attendeeId]: {
              ...(prev.roster[attendeeId] || {}),
              ...tiles[attendeeId],
              externalUserId,
              boundExternalUserId: externalUserId,
            },
          },
        }));
        this.updateRoster();
      }

      this.state.audioVideo.realtimeSubscribeToVolumeIndicator(
        attendeeId,
        async (
          attendeeId,
          volume,
          muted,
          signalStrength,
        ) => {
          if (!this.state.roster[attendeeId]) {
            console.log({
              attendeeId,
              volume,
              muted,
              signalStrength,
            });
            return;
          }

          const attendeeRosterLog = this.state.roster[attendeeId];
          if (volume !== null) {
            attendeeRosterLog.volume = Math.round(volume * 100);
          }
          if (muted !== null) {
            attendeeRosterLog.muted = muted;
          }
          if (signalStrength !== null) {
            attendeeRosterLog.signalStrength = Math.round(signalStrength * 100);
          }

          this.setState((prev) => ({
            roster: {
              ...prev.roster,
              [attendeeId]: attendeeRosterLog,
            },
            videoTiles: this.state.audioVideo.getAllVideoTiles(),
          }));
          this.updateRoster();
        },
      );

      this.setState((prev) => ({
        videoTiles: this.state.audioVideo.getAllVideoTiles(),
      }));
      this.updateRoster();
    };

    this.state.audioVideo.realtimeSubscribeToAttendeeIdPresence(handler);

    const activeSpeakerHandler = (attendeeIds) => {
      console.log('active speaker callback', attendeeIds);
      // alert(`active speaker callback ${attendeeIds.toString()}`);
      const { roster } = this.state;
      for (const attendeeId in roster) {
        roster[attendeeId].speaking = false;
      }
      for (const attendeeId of attendeeIds) {
        if (roster[attendeeId]) {
          roster[attendeeId].speaking = true;
          break; // only show the most active speaker
        }
      }
      this.setState({
        roster,
      });
      this.updateRoster();
    };

    this.state.audioVideo.subscribeToActiveSpeakerDetector(
      new DefaultActiveSpeakerPolicy(),
      activeSpeakerHandler,
      (scores) => {
        console.log('active speaker score', scores);
        // alert('active speaker score');
        const { roster } = this.state;
        for (const attendeeId in scores) {
          if (roster[attendeeId]) {
            roster[attendeeId].score = scores[attendeeId];
          }
        }
        this.setState({
          roster,
        });
        this.updateRoster();
      },
      this.showActiveSpeakerScores ? 100 : 0,
    );
  }

  async openAudioInputFromSelectionAndPreview() {
    await this.stopAudioPreview();
    await this.openAudioInputFromSelection();
    this.log('Starting audio preview.');
    await this.startAudioPreview();
  }

  async openAudioInputFromSelection(value) {
    let device = value;
    if (!device) {
      device = await this.selectedAudioInput();
    }
    await this.selectAudioInputDevice(device);
  }

  async selectedAudioInput() {
    const audioInput = document.getElementById('audio-input');
    const device = await this.audioInputSelectionToDevice(this.audioInput.value);
    return device;
  }

  async audioInputSelectionToIntrinsicDevice(value) {
    if (this.isRecorder() || this.isBroadcaster()) {
      return null;
    }

    if (value === '440 Hz') {
      return DefaultDeviceController.synthesizeAudioDevice(440);
    }

    if (value === 'None') {
      return null;
    }

    return value;
  }

  async createVoiceFocusDevice(inner) {
    if (!this.supportsVoiceFocus) {
      return inner;
    }

    if (this.voiceFocusDevice) {
      // Dismantle the old one.
      return this.voiceFocusDevice = await this.voiceFocusDevice.chooseNewInnerDevice(inner);
    }

    try {
      const transformer = await this.getVoiceFocusDeviceTransformer();
      const vf = await transformer.createTransformDevice(inner);
      if (vf) {
        return this.voiceFocusDevice = vf;
      }
    } catch (e) {
      // Fall through.
    }
    return inner;
  }

  async audioInputSelectionWithOptionalVoiceFocus(device) {
    if (this.isVoiceFocusEnabled()) {
      if (!this.voiceFocusDevice) {
        return this.createVoiceFocusDevice(device);
      }

      // Switch out the inner if needed.
      // The reuse of the Voice Focus device is more efficient, particularly if
      // reselecting the same inner -- no need to modify the Web Audio graph.
      // Allowing the Voice Focus device to manage toggling Voice Focus on and off
      // also
      return this.voiceFocusDevice = await this.voiceFocusDevice.chooseNewInnerDevice(device);
    }

    return device;
  }

  startAudioPreview() {
    this.setAudioPreviewPercent(0);
    if (!this.state.audioVideo) {
      return;
    }
    // Recreate.
    if (this.analyserNode) {
      // Disconnect the analyser node from its inputs and outputs.
      this.analyserNode.disconnect();
      this.analyserNode.removeOriginalInputs();

      this.analyserNode = undefined;
    }

    const analyserNode = this.state.audioVideo.createAnalyserNodeForAudioInput();

    if (!analyserNode) {
      return;
    }

    if (!analyserNode.getByteTimeDomainData) {
      document.getElementById('audio-preview').parentElement.style.visibility = 'hidden';
      return;
    }

    this.analyserNode = analyserNode;
    const data = new Uint8Array(analyserNode.fftSize);
    let frameIndex = 0;
    this.analyserNodeCallback = () => {
      if (frameIndex === 0) {
        analyserNode.getByteTimeDomainData(data);
        const lowest = 0.01;
        let max = lowest;
        for (const f of data) {
          max = Math.max(max, (f - 128) / 128);
        }
        const normalized = (Math.log(lowest) - Math.log(max)) / Math.log(lowest);
        const percent = Math.min(Math.max(normalized * 100, 0), 100);
        this.setAudioPreviewPercent(percent);
      }
      frameIndex = (frameIndex + 1) % 2;
      requestAnimationFrame(this.analyserNodeCallback);
    };
    requestAnimationFrame(this.analyserNodeCallback);
  }

  async openAudioOutputFromSelection(value) {
    const audioElement = document.getElementById('audio-output');
    if (audioElement) {
      const audioOuputDevice = value || audioElement.value;
      try {
        await this.state.audioVideo.chooseAudioOutputDevice(audioOuputDevice);
        this.setState({
          audioOuputDevice,
        });
      } catch (e) {
        this.log('failed to chooseAudioOutputDevice', e);
      }
      const audioMix = document.getElementById('meeting-audio');
      try {
        await this.state.audioVideo.bindAudioElement(audioMix);
      } catch (e) {
        this.log('failed to bindAudioElement', e);
        // alert('failed to bindAudioElement');
      }
    }
  }

  hideProgress(id) {
    (document.getElementById(id)).style.visibility = 'hidden';
  }

  setAudioPreviewPercent(percent) {
    const audioPreview = document.getElementById('audio-preview');
    if (!audioPreview) {
      return;
    }
    this.updateProperty(audioPreview.style, 'transitionDuration', '33ms');
    this.updateProperty(audioPreview.style, 'width', `${percent}%`);
    if (audioPreview.getAttribute('aria-valuenow') !== `${percent}`) {
      audioPreview.setAttribute('aria-valuenow', `${percent}`);
    }
  }

  isVoiceFocusActive() {
    return this.currentAudioInputDevice instanceof VoiceFocusTransformDevice;
  }

  updateVoiceFocusDisplayState() {
    const active = this.isVoiceFocusActive();
    this.log('Updating Amazon Voice Focus display state:', active);
    for (const elem of this.voiceFocusDisplayables) {
      elem.classList.toggle('vf-active', active);
    }
  }

  async selectAudioInputDevice(device) {
    this.currentAudioInputDevice = device;
    this.log('Selecting audio input', device);
    try {
      this.setState({
        audioInputDevice: device,
      });
      await this.state.audioVideo.chooseAudioInputDevice(device);
    } catch (e) {
      this.log(`failed to choose audio input device ${device}`, e);
    }
    this.updateVoiceFocusDisplayState();
  }

  isVoiceFocusEnabled() {
    this.log('VF supported:', this.supportsVoiceFocus);
    this.log('VF enabled:', this.enableVoiceFocus);
    return this.supportsVoiceFocus && this.enableVoiceFocus;
  }

  async audioInputSelectionToDevice(value) {
    const inner = await this.audioInputSelectionToIntrinsicDevice(value);
    return this.audioInputSelectionWithOptionalVoiceFocus(inner);
  }

  async stopAudioPreview() {
    if (!this.analyserNode) {
      return true;
    }

    this.analyserNodeCallback = () => { };

    // Disconnect the analyser node from its inputs and outputs.
    this.analyserNode.disconnect();
    this.analyserNode.removeOriginalInputs();

    this.analyserNode = undefined;
    return true;
  }

  setupDataMessage() {
    this.state.audioVideo.realtimeSubscribeToReceiveDataMessage(this.DATA_MESSAGE_TOPIC, (dataMessage) => {
      this.dataMessageHandler(dataMessage);
    });
    // set up commands from host
    this.state.audioVideo.realtimeSubscribeToReceiveDataMessage(this.HOST_CMD, (dataMessage) => {
      this.hostCommandHandler(dataMessage);
    });
  }

  async contentShareTypeChanged(contentShareType, videoUrl) {
    if (this.isButtonOn('button-content-share')) {
      await this.contentShareStop();
    }
    this.contentShareType = contentShareType;
    await this.contentShareStart(videoUrl);
  }

  initContentShareDropDownItems() {
    let item = document.getElementById('dropdown-item-content-share-screen-capture');
    item.addEventListener('click', () => {
      this.contentShareTypeChanged(this.ContentShareType.ScreenCapture);
    });

    item = document.getElementById('dropdown-item-content-share-screen-test-video');
    item.addEventListener('click', () => {
      this.contentShareTypeChanged(this.ContentShareType.VideoFile, this.testVideo);
    });

    document.getElementById('content-share-item').addEventListener('change', () => {
      const fileList = document.getElementById('content-share-item');
      const file = fileList.files[0];
      if (!file) {
        this.log('no content share selected');
        return;
      }
      const url = URL.createObjectURL(file);
      this.log(`content share selected: ${url}`);
      this.contentShareTypeChanged(ContentShareType.VideoFile, url);
      fileList.value = '';
    });
  }

  setupCanUnmuteHandler() {
    const handler = (canUnmute) => {
      this.log(`canUnmute = ${canUnmute}`);
    };
    this.state.audioVideo.realtimeSubscribeToSetCanUnmuteLocalAudio(handler);
    handler(this.state.audioVideo.realtimeCanUnmuteLocalAudio());
  }

  setupMuteHandler() {
    const handler = (isMuted) => {
      this.log(`muted = ${isMuted}`);
      this.updateRoster();
    };
    this.state.audioVideo.realtimeSubscribeToMuteAndUnmuteLocalAudio(handler);
    const isMuted = this.state.audioVideo.realtimeIsLocalAudioMuted();
    handler(isMuted);
  }

  async populateAudioOutputList() {
    const supportsChoosing = this.defaultBrowserBehaviour.supportsSetSinkId();
    const genericName = 'Speaker';
    const additionalDevices = [];
    const devices = supportsChoosing ? await this.state.audioVideo.listAudioOutputDevices() : [];
    this.populateDeviceList(
      'audio-output',
      genericName,
      devices,
      additionalDevices,
    );
    this.populateInMeetingDeviceList(
      'dropdown-menu-speaker',
      genericName,
      devices,
      additionalDevices,
      undefined,
      async (name) => {
        if (!supportsChoosing) {
          return;
        }
        try {
          await this.state.audioVideo.chooseAudioOutputDevice(name);
        } catch (e) {
          this.log('Failed to chooseAudioOutputDevice', e);
        }
      },
    );
  }

  populateDeviceList(
    elementId,
    genericName,
    devices,
    additionalOptions,
  ) {
    const list = document.getElementById(elementId);
    while (list.firstElementChild) {
      list.removeChild(list.firstElementChild);
    }
    for (let i = 0; i < devices.length; i++) {
      const option = document.createElement('option');
      list.appendChild(option);
      option.text = devices[i].label || `${genericName} ${i + 1}`;
      option.value = devices[i].deviceId;
    }
    if (additionalOptions.length > 0) {
      const separator = document.createElement('option');
      separator.disabled = true;
      separator.text = '──────────';
      list.appendChild(separator);
      for (const additionalOption of additionalOptions) {
        const option = document.createElement('option');
        list.appendChild(option);
        option.text = additionalOption;
        option.value = additionalOption;
      }
    }
    if (!list.firstElementChild) {
      const option = document.createElement('option');
      option.text = 'Device selection unavailable';
      list.appendChild(option);
    }
  }

  switchToFlow(flow) {
    this.setState({ flow });
    if (flow === 'flow-devices') {
      document.getElementsByTagName('body')[0].style.overflow = '';
    } else if (flow === 'flow-meeting') {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
    // Array.from(document.getElementsByClassName('flow')).map(
    //   (e) => ((e).style.display = 'none'),
    // );

    // document.getElementById(flow).style.display = flow === 'flow-devices' ? 'block' : 'block';
  }

  async onAudioInputsChanged(freshDevices) {
    await this.populateAudioInputList();

    if (!this.currentAudioInputDevice) {
      return;
    }

    if (this.currentAudioInputDevice === 'default') {
      // The default device might actually have changed. Go ahead and trigger a
      // reselection.
      this.log('Reselecting default device.');
      await this.selectAudioInputDevice(this.currentAudioInputDevice);
      return;
    }

    const freshDeviceWithSameID = freshDevices.find((device) => device.deviceId === this.currentAudioInputDevice);

    if (freshDeviceWithSameID === undefined) {
      this.log('Existing device disappeared. Selecting a new one.');

      // Select a new device.
      await this.openAudioInputFromSelectionAndPreview();
    }
  }

  audioInputsChanged(freshAudioInputDeviceList) {
    this.onAudioInputsChanged(freshAudioInputDeviceList);
  }

  videoInputsChanged(_freshVideoInputDeviceList) {
    this.populateVideoInputList();
  }

  audioOutputsChanged(_freshAudioOutputDeviceList) {
    this.populateAudioOutputList();
  }

  audioInputStreamEnded(deviceId) {
    this.log(`Current audio input stream from device id ${deviceId} ended.`);
  }

  videoInputStreamEnded(deviceId) {
    this.log(`Current video input stream from device id ${deviceId} ended.`);
  }

  estimatedDownlinkBandwidthLessThanRequired(estimatedDownlinkBandwidthKbps, requiredVideoDownlinkBandwidthKbps) {
    this.log(`Estimated downlink bandwidth is ${estimatedDownlinkBandwidthKbps} is less than required bandwidth for video ${requiredVideoDownlinkBandwidthKbps}`);
  }

  videoNotReceivingEnoughData(videoReceivingReports) {
    this.log(`One or more video streams are not receiving expected amounts of data ${JSON.stringify(videoReceivingReports)}`);
  }

  metricsDidReceive(clientMetricReport) {
    /*  const metricReport = clientMetricReport.getObservableMetrics();
    if (typeof metricReport.availableSendBandwidth === 'number' && !isNaN(metricReport.availableSendBandwidth)) {
      (document.getElementById('video-uplink-bandwidth')).innerText = `Available Uplink Bandwidth: ${String(metricReport.availableSendBandwidth / 1000)} Kbps`;
    } else if (typeof metricReport.availableOutgoingBitrate === 'number' && !isNaN(metricReport.availableOutgoingBitrate)) {
      (document.getElementById('video-uplink-bandwidth')).innerText = `Available Uplink Bandwidth: ${String(metricReport.availableOutgoingBitrate / 1000)} Kbps`;
    } else {
      (document.getElementById('video-uplink-bandwidth')).innerText = 'Available Uplink Bandwidth: Unknown';
    }

    if (typeof metricReport.availableReceiveBandwidth === 'number' && !isNaN(metricReport.availableReceiveBandwidth)) {
      (document.getElementById('video-downlink-bandwidth')).innerText = `Available Downlink Bandwidth: ${String(metricReport.availableReceiveBandwidth / 1000)} Kbps`;
    } else if (typeof metricReport.availableIncomingBitrate === 'number' && !isNaN(metricReport.availableIncomingBitrate)) {
      (document.getElementById('video-downlink-bandwidth')).innerText = `Available Downlink Bandwidth: ${String(metricReport.availableIncomingBitrate / 1000)} Kbps`;
    } else {
      (document.getElementById('video-downlink-bandwidth')).innerText = 'Available Downlink Bandwidth: Unknown';
    }

    this.hasChromiumWebRTC
      && this.isButtonOn('button-video-stats')
      && this.getAndShowWebRTCStats(); */
  }

  getAndShowWebRTCStats() {
    const videoTiles = this.state.audioVideo.getAllVideoTiles();
    if (videoTiles.length === 0) {
      return;
    }
    for (const videoTile of videoTiles) {
      const tileState = videoTile.state();
      if (tileState.paused || tileState.isContent) {
        continue;
      }
      const tileId = videoTile.id();
      const tileIndex = this.tileIdToTileIndex[tileId];
      this.getStats(tileIndex);
      if (tileState.localTile) {
        this.statsCollector.showUpstreamStats(tileIndex);
      } else {
        this.statsCollector.showDownstreamStats(tileIndex);
      }
    }
  }

  eventDidReceive(name, attributes) {
    this.log(`Received an event: ${JSON.stringify({ name, attributes })}`);
    const { meetingHistory, ...otherAttributes } = attributes;
    switch (name) {
      // case 'meetingStartRequested':
      // case 'meetingStartSucceeded':
      case 'meetingEnded': {
        popAlert({ title: 'Meeting ended', error: true });

        // alert('meeting ended');
        // Exclude the "meetingHistory" attribute for successful events.
        if (this.meetingEventPOSTLogger) {
          this.meetingEventPOSTLogger.info(JSON.stringify({
            name,
            attributes: otherAttributes,
          }));
        }
        break;
      }
      case 'audioInputFailed':
      case 'videoInputFailed':
      case 'meetingStartFailed':
      case 'meetingFailed': {
        // Send the last 5 minutes of events.
        if (this.meetingEventPOSTLogger) {
          this.meetingEventPOSTLogger.info(JSON.stringify({
            name,
            attributes: {
              ...otherAttributes,
              meetingHistory: meetingHistory.filter(({ timestampMs }) => Date.now() - timestampMs < this.MAX_MEETING_HISTORY_MS),
            },
          }));
        }
        break;
      }
      default: true;
    }
  }

  leave() {
    this.statsCollector.resetStats();
    this.state.audioVideo.stop();
    if (this.voiceFocusDevice) {
      this.voiceFocusDevice.stop();
    }
    this.voiceFocusDevice = undefined;
    this.setState({ roster: {} });
  }

  async getStatsForOutbound(id) {
    const videoElement = document.getElementById(id);
    const stream = videoElement.srcObject;
    const track = stream.getVideoTracks()[0];
    const basicReports = {};

    const reports = await this.state.audioVideo.getRTCPeerConnectionStats(track);
    let duration = null;

    reports.forEach((report) => {
      if (report.type === 'outbound-rtp') {
        // remained to be calculated
        this.log(`${id} is bound to ssrc ${report.ssrc}`);
        basicReports.bitrate = report.bytesSent;
        basicReports.width = report.frameWidth;
        basicReports.height = report.frameHeight;
        basicReports.fps = report.framesEncoded;
        duration = report.timestamp;
      }
    });

    await new TimeoutScheduler(1000).start(() => {
      this.state.audioVideo.getRTCPeerConnectionStats(track).then((reports) => {
        reports.forEach((report) => {
          if (report.type === 'outbound-rtp') {
            duration = report.timestamp - duration;
            duration /= 1000;
            // remained to be calculated
            basicReports.bitrate = Math.trunc((report.bytesSent - basicReports.bitrate) * 8 / duration);
            basicReports.width = report.frameWidth;
            basicReports.height = report.frameHeight;
            basicReports.fps = Math.trunc((report.framesEncoded - basicReports.fps) / duration);
            this.log(JSON.stringify(basicReports));
            // alert('alright you got some reports');
          }
        });
      });
    });
  }

  async reselectAudioInputDevice() {
    const current = this.currentAudioInputDevice;

    if (current instanceof VoiceFocusTransformDevice) {
      // Unwrap and rewrap if Amazon Voice Focus is selected.
      const intrinsic = current.getInnerDevice();
      const device = await this.audioInputSelectionWithOptionalVoiceFocus(intrinsic);
      return this.selectAudioInputDevice(device);
    }

    // If it's another kind of transform device, just reselect it.
    if (isAudioTransformDevice(current)) {
      return this.selectAudioInputDevice(current);
    }

    // Otherwise, apply Amazon Voice Focus if needed.
    const device = await this.audioInputSelectionWithOptionalVoiceFocus(current);
    return this.selectAudioInputDevice(device);
  }

  audioVideoDidStartConnecting(reconnecting) {
    this.log(`session connecting. reconnecting: ${reconnecting}`);
  }

  audioVideoDidStop(sessionStatus) {
    this.log(`session stopped from ${JSON.stringify(sessionStatus)}`);
    this.log('resetting stats in WebRTCStatsCollector');
    this.statsCollector.resetStats();
    if (sessionStatus.statusCode() === MeetingSessionStatusCode.AudioCallEnded) {
      this.log('meeting ended');
      // alert('the meeting ended');
      popAlert({ title: 'Meeting ended', error: true });
      Router.push(`${props.AppUrl}/`);
      // @ts-ignore
      // window.location = window.location.pathname;
    } else if (sessionStatus.statusCode() === MeetingSessionStatusCode.Left) {
      this.log('left meeting');

      // @ts-ignore
      // window.location = window.location.pathname;
    }
  }

  videoTileWasRemoved(tileId) {
    this.setState({
      videoTiles: this.state.audioVideo.getAllVideoTiles(),
    });
    const tileIndex = this.tileOrganizer.releaseTileIndex(tileId);
    this.log(`video tileId removed: ${tileId} from tile-${tileIndex}`);
    this.updateRoster();
  }

  videoAvailabilityDidChange(availability) {
    this.canStartLocalVideo = availability.canStartLocalVideo;
    console.log('video availabilty changed ', availability);
    // alert(`video availabilty changed ${availability}`);
    this.updateRoster();
    this.log(`video availability changed: canStartLocalVideo  ${availability.canStartLocalVideo}`);
  }

  connectionDidBecomePoor() {
    this.log('connection is poor');
  }

  connectionDidSuggestStopVideo() {
    this.log('suggest turning the video off');
  }

  connectionDidBecomeGood() {
    this.log('connection is good now');
  }

  videoSendDidBecomeUnavailable() {
    this.log('sending video is not available');
  }

  reRender() {
    this.setState({
      reRender: !this.state.reRender,
    });
  }

  contentShareDidStart(tiles) {
    console.log('we have started', tiles);
    // alert('we have started');
    this.reRender();
    this.log('content share started.');
  }

  contentShareDidStop() {
    // alert('content share have stopped');
    this.log('content share stopped.');
    this.setState({
      screenShare: null,
    });
    this.updateRoster();
  }

  contentShareDidUnpause() {
    this.log('content share unpaused.');
  }

  encodingSimulcastLayersDidChange(simulcastLayers) {
    this.log(`current active simulcast layers changed to: ${this.SimulcastLayerMapping[simulcastLayers]}`);
  }

  remoteVideoSourcesDidChange(videoSources) {
    this.log(`available remote video sources changed: ${JSON.stringify(videoSources)}`);
  }

  setVideoQuality(value) {
    this.setState({ videoQuality: value });
  }

  resetChatsNewMessages() {
    this.setState({ chatsNewMessages: 0 });
  }

  render() {
    const { props } = this;
    const { state } = this;

    const { loading } = state;
    // if (loading) return 'owo loading';

    // TODO --- configure other stuff for the meeting

    console.log('Starting the Chime meeting!');
    const meetingSetUpVideoPreview = (
      <video
        id="video-preview"
        className="w-100 h-100"
        ref={(e) => {
          this.videoPreview = e;
        }}
      />
    );

    return (
      <div id="meeting">
        <audio id="meeting-audio" style={{ display: 'none' }} />

        <SetUpDevice
          {...props}
          hide={state.flow !== 'flow-devices'}
          audioVideo={state.audioVideo}
          meetingId={state.meetingId}
          videoQuality={state.videoQuality}
          LoadPage={this.LoadPage}
          setAudioInput={this.setAudioInput}
          setVideoInput={this.setVideoInput}
          setAudioOutput={this.setAudioOutput}
          setVideoPreview={this.setVideoPreview}
          joinMeeting={this.joinMeetingFromSetUp}
          setVideoInputQuality={this.setVideoInputQuality}
          setVideoQuality={this.setVideoQuality}
          openAudioInputFromSelectionAndPreview={this.openAudioInputFromSelectionAndPreview}
          openVideoInputFromSelection={this.openVideoInputFromSelection}
          openAudioOutputFromSelection={this.openAudioOutputFromSelection}
          testSound={async () => {
            await this.TestSound(this.meetingEventPOSTLogger, this.audioOutput.value);
          }}
        />

        <MeetingScreen
          {...props}
          HOST_CMD={this.HOST_CMD}
          meetingId={state.meetingId}
          audioVideo={state.audioVideo}
          audioInputDevice={state.audioInputDevice}
          endsAt={state.endsAt}
          endMeeting={this.endMeeting}
          audioOuputDevice={state.audioOuputDevice}
          allVideoTiles={state.audioVideo ? state.audioVideo.getAllVideoTiles() : ['fd']}
          chatsScrollToBottom={state.chatsScrollToBottom}
          chats={state.chats}
          chatsNewMessages={state.chatsNewMessages}
          hide={state.flow !== 'flow-meeting'}
          participants={state.participants}
          roster={state.roster}
          videoQuality={state.videoQuality}
          videoInputDevice={state.videoInputDevice}
          localTile={state.localTile}
          screenShare={state.screenShare}
          videoInput={this.videoInput}
          setVideoQuality={this.setVideoQuality}
          meetingSession={this.meetingSession}
          resetChatsScrollToBottom={this.resetChatsScrollToBottom}
          resetChatsNewMessages={this.resetChatsNewMessages}
          dataMessageHandler={this.dataMessageHandler}
          getHostParticipant={this.getHostParticipant}
          getCurrentParticipant={this.getCurrentParticipant}
          contentShareDidStop={this.contentShareDidStop}
          hostMuteParticipant={this.hostMuteParticipant}
          hostStopParticipantVideo={this.hostStopParticipantVideo}
          openVideoInputFromSelection={this.openVideoInputFromSelection}
          openAudioOutputFromSelection={this.openAudioOutputFromSelection}
          openAudioInputFromSelection={this.openAudioInputFromSelection}
          reRender={this.reRender}
        />
        <div id="flow-failed-meeting" className="flow">
          <div className="container">
            <form id="form-failed-meeting">
              <div className="card border-warning mb-3" style={{ 'max-width': '20rem' }}>
                <div id="failed-meeting" className="card-header" />
                <div className="card-body">
                  <h4 className="card-title">Unable to find meeting</h4>
                  <p className="card-text">There was an issue finding that meeting. The meeting may have already ended, or your authorization may have expired.</p>
                  <small id="failed-meeting-error" className="text-muted" />
                </div>
              </div>
              <button className="btn btn-lg btn-outline-warning btn-block" type="submit">OK</button>
            </form>
          </div>
        </div>

        <div id="flow-need-permission" className="flow">
          <div className="container">
            <form id="form-need-permission">
              <div className="card border-info mb-3" style={{ 'max-width': '20rem' }}>
                <div className="card-header">Permissions check</div>
                <div className="card-body">
                  <h4 className="card-title">Unable to get device labels</h4>
                  <p className="card-text">In order to select media devices, we need to do a quick permissions check of your mic and camera. When the pop-up appears, choose <b>Allow</b>.</p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          id="flow-meeting-old"
          className="flow"
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            bottom: '55px',
            right: '0',
          }}
        >
          <div
            className="p-2 d-none d-sm-block align-items-end"
            style={{
              position: 'fixed',
              right: '0',
              bottom: '0',
              left: '0',
            }}
          />
          <div id="meeting-container" className="container-fluid h-100" style={{ display: 'flex', flexFlow: 'column' }}>
            <div className="row mb-3 mb-lg-0" style={{ flex: 'unset' }}>
              <div className="col-12 col-lg-3 order-1 order-lg-1 text-center text-lg-left" />
              <div className="col-8 col-lg-6 order-2 order-lg-2 text-left text-lg-center">
                <div className="btn-group mx-1 mx-xl-2 my-2" role="group" aria-label="Toggle microphone">
                  <button id="button-microphone" type="button" className="btn btn-success" title="Toggle microphone">
                    {/* ${require('../../node_modules/open-iconic/svg/microphone.svg').default} */}
                    microphone
                  </button>
                  <div className="btn-group" role="group">
                    <button id="button-microphone-drop" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Select microphone" />
                    <div
                      id="dropdown-menu-microphone"
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="button-microphone-drop"
                      x-placement="bottom-start"
                      style={{
                        position: 'absolute',
                        transform: 'translate3d(0px, 38px, 0px)',
                        top: '0px',
                        left: '0px',
                        willChange: 'transform',
                      }}
                    >
                      <a className="dropdown-item" href="#">Default microphone</a>
                    </div>
                  </div>
                </div>
                <div className="btn-group mx-1 mx-xl-2 my-2" role="group" aria-label="Toggle camera">
                  <button id="button-camera-old" type="button" className="btn btn-success" title="Toggle camera">
                    {/* ${require('../../node_modules/open-iconic/svg/video.svg').default} */}
                    videof
                  </button>
                  <div className="btn-group" role="group">
                    <button id="button-camera-drop" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Select camera" />
                    <div
                      id="dropdown-menu-camera"
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="button-camera-drop"
                      x-placement="bottom-start"
                      style={{
                        position: 'absolute',
                        transform: 'translate3d(0px, 38px, 0px)',
                        top: '0px',
                        left: '0px',
                        willChange: 'transform',
                      }}
                    >
                      <a className="dropdown-item" href="#">Default camera</a>
                    </div>
                  </div>
                </div>
                <div className="btn-group mx-1 mx-xl-2 my-2" role="group" aria-label="Toggle content share">
                  <button id="button-content-share" type="button" className="btn btn-success" title="Toggle content share">
                    {/* ${require('../../node_modules/open-iconic/svg/camera-slr.svg').default} */}
                    camera
                  </button>
                  <div className="btn-group" role="group">
                    <button id="button-content-share-drop" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Select content to share" />
                    <div
                      id="dropdown-menu-content-share"
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="button-content-share-drop"
                      x-placement="bottom-start"
                      style={{
                        position: 'absolute',
                        transform: 'translate3d(0px, 38px, 0px)',
                        top: '0px',
                        left: '0px',
                        willChange: 'transform',
                      }}
                    >
                      <a id="dropdown-item-content-share-screen-capture" className="dropdown-item" href="#">Screen Capture...</a>
                      <a id="dropdown-item-content-share-screen-test-video" className="dropdown-item" href="#">Test Video</a>
                      <a id="dropdown-item-content-share-file-item" className="dropdown-item" href="#"><input id="content-share-item" type="file" /></a>
                    </div>
                  </div>
                </div>
                <button id="button-pause-content-share" type="button" className="btn btn-success mx-1 mx-xl-2 my-2" title="Pause and unpause content share">
                  {/* ${require('../../node_modules/open-iconic/svg/media-pause.svg').default} */}
                  pause
                </button>
                <div className="btn-group mx-1 mx-xl-2 my-2" role="group" aria-label="Toggle speaker">
                  <button id="button-speaker" type="button" className="btn btn-success" title="Toggle speaker">
                    {/* ${require('../../node_modules/open-iconic/svg/volume-low.svg').default} */}
                    volume low
                  </button>
                  <div className="btn-group" role="group">
                    <button id="button-speaker-drop" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Select speaker" />
                    <div
                      id="dropdown-menu-speaker"
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="button-speaker-drop"
                      x-placement="bottom-start"
                      style={{
                        position: 'absolute',
                        transform: 'translate3d(0px, 38px, 0px)',
                        top: '0px',
                        left: '0px',
                        willChange: 'transform',
                      }}
                    >
                      <a className="dropdown-item" href="#">Default speaker</a>
                    </div>
                  </div>
                </div>
                <button id="button-video-stats" type="button" className="btn btn-success mx-1 mx-xl-2 my-2" title="Toggle video WebRTC stats display" data-toggle="button" aria-pressed="false" autoComplete="off">
                  {/* ${require('../../node_modules/open-iconic/svg/signal.svg').default} */}
                  signal
                </button>
              </div>
              <div className="col-4 col-lg-3 order-3 order-lg-3 text-right text-lg-right">
                <button id="button-meeting-leave" type="button" className="btn btn-outline-success mx-1 mx-xl-2 my-2 px-4" title="Leave meeting">
                  {/* ${require('../../node_modules/open-iconic/svg/account-logout.svg').default} */}
                  log out
                </button>
                <button id="button-meeting-end" type="button" className="btn btn-outline-danger mx-1 mx-xl-2 my-2 px-4" title="End meeting">
                  {/* ${require('../../node_modules/open-iconic/svg/power-standby.svg').default} */}
                  power-standby
                </button>
              </div>
            </div>
            <div id="roster-tile-container" className="row flex-sm-grow-1 overflow-hidden h-100" style={{ flex: 'unset' }}>
              <div id="roster-message-container" className="d-flex flex-column col-12 col-sm-6 col-md-5 col-lg-4 h-100">
                <div className="bs-component" style={{ flex: '1 1 auto', overflowY: 'auto', height: '50%' }}>
                  <ul id="roster" className="list-group" />
                </div>
                <div className="message d-flex flex-column pt-3" style={{ flex: '1 1 auto', overflow: 'hidden', height: '50%' }}>
                  <div
                    className="list-group receive-message"
                    id="receive-message"
                    style={{
                      flex: '1 1 auto',
                      overflowY: 'auto',
                      border: '1px solid rgba(0, 0, 0, 0.125)',
                      backgroundColor: '#fff',
                    }}
                  />
                  <div
                    className="input-group send-message"
                    style={{
                      display: 'flex',
                      flex: '0 0 auto',
                      marginTop: '0.2rem',
                    }}
                  >
                    <textarea
                      className="form-control shadow-none"
                      id="send-message"
                      rows="1"
                      placeholder="Type a message (markdown supported)"
                      style={{
                        display: 'inline-block',
                        width: '100%',
                        resize: 'none',
                        borderColor: 'rgba(0, 0, 0, 0.125)',
                        outline: 'none',
                        paddingLeft: '1.4rem',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div id="tile-container" className="col-12 col-sm-6 col-md-7 col-lg-8 my-4 my-sm-0 h-100" style={{ overflowY: 'scroll' }}>
                <div id="tile-area" className="v-grid">
                  <div id="tile-0" className="video-tile">
                    <video id="video-0" className="video-tile-video" />
                    <div id="attendeeid-0" className="video-tile-attendeeid" />
                    <div id="nameplate-0" className="video-tile-nameplate" />
                    <button
                      id="video-pause-0"
                      className="video-tile-pause"
                    >Pause
                    </button>
                  </div>
                  <div id="tile-1" className="video-tile">
                    <video id="video-1" className="video-tile-video" />
                    <div id="attendeeid-1" className="video-tile-attendeeid" />
                    <div id="nameplate-1" className="video-tile-nameplate" />
                    <button id="video-pause-1" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-2" className="video-tile">
                    <video id="video-2" className="video-tile-video" />
                    <div id="attendeeid-2" className="video-tile-attendeeid" />
                    <div id="nameplate-2" className="video-tile-nameplate" />
                    <button id="video-pause-2" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-3" className="video-tile">
                    <video id="video-3" className="video-tile-video" />
                    <div id="attendeeid-3" className="video-tile-attendeeid" />
                    <div id="nameplate-3" className="video-tile-nameplate" />
                    <button id="video-pause-3" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-4" className="video-tile">
                    <video id="video-4" className="video-tile-video" />
                    <div id="attendeeid-4" className="video-tile-attendeeid" />
                    <div id="nameplate-4" className="video-tile-nameplate" />
                    <button id="video-pause-4" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-5" className="video-tile">
                    <video id="video-5" className="video-tile-video" />
                    <div id="attendeeid-5" className="video-tile-attendeeid" />
                    <div id="nameplate-5" className="video-tile-nameplate" />
                    <button id="video-pause-5" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-6" className="video-tile">
                    <video id="video-6" className="video-tile-video" />
                    <div id="attendeeid-6" className="video-tile-attendeeid" />
                    <div id="nameplate-6" className="video-tile-nameplate" />
                    <button id="video-pause-6" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-7" className="video-tile">
                    <video id="video-7" className="video-tile-video" />
                    <div id="attendeeid-7" className="video-tile-attendeeid" />
                    <div id="nameplate-7" className="video-tile-nameplate" />
                    <button id="video-pause-7" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-8" className="video-tile">
                    <video id="video-8" className="video-tile-video" />
                    <div id="attendeeid-8" className="video-tile-attendeeid" />
                    <div id="nameplate-8" className="video-tile-nameplate" />
                    <button id="video-pause-8" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-9" className="video-tile">
                    <video id="video-9" className="video-tile-video" />
                    <div id="attendeeid-9" className="video-tile-attendeeid" />
                    <div id="nameplate-9" className="video-tile-nameplate" />
                    <button id="video-pause-9" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-10" className="video-tile">
                    <video id="video-10" className="video-tile-video" />
                    <div id="attendeeid-10" className="video-tile-attendeeid" />
                    <div id="nameplate-10" className="video-tile-nameplate" />
                    <button id="video-pause-10" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-11" className="video-tile">
                    <video id="video-11" className="video-tile-video" />
                    <div id="attendeeid-11" className="video-tile-attendeeid" />
                    <div id="nameplate-11" className="video-tile-nameplate" />
                    <button id="video-pause-11" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-12" className="video-tile">
                    <video id="video-12" className="video-tile-video" />
                    <div id="attendeeid-12" className="video-tile-attendeeid" />
                    <div id="nameplate-12" className="video-tile-nameplate" />
                    <button id="video-pause-12" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-13" className="video-tile">
                    <video id="video-13" className="video-tile-video" />
                    <div id="attendeeid-13" className="video-tile-attendeeid" />
                    <div id="nameplate-13" className="video-tile-nameplate" />
                    <button id="video-pause-13" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-14" className="video-tile">
                    <video id="video-14" className="video-tile-video" />
                    <div id="attendeeid-14" className="video-tile-attendeeid" />
                    <div id="nameplate-14" className="video-tile-nameplate" />
                    <button id="video-pause-14" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-15" className="video-tile">
                    <video id="video-15" className="video-tile-video" />
                    <div id="attendeeid-15" className="video-tile-attendeeid" />
                    <div id="nameplate-15" className="video-tile-nameplate" />
                    <button id="video-pause-15" className="video-tile-pause">Pause</button>
                  </div>
                  <div id="tile-16" className="video-tile">
                    <video id="video-16" className="video-tile-video" />
                    <div id="attendeeid-16" className="video-tile-attendeeid" />
                    <div id="nameplate-16" className="video-tile-nameplate" />
                    <button id="video-pause-16" className="video-tile-pause" className="btn">Pause</button>
                  </div>
                  <div id="tile-17" className="video-tile">
                    <video id="video-17" className="video-tile-video" />
                    <div id="nameplate-17" className="video-tile-nameplate" />
                    <button id="video-pause-17" className="video-tile-pause" className="btn">Pause</button>
                  </div>
                </div>
              </div>
              <video id="content-share-video" crossOrigin="anonymous" />
            </div>
          </div>
        </div>
        <div id="flow-failed-join" className="flow">
          <div className="container">
            <form id="form-failed-join">
              <div className="card border-warning mb-3" style={{ 'max-width': '20rem' }}>
                <div id="failed-join" className="card-header" />
                <div className="card-body">
                  <h4 className="card-title">Unable to join meeting</h4>
                  <p className="card-text">There was an issue joining that meeting. Check your connectivity and try again.</p>
                  <small id="failed-join-error" className="text-muted" />
                </div>
              </div>
              <button className="btn btn-lg btn-outline-warning btn-block" type="submit">OK</button>
            </form>
          </div>
        </div>
        {state.showEndMeetingCountDown && (
          <div
            className="hmv-alert"
            onClick={() => {
              clearInterval(this.endCallCountDownTimer);
              this.setState({
                showEndMeetingCountDown: 0,
              });
            }}
          >
            <div
              className="swal2-popup swal2-modal hmv-alert-pop-up"
              style={{ display: 'flex' }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div className="swal2-header">
                <h2 className="swal2-title hmv-alert-title last-child" id="swal2-title" style={{ display: 'block' }}>
                  <span
                    className="hmv-alert-title-label"
                    style={{
                      textTransform: 'initial !important',
                    }}
                  >This meeting will end in {state.showEndMeetingCountDown.toFixed(0)} second{state.showEndMeetingCountDown > 1 ? 's' : ''}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Meeting.propTypes = {
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

Meeting.defaultProps = {
  className: '',
  values: [],
  options: [{}],
  mandatory: false,
  isEditable: true,
  multichoice: true,
  style: {},
  onChange: () => { },
};

export default Meeting;
