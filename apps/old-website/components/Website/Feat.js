import React from 'react';

const Feat = ({featImg, featLabel}) => {
  return (
        <div className="feat">
            <img src={featImg} alt="" className="featImg" />
            <span className="featLabel">{featLabel}</span>
        </div>
    )
};

export default Feat;
