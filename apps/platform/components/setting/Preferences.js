import React from 'react';
import Toggle from 'react-toggle';
import { InputSelect } from '@abule-common/components';
import { prefTheVillage, prefTribe, prefPerson } from '../../public/data/assets';

const prefList = {
  profile: [
    {
      name: 'profileViewSetting',
      question: 'Show my profile only to',
      options: [
        {
          label: 'village',
        },
        {
          label: 'tribe',
        },
        {
          label: 'none',
        },
      ],
    },
    {
      name: 'kidViewSetting',
      question: 'Show my kids profiles only to',
      options: [
        {
          label: 'village',
        },
        {
          label: 'tribe',
        },
        {
          label: 'none',
        },
      ],
    },
  ],
  inbox: [
    {
      name: 'tribeInboxNotificationSetting',
      question: 'Notify me when someone from the village sends me a message',
      options: [
        {
          label: 'yes',
          value: true,
        },
        {
          label: 'no',
          value: false,
        },
      ],
    },
    {
      name: 'villageInboxNotificationSetting',
      question: 'Notify me when someone from my tribe sends me a message',
      options: [
        {
          label: 'yes',
          value: true,
        },
        {
          label: 'no',
          value: false,
        },
      ],
    },

  ],
};

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileViewSetting: 'village',
      kidViewSetting: 'village',
      tribeInboxNotificationSetting: true,
      villageInboxNotificationSetting: true,
    };
  }

  componentDidMount() {
    const { props } = this;
    const { sessionUser } = props.settings;
    const userPreference = sessionUser.preference;
    console.log('user preference is : ', userPreference);
    if (userPreference) {
      this.setState({
        profileViewSetting: userPreference.profileViewSetting,
        kidViewSetting: userPreference.kidViewSetting,
        tribeInboxNotificationSetting: userPreference.tribeInboxNotificationSetting,
        villageInboxNotificationSetting: userPreference.villageInboxNotificationSetting,
      });
    }
  }

  updatePreference(data) {
    this.setState(data, () => {
      // auto update preferences
      this.props.fetchRequest({
        url: `${process.env.REACT_APP_API}/user/preference`,
        method: 'POST',
        body: JSON.stringify({
          ...this.state,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  }

  render() {
    const { props, state } = this;
    const { settings, className } = props;

    return (
      <div id="preferencesSettings" className={className}>
        <h4 className="setting-sub-header">PREFERENCES</h4>
        <div className="note">Change your notification preferences.</div>
        <div className="preferences-container">
          {/* <Toggle onClick={() => console.log('worked')} icons={false} /> */}
          {Object.keys(prefList).map((group) => {
            const k = '';
            return (
              <>
                <div className="preference-group">
                  <div className="preference-title">{group}</div>
                  <div className="preference-list">
                    {prefList[group].map((pref) => {
                      const kk = '';
                      return (
                        <div className="preference-item">
                          <div className="preference-item-question">{pref.question}</div>
                          <div className="preference-item-options">
                            <InputSelect
                              value={state[pref.name]}
                              /* options={WeekDays.map((day) => {
                                const label = capitalize(`${day[0]}${day[1]}${day[2]}`);
                                return {
                                  label,
                                  value: day,
                                  disable: support.days[day].length === 0,
                                };
                              })} */
                              options={pref.options}
                              onChange={(value) => {
                                this.updatePreference({
                                  [pref.name]: value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}

        </div>
      </div>
    );
  }
}

export default Preferences;
