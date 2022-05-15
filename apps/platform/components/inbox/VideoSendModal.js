import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const VideoSendModal = ({
  modal, setModal, video, channel, showButton,
}) => {
  const [loading, setLoading] = useState(false);
  const sendVideo = async () => {
    if (!loading) {
      setLoading(true);
      const form = new FormData();
      form.append('video', video);
      if (channel) {
        await channel.sendMessage(form);
      }
      setLoading(false);
      setModal(false);
    }
  };

  return (
    <Modal
      style={{ modal: { 'max-width': 'fit-content !important' } }}
      open={modal}
      onClose={() => setModal(false)}
      center
      showCloseIcon={false}
    >
      <div className="modal-content">
        {video && (
          <video
            className="video-to-send"
            src={URL.createObjectURL(video)}
            autoPlay
            muted
            controls
          />
        )}
        {showButton && (
          <div className="send-btn button-to-send">
            <a>
              <button onClick={sendVideo} className="btn" type="button">
                {!loading && <p className="send-desktop">SEND</p>}
                {!!loading && <span className="icon-refresh icon spinner" />}
              </button>
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VideoSendModal;
