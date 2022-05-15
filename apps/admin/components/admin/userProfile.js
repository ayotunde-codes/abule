import React, { useState, useEffect } from 'react';
import {
  TimelineView, InputSelect, PopMessage, InputPicker, Fn,
} from '@abule-common/components';
import KidProfile from '../profile/KidProfile';
import {
  Grades,
} from '../../datastore';
import PageLoader from '../general/PageLoader';
import CheckIcon from './icons/check-ico';

const { capitalize, ucFirst } = Fn;

const defaultKidProfile = {
  preferredName: '',
  preferredNameError: false,
  dob: null,
  dobError: false,
  gender: '',
  genderError: false,
  interests: [],
  interestsError: false,
  interestsErrorBad: false,
  customInterests: [],
  customInterestsError: false,
  color: '',
  colorError: false,
  firstName: '',
  firstNameError: false,
  lastName: '',
  lastNameError: false,
  schoolId: '',
  schoolName: '',
  schoolNameError: false,
  schoolStreetAddress: '',
  schoolStreetAddressError: false,
  schoolCity: '',
  schoolCityError: false,
  schoolState: '',
  schoolStateError: false,
  schoolZipCode: '',
  schoolZipCodeError: false,
  specialInstruction: '',
  specialInstructionError: false,
  showValues: false,
  showInterests: false,
};

const isLoadOtherProfile = (props) => {
  const { settings, loadProfile, profileId } = props;
  const { sessionUser } = settings;
  if (loadProfile) {
    if (profileId !== sessionUser.id) {
      return true;
    }
  }
  return false;
};

const Profile = (props) => {
  const [state, setState] = useState({
    user: props.user,
    buyCredit: false,
    loading: true,
    errorMsg: false,
    groups: [],
    uniassgnedTribe: '',
    loadProfile: isLoadOtherProfile(props),
    modal: false,
    supportType: 'driving',
    showGrades: false,
    showSubjects: false,
    acceptModal: false,
    editProfile: {},
    supportUpdate: {},
    kidProfile: defaultKidProfile,
    editUserDetails: false,
    editUserAbout: false,
    editUserValues: false,
    editKidProfile: false,
    showKidInterests: false,
    showSupportUpdate: false,
    buttonOneLoading: false,
    buttonTwoLoading: false,
    photoAssemblyId: '',
    photoUploading: false,
    imageUrl: false,
    imageError: false,
  });

  const [isMounted, setIsMounted] = useState(false);
  const fields = {
    photo: null,
    firstName: null,
    interests: null,
    coreValues: null,
    kidInterests: null,
    lastName: null,
    username: null,
    about: null,
    email: null,
    streetAddress: null,
    phoneNumber: null,
    dob: null,
    gender: null,
    maritalStatus: null,
  };

  const styles = {
    margin: 0,
    padding: 0,
    marginTop: '1em',
  };

  useEffect(() => {
    const mountingComponent = async () => {
      setIsMounted(true);
      let supportType = 'driving';
      const supports = {};
      state.user.supports.forEach((support) => {
        supports[support.type] = support;
      });

      if (!supports.driving.isAvailable) {
        if (supports.sitting.isAvailable) {
          supportType = 'sitting';
        } else if (supports.tutoring.isAvailable) {
          supportType = 'tutoring';
        }
      }

      console.log('all the supports : ', supports);

      setState({
        ...state,
        supportType,
        loading: false,
      });
    };

    mountingComponent();

    return () => { setIsMounted(false); };
  }, []);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => document.body.style.overflowX = '';
  }, []);

  function updateKidProfile(data, extras = {}) {
    setState((prev) => ({
      kidProfile: {
        ...prev.kidProfile,
        ...data,
      },
      ...extras,
    }));
  }

  const { settings } = props;
  const { sessionUser } = settings;
  const {
    user, loading, errorMsg, loadProfile, editProfile, kidProfile,
  } = state;

  const getSupport = (type) => {
    if (user) {
      for (const support of user.supports) {
        if (support.type === type) {
          return support;
        }
      }
    }
    return false;
  };

  const getTimeLineSelectionColor = () => {
    switch (state.supportType) {
      case ('sitting'): {
        return '#fdeaf3';
      }
      case ('driving'): {
        return '#D6FDFF';
      }
      case ('tutoring'): {
        return '#F0F0F0';
      }
      default: {
        return '#e1e1e1';
      }
    }
  };

  return (
    <>
      <div id="NewProfile" className={`${loadProfile ? 'other-profile' : ''}`} style={styles}>
        {loading ? <PageLoader inline /> : (
          <>{
            errorMsg || (
              <>
                <div className="profile-data">
                  <div className="user-info adminApp_user-info">
                    <div id="userDetails" className="data-section">
                      <div
                        id="profileImage"
                        tabIndex={0}
                        ref={(e) => {
                          if (e && !fields.photoAssemblyId) fields.photoAssemblyId = e;
                        }}
                      >
                        <div className="avi">
                          {!user?.imageUrl
                            ? <span className="icon-user default-image" />
                            : <img src={state.imageUrl || user?.imageUrl} alt="" className="" />}
                        </div>
                        {(state.photoUploading) && (
                          <div className="uploading">
                            <span className="icon icon-refresh spinner" />
                          </div>
                        )}
                      </div>

                      <span className="profile-image-error Error">{state.imageError}</span>

                      <p className="name">{user?.firstName} {user?.lastName}</p>
                      <p className="username">@{user?.username}</p>
                      {user?.addressId && <p className="location">{user?.city}, {user?.state}</p>}

                      {/*
                                    <div className="pending-verifications">
                                    <p className="check-background">Background Check</p>
                                    </div>

                                */}
                      <div className="user-confirmed-details">
                        {/* user.idVerified && <b className="header">{`${user?.firstName} Confirmed`}</b> */}
                        <div className="list">
                          <div className="adminApp_userProfileDetails">
                            <span>{user?.phoneNumber || '0x0...'}</span>
                            <span>{user?.email || 'johndoe@ipsium.com'}</span>
                          </div>
                          <span className="adminApp_userProfileDetails">
                            <span>{`Gender: ${capitalize(user?.gender)}`}</span>
                            <span>{`Marital Status: ${capitalize(user?.maritalStatus)}`}</span>
                          </span>

                        </div>
                      </div>
                    </div>
                    <section className="about-user data-section">
                      <div className="data-section-title">
                        <span className="label">Confirmation</span>
                      </div>
                      <div className="adminApp_verification">
                        <div className="verificationContainers">
                          <CheckIcon verified />
                          <span>Phone Number</span>
                        </div>
                        <div className="verificationContainers">
                          <CheckIcon verified={user?.idVerified} />
                          <span>ID Verification</span>
                        </div>
                        <div className="verificationContainers">
                          <CheckIcon verified={user?.idVerified} />
                          <span>Background Check</span>
                        </div>
                        <div className="verificationContainers">
                          <CheckIcon verified={user?.vaccinationVerified} />
                          <span>Vaccine</span>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="user-info adminApp_user-info">
                    <div className="adminApp_user-infoDetails">
                      {/* {(user.coreValues && user.coreValues.length > 0) && ( */}
                      <section className="about-user data-section">
                        <div className="data-section-title">
                          <span className="label">About</span>
                        </div>

                        <div className="info"> {user?.about} </div>
                      </section>
                      <section
                        id="userInterests"
                        className="data-section"
                        onClick={() => {
                          setState({
                            ...state,
                            showValues: true,
                          });
                        }}
                      >
                        <div className="data-section-title">
                          <span className="label">VALUES</span>
                        </div>

                        <InputPicker
                          readOnly
                          // activeType="empty"
                          values={sessionUser.userId === user?.userId ? [] : sessionUser.coreValues}
                          options={user && [
                            ...user.coreValues,
                          ].map((interest) => ({
                            label: capitalize(interest),
                            value: interest,
                          }))}
                        />
                      </section>
                      {/* )} */}
                    </div>

                    {/* {(user.interests && user.interests.length > 0) && ( */}
                    <section
                      id="userInterests"
                      className="data-section"
                      onClick={() => {
                        setState({
                          ...state,
                          showInterests: true,
                        });
                      }}
                    >
                      <div className="data-section-title">
                        <span className="label">INTERESTS</span>
                      </div>

                      <InputPicker
                        readOnly
                        values={sessionUser.userId === user?.userId ? [] : sessionUser.interests}
                        customValues={user?.customInterests}
                        options={user?.interests.map((interest) => ({
                          label: capitalize(interest),
                          value: interest,
                        }))}
                      />
                    </section>
                    {/* )} */}

                  </div>
                </div>

                {(!loadProfile || user?.kids.length > 0) && (
                  <div id="addLearner" className="data-section">
                    <div className="data-section-title">
                      <span className="">Kid{user?.kids.length === 1 ? "'" : ''}s Profile</span>
                    </div>
                    <div id="kidsProfile">
                      {[
                        ...user?.kids,
                      ].map((kid) => (
                        <KidProfile
                          {...props}
                          showActions={false}
                          kid={kid}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="adminApp_supportWrapper" style={{ maxWidth: document.body.width }}>
                  <div className="supports-timeline data-section">
                    <div className="data-section-title">
                      <span>AVAILABILITY</span>
                    </div>
                    <div className="header">
                      <div />
                      <InputSelect
                        className=""
                        value={state.supportType}
                        options={[
                          {
                            label: 'driving',
                          },
                          {
                            label: 'sitting',
                          },
                          {
                            label: 'tutoring',
                          },
                        ]}
                        onChange={(value) => {
                          setState({
                            ...state,
                            supportType: value,
                          });
                        }}
                      />
                      <div className="support-info">
                        {state.supportType === 'tutoring'
                          ? (
                            <div className="support-actions">
                              <div
                                className="support-action"
                                onClick={() => {
                                  setState({
                                    ...state,
                                    showGrades: true,
                                  });
                                }}
                              >Grades
                              </div>
                              <div
                                className="support-action"
                                onClick={() => {
                                  setState({
                                    ...state,
                                    showSubjects: true,
                                  });
                                }}
                              >Subjects
                              </div>
                            </div>
                          )
                          : (
                            <>
                              {
                                getSupport(state.supportType).age
                                  ? <span>{getSupport(state.supportType).age.start} - {getSupport(state.supportType).age.end} yrs</span>
                                  : ''
                              }
                            </>
                          )}
                      </div>
                    </div>
                    <TimelineView
                      selectionColor={getTimeLineSelectionColor()}
                      timeline={user?.supports ? getSupport(state.supportType).days : null}
                      on
                    />
                  </div>
                </div>
              </>
            )
          }
          </>
        )}
      </div>

      {state.showGrades && (() => {
        const support = getSupport(state.supportType);

        return (
          <PopMessage
            // show={}
            style={{ zIndex: '2' }}
            message={(
              <div id="updateInterestsPopUp">
                <div className="title">
                  <div className="label">Grades</div>
                </div>
                <div className="pickers">
                  <InputPicker
                    values={support.grades}
                    options={support.grades.map((gradeId) => {
                      const grade = Grades.find(gradeId);
                      return {
                        value: grade.id,
                        label: ucFirst(grade.title),
                      };
                    })}
                  />
                </div>

              </div>
            )}
            confirmButton={{
              show: false,
              label: 'CLOSE',
              onClick: async (closer, hideLoader) => {
                closer();
              },
              className: 'btn btn-1',
            }}
            onCancel={() => {
              setState({
                ...state,
                showGrades: false,
              });
            }}
          />
        );
      }
      )()}

      {state.showSubjects && (() => {
        const support = getSupport(state.supportType);

        return (
          <PopMessage
            // show={}
            style={{ zIndex: '2' }}
            message={(
              <div id="updateInterestsPopUp">
                <div className="title">
                  <div className="label">Subjects</div>
                </div>
                <div className="pickers">
                  <InputPicker
                    values={support.subjects}
                    options={support.subjects.map((subject) => ({
                      value: subject,
                      label: capitalize(subject),
                    }))}
                  />
                </div>

              </div>
            )}
            confirmButton={{
              show: false,
              label: 'CLOSE',
              onClick: async (closer, hideLoader) => {
                closer();
              },
              className: 'btn btn-1',
            }}
            onCancel={() => {
              setState({
                ...state,
                showSubjects: false,
              });
            }}
          />
        );
      }
      )()}

      {state.showValues && (() => (
        <PopMessage
          // show={}
          style={{ zIndex: '2' }}
          message={(
            <div id="updateInterestsPopUp">
              <div className="title">
                <div className="label">Values</div>
              </div>
              <div className="pickers">
                <InputPicker
                  readOnly
                  values={sessionUser.userId === user?.userId ? [] : sessionUser.coreValues}
                  options={[
                    ...user.coreValues,
                  ].map((interest) => ({
                    label: capitalize(interest),
                    value: interest,
                  }))}
                />
              </div>

            </div>
          )}
          confirmButton={{
            show: false,
            label: 'CLOSE',
            onClick: async (closer, hideLoader) => {
              closer();
            },
            className: 'btn btn-1',
          }}
          onCancel={() => {
            setState({
              ...state,
              showValues: false,
            });
          }}
        />
      )
      )()}
      {state.showInterests && (() => (
        <PopMessage
          // show={}
          style={{ zIndex: '2' }}
          message={(
            <div id="updateInterestsPopUp">
              <div className="title">
                <div className="label">Interests</div>
              </div>
              <div className="pickers">
                <InputPicker
                  readOnly
                  values={sessionUser.userId === user.userId ? [] : sessionUser.interests}
                  customValues={user?.customInterests}
                  options={user?.interests.map((interest) => ({
                    label: capitalize(interest),
                    value: interest,
                  }))}
                />
              </div>

            </div>
          )}
          confirmButton={{
            show: false,
            label: 'CLOSE',
            onClick: async (closer, hideLoader) => {
              closer();
            },
            className: 'btn btn-1',
          }}
          onCancel={() => {
            setState({
              ...state,
              showInterests: false,
            });
          }}
        />
      )
      )()}

    </>
  );
};

export default Profile;
