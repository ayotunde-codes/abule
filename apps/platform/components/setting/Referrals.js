import React, { useEffect, useState } from 'react';
import { func, object } from 'prop-types';
import {
  Referrals,
  Fn,
} from '@abule-common/components';

const {
  isEmail, popAlert,
} = Fn;

class ReferralPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      referralList: [],
      sendingInvitation: false,
    };

    this.sendInvitation = this.sendInvitation.bind(this);
  }

  async sendInvitation() {
    const { props, state } = this;
    const { referralList } = state;
    if (referralList.length > 0) {
      this.setState({
        sendingInvitation: true,
      });
      try {
        await props.fetchRequest({
          url: `${process.env.REACT_APP_API}/send-invitation-email`,
          method: 'POST',
          body: JSON.stringify({
            email: referralList,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.setState({
          sendingInvitation: false,
          referralList: [],
        });

        popAlert({
          title: 'Invitation Sent Successfully',
        });
      } catch (e) { }
    }
  }

  render() {
    const { props, state } = this;
    const { fetchRequest, settings, className } = props;
    const { referralList, sendingInvitation } = state;
    return (
      <div id="referralsSettings" className={className}>
        <h4 className="setting-sub-header">REFER A FRIEND</h4>
        <div id="referralForm">
          <Referrals
            {...props}
            values={referralList}
            onChange={(rL) => {
              this.setState({
                referralList: rL,
              });
            }}
          />
        </div>
      </div>
    );
  }
}
ReferralPage.propTypes = {
  fetchRequest: func.isRequired,
  settings: object.isRequired,
};

export default ReferralPage;
