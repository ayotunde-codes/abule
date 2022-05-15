import React from 'react';
import Link from 'next/link';

class Footer extends React.Component {
  /* constructor(props) {
    super(props);
  } */

  render() {
    const { props } = this;
    const { settings } = props;
    const footer = {
      ...settings.footer,
      ...props.footer,
    };
    return (
      footer.show
        ? (
          <div className="footer ">
            <div className="footer-container page-container">
              <div className="footer-content">
                <div className="footer-about footer-card">
                  <div>
                    <h5>ABOUT US</h5>
                    <p>
                      Abulé is on a mission to democratize childcare. We believe that childcare should be pooled and extended as a joint societal effort.
                    </p>
                    <p style={{ marginTop: '1em' }}>
                      <Link href="/about">
                        <a>Learn more</a>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="footer-hworks footer-card">
                  <div>
                    <h5>COMPANY</h5>
                    <Link href="/about">
                      <a>Our Story</a>
                    </Link>
                    <Link href="#">
                      <a>Our Impact</a>
                    </Link>
                    <Link href="#">
                      <a>News</a>
                    </Link>
                    <Link href="#">
                      <a>Partners</a>
                    </Link>
                    <Link href="#">
                      <a>Corporate</a>
                    </Link>
                  </div>
                </div>
                <div className="footer-hworks footer-card">
                  <div>
                    <h5>RESOURCES</h5>
                    <a
                      href="https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/Abul%C3%A9+-+FAQs.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      FAQs
                    </a>
                    <a
                      href="https://helloabule.typeform.com/to/gHofbxG8"
                      target="_blank"
                      rel="noreferrer"
                    >Take the Quiz
                    </a>
                    <a
                      href="https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/Abul%C3%A9+-+The+Blueprint.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      The Blueprint
                    </a>
                    <Link href="#">
                      <a>Video Tutorials</a>
                    </Link>
                    <Link href="#">
                      <a>Provide Feedback</a>
                    </Link>
                  </div>
                </div>
                <div className="footer-support footer-card">
                  <div>
                    <h5>SUPPORT</h5>
                    {/* <Link href="https://www.abule.io/contact" className="support-right">
              <a>Contact us</a>
            </Link> */}
                    <Link href="#" support-right>
                      <a>Covid-19 Guide</a>
                    </Link>
                    <a
                      href="https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/Abule%CC%81+-+Trust+%26+Safety.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >Trust & Safety
                    </a>
                    <Link href="#" support-right>
                      <a>Help Center</a>
                    </Link>
                    <Link href="/privacy" support-right>
                      <a>Privacy Policy</a>
                    </Link>
                    <Link href="/terms" support-right>
                      <a>Terms of Service</a>
                    </Link>
                    <div className="footer-social-links">
                      <Link
                        rel="noopener"
                        href="https://instagram.com/helloabule"
                        target="_blank"
                      >
                        <a className="fa fa-instagram footer-link-item" target="_blank" />
                      </Link>

                      <Link
                        rel="noopener"
                        href="https://www.facebook.com/helloabule/"
                        target="_blank"
                      >
                        <a className="fa fa-facebook footer-link-item" target="_blank" />
                      </Link>

                      <Link
                        rel="noopener"
                        href="https://twitter.com/helloabule"
                        target="_blank"
                      >
                        <a className="fa fa-twitter footer-link-item" target="_blank" />
                      </Link>

                      <Link
                        rel="noopener"
                        href="https://www.linkedin.com/company/abule"
                        target="_blank"
                      >
                        <a className="fa fa-linkedin footer-link-item" target="_blank" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-end">
                <section className="left">
                  {/* <img alt="" src="/img/certified-b-corporation.png" /> */}
                </section>
                <section className="center">
                  <span>&copy;{new Date().getFullYear()}</span>
                  <span> Abulé Inc.</span>
                  <span>All rights reserved</span>
                </section>
                <section className="right" />
              </div>
            </div>
          </div>
        )
        : ''
    );
  }
}

export default Footer;
