import React from 'react';
import Link from 'next/link';

const Header = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  function displayMenu() {
    setShowMenu((prevState) => prevState = !showMenu);
  }

  React.useEffect(() => {
    const body = document.querySelector('main');
    body.addEventListener('mousedown', () => {
      setShowMenu(false);
    });
  });
  return (
    <div className="headerGrid">
      <div className="webpage-container">

        <a href="/">
          <img src="/images/logo.svg" alt="" className="logo mobile-hide" />
          <img src="/logo.png" alt="" className="logo mobile-show" />
        </a>

        <button
          type="button"
          className="menuBtn"
          onClick={displayMenu}
        >
          <img src="/images/add.svg" alt="" className="menuIcon mobile-show" />
        </button>
        <div className={showMenu ? 'navListMobile' : 'navListMobileHide'}>
          <Link href="/impact">
            <a>Social impact</a>
          </Link>
          <Link href="/ambassador">
            <a>Become an ambassador</a>
          </Link>
        </div>
        <div className="navList">
          <Link href="/">
            <a className="navLink">
              About
            </a>
          </Link>

          <Link href="/#features">
            <a className="navLink">
              Features
            </a>
          </Link>
          {/*
      <Link href="#">
        <a className="navLink">
          Roadmap
        </a>
      </Link> */}

          <Link href="/#faqSection">
            <a className="navLink">
              FAQs
            </a>
          </Link>
        </div>
        {/* <span /> */}
        {/* <button className="whitePaper">
        <img src="/images/whitePaper.svg" alt="" className="whiteBtn" />
        White Paper
      </button> */}
        <Link href="/ambassador">

          <button
            type="button"
            className="whitePaper"
          >
            {/* <img src="/images/whitePaper.svg" alt="" className="whiteBtn" /> */}
            Become an Ambassador
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
