import React from 'react';

class CreateChat extends React.Component {
  render() {
    const { props } = this;
    return (
      <div className="create-chat">
        <h3 className="header">Send a Message</h3>
        <p className="info">Send a message to a person or create a group chat </p>
        <button
          type="button"
          className="btn btn-1 btn-2x no-shadow"
          onClick={props.createConversation}
        > SELECT RECIPIENT
        </button>
      </div>
    );
  }
}

export default CreateChat;
