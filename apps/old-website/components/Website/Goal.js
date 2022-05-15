import React from 'react';

const Goal = ({
  goalImg, 
  goalNum, 
  goalTitle, 
  goalParagraph
}) => {
  return (
    <div className='goalBlock'>
        <img src={goalImg} alt="" className="goalImg" />
        <div className="goalInfo">
            <span className="goalNum">{goalNum}</span>
            <h4 className="goalTitle">
                {goalTitle}
            </h4>
            <p className="goalParagraph">
                {goalParagraph}
            </p>
        </div>
    </div>
  )
};

export default Goal;
