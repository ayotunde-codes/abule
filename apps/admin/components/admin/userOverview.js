import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import { CreditsChart, Fn } from '@abule-common/components';
import BarChart from './barChart';
import QuestionIcon from './icons/question-ico';
import EllipseIcon from './icons/ellipse-ico';
import UserIcon from './icons/user-ico';
import CheckIcon from './icons/check-ico';
import TriIcon from './icons/triangle-ico';

const Overview = ({ user }) => {
  const payoutContainer = useRef(null);
  const [verificationPercent, setVerificationPercent] = useState(100);
  const [isTouchEnabled, setIsTouchEnabled] = useState(false);
  const windowSize = Fn.useWindowSize();

  const userJourneyBg = {
    0: 'linear-gradient(to right, transparent 1px, gray 1px, gray 30%, transparent 30%, transparent)',
    50: 'linear-gradient(to right, transparent 1px, rgba(119, 165, 255, 1), 1px, rgba(119, 165, 255, 1) 30%, transparent 30%, transparent)',
    100: 'linear-gradient(to right, transparent 1px, rgba(119, 165, 255, 1), 1px, rgba(119, 165, 255, 1) 55%, transparent 55%, transparent)',
  };

  const personaTabBg = {
    0: 'gray',
    25: 'linear-gradient(to right, rgba(119, 165, 255) 45%, gray 46%, gray 100%)',
    50: 'linear-gradient(to right, rgba(119, 165, 255) 45%, gray 46%, gray 100%)',
    75: 'linear-gradient(to right, rgba(119, 165, 255) 45%, gray 46%, gray 100%)',
    100: '#77A5FF',
  };

  const personaObject = {
    'tribe-parent': 'I  want to create my tribe',
    'tribe-caregiver': 'I  want to invite my tribe',
    'activity-parent': 'I want to host activities',
    'activity-caregiver': 'I\'m looking for activities',
    'request-parent': 'I want to post a request ',
    'request-caregiver': 'I want to pick up a request',
  };

  useEffect(() => {
    if (window.matchMedia('(any-pointer: coarse)').matches) {
      setIsTouchEnabled(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => document.body.style.overflowX = '';
  }, []);

  useEffect(() => {
    const checkVerificationStatus = () => {
      let status = 25;
      user.phoneNumber ? status = +25 : '';
      user.idVerified ? status = +25 : '';
      user.vaccinationVerified ? status = +25 : '';
      setVerificationPercent(status);
    };

    checkVerificationStatus();
  }, []);
  return (
    <div id="root">
      <div className="adminApp_payoutDetailsContainer">
        <div className="adminApp_totalPayout">
          <div><QuestionIcon /></div>
          <div><TriIcon /></div>
          <div><EllipseIcon /></div>
          <div>
            <div className="header">$2000</div>
            <div className="details">
              <span>Total payout</span>
              <span>YTD</span>
            </div>
          </div>
          <div><TriIcon /></div>
          <div><EllipseIcon /></div>
        </div>
        <div>
          {
            windowSize > 1024 && (
              <div onClick={() => payoutContainer.current.scrollLeft -= 50} className="adminApp_arrowLeft">
                <img src="/icons/arrow-left.png" />
              </div>
            )
          }
          <div ref={payoutContainer} className="adminApp_otherPayout">
            <div className="adminApp_payoutTabContainer">
              <div className="adminApp_payoutTab">
                <div>
                  <QuestionIcon
                    className="questionIcon"
                    text="Total amount spent on booking any/all services"
                  />
                </div>
                <div className="adminApp_payoutTab_details">
                  <div className="userIcon">
                    <UserIcon className="icon" />
                  </div>
                  <div className="details">
                    <span>$1806.29</span>
                    <span>Total amount spent (GBV)</span>
                  </div>
                </div>
              </div>
              <div className="adminApp_payoutTab">
                <div>
                  <QuestionIcon
                    className="questionIcon"
                    text="Month on month average order or booking amount"
                  />
                </div>
                <div className="adminApp_payoutTab_details">
                  <div className="userIcon">
                    <UserIcon className="icon" />
                  </div>
                  <div className="details">
                    <span>$150.85</span>
                    <span>Average order value (AOV)</span>
                  </div>
                </div>
              </div>
              <div className="adminApp_payoutTab">
                <div>
                  <QuestionIcon
                    className="questionIcon"
                    text="Total amount recieved from service bookings for all services"
                  />
                </div>
                <div className="adminApp_payoutTab_details">
                  <div className="userIcon">
                    <UserIcon className="icon" />
                  </div>
                  <div className="details">
                    <span>105</span>
                    <span>Lifetime value (LTV)</span>
                  </div>
                </div>
              </div>
              <div className="adminApp_payoutTab">
                <div>
                  <QuestionIcon
                    className="questionIcon"
                    text={'Total number of people in user\'s friend list'}
                    lastTile
                  />
                </div>
                <div className="adminApp_payoutTab_details">
                  <div className="userIcon">
                    <UserIcon className="icon" />
                  </div>
                  <div className="details">
                    <span>50</span>
                    <span>Total number in tribe</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="adminApp_payoutTabContainer">
              <div className="adminApp_payoutTab">
                <div>
                  <QuestionIcon
                    className="questionIcon"
                    text="Total amount earned from booking any/all services"
                  />
                </div>
                <div className="adminApp_payoutTab_details">
                  <div className="userIcon">
                    <UserIcon className="icon" />
                  </div>
                  <div className="details">
                    <span>$182306.29</span>
                    <span>Total amount earned (TIE)</span>
                  </div>
                </div>
              </div>
              <div className="adminApp_payoutTab">
                <div>
                  <QuestionIcon
                    className="questionIcon"
                    text="Month on month average earnings amount"
                  />
                </div>
                <div className="adminApp_payoutTab_details">
                  <div className="userIcon">
                    <UserIcon className="icon" />
                  </div>
                  <div className="details">
                    <span>$2500</span>
                    <span>Average earnings (AIE)</span>
                  </div>
                </div>
              </div>
              <div className="adminApp_payoutTab">
                <div>
                  <QuestionIcon
                    className="questionIcon"
                    text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed"
                  />
                </div>
                <div className="adminApp_payoutTab_details">
                  <div className="userIcon">
                    <UserIcon className="icon" />
                  </div>
                  <div className="details">
                    <span>$1806.29</span>
                    <span>Customer acquisition cost (CAC)</span>
                  </div>
                </div>
              </div>
              <div className="adminApp_payoutTab">
                <div>
                  <QuestionIcon
                    className="questionIcon"
                    text={'Total number of people in user\'s friend list'}
                    lastTile
                  />
                </div>
                <div className="adminApp_payoutTab_details">
                  <div className="userIcon">
                    <UserIcon className="icon" />
                  </div>
                  <div className="details">
                    <span>5</span>
                    <span>Total number of shares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            windowSize > 1024 && (
              <div onClick={() => payoutContainer.current.scrollLeft += 50} className="adminApp_arrowRight">
                <img src="/icons/arrow-right.png" />
              </div>
            )
          }
        </div>
      </div>

      <h3>Onboarding</h3>

      <div className="adminApp_userPersona">
        <div className="adminApp_personaHeader">User persona</div>
        <div>
          <div className="adminApp_primaryPersona">
            <div className="adminApp_personaLabel">Primary</div>
            <div>{personaObject[user?.persona?.primary?.title]}</div>
          </div>

          <div className="adminApp_secondaryPersona">
            <div className="adminApp_personaLabel">Secondary</div>
            <div className="adminApp_personaPillContainer">
              {
                user?.persona?.secondary?.map((persona) => <div className="adminApp_personaPills">{personaObject[persona.title]}</div>)
              }
            </div>
          </div>
        </div>
      </div>

      <div className="adminApp_onboardingContainer">
        <div className="adminApp_userJourney">User journey</div>
        <div className="adminApp_userOnboarding_lg">
          <div>
            <div className="linkedIn">{user?.referralSource || 'Others'}</div>
            <div />
            <div className="profile">Profile <br /> Kid’s Profile</div>
            <div />
          </div>
          <div>
            <div className="adminApp_progressTab">
              <div />
              <div className="tab_text">Referral source</div>
              <div />
            </div>
            <div className="adminApp_progressTab">
              <div />
              <div className="tab_text">Sign up</div>
              <div />
            </div>
            <div className="adminApp_progressTab" style={{ background: !user?.kids?.length > 0 ? userJourneyBg['50'] : undefined }}>
              <div />
              <div className="tab_text" style={{ background: !user?.kids?.length > 0 ? personaTabBg['50'] : undefined }}>User profile</div>
              <div style={{ borderLeft: !user?.kids?.length > 0 ? '20px solid gray' : undefined }} />
            </div>
            <div className="adminApp_progressTab" style={{ background: verificationPercent < 50 ? userJourneyBg[`${verificationPercent}`] : undefined }}>
              <div />
              <div className="tab_text" style={{ background: personaTabBg[`${verificationPercent}`] }}>Verification</div>
              <div style={{ borderLeft: verificationPercent !== 100 ? '20px solid gray' : undefined }} />
            </div>
          </div>
          <div>
            <div />
            <div className="signup">
              <span>{`Sign up date ${moment(user?.createdAt).format('DD/MM/YYYY')}`}</span>
              <span>{user?.lastLogin && `Last login date ${moment(user?.lastLogin).format('DD/MM/YYYY')}`}</span>
            </div>
            <div />
            <div className="verification">
              <div>
                <CheckIcon verified />
                <span>Phone Number</span>
              </div>
              <div>
                <CheckIcon verified={user?.idVerified} />
                <span>ID Verification</span>
              </div>
              <div>
                <CheckIcon verified={user?.idVerified} />
                <span>Background Check</span>
              </div>
              <div>
                <CheckIcon verified={user?.vaccinationVerified} />
                <span>Vaccine</span>
              </div>
            </div>
          </div>
        </div>

        <div className="adminApp_userOnboarding_sm">
          <div className="linkedIn_container">
            <div className="adminApp_progressTab_sm">
              <div />
              <div className="tab_text">Referral source</div>
              <div />
            </div>
            <span>Others</span>
          </div>
          <div className="signup_container">
            <div className="adminApp_progressTab_sm">
              <div />
              <div className="tab_text">Sign up</div>
              <div />
            </div>
            <div className="signup">
              <span>{`Sign up date ${moment(user?.createdAt).format('DD/MM/YYYY')}`}</span>
              <span>{user?.lastLogin && `Last login date ${moment(user?.lastLogin).format('DD/MM/YYYY')}`}  </span>
            </div>
          </div>
          <div className="profile_container">
            <div className="adminApp_progressTab_sm" style={{ background: !user?.kids?.length > 0 ? userJourneyBg['50'] : undefined }}>
              <div />
              <div className="tab_text" style={{ background: !user?.kids?.length > 0 ? personaTabBg['50'] : undefined }}>User profile</div>
              <div style={{ borderLeft: !user?.kids?.length > 0 ? '20px solid gray' : undefined }} />
            </div>
            <span>Profile</span>
          </div>
          <div className="verification_container">
            <div className="adminApp_progressTab_sm" style={{ background: verificationPercent < 50 ? userJourneyBg[`${verificationPercent}`] : undefined }}>
              <div />
              <div className="tab_text" style={{ background: personaTabBg[`${verificationPercent}`] }}>Verification</div>
              <div style={{ borderLeft: verificationPercent !== 100 ? '20px solid gray' : undefined }} />
            </div>
          </div>
          <span className="verification">
            <div>
              <CheckIcon verified />
              <span>Phone Number</span>
            </div>
            <div>
              <CheckIcon verified={user?.idVerified} />
              <span>ID Verification</span>
            </div>
            <div>
              <CheckIcon verified={user?.idVerified} />
              <span>Background Check</span>
            </div>
            <div>
              <CheckIcon verified={user?.vaccinationVerified} />
              <span>Vaccine</span>
            </div>
          </span>
        </div>
      </div>

      <h3>Tokens</h3>

      <div className="adminApp_tokenContainer">
        <div className="adminApp_tokensDetailsContainer tokenUsage">
          <div className="header">TOKEN USAGE</div>
          <div className="tokenUsageBody">
            <div className="chartContainer">
              <CreditsChart
                data={[
                  {
                    title: 'Sitting',
                    share: 20,
                    className: 'sitting',
                  },
                  {
                    title: 'Tutoring',
                    share: 10,
                    className: 'tutoring',
                  },
                  {
                    title: 'Activity',
                    share: 40,
                    className: 'activity',
                  },
                  {
                    title: 'Driving',
                    share: 30,
                    className: 'driving',
                  },
                ]}
                centerLabel="Tokens Used"
                total={0.26}
              />
            </div>
            <div className="chartLabel">
              <div className="activity">
                <div className="tag" />
                <span>Activity</span>
              </div>
              <div className="driving">
                <div className="tag" />
                <span>Driving</span>
              </div>
              <div className="sitting">
                <div className="tag" />
                <span>Sitting</span>
              </div>
              <div className="tutoring">
                <div className="tag" />
                <span>Tutoring</span>
              </div>
            </div>
          </div>
        </div>
        <div className="adminApp_tokensDetailsContainer tokenDetails">
          <div className="header">TOKEN DETAILS</div>
          <div className="adminApp_tokensDetails">
            <div>
              <div className="label">Total Earned</div>
              <div className="data">5.26</div>
            </div>
            <div>
              <div className="label">Total Earned</div>
              <div className="data">5.26</div>
            </div>
            <div>
              <div className="label">Total Earned</div>
              <div className="data">5.26</div>
            </div>
            <div>
              <div className="label">Total Earned</div>
              <div className="data">5.26</div>
            </div>
            <div>
              <div className="label">Total Earned</div>
              <div className="data">5.26</div>
            </div>
            <div>
              <div className="label">Total Earned</div>
              <div className="data">5.26</div>
            </div>
          </div>
          <div className="adminApp_tokenHistory">VIEW HISTORY</div>
        </div>
      </div>

      <h3>Token Purchase History</h3>

      <div className="adminApp_purchaseHistoryContainer">
        <div className="purchaseHistory_header">Transactions</div>
        <div className="adminApp_purchaseHistoryTable_header">
          <div>DATE</div>
          <div>TYPE</div>
          <div>AMOUNT</div>
          <div>STATUS</div>
        </div>
        <div className="adminApp_purchaseHistoryTable">
          <div className="time">9/16/2021 at 3:33PM</div>
          <div className="type">
            <div className="label">Type</div>
            <div>Credits</div>
          </div>
          <div className="amount">
            <div className="label">Amount</div>
            <div>$25.00</div>
          </div>
          <div className="status">
            <div className="label">Status</div>
            <div>Suceeded</div>
          </div>
        </div>
        <div className="adminApp_purchaseHistoryTable">
          <div className="time">9/16/2021 at 3:33PM</div>
          <div className="type">
            <div className="label">Type</div>
            <div>Credits</div>
          </div>
          <div className="amount">
            <div className="label">Amount</div>
            <div>$25.00</div>
          </div>
          <div className="status">
            <div className="label">Status</div>
            <div>Suceeded</div>
          </div>
        </div>
        <div className="adminApp_purchaseHistoryTable">
          <div className="time">9/16/2021 at 3:33PM</div>
          <div className="type">
            <div className="label">Type</div>
            <div>Credits</div>
          </div>
          <div className="amount">
            <div className="label">Amount</div>
            <div>$25.00</div>
          </div>
          <div className="status">
            <div className="label">Status</div>
            <div>Suceeded</div>
          </div>
        </div>
        <div className="adminApp_purchaseHistoryTable">
          <div className="time">9/16/2021 at 3:33PM</div>
          <div className="type">
            <div className="label">Type</div>
            <div>Credits</div>
          </div>
          <div className="amount">
            <div className="label">Amount</div>
            <div>$25.00</div>
          </div>
          <div className="status">
            <div className="label">Status</div>
            <div>Suceeded</div>
          </div>
        </div>
        <div className="adminApp_purchaseHistoryTable">
          <div className="time">9/16/2021 at 3:33PM</div>
          <div className="type">
            <div className="label">Type</div>
            <div>Credits</div>
          </div>
          <div className="amount">
            <div className="label">Amount</div>
            <div>$25.00</div>
          </div>
          <div className="status">
            <div className="label">Status</div>
            <div>Suceeded</div>
          </div>
        </div>
        <div className="adminApp_purchaseHistoryTable">
          <div className="time">9/16/2021 at 3:33PM</div>
          <div className="type">
            <div className="label">Type</div>
            <div>Credits</div>
          </div>
          <div className="amount">
            <div className="label">Amount</div>
            <div>$25.00</div>
          </div>
          <div className="status">
            <div className="label">Status</div>
            <div>Suceeded</div>
          </div>
        </div>
        <span className="purchaseHistory_footer">
          <div />
          <div />
          <div />
          <span>See All(31)</span>
        </span>
      </div>

      <div className="adminApp_usageRankingsContainer">
        <div className="pieChart">
          <div className="header">Devices used by user</div>
          <div>
            <div className="chartContainer">
              <CreditsChart
                data={[
                  {
                    title: 'Mobile',
                    share: 60,
                    className: 'mobileStroke',
                  },
                  {
                    title: 'Desktop',
                    share: 35,
                    className: 'desktopStroke',
                  },
                  {
                    title: 'Tablet',
                    share: 5,
                    className: 'tabletStroke',
                  },
                ]}
                centerLabel=""
              />
            </div>
            <div className="chartLabel">
              <div className="mobileDetails">
                <div className="tag" />
                <div>
                  <span className="tagText">Mobile</span>
                  <span className="tagPercent">60%</span>
                </div>
              </div>
              <div className="desktopDetails">
                <div className="tag" />
                <div>
                  <span className="tagText">Desktop</span>
                  <span className="tagPercent">35%</span>
                </div>
              </div>
              <div className="tabletDetails">
                <div className="tag" />
                <div>
                  <span className="tagText">Tablet</span>
                  <span className="tagPercent">03%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="barChart">
          <div className="header">
            <div>
              <span className="headerText">Most used features</span>
              <span>(top 5)</span>
            </div>
            <button>See All</button>
          </div>
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Overview;
