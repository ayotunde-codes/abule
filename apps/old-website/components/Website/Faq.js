import React from 'react';

const Faq = ({faq, index, toggleFaq}) => {
  return (
    <div 
      className={"faq " + (faq.open ? 'open' : '')}
      key={index}
      onClick={() => toggleFaq(index)}
    >
      <div className="faqQuestion">
        {faq.questions}
      </div>

      <div className="faqAnswer">
        {faq.answer}
      </div>
    </div>
  )
};

export default Faq;
