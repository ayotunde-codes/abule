import Router from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import InboxMain from './index';

const IndividualRecipent = (props) => {
  const { header, screen } = props.settings;
  const { inbox } = props;
  const hideNavigation = screen.width <= process.env.MOBILE_BREAKPOINT;
  const { conversations, loadingConversations } = inbox;
  if (loadingConversations) {
    return '';
  }
  console.log('the converssations in al is', conversations.length, conversations);
  // get recipient
  let recipient = false;
  const recipientId = Router.query.id;
  //
  for (const conv of conversations) {
    console.log('conv', conv.recipient);
    console.log('convDD', conv);
    if (conv && conv.recieverId === recipientId) {
      const recipientsObj = {
        firstName: conv.recieverFirstName,
        lastName: conv.recieverLastName,
        imageUrl: conv.recieverImage,
        userId: conv.recieverId,
        pending: conv.pending,
        ignore: conv.ignore,
        conversation: conv.conversation,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
      };
      recipient = recipientsObj;
      break;
    }
  }

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', { recipient });
  console.log('all done ', recipient);

  console.log('new id');
  return (
    <InboxMain
      {...props}
      recipientId={recipientId}
      recipient={recipient}
      s
      style={{
        height: `calc(100vh - ${header.height + header.marginBottom}px)`,
      }}
      hideNavigation={hideNavigation}
      hideChat={false}
    />
  );
};
const mapStateToProps = (state) => ({
  inbox: state.inbox,
});

export default connect(mapStateToProps)(IndividualRecipent);
