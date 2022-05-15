import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer>
    <div className="footerGrid">
      <div className="footerRow1">
        <div className="footerCol1">
          <img src="/images/footerLogo.png" alt="" className="footerImg" />
        </div>
        <div className="footerCol2">
          <div className="footerCol1Sub">
            <Link href="/impact">
              <a className="footerLink">
                Social Impact
              </a>
            </Link>

            <Link href="/ambassador">
              <a className="footerLink">
                Become an Ambassador
              </a>
            </Link>
          </div>
          <p className="pledgeBlock">
            <strong>Our Pledge:</strong> To build an accessible, affordable
            and sustainable care economy
          </p>
        </div>
      </div>
      <div className="socialLinks">
        <a
          rel="noopener noreferrer"
          href="https://twitter.com/helloabule"
          target="_blank"
        >
          <img src="/images/tw.svg" alt="" className="socialIcon" />
        </a>
        <a
          href="https://www.facebook.com/helloabule/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/fb.svg" alt="" className="socialIcon" />
        </a>
        <a
          href="https://instagram.com/helloabule"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/images/in.svg" alt="" className="socialIcon" />
        </a>
        {/* <a>
              <img src="/images/ds.svg" alt="" className="socialIcon" />
            </a>
        */
        }
        <a
          href='https://helloabule.medium.com/'
          target="_blank"
          rel='noreferrer'
        >
          <img src="/images/me.svg" alt="" className="socialIcon" />
        </a>
        <a
          rel="noopener noreferrer"
          href="https://www.linkedin.com/company/abule"
          target="_blank"
        >
          <img src="/images/li.svg" alt="" className="socialIcon" />
        </a>
      </div>
    </div>
    <p className="footerCopyright">
      &#9400; 2022 Abulé Inc,  a public benefit corporation
    </p>
  </footer>
);

export default Footer;
