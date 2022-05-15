import Head from "next/head";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });
export default function Home() {
  useEffect(() => {
    var marquee = document.querySelector(".marquee");

    var marqueeLength = marquee.clientWidth;

    var marqueeTravelTime = Math.ceil(marqueeLength / 50);

    marquee.style.animation = `scrollLeft ${marqueeTravelTime}s linear infinite`;

    marquee.addEventListener("mouseover", (e) => {
      marquee.style["animation-play-state"] = "paused";
    });
    marquee.addEventListener("mouseout", (e) => {
      marquee.style["animation-play-state"] = "running";
    });
  }, []);
  return (
    <div className="ab-page__wrapper">
      <section className="ab-hero bg--dark pt-5">
        <div className="ab-hero__content text-center d-flex justify-content-center">
          <div className=" pb-2">
            <div className="position-relative">
              <h1 className="ab__h1 mb-0 text-is-secondary ab-hero__content-title mx-auto">
                Care
              </h1>
              <h1 className="ab__h1 text-white mb-0 ab-hero__content-title has--stroke mx-auto">
                Reimagined.
                <img src="/images/vector/yellow_stroke_1.svg" alt="" />
              </h1>
            </div>
            <div className="text-center mt-5">
              <p className="ab__subtitle text-is-light">
                The first care economy on blockchain.{" "}
              </p>
            </div>
            <div className="my-5 d-flex align-items-center justify-content-center">
              <a
                href="#!"
                className="ab-button ab-button--primary mr-3 mr-md-5"
              >
                Get Started <i className="ti-arrow-right ml-2"></i>
              </a>
              <a
                href="#!"
                className="ab-icon-button ab-icon-button--primary d-flex align-items-center"
              >
                <div>
                  <div className="icon-wrapper flex-absolute-center mr-3">
                    <div className="icon-wrapper__icon flex-absolute-center">
                      <img
                        src="/images/vector/white_play_icon.svg"
                        className="icon m-0"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                Watch Video
              </a>
            </div>
          </div>
        </div>
        <div className="ab-hero__image-group">
          <img src="/images/home/intro-group-1.png" alt="" />
          <img src="/images/home/intro-group-2.png" alt="" />
          <img src="/images/home/intro-group-3.png" alt="" />
          <img src="/images/home/intro-group-4.png" alt="" />
          <img src="/images/home/intro-group-5.png" alt="" />
          <img src="/images/home/intro-group-6.png" alt="" />
        </div>
      </section>
      <div className="marquee-container">
        <div className="marquee text-uppercase">
          Community - Ownership - Unity.
        </div>
      </div>
      <section className="ab-section container-fluid">
        <div className="container p-0 bg-white">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src="/images/home/1.png"
                className="ab-section__image"
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="ab-section__content">
                <h3 className="ab__h3 text-is-secondary">
                  Belonging <br /> never felt <br /> better.
                </h3>
                <div className="py-4 d-flex flex-wrap">
                  <p className="ab__body text-is-contrast numbered-pills">
                    <span className="text-is-secondary">01. </span> Connect
                  </p>
                  <p className="ab__body text-is-contrast numbered-pills">
                    <span className="text-is-secondary">02. </span> Find care
                  </p>
                  <p className="ab__body text-is-contrast numbered-pills">
                    <span className="text-is-secondary">03. </span> Trade care
                  </p>
                  <p className="ab__body text-is-contrast numbered-pills">
                    <span className="text-is-secondary">04. </span> Share
                    knowledge
                  </p>
                  <p className="ab__body text-is-contrast numbered-pills">
                    <span className="text-is-secondary">05. </span> Learn across
                    cultures
                  </p>
                  <p className="ab__body text-is-contrast numbered-pills">
                    <span className="text-is-secondary">06. </span> Send tokens
                    of appreciation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ab-section container-fluid">
        <div className="container p-0 bg-white">
          <div className="row align-items-center">
            <div className="col-md-6 py-3">
              <div className="ab-section__content col-lg-10 mx-auto">
                <h3 className="ab__h3 text-is-dark">
                  Hello.
                  <br /> How can we <br /> help you?
                </h3>
                <div className="py-4">
                  <div className="row">
                    <div className="col-6">
                      <p className="ab__body text-is-contrast checked-pills d-flex align-items-center">
                        <img
                          src="/images/vector/blue_check.svg"
                          className=" mr-1"
                          alt=""
                        />{" "}
                        Community
                      </p>
                      <p className="ab__body text-is-contrast checked-pills d-flex align-items-center">
                        <img
                          src="/images/vector/blue_check.svg"
                          className=" mr-1"
                          alt=""
                        />{" "}
                        Classes
                      </p>
                      <p className="ab__body text-is-contrast checked-pills d-flex align-items-center">
                        <img
                          src="/images/vector/blue_check.svg"
                          className=" mr-1"
                          alt=""
                        />{" "}
                        Sitting
                      </p>
                      <p className="ab__body text-is-contrast checked-pills d-flex align-items-center">
                        <img
                          src="/images/vector/blue_check.svg"
                          className=" mr-1"
                          alt=""
                        />{" "}
                        Homework help
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="ab__body text-is-contrast checked-pills d-flex align-items-center">
                        <img
                          src="/images/vector/blue_check.svg"
                          className=" mr-1"
                          alt=""
                        />{" "}
                        Activities
                      </p>

                      <p className="ab__body text-is-contrast checked-pills d-flex align-items-center">
                        <img
                          src="/images/vector/blue_check.svg"
                          className=" mr-1"
                          alt=""
                        />{" "}
                        School runs
                      </p>

                      <p className="ab__body text-is-contrast checked-pills d-flex align-items-center">
                        <img
                          src="/images/vector/blue_check.svg"
                          className=" mr-1"
                          alt=""
                        />{" "}
                        Tutoring
                      </p>
                    </div>
                    <div className="col-12 my-3">
                      <a
                        href="#!"
                        className="ab-button ab-button--primary mr-5"
                      >
                        Get Started <i className="ti-arrow-right ml-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <img
                src="/images/home/2.png"
                className="ab-section__image"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="ab-section container-fluid pl-0">
        <div className="p-0">
          <div className="row align-items-center no-gutters">
            <div className="col-md-5">
              <img
                src="/images/home/3.png"
                className="ab-section__image"
                alt=""
              />
            </div>
            <div className="col-md-6 offset-1">
              <div className="ab-section__content col-md-8 mr-auto">
                <h3 className="ab__h3 text-is-secondary ab-section__title pt-4">
                  Your Abulé. <br /> Your peace of <br /> mind.
                </h3>
                <div className="py-4 row align-items-center col-lg-12 p-0">
                  <div className="col-md-6">
                    <p className="ab__body text-is-contrast numbered-pills alt">
                      <span className="text-is-secondary">01. </span> Your
                      family
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="ab__body text-is-contrast numbered-pills alt">
                      <span className="text-is-secondary">02. </span> Your
                      friends
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="ab__body text-is-contrast numbered-pills alt">
                      <span className="text-is-secondary">03. </span> Your
                      neighbors
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="ab__body text-is-contrast numbered-pills alt">
                      <span className="text-is-secondary">04. </span> Your
                      coworkers
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="ab__body text-is-contrast numbered-pills alt">
                      <span className="text-is-secondary">05. </span> Your
                      coworkers
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="ab__body text-is-contrast numbered-pills alt">
                      <span className="text-is-secondary">06. </span> Your
                      support
                    </p>
                  </div>
                  <div className="col-12 my-4">
                    <div className="ab__body-large ab__text--italic text-is-contrast">
                      No more weird asks
                    </div>
                  </div>
                  <div className="col-12 my-1">
                    <a href="#!" className="ab-button ab-button--outline mr-5">
                      See how it works <i className="ti-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ab-section container-fluid bg--dark">
        <div className="container py-5">
          <div className="py-4 text-white text-center">
            <h5 className="ab__pretitle mb-0">Features.</h5>
            <h5 className="ab__h3">Made just for you.</h5>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="icon-pills text-white bg--dark2">
                <img
                  src="/images/icons/fingerprint.svg"
                  className="mr-2"
                  alt=""
                />
                <span>Biometrics</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="icon-pills text-white bg--dark2">
                <img src="/images/icons/trust.svg" className="mr-2" alt="" />
                <span>Trust and safety</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="icon-pills text-white bg--dark2">
                <img
                  src="/images/icons/hiding-profile.svg"
                  className="mr-2"
                  alt=""
                />
                <span>Hiding profiles</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="icon-pills text-white bg--dark2">
                <img
                  src="/images/icons/education.svg"
                  className="mr-2"
                  alt=""
                />
                <span>Education</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="icon-pills text-white bg--dark2">
                <img
                  src="/images/icons/fingerprint.svg"
                  className="mr-2"
                  alt=""
                />
                <span>CareRewards</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="icon-pills text-white bg--dark2">
                <img
                  src="/images/icons/fingerprint.svg"
                  className="mr-2"
                  alt=""
                />
                <span>CareMetaverse</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="icon-pills text-white bg--dark2">
                <img
                  src="/images/icons/fingerprint.svg"
                  className="mr-2"
                  alt=""
                />
                <span>Live video chat</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="icon-pills text-white bg--dark2">
                <img
                  src="/images/icons/fingerprint.svg"
                  className="mr-2"
                  alt=""
                />
                <span>Live voice chat</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ab-section py-5">
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          items={1}
          nav={false}
          center={true}
          stagePadding={400}
          dots={false}
          autoplay={true}
        >
          <div className="item">
            <div className="testimonial-card col-lg-12 mx-auto flex-absolute-center">
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-8">
                    <img
                      src="/images/icons/quote.svg"
                      className="testimonial-card__icon"
                      alt=""
                    />
                    <h5 className="testimonial-card__title">
                      Monetize your talents.{" "}
                    </h5>
                    <p className="testimonial-card__content">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      semLorem ipsum dolor sit amet consectetur adipiscing elit
                      semper dalar elementum tempus hac.
                    </p>
                    <div className="testimonial-card__stars d-flex align-items-center">
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex d-md-block align-items-center justify-content-center">
                      <div className="d-block d-md-flex justify-content-center">
                        <img
                          src="/images/testimonial/placeholder.png"
                          className="testimonial-card__author-img"
                          alt=""
                        />
                      </div>
                      <div className="text-left text-md-center">
                        <h5 className="testimonial-card__author-name mb-0">
                          Monica Lewinsky{" "}
                        </h5>
                        <p className="testimonial-card__author-position">
                          Design Directore at Grais
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="testimonial-card col-lg-12 mx-auto flex-absolute-center">
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-8">
                    <img
                      src="/images/icons/quote.svg"
                      className="testimonial-card__icon"
                      alt=""
                    />
                    <h5 className="testimonial-card__title">
                      Monetize your talents.{" "}
                    </h5>
                    <p className="testimonial-card__content">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      semLorem ipsum dolor sit amet consectetur adipiscing elit
                      semper dalar elementum tempus hac.
                    </p>
                    <div className="testimonial-card__stars d-flex align-items-center">
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex d-md-block align-items-center justify-content-center">
                      <div className="d-block d-md-flex justify-content-center">
                        <img
                          src="/images/testimonial/placeholder.png"
                          className="testimonial-card__author-img"
                          alt=""
                        />
                      </div>
                      <div className="text-left text-md-center">
                        <h5 className="testimonial-card__author-name mb-0">
                          Monica Lewinsky{" "}
                        </h5>
                        <p className="testimonial-card__author-position">
                          Design Directore at Grais
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="testimonial-card col-lg-12 mx-auto flex-absolute-center">
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-8">
                    <img
                      src="/images/icons/quote.svg"
                      className="testimonial-card__icon"
                      alt=""
                    />
                    <h5 className="testimonial-card__title">
                      Monetize your talents.{" "}
                    </h5>
                    <p className="testimonial-card__content">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit
                      semLorem ipsum dolor sit amet consectetur adipiscing elit
                      semper dalar elementum tempus hac.
                    </p>
                    <div className="testimonial-card__stars d-flex align-items-center">
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                      <img
                        src="/images/icons/filled_star.svg"
                        className="testimonial-card__star"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex d-md-block align-items-center justify-content-end">
                      <div className="d-block d-md-flex justify-content-center">
                        <img
                          src="/images/testimonial/placeholder.png"
                          className="testimonial-card__author-img"
                          alt=""
                        />
                      </div>
                      <div className="text-left text-md-center">
                        <h5 className="testimonial-card__author-name mb-0">
                          Monica Lewinsky{" "}
                        </h5>
                        <p className="testimonial-card__author-position">
                          Design Directore at Grais
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </section>
      <section className="py-5">
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <img
                src="/images/press/forbes.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img src="/images/press/fox5.svg" className="press-logo" alt="" />
            </div>
            <div className="slide">
              <img
                src="/images/press/madame_noire.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="/images/press/forbes.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img src="/images/press/fox5.svg" className="press-logo" alt="" />
            </div>
            <div className="slide">
              <img
                src="/images/press/madame_noire.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="/images/press/forbes.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img src="/images/press/fox5.svg" className="press-logo" alt="" />
            </div>
            <div className="slide">
              <img
                src="/images/press/madame_noire.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="/images/press/forbes.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img src="/images/press/fox5.svg" className="press-logo" alt="" />
            </div>
            <div className="slide">
              <img
                src="/images/press/madame_noire.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="/images/press/forbes.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img src="/images/press/fox5.svg" className="press-logo" alt="" />
            </div>
            <div className="slide">
              <img
                src="/images/press/madame_noire.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="/images/press/forbes.svg"
                className="press-logo"
                alt=""
              />
            </div>
            <div className="slide">
              <img src="/images/press/fox5.svg" className="press-logo" alt="" />
            </div>
            <div className="slide">
              <img
                src="/images/press/madame_noire.svg"
                className="press-logo"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="ab-section">
        <div className="container">
          <div className="py-5 text-center col-lg-8 mx-auto">
            <h4 className="ab__h4 text-is-dark">
              Become a caregiver.
              <br /> Get rewarded.
            </h4>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="icon-card flex-aboslute-center p-2 p-md-4">
                <div className="w-100">
                  <img
                    src="/images/icons/monetize.svg"
                    className="icon-card__icon"
                    alt=""
                  />
                  <h4 className="ab__body-large ab__font-medium text-is-dar my-3">
                    Monetize your talents.
                  </h4>
                  <p className="ab__body-small text-is-contrast">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    semper dalar elementum tempus hac tellus libero accumsan.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-card flex-aboslute-center p-2 p-md-4">
                <div className="w-100">
                  <img
                    src="/images/icons/earn.svg"
                    className="icon-card__icon"
                    alt=""
                  />
                  <h4 className="ab__body-large ab__font-medium text-is-dark my-3">
                    Earn some extra income.
                  </h4>
                  <p className="ab__body-small text-is-contrast">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    semper dalar elementum tempus hac tellus libero accumsan.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-card flex-aboslute-center p-2 p-md-4">
                <div className="w-100">
                  <img
                    src="/images/icons/give.svg"
                    className="icon-card__icon"
                    alt=""
                  />
                  <h4 className="ab__body-large ab__font-medium text-is-dark my-3">
                    Give meaningful help.
                  </h4>
                  <p className="ab__body-small text-is-contrast">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    semper dalar elementum tempus hac tellus libero accumsan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row py-4">
            <div className="col-md-8">
              <div className="ab-section__content p-0">
                <img
                  src="/images/home/6.png"
                  className="ab-section__image h-100"
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="icon-card flex-aboslute-center p-2 p-md-4 mt-0">
                <div className="w-100">
                  <img
                    src="/images/icons/feel-good.svg"
                    className="icon-card__icon"
                    alt=""
                  />
                  <h4 className="ab__body-large ab__font-medium text-is-dark my-3">
                    Feel good for contributing.
                  </h4>
                  <p className="ab__body-small text-is-contrast">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    semper dalar elementum tempus hac tellus libero accumsan.
                  </p>
                </div>
              </div>
              <div className="icon-card flex-aboslute-center p-2 p-md-4 mt-5">
                <div className="w-100">
                  <img
                    src="/images/icons/token-appreciation.svg"
                    className="icon-card__icon"
                    alt=""
                  />
                  <h4 className="ab__body-large ab__font-medium text-is-dark my-3">
                    Earn token of appreciation.
                  </h4>
                  <p className="ab__body-small text-is-contrast">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    semper dalar elementum tempus hac tellus libero accumsan.
                  </p>
                </div>
              </div>
              <div className="col-md-12 p-0 mt-4">
                <a href="#!" className="ab-button ab-button--outline mr-5">
                  Learn more <i className="ti-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ab-section container-fluid">
        <div className="container p-0 bg-white">
          <div className="row align-items-center">
            <div className="col-md-6 py-3">
              <div className="ab-section__content col-lg-8 p-0 mx-auto">
                <h3 className="ab__h3 text-is-dark">
                  Ready to <br /> score a tribe?
                </h3>
                <div className="py-4">
                  <p className="ab__body text-is-contrast">
                    Meet Abulé. The all in one care support you wish you had.
                    It’s goals.
                  </p>
                  <div className="my-4">
                    <a href="#!" className="ab-button ab-button--primary mr-5">
                      Get Started <i className="ti-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="/images/home/7.png"
                className="ab-section__image"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

