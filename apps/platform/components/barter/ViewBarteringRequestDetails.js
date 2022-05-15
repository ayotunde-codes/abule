import React from 'react';
import {
  Fn,
  PopMessage,
} from '@abule-common/components';

const {
  getGenderIcon, milSecToYears,
} = Fn;

class ViewBarteringRequestDetails extends React.Component {
  getKidFromKids(kids, kidId) {
    for (const kid of kids) {
      if (kid.id === kidId) return kid;
    }
    return false;
  }

  render() {
    const { state, props } = this;
    const { request } = props;
    const { user } = request;
    const kidsRows = [];
    const kidsSpecialInstruction = [];

    // const focusedKid = this.getKidFromKids(request.user.kids, request.kids[state.viewDetailsFocusKid]);
    // console.log('focused kid', { focusedKid });
    request.kids.forEach((kidId, index) => {
      const row = Math.ceil((index + 1) / 3);
      if (!kidsRows[row]) {
        kidsRows[row] = [];
      }
      const kid = this.getKidFromKids(request.user.kids, kidId);
      kidsRows[row].push(
        <button
          type="button"
          className="kid"
          onClick={() => {
            this.setState({
              // viewDetailsFocusKid: index,
            });
          }}
        >
          <span className={`icon ${getGenderIcon(kid.gender)}`} />
          <div className="info">
            <p className="name">{kid.firstName} {kid.lastName}</p>
            <p className="gender">{kid.gender}, {milSecToYears(new Date() - new Date(kid.dob))}</p>
          </div>
        </button>,
      );

      kidsSpecialInstruction.push(
        <div className="special-instruction">
          <p className="kid-name">{kid.firstName} {kid.lastName}</p>
          <p className="instruction">{kid.specialInstruction}</p>
        </div>,
      );
    });

    let location = false;
    let location2 = false;
    if (request.eventType === 'in-person') {
      const getKidSchool = (kidId) => {
        const kid = this.getKidFromKids(user.kids, kidId);
        return {
          schoolName: kid.schoolName,
          streetAddress: kid.schoolStreetAddress,
          apartment: '',
          city: kid.schoolCity,
          state: kid.schoolState,
          zipCode: kid.schoolZipCode,
        };
      };

      const userHomeAddress = {
        streetAddress: user.streetAddress,
        apartment: user.apartment,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
      };

      if (!request.location || isEmpty(request.location)) {
        location = {
          streetAddress: request.streetAddress,
          apartment: request.apartment,
          city: request.city,
          state: request.state,
          zipCode: request.zipCode,
        };
      } else if (request.location === 'home') {
        location = userHomeAddress;
      } else if (request.location === 'school') {
        location = getKidSchool(request.locationSchoolKid);
      }

      if (request.location2) {
        if (isEmpty(request.location2)) {
          location2 = {
            streetAddress: request.streetAddress2,
            apartment: request.apartment2,
            city: request.city2,
            state: request.state2,
            zipCode: request.zipCode2,
          };
        } else if (request.location2 === 'home') {
          location2 = userHomeAddress;
        } else if (request.location2 === 'school') {
          location2 = getKidSchool(request.location2SchoolKid);
        }
      }
    }

    return (
      <PopMessage
        ref={(e) => {
          this.viewDetailsPopMessage = e;
        }}
        message={(
          <div id="barterRequestViewDetails">
            <div className="closer">
              <span
                className="icon icon-cross"
                onClick={() => {
                  if (this.viewDetailsPopMessage) {
                    this.viewDetailsPopMessage.hide();
                  }
                }}
              />
            </div>

            <div className="kids-holder">
              {kidsRows.map((row) => (
                <div className="kids">
                  {row}
                </div>
              ))}
            </div>

            <div className="locations">
              <p className="header">LOCATION</p>
              <div className="content">
                {location || location2 ? (

                  <>{location && (
                    <div className="location">
                      {request.bartering === 'driving' && <p className="type">Pick-up</p>}
                      <div className="info">
                        {capitalize(location.schoolName) && <p>{capitalize(location.schoolName)}</p>}
                        <p>{capitalize(location.streetAddress)}</p>
                        <p>{capitalize(location.apartment)}</p>
                        <p>{capitalize(location.city)}, {capitalize(location.state)} {capitalize(location.zipCode)}</p>
                      </div>
                    </div>
                  )}

                    {location2 && (
                      <div className="location">
                        <p className="type">{request.bartering === 'driving' ? 'Drop-off' : 'Location'}</p>
                        <div className="info">
                          {capitalize(location2.schoolName) && <p>{capitalize(location2.schoolName)}</p>}
                          <p>{capitalize(location2.streetAddress)}</p>
                          <p>{capitalize(location2.apartment)}</p>
                          <p>{capitalize(location2.city)}, {capitalize(location2.state)} {capitalize(location2.zipCode)}</p>
                        </div>
                      </div>

                    )}
                    )
                  </>
                ) : 'Virtual'}
              </div>

            </div>

            <div className="special-instructions">
              <p className="header">SPECIAL INSTRUCTIONS</p>
              <div className="content">
                {kidsSpecialInstruction}
              </div>

              {/* <div className="banner">
                * Once a barter exchange is complete, you need to confirm that the service
                occurred in order to receive your credits.
              </div> */}
            </div>

            <div className="contact-holder">
              <div className="contact">
                <p className="header">CONTACT</p>
                <table>
                  <tbody>
                    <tr>
                      <td>Parent: </td>
                      <td>{request.user.firstName} {request.user.lastName}</td>
                    </tr>
                    <tr>
                      <td>Phone: </td>
                      <td>{request.user.phoneNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        confirmButton={{
          label: 'START MESSAGE',
          onClick: async (closer, hideLoader) => {

          },
        }}
        cancelButton={props.cancelButton}
        onCancel={() => {
          props.onCancel();
        }}
      />
    );
  }
}

export default ViewBarteringRequestDetails;
