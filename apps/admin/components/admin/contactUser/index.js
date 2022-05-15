import { Fn } from '@abule-common/components';
import axios from 'axios';
import { useState } from 'react';
import { EmailUser, MessageUser } from './popups';
import TriICon from '../icons/triangle-ico';

const {
  isEmpty, popMessage,

} = Fn;

const ContactUser = ({
  userId, token, contactDropdown, setContactDropdown,
}) => {
  const [messageDetails, setMessageDetails] = useState({
    emailMessage: '',
    emailSubject: '',
    smsMessage: '',
  });
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showSMSForm, setShowSMSForm] = useState(false);

  const onSubmitMessage = async (e) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = {
        message: messageDetails.smsMessage.trim(),
        userId,
      };
      if (messageDetails.smsMessage === '') throw new Error();
      console.log('The cred----', data, token);

      await axios.post(
        `${process.env.REACT_APP_API}/admin/message/sms`,
        data,
        config,
      );
      popMessage(
        `<div>
                    <img src='/icons/success-ico.svg' alt='icon'>
                    <span>Success</span> 
                    <div>Message Delivered</div>
                </div>`,
        'adminApp_message',
      );
    } catch (e) {
      console.log(e);
      popMessage(
        `<div>
                    <img src='/icons/error-ico.svg' alt='icon'>
                    <span>Error</span> 
                    <div>Message not delivered</div>
                </div>`,
        'adminApp_message',
      );
    }
  };

  const onSubmitMail = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = {
        subject: messageDetails.emailSubject.trim(),
        message: messageDetails.emailMessage.trim(),
        userId,
      };
      if (isEmpty(messageDetails.emailSubject) || isEmpty(messageDetails.emailMessage)) throw new Error('');

      await axios.post(
        `${process.env.REACT_APP_API}/admin/message/email`,
        data,
        config,
      );
      popMessage(
        `<div>
                    <img src='/icons/success-ico.svg' alt='icon'>
                    <span>Success</span> 
                    <div>Message Delivered</div>
                </div>`,
        'adminApp_message',
      );
      setMessageDetails({
        ...messageDetails,
        emailMessage: '',
        emailSubject: '',
      });
    } catch (e) {
      popMessage(
        `<div>
                    <img src='/icons/error-ico.svg' alt='icon'>
                    <span>Error</span> 
                    <div>Message not delivered</div>
                </div>`,
        'adminApp_message',
      );
    }
  };

  const onClickCall = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = {
        message: 'Placing call',
        userId,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API}/admin/message/call`,
        data,
        config,
      );
      popMessage(
        `<div>
                    <img src='/icons/success-ico.svg' alt='icon'>
                    <span>Success</span> 
                    <div>Call has been placed</div>
                </div>`,
        'adminApp_message',
      );
      console.log(res);
    } catch (e) {
      console.log(e);
      popMessage(
        `<div>
                        <img src='/icons/error-ico.svg' alt='icon'>
                        <span>Error</span> 
                        <div>Call could not be placed</div>
                    </div>`,
        'adminApp_message',
      );
    }
  };

  return (
    <>
      <div className="adminApp_messageUser_container">
        <div onClick={() => setContactDropdown(!contactDropdown)} className="adminApp_messageUser">
          Contact User
        </div>
        {
          contactDropdown && (
            <div className="adminApp_mesageUser_Options">
              <TriICon stroke="white" className="triangle" />
              <div onClick={() => setShowEmailForm(true)} className="adminApp_mailUser">
                <img src="/icons/sms-ico.svg" alt="email" />
                <span>Email</span>
              </div>
              <div onClick={() => setShowSMSForm(true)} className="adminApp_smsUser">
                <img src="/icons/msg-ico.svg" alt="email" />
                <span>Message</span>
              </div>
              <div onClick={onClickCall} className="adminApp_callUser">
                <img src="/icons/call-ico.svg" alt="email" />
                <span>Call</span>
              </div>
            </div>
          )
        }
      </div>
      <EmailUser
        setIsOpen={setShowEmailForm}
        isOpen={showEmailForm}
        email={messageDetails}
        setEmail={setMessageDetails}
        onSubmit={onSubmitMail}
      />
      <MessageUser
        setIsOpen={setShowSMSForm}
        isOpen={showSMSForm}
        email={messageDetails}
        setEmail={setMessageDetails}
        onSubmit={onSubmitMessage}
      />
    </>
  );
};

export default ContactUser;
