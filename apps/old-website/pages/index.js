import Head from 'next/head';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import Feat from '../components/Website/Feat';
import CareReward from '../components/Website/CareReward';
import RoadMap from '../components/Website/RoadMap';
import Faq from '../components/Website/Faq';
import Footer from '../components/Website/Footer';
import FaqAns from '../components/Website/FaqAnswers/Ans1';
import Layout from '../components/Website/Layout';
import {
  InputField, InputLocation, PopMessage, ToolTipWrapper, Fn
} from "@abule-common/components";

const {
  FetchRequest, isEmail, isEmpty, isPhoneNumber, isZipCode, mobileCheck, popAlert,
} = Fn

const activityURL = 'https://abule.io';
const shareMessage = (
  `Hi
I think you should check out this activity on Abule
${activityURL}`
);

const shareOptions = [
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
              href: activityURL,
              quote: shareMessage,
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
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`);
        },
      },
      {
        label: 'linkedIn',
        icon: 'fa fa-linkedin',
        onClick: () => {
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${activityURL}`);
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
          window.open(`mailto:?subject=Check%20out%20this%20activity%20on%20Abulé&body=${encodeURIComponent(shareMessage)}`);
        },
      },
      {
        label: 'whatsapp',
        icon: 'fa fa-whatsapp',
        onClick: () => {
          if (mobileCheck()) {
            window.open(`whatsapp://send?text=${encodeURIComponent(shareMessage)}`);
          } else {
            window.open(`https://web.whatsapp.com://send?text=${encodeURIComponent(shareMessage)}`);
          }
        },
      },
      {
        label: 'SMS',
        icon: 'fa fa-comment-o',
        onClick: () => {
          window.open(`sms:&body=${encodeURIComponent(shareMessage)}`);
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
              link: activityURL,
              quote: shareMessage,
            }, (response) => {
              console.log('response gotten', response);
            });
          }
        },
      },
    ],
  },
];

export default function Home({ settings }) {
  const [faqs, setFaqs] = useState([
    {
      questions: 'Why blockchain?',
      answer: <FaqAns />,
      open: false,
    },
    {
      questions: 'How does the Abulé care model differ from traditional care models?',
      answer: (
        <> Abulé is a <strong className="pink-text">decentralized</strong> care economy meaning it is built by the people, for the people, and also governed by the people. We leverage 21st century technology to bring communities back to the ancient wisdom and strength of the village.
        </>

      ),
      open: false,
    },
    {
      questions: 'How does the Abulé care economy work?',
      answer: <>Abulé fosters togetherness by connecting like minded people based on their core values, mutual interests, mutual friends, and location. We provide the mechanisms and incentives for mutual aid, and <strong className="pink-text">reward good behavior</strong>. You can lean on your trusted tribe or larger village community for help and support, and you can lift up those who work the hardest caring for our future.</>,
      open: false,
    },
    {
      questions: 'How will Abulé help the under economy of caregivers recuperate from career and pay penalties?',
      answer: <>Whether you’re a career champion or you are a full time caregiver by choice, necessity or trade, Abulé provides the options for you to define what work-family-life harmony looks like to you and your family, while ensuring caregivers receive <strong className="pink-text">fair compensation</strong> that appreciates in value over time. We’re also focused on <strong className="pink-text">job creation</strong> to bolster economic development. We believe that caring for others is what makes us uniquely and beautifully human and is one of the most noble undertakings. Caregiving should be compensated much more than it is. By allowing people to tap into their talents and time, they can earn rewards that appreciate in value over time.</>,
      open: false,
    },
    {
      questions: 'How will Abulé ensure that marginalized communities are uplifted?',
      answer: <>Let’s be real, the majority of external family caregivers (nannies, housekeepers, elderly care workers) tend to come from marginalized communities; as such, we are building our care economy in such a way that it facilitates and promotes a <strong className="pink-text">fair wealth distribution</strong>. We are making intentional space in our village to lift up those whose societal contributions are irreplaceable and so often forgotten. We will do this through education and a tokenized reward system.</>,
      open: false,
    },
    {
      questions: 'How can you support our mission to build a sustainable care economy?',
      answer: <>We are focused on nurturing atomic networks to create an even bigger network effect because we believe change starts on an individual cellular level. As we begin to shape a more resilient and sustainable care economy, we encourage you to <Link href="/ambassador"><strong className="pink-text  underline">become an ambassador</strong></Link> in your community.</>,
      open: false,
    },
  ]);
  const defaultWaitListForm = {
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    city: '',
    state: '',
    phoneNumber: '',
    findTribe: false,
    needPickUp: false,
    needSitter: false,
    needTutor: false,
    needActivity: false,
    needHelpWithChores: false,
    none: false,
    helpWithPickUp: false,
    helpWithSitter: false,
    helpWithTutor: false,
    helpWithHostingAnActivity: false,
    helpWithChores: false,
    later: false,
    submitting: false,
    showCopiedMessage: false,

  };

  const [state, setState] = useState({
    showWaitListForm: false,
    waitListFormStep: 1,
    form: {
      ...defaultWaitListForm,
    },
  });

  const updateState = (props) => {
    setState((value) => ({
      ...value,
      ...props,
    }));
  };

  const updateForm = (props) => {
    setState((value) => ({
      ...value,
      form: {
        ...value.form,
        ...props,
      },
    }));
  };
  const toggleFaq = (index) => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false;
      }

      return faq;
    }));
  };

  const showCopiedMessage = () => {
    updateState({
      showCopiedMessage: true,
    });

    setTimeout(() => {
      updateState({
        showCopiedMessage: false,
      });
    }, 2000);
  };

  const { form } = state;
  let step2slection = 0;
  if (form.findTribe) step2slection += 1;
  if (form.needPickUp) step2slection += 1;
  if (form.needSitter) step2slection += 1;
  if (form.needTutor) step2slection += 1;
  if (form.needActivity) step2slection += 1;
  if (form.needHelpWithChores) step2slection += 1;
  if (form.none) step2slection += 1;
  let step3slection = 0;
  if (form.helpWithPickUp) step3slection += 1;
  if (form.helpWithSitter) step3slection += 1;
  if (form.helpWithTutor) step3slection += 1;
  if (form.helpWithHostingAnActivity) step3slection += 1;
  if (form.helpWithChores) step3slection += 1;

  const { sessionUser } = settings;

  useEffect(() => {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', () => {
      window.FB.init({
        appId: process.env.FACEBOOK_APP_ID,
        version: 'v2.7', // or v2.1, v2.2, v2.3, ...
      });
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Abule</title>
        <meta name="description" content="Welcome to Abule" />
      </Head>
      {state.showWaitListForm && (
        <PopMessage
          rootClassName="waitListForm"
          style={{ zIndex: '3' }}
          mainStyle={{ zIndex: '3' }}
          message={(
            <div id="waitListFormContent">
              {
                (() => {
                  switch (state.waitListFormStep) {
                    case (4): {
                      return (
                        <form className="amForm">
                          <h4 className="amFormTitle">You’re on the list!</h4>
                          <p className="helper-text">We’ll notify you when we lauch in your city. Share with your friends to get bumped up.</p>
                          <div id="showActivity">
                            {/* <p className="title">Share this activity</p> */}
                            <div className="content">

                              {shareOptions.map((group) => (

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
                                      value={activityURL}
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
                                          showCopiedMessage();
                                        }}
                                      >
                                        <button type="button">copy</button>
                                      </abbr>
                                    </ToolTipWrapper>

                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                          </div>
                          <button
                            type="button"
                            className="submitBtn btn btn-1"
                            onClick={() => {
                              updateState({
                                showWaitListForm: false,
                                waitListFormStep: 1,
                                form: {
                                  ...defaultWaitListForm,
                                },
                              });
                            }}
                          >ok
                          </button>
                        </form>
                      );
                    } case (3): {
                      return (
                        <form className="amForm">
                          <h4 className="amFormTitle">Are you able to help others in the community?</h4>
                          <div className="formGrid">
                            <div className="formLeft">
                              {[
                                {
                                  key: 'helpWithPickUp',
                                  label: 'I can help with pick-up/drop-offs',
                                },
                                {
                                  key: 'helpWithSitter',
                                  label: 'I can help with sitting',
                                },
                                {
                                  key: 'helpWithTutor',
                                  label: 'I can help with tutoring',
                                },
                                {
                                  key: 'helpWithHostingAnActivity',
                                  label: 'I can host an activity or teach a class',
                                },
                                {
                                  key: 'helpWithChores',
                                  label: 'I can help with household chores',
                                },
                                {
                                  key: 'later',
                                  label: 'Maybe later',
                                },
                              ].map((question) => (
                                <div
                                  className={`hmv-check-item${form[question.key] ? ' checked' : ''}`}
                                  onClick={() => {
                                    updateForm({
                                      [question.key]: !form[question.key],
                                    });
                                  }}
                                >
                                  <div className="hmv-check">
                                    <span className="icon fa fa-check" />
                                  </div>

                                  <div className="hmv-check-label">{question.label}</div>
                                </div>
                              ))}

                            </div>
                          </div>
                          <div className="actions">
                            <button
                              type="button"
                              className="submitBtn btn btn-glass bordered-color-1"
                              onClick={async () => {
                                updateState({
                                  waitListFormStep: 1,
                                });
                              }}
                            >Previous
                            </button>
                            <button
                              disabled={step3slection < 1}
                              type="button"
                              className="submitBtn btn btn-1"
                              onClick={async () => {
                                if (step3slection >= 1) {
                                  updateState({ submitting: true, waitListFormStep: 4 });
                                  /*  try {
                                    await FetchRequest({
                                      url: 'https://abule-api.herokuapp.com/api/v1/auth/users/waitlists',
                                      method: 'POST',
                                      body: JSON.stringify({
                                        firstName: form.firstName,
                                        lastName: form.lastName,
                                        email: form.email,
                                        phoneNumber: form.phoneNumber,
                                        zipCode: form.zipCode,
                                        state: form.state,
                                        city: form.city,
                                        findTribe: form.findTribe,
                                        needPickUp: form.needPickUp,
                                        needSitter: form.needSitter,
                                        needTutor: form.needTutor,
                                        needActivity: form.needActivity,
                                        needHelpWithChores: form.needHelpWithChores,
                                        none: form.none,
                                        helpWithPickUp: form.helpWithPickUp,
                                        helpWithSitter: form.helpWithSitter,
                                        helpWithTutor: form.helpWithTutor,
                                        : form.,
                                        helpWithHostingAnActivity: form.helpWithHostingAnActivity,
                                        later: form.later,
                                      }),
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                    });
                                    popAlert({
                                      title: 'Form submitted',
                                      description: 'Your form submitted successfully',
                                    });
                                    updateState({
                                      form: { ...defaultWaitListForm },
                                      waitListFormStep: 4,
                                      submitting: false,
                                    });
                                  } catch (e) {
                                    popAlert({
                                      error: true,
                                      title: 'Erorr',
                                      description: 'Please make sure you filled all field then try again',
                                    });
                                    updateState({ submitting: false });
                                  } */
                                }
                              }}
                            >Submit {state.submitting ? <span className="icon-refresh icon spinner" style={{ marginLeft: '.3em' }} /> : ''}
                            </button>
                          </div>
                        </form>
                      );
                    }
                    case (2): {
                      return (
                        <form className="amForm">
                          <h4 className="amFormTitle">What are your biggest pain points at the moment? (select at least 1)</h4>
                          <div className="formGrid">
                            <div className="formLeft">
                              {[
                                {
                                  key: 'findTribe',
                                  label: 'I need to find my tribe',
                                },
                                {
                                  key: 'needPickUp',
                                  label: 'I need help with pick-up/drop-offs',
                                },
                                {
                                  key: 'needSitter',
                                  label: 'I need to find a sitter',
                                },
                                {
                                  key: 'needTutor',
                                  label: 'I need to find a tutor or homework help',
                                },
                                {
                                  key: 'needActivity',
                                  label: 'I need to find activities or classes',
                                },
                                {
                                  key: 'needHelpWithChores',
                                  label: 'I need help with household chores',
                                },
                                {
                                  key: 'none',
                                  label: 'None, I want to help others in my community',
                                },
                              ].map((question) => (
                                <div
                                  className={`hmv-check-item${form[question.key] ? ' checked' : ''}`}
                                  onClick={() => {
                                    updateForm({
                                      [question.key]: !form[question.key],
                                    });
                                  }}
                                >
                                  <div className="hmv-check">
                                    <span className="icon fa fa-check" />
                                  </div>

                                  <div className="hmv-check-label">{question.label}</div>
                                </div>
                              ))}

                            </div>
                          </div>
                          <div className="actions">
                            <button
                              type="button"
                              className="submitBtn btn btn-glass bordered-color-1"
                              onClick={async () => {
                                updateState({
                                  waitListFormStep: 1,
                                });
                              }}
                            >Previous
                            </button>
                            <button
                              disabled={(step2slection < 1)}
                              type="button"
                              className="submitBtn btn btn-1"
                              onClick={async () => {
                                if (step2slection >= 1) {
                                  updateState({
                                    waitListFormStep: 3,
                                  });
                                }
                              }}
                            >Next
                            </button>
                          </div>
                        </form>
                      );
                    }

                    default: {
                      let validForm = true;
                      const { form } = state;
                      const stringCheck = [
                        'firstName',
                        'lastName',
                        'email',
                        'zipCode',
                        'city',
                        'state',
                        'phoneNumber',
                      ];

                      for (let i = 0; i < stringCheck.length; i++) {
                        if (isEmpty(form[stringCheck[i]])) {
                          validForm = false;
                        } else {
                          if (stringCheck[i] === 'email') {
                            if (!isEmail(form[stringCheck[i]])) {
                              validForm = false;
                            }
                          }
                          if (stringCheck[i] === 'zipCode') {
                            if (!isZipCode(form[stringCheck[i]])) {
                              validForm = false;
                            }
                          }
                          if (stringCheck[i] === 'phoneNumber') {
                            if (!isPhoneNumber(form[stringCheck[i]])) {
                              validForm = false;
                            }
                          }
                        }
                      }

                      return (
                        <form className="amForm">
                          <h4 className="amFormTitle">Join Waitlist</h4>
                          <div className="formGrid">
                            <div className="formLeft">
                              <div className="formRow1">
                                <InputField
                                  label="First Name"
                                  placeholder="first name"
                                  value={form.firstName}
                                  onChange={(value) => {
                                    updateForm({
                                      firstName: value,
                                    });
                                  }}
                                />

                                <InputField
                                  label="Last Name"
                                  placeholder="last name"
                                  value={form.lastName}
                                  onChange={(value) => {
                                    updateForm({
                                      lastName: value,
                                    });
                                  }}
                                />

                                <InputField
                                  label="Email Address"
                                  placeholder="email address"
                                  globalClassName="formBlockEmail"
                                  value={form.email}
                                  onChange={(value) => {
                                    updateForm({
                                      email: value,
                                    });
                                  }}
                                />

                              </div>

                              <div className="formRow3">
                                <InputLocation
                                  type="zipCode"
                                  placeholder="select place"
                                  value={form.zipCode}
                                  label="zip Code"
                                  className="formBlock"
                                  onChange={(value) => {
                                    updateForm({
                                      zipCode: value,
                                      city: '',
                                      state: '',
                                    });
                                  }}
                                  onSelect={(value) => {
                                    console.log('LOCATION ON SELECT : ', value);
                                    updateForm({
                                      city: value.data_component.city,
                                      state: value.data_component.state,
                                      zipCode: value.data_component.zipCode,
                                    });
                                  }}
                                />

                                <InputField
                                  label="city"
                                  readOnly
                                  placeholder="city"
                                  value={form.city}

                                />

                                <InputField
                                  label="state"
                                  readOnly
                                  placeholder="state"
                                  value={form.state}

                                />
                              </div>

                              <InputField
                                label="Phone Number"
                                placeholder="*** *** ****"
                                className="inputBox howBox"
                                value={form.phoneNumber}
                                onChange={(value) => {
                                  updateForm({
                                    phoneNumber: value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <button
                            disabled={!validForm}
                            type="button"
                            className="submitBtn btn btn-1"
                            onClick={() => {
                              if (validForm) {
                                updateState({
                                  waitListFormStep: 2,
                                });
                              }
                            }}
                          >Next
                          </button>
                        </form>
                      );
                    }
                  }
                })()
              }
            </div>
          )}
          confirmButton={{
            show: false,
          }}
          onCancel={() => {
            updateState({
              showWaitListForm: false,
              waitListFormStep: 1,
              form: defaultWaitListForm,
            });
            // setState({
            // showPlans: false,
            // });
          }}
        />
      )}

      <main className="mainGrid">
        <div className="webpage-container">
          <div className="col1">
            <div className="col1Info">
              <div className="col1Title">
                The first <span className="col1diff">care </span>
                <span className="col1diff">economy</span> built on <span className="textCircle">blockchain</span>
              </div>
              <p className="col1paragraph">
                Find care within your community. Reward caregivers with crypto tokens of appreciation.
              </p>
              <button
                type="button"
                className="waitlistBtn btn btn-1 "
                onClick={() => {
                  // if (sessionUser) {
                  //   if (['toyosi@abule.io', 'akintomiwa.fisayo@gmail.com', 'fisayo@abule.io'].includes(sessionUser.email)) {
                  updateState({
                    showWaitListForm: true,
                  });
                  //   }
                  // }
                }}
              >
                JOIN WAITLIST
              </button>
            </div>
            <div className="col1ImgBlock">
              <img src="/images/col1.png" alt="" className="col1Img ipad-portrait-hide" />
            </div>
          </div>

          <div id="features" className="col2">
            <h4 className="colTitle">Features</h4>
            <div className="featGrid">
              <div className="featBlock">
                <Feat featImg="/images/feat1.svg" featLabel="Biometrics" />
                <Feat featImg="/images/feat2.svg" featLabel="Easy scheduling" />
                <Feat featImg="/images/feat3.svg" featLabel="Profile customization" />
              </div>
              <div className="featBlock">
                <Feat featImg="/images/feat4.svg" featLabel="Hiding profiles" />
                <Feat featImg="/images/feat5.svg" featLabel="CareRewards*" />
                <Feat featImg="/images/feat6.svg" featLabel="Trust and safety" />
                <Feat featImg="/images/feat7.svg" featLabel="Support hotline" />
              </div>
              <div className="featBlock">
                <Feat featImg="/images/feat8.svg" featLabel="Communities / DAOs" />
                <Feat featImg="/images/feat9.svg" featLabel="Income earning potential" />
                <Feat featImg="/images/feat10.svg" featLabel="Education" />
              </div>
              <div className="featBlock">
                <Feat featImg="/images/feat11.svg" featLabel="NFT marketplace" />
                <Feat featImg="/images/feat12.svg" featLabel="No membership fee" />
              </div>
            </div>
          </div>

          <div className="col3">
            <h4 className="colTitle">CareRewards<span style={{
              fontSize: '.6em',
              top: '-0.5em',
              position: 'relative',
            }}
            >™
            </span>
            </h4>
            <span className="col3Text">Share your wisdom. Pick up requests. Get rewarded.</span>
            <div className="careRewardsGrid">
              <CareReward careRewardImg="/images/care1.svg" careRewardLabel="Invite your family, friends and neighbors" />
              <CareReward careRewardImg="/images/care2.svg" careRewardLabel="Host an activity or list a class" />
              <CareReward careRewardImg="/images/care3.svg" careRewardLabel="Help with pick up/drop offs, sitting, tutoring or homework" />
              <CareReward careRewardImg="/images/care4.svg" careRewardLabel="Get rewarded with $CARE™ Tokens" />
            </div>
          </div>

          {/* <div className="col4">
          <h4 className="colTitle">Roadmap</h4>
          <div className="roadMapGrid">
            <div className="roadMapAnimation">
              <img src="/images/roadmap.png" alt="" className="road" />
              <img src="/images/car.svg" alt="" className="roadCar" />
            </div>
            <div className="roadMapTime">
              <RoadMap roadMapClass="roadMapBlock" roadMapText="Pivoted Web 2.0 model in favor of Web 3.0 which better supports decentralized, peer to peer token economies" />
              <p className="mapTime">
                <div className="roadCircle roadCircleActive" />
                c.2020
              </p>
            </div>
            <div className="roadMapTimeFlip">
              <RoadMap roadMapClass="roadMapBlock roadMapFlip" roadMapText="Conceptualize the use of blockchain for the care economy" />
              <RoadMap roadMapClass="roadMapBlock roadMapFlip" roadMapText="Research systems and tools to utilize for simulation and development" />
              <p className="mapTime">
                <div className="roadCircle circleFlip" />
                Q1 2022
              </p>
            </div>
            <div className="roadMapTime">
              <RoadMap roadMapClass="roadMapBlock" roadMapText="Design, model and test key assumptions in order to build a stable, sustainable infrastructure for the care economy " />
              <RoadMap roadMapClass="roadMapBlock" roadMapText="Launch IDO $CARE token sale to the public" />
              <p className="mapTime">
                <div className="roadCircle" />
                Q2 2022
              </p>
            </div>
            <div className="roadMapTimeFlip">
              <RoadMap roadMapClass="roadMapBlock roadMapFlip" roadMapText="Development" />
              <RoadMap roadMapClass="roadMapBlock roadMapFlip" roadMapText="Run real-world tests in pilot groups" />
              <p className="mapTime">
                <div className="roadCircle circleFlip" />
                Q3 2022
              </p>
            </div>
            <div className="roadMapTime">
              <RoadMap roadMapClass="roadMapBlock" roadMapText="Release Beta App" />
              <p className="mapTime">
                <div className="roadCircle" />
                Q4 2022
              </p>
            </div>
            <div className="roadMapTimeFlip">
              <RoadMap roadMapClass="roadMapBlock roadMapFlip" roadMapText="Collect user feedback and Improve features" />
              <p className="mapTime">
                <div className="roadCircle circleFlip" />
                Q5 2022 & beyond
              </p>
            </div>
          </div>
        </div> */}

          <div id="faqSection" className="col5">
            <h4 className="colTitle">FAQs</h4>
            <div className="faqGrid">
              {faqs.map((faq, i) => (
                <>
                  <Faq faq={faq} index={i} toggleFaq={toggleFaq} />
                </>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </Layout>
  );
}
