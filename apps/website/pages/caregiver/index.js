import React from 'react';
import Layout from '../../components/general/Layout';

class Caregiver extends React.Component {
  render() {
    const { props } = this;

    return (
      <Layout
        {...props}
        website
        header={{
          darkTheme: true,
        }}
      >
        <div id="landingContainer">
          <div className="landing-grid">
            <div className="page-container">
              <div className="care-intro-grid">
                <div className="care-intro-column">
                  <h5 className="care-title">Become a caregiver</h5>
                  <p className="care-info">
                    Host an activity, list a class or pick up help requests
                    and <span className="care-highlight">earn credits</span> to
                    use later or <span className="care-highlight">cash out</span>
                  </p>

                  <a
                    href="#"
                    className="btn btn-1 get-started"
                    onClick={() => {
                      props.showSignUp({
                        accountType: 'caregiver',

                      });
                    }}
                  >
                    Get Started
                  </a>

                  {/* <a href="#" className="estimate">Estimate your credit earnings</a> */}
                </div>

                <img src="img/caregiver.png" alt="" className="care-intro-img" />
              </div>
            </div>
          </div>
          <div className="page-container">
            <div className="care-column-block">
              <div className="care-column-1">
                <h3 className="care-col-title care-intro-title">
                  Your pillars of support, made possible
                  by <br />
                  care<span className="care-style timberline-font">givers</span>
                </h3>
              </div>

              <div className="care-column-2">
                <div className="care-col-2">
                  <h4 className="col-2-title">Give meaningful support</h4>
                  <p className="care-paragraph care-col-2-paragraph">
                    Needs come in all shapes and forms. Feel great knowing that you are helping parents with what matters most to them, when it matters most.
                  </p>
                </div>

                <div className="care-col-2">
                  <h4 className="col-2-title">Achieve work-life harmony</h4>
                  <p className="care-paragraph care-col-2-paragraph">
                    No more rigid work schedules or pay penalties. Enjoy the flexibility of making extra money on our own terms without having to sacrifice family time.
                  </p>
                </div>
              </div>
            </div>

            <div className="care-column-3">
              <img src="img/family1.jpeg" alt="" className="col-3-img" />
              <div className="col-3-info">
                <h3 className="col-3-label">
                  Now I get to spend more time with my wife and kids.
                </h3>
                <p className="col-3-paragraph">
                  Phillip, Brooklyn NY
                </p>
              </div>
            </div>

            <div className="care-column-4">
              <h3 className="care-col-title">Who are caregivers</h3>
              <p className="care-paragraph">
                Caregivers help nurture and impart knowledge to our children by hosting activities, teaching classes or by picking up help requests in the community.
              </p>
            </div>

            <div className="care-column-5">
              <div className="sub-col-5">
                <div className="col-5-img-block">
                  <img src="/img/host-activity.png" alt="" className="col-5-img" />
                </div>
                <h3 className="col-5-title">Host an activity</h3>
                <p className="col-5-info">
                  Keep our children engaged by hosting activities in a casual group setting.
                </p>
              </div>
              <div className="sub-col-5">
                <img src="/img/create-pod.png" alt="" className="col-5-img" />
                <h3 className="col-5-title">List a class</h3>
                <p className="col-5-info">
                  Teach private, semi-private or open social and academic sessions, online or in-person.
                </p>
              </div>
              <div className="sub-col-5">
                <img src="/img/pickup-request.png" alt="" className="col-5-img" />
                <h3 className="col-5-title">Pick up requests</h3>
                <p className="col-5-info">
                  Fill help requests for sitting, pick-up/drop-offs, tutoring or homework help.
                </p>
              </div>
            </div>

            <div className="care-column-6">
              <h3 className="care-col-title">How caregiving works</h3>
              <p className="care-paragraph col-6-paragraph">
                All caregiving starts with our quality standards-knowledge, access and connection. We provide the support you need to ensure that you feel confident to engage and nurture our children.
              </p>

              <div className="care-col-6">
                <div className="col-6-block">
                  <img src="img/family9.jpeg" alt="" className="col-6-img" />
                  <h4 className="col-6-title">Why become a caregiver</h4>
                  <p className="col-6-info">
                    Caregivers share why they chose to join our ecosystem and what they love about it.
                  </p>
                </div>

                <div className="col-6-block">
                  <img src="img/family2.jpeg" alt="" className="col-6-img" />
                  <h4 className="col-6-title">How to get started on Abulé</h4>
                  <p className="col-6-info">
                    From creating your activities to nurturing our children in various ways, learn how to become a caregiver.
                  </p>
                </div>

                <div className="col-6-block">
                  <img src="img/family3.jpeg" alt="" className="col-6-img" />
                  <h4 className="col-6-title">How to earn money on Abulé</h4>
                  <p className="col-6-info">
                    What every caregiver needs to know about credit earnings, credit usage and cashing out.
                  </p>
                </div>

                <div className="col-6-block">
                  <img src="img/family6.jpeg" alt="" className="col-6-img" />
                  <h4 className="col-6-title">Am I a good fit for Abulé</h4>
                  <p className="col-6-info">
                    There's a perfect fit for every family–the key is to clearly define core values and expectations.
                  </p>
                </div>
              </div>

            </div>

            <div className="care-column-7">
              <div className="sub-col-7">
                <h5 className="col-7-label">Have questions?</h5>
                <h3 className="col-7-title">Get answers from Experts</h3>
                <p className="col-7-paragraph">
                  Join our next live webinar as experts share their wisdom, experiences and answer your questions.
                </p>
                <button className="btn btn-1 col-7-btn">Join A Webinar</button>
              </div>

              <img src="img/learnexperts.jpeg" alt="" className="col-7-img" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Caregiver;
