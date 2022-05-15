import React, { useState, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function FaqAccordions({ content }) {
  const [show, setshow] = useState(false);
  const toggleDisplay = (e) => {
    e.preventDefault();
    setshow(!show);
  };

  return (
    <React.Fragment>
      <div className="subscription-faq-accordion-header">
        <p onClick={(e) => setshow(!show)} className="faq-questions">
          {content.title}
        </p>
        <p
          onClick={toggleDisplay}
          className={show ? "rotate-accordion-down" : "rotate-accordion-up"}
        >
          <MdKeyboardArrowDown />
        </p>
      </div>
      <div
        className={`${
          !show
            ? "subscription-hide-faq-accordion"
            : "subscription-show-faq-accordion"
        }`}
      >
        <div className="subscription-faq-accordion-content">
          <p>{content.content}</p>
        </div>
        {content?.subcontent && (
          <div className="subscription-faq-accordion-subcontent">
            {content.subcontent.map((subcontent, index) => (
              <span className="faq-age-group" key={index}>
                <span>
                  <img src={`/icons/${subcontent.img}`} alt="" />
                  <span>{subcontent.icon.replace("_", " ")}</span>
                </span>
                <span>
                  <p>{subcontent.age}</p>
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
