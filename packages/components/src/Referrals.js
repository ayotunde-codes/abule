import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { isEmail, mobileCheck } from './Fn';
import ToolTipWrapper from './ToolTipWrapper';
// import { Referrals } from "antd-mobile";

class Referrals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referralList: [],
      fetchingSample: true,
      showCopiedMessage: false,
      sample: '',
    };

    const { sessionUser } = props.settings;
    this.activityURL = `${process.env.FULL_APP_URL}/signup?referer=${sessionUser.id}`;
    this.shareMessage = (
      `Hi
${sessionUser ? `${sessionUser.firstName} wants you to` : 'I think you should'} check out Abule
${this.activityURL}`
    );
    this.shareOptions = [
      {
        label: 'Social Media',
        options: [
          {
            label: 'facebook',
            icon: 'fa fa-facebook',
            onClick: () => {
              if (window.FB) {
                window.FB.ui({
                  display: 'popup',
                  method: 'share',
                  href: this.activityURL,
                  quote: this.shareMessage,
                }, (response) => {
                  console.log('response gotten', response);
                });
              }
            },
          },
          {
            label: 'twitter',
            icon: 'fa fa-twitter',
            onClick: () => {
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.shareMessage)}`);
            },
          },
          {
            label: 'linkedIn',
            icon: 'fa fa-linkedin',
            onClick: () => {
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${this.activityURL}`);
            },
          },
        ],
      },
      {
        label: 'Messaging & Email',
        options: [
          {
            label: 'email',
            icon: 'fa fa-envelope',
            onClick: () => {
              window.open(`mailto:?subject=Check%20out%20this%20activity%20on%20Abulé&${this.shareMessage}`);
            },
          },
          {
            label: 'whatsapp',
            icon: 'fa fa-whatsapp',
            onClick: () => {
              if (mobileCheck()) {
                window.open(`whatsapp://send?text=${encodeURIComponent(this.shareMessage)}`);
              } else {
                window.open(`https://web.whatsapp.com://send?text=${encodeURIComponent(this.shareMessage)}`);
              }
            },
          },
          {
            label: 'SMS',
            icon: 'fa fa-comment-o',
            onClick: () => {
              window.open(`sms:&body=${encodeURIComponent(this.shareMessage)}`);
            },
          },
          {
            label: 'messager',
            icon: 'fa fa-comment-o',
            onClick: () => {
              if (window.FB) {
                window.FB.ui({
                  display: 'popup',
                  method: 'send',
                  link: this.activityURL,
                  quote: this.shareMessage,
                }, (response) => {
                  console.log('response gotten', response);
                });
              }
            },
          },
        ],
      },
    ];
  }

  async componentDidMount() {
    const { props, state } = this;
    const { settings, editProfile, fetchRequest } = props;
    const data = await fetchRequest({
      url: `${process.env.REACT_APP_API}/get-invitation-text`,
    });
    this.setState({
      sample: data.sample,
      fetchingSample: false,
    });

    $.ajaxSetup({ cache: true });
    // load script
    $.getScript('https://connect.facebook.net/en_US/sdk.js', () => {
      window.FB.init({
        appId: process.env.FACEBOOK_APP_ID,
        version: 'v2.7', // or v2.1, v2.2, v2.3, ...
      });
    });
  }

  showCopiedMessage() {
    this.setState({
      showCopiedMessage: true,
    });

    setTimeout(() => {
      this.setState({
        showCopiedMessage: false,
      });
    }, 2000);
  }

  render() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { sessionUser } = settings;
    const {
      referralList, fetchingSample, sample, showCopiedMessage,
    } = state;

    return (
      <>
        <div className="referral-content">
          <p className="referral-incentive">Get $20. Gift $20 to friends</p>

          {this.shareOptions.map((group) => (

            <div className="group">
              <div className="group-title">
                <div className="label">{group.label}</div>
                <span className="ruler" />
              </div>
              <div className="group-content">
                {group.options.map((type) => (
                  <div
                    className="media-type"
                    onClick={() => {
                      if (type.onClick) {
                        type.onClick();
                      }
                    }}
                  >
                    <span className={`icon ${type.icon} ${type.label}`} />
                    <span className="name">{type.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="group">
            <div className="group-title">
              <div className="label">Copy Link</div>
              <span className="ruler" />
            </div>
            <div className="group-content single">
              <div className="link-copier">
                <input
                  readOnly
                  id="copyUrl"
                  value={this.activityURL}
                />
                <ToolTipWrapper
                  showToolTip={state.showCopiedMessage}
                  message="Copied!"
                >
                  <abbr
                    title="copy to clipboard"
                    onClick={() => {
                      const link = document.getElementById('copyUrl');
                      link.select();
                      document.execCommand('copy');
                      this.showCopiedMessage();
                    }}
                  >
                    <button type="button">copy</button>
                  </abbr>
                </ToolTipWrapper>

              </div>
            </div>
          </div>
        </div>

      </>
    );
  }
}

Referrals.propTypes = {
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Referrals.defaultProps = {
  placeholder: 'search',
  onEnter: () => { },
  onFocus: () => { },
  onChange: () => { },
  onBlur: () => { },
};

export default Referrals;
