import React from 'react';
import Layout from '../../components/general/Layout.js';

class About extends React.Component {
  // myFunction(x) {
  //     if (x.matches) {
  //         showSlides();

  //     } else {
  //         return;
  //     }
  // }

  // showSlides() {
  //     var i;
  //     slides = document.getElementsByClassName("sub-col-4");
  //     dots = document.getElementsByClassName("dot");
  //     for (i = 0; i < slides.length; i++) {
  //       slides[i].style.display = "none";
  //     }
  //     slideIndex++;
  //     if (slideIndex> slides.length) {slideIndex = 1}
  //     for (i = 0; i < dots.length; i++) {
  //         dots[i].className = dots[i].className.replace(" active", "");
  //     }
  //     slides[slideIndex-1].style.display = "block";
  //     dots[slideIndex-1].className += " active";
  //     setTimeout(showSlides, 8000); // Change image every 8 seconds
  // }

  // currentSlide(index) {
  //     if (index> slides.length) {index = 1}
  //     else if(index<1){index = slides.length}
  //     for (i = 0; i < slides.length; i++) {
  //       slides[i].style.display = "none";
  //     }
  //     for (i = 0; i < dots.length; i++) {
  //         dots[i].className = dots[i].className.replace(" active", "");
  //     }
  //     slides[index-1].style.display = "block";
  //     dots[index-1].className += " active";
  // }

  // var x = window.matchMedia("(max-width: 700px)");
  // myFunction(x);
  // x.addListener(myFunction);

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
        <div className="page-container">
          <div className="about-intro-col">
            <h3 className="web-page-title">Our Roots </h3>
            <p className="about-paragraph">
              In past cultures, childcare was a community based effort and not a separate paid occupation. As families no longer live within the same community, majority of parents work, and with skyrocketing childcare costs, families are left strapped for support they can count on. Sadly, the fast-paced, high-tech world in which we live was not created to support modern-day parenting; but that’s why we built Abulé.
            </p>

            <div className="about-intro-img">
              <h3 className="title img-title timberline-font">abulé</h3>
              <p className="img-paragraph">
                [ah-boo-lay] <span className="text-small">noun</span>
              </p>

              <div className="img-intro-info">
                <ol className="img-intro-lists">
                  <li className="img-list">Village</li>
                  <li className="img-list">
                    an ecosystem for modern parenting;
                    the platform you've been waiting for
                  </li>
                  <li className="img-list">a public benefit corporation (est.2019)</li>
                </ol>

                <p className="img-paragraph origin">
                  ORIGIN <span className="text-small">language</span>
                </p>
              </div>

              <p className="img-paragraph place">
                West Africa, Nigeria-1500s <span className="text-small">Yoruba</span>
              </p>
            </div>

            <p className="about-paragraph about-paragraph-2">
              Abulé was established to connect families to communities they can trust for childcare support. By using digital technologies, The Village democratizes access to caregivers, and parents receive the benefits of raising their children in a safe, harmonious village.
            </p>
          </div>

          <div className="about-col-1">
            <div className="about-col-sub">
              <h3 className="web-page-title">Our Mission</h3>
              <p className="about-paragraph mission">
                “To make childcare a joint societal effort.
              </p>
            </div>

            <div className="about-col-sub">
              <h3 className="web-page-title">Our Vision</h3>
              <p className="about-paragraph vision">
                “To build a global village that enables work-life harmony for all.
              </p>
            </div>
          </div>

          <div className="about-col-2">
            <h3 className="dialect-title">
              Our dialect is simple. <br />
              We speak <span className="timberline-font">Togetherness</span>
            </h3>

            <p className="about-paragraph values">
              This lingo has led to values that reflect the wisdom, concerns and wishes of a well-intentioned parent <br />
              <br />
              <strong>1 | SAFETY</strong> <br /> <br />
              Our #1 concern is the safety of our children. As such, we do our due diligence to ensure that all caregivers are thoroughly vetted. Parents play an active role in building their network, while we reinforce accountability by ensuring caregivers serve children in small cohorts. <br /><br />
              <br />
              <strong>2 | RELIABILITY</strong> <br /> <br />
              The beauty of our ecosystem lies in the fact that parents are able to source help from people that are either already within their own network, or people linked through mutual connection. Define what quality and trust look like for you. <br /><br />
              <br />
              <strong>3 | TRANSPARENCY</strong> <br /> <br />
              The laws that govern The Village are easily accessible. We encourage open lines of communication among caregivers and parents to ensure parents can reach their children at all times.
            </p>
          </div>

          <div className="about-col-3">
            <h3 className="culture-title">
              Our culture is contagious. <br />
              We spread <span className="timberline-font">Love</span>
            </h3> <br /> <br />
            <p className="about-paragraph">
              “A child belongs not to one parent or home.” – African Proverb <br /><br />

              At The Village, we strive to give our tribe another home. A place in which their voice is heard, their opinions matter and their feedback shapes our community. <br /> <br />

              We have developed a healthy and strong culture that is informed by five vital elements: awareness, acceptance, appreciation, perseverance, and preservation.
            </p>
          </div>

          <div className="about-col-4">
            <div className="sub-col-4 awareness">
              <h4 className="sub-col-title timberline-font">Awareness</h4>
              <p className="about-paragraph sub-col-info">
                We acknowledge that there is a gap between where we are today and the better we want to be tomorrow. We strive to close the gap to achieve work-life harmony.
              </p>
            </div>

            <div className="sub-col-4">
              <h4 className="sub-col-title timberline-font">Appreciation</h4>
              <p className="about-paragraph sub-col-info">
                We work hard but we are not quiet about counting our blessings, expressing gratitude, celebrating our wins, as well as one another’s successes -in business and in life.
              </p>
            </div>

            <div className="sub-col-4">
              <h4 className="sub-col-title timberline-font">Acceptance</h4>
              <p className="about-paragraph sub-col-info">
                We must be willing to accept that we, too, cannot do it all alone. We embrace our strengths, while leaning on one another to mitigate our weaknesses.
              </p>
            </div>

            <div className="sub-col-4 perserverance">
              <h4 className="sub-col-title timberline-font">Perserverance</h4>
              <p className="about-paragraph sub-col-info">
                We are obsessed with finding solutions that will further support parents, children and society. This is no small feat–but we work tirelessly to find a path to a better tomorrow.
              </p>
            </div>

            <div className="sub-col-4 preservation">
              <h4 className="sub-col-title timberline-font">Preservation</h4>
              <p className="about-paragraph sub-col-info">
                We believe families are sacred, energy is finite, and time is scarce. We honor unity and we move in accordance with these laws within our tribe and on behalf of The Village.
              </p>
            </div>

            <img src="/img/logo.png" alt="" className="hut-img" />

            <div className="dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>

          <div className="about-col-5">
            <h3 className="web-page-title">Our Tribe</h3>
            <p className="about-paragraph">
              A Village can only be established through an outpour of hard work, commitment, and love. And that’s what the tribe behind Abulé has sought to do. <br /> <br />
              We are more than colleagues. We’re a tribe of caregivers, creators and connectors. We look forward to creating community with you.
            </p>
          </div>

          <div className="about-col-6">
            <div className="sub-col-6">
              <img src="./img/ceo.jpg" alt="Abule" className="ceo" />
              <p className="about-paragraph col-6-paragraph name-tag">Toyosi Babalola</p>
              <p className="about-paragraph role-tag">Founder & CEO</p>
              <div className="col-6-links">
                <a href="https://www.linkedin.com/in/toyosibabalola/" className="col-6-link">
                  <span className="icon fa fa-linkedin" />
                </a>
                <a href="https://twitter.com/ToyosiBabalola7" className="col-6-link">
                  <span className="icon fa fa-twitter" />
                </a>
              </div>
            </div>

            <div className="sub-col-6">
              <img src="./img/engr.jpg" alt="Abule" className="ceo" />
              <p className="about-paragraph col-6-paragraph name-tag">Akintomiwa Fisayo</p>
              <p className="about-paragraph role-tag">Software Engineer</p>
              <div className="col-6-links">
                <a href="https://www.linkedin.com/in/akintomiwa-fisayo-606620193/" className="col-6-link">
                  <span className="icon fa fa-linkedin" />
                </a>
              </div>
            </div>

            <div className="sub-col-6">
              <img src="./img/designer.jpg" alt="Abule" className="ceo" />
              <p className="about-paragraph col-6-paragraph name-tag">Anu Olotu</p>
              <p className="about-paragraph role-tag">Designer</p>
              <div className="col-6-links">
                <a href="https://www.linkedin.com/in/anuoluwapo-olotu-750805b5/" className="col-6-link">
                  <span className="icon fa fa-linkedin" />
                </a>
              </div>
            </div>

            <div className="sub-col-6">
              <img src="./img/assistant.jpg" alt="Abule" className="ceo" />
              <p className="about-paragraph col-6-paragraph name-tag">Dara Brielle</p>
              <p className="about-paragraph role-tag">Honorary Assistant</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default About;
