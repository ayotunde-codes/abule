import React from 'react';

const CareReward = ({careRewardImg, careRewardLabel}) => {
  return <div className='careReward'>
      <img src={careRewardImg} alt="" className="careRewardImg" />
      <span className="careRewardText">{careRewardLabel}</span>
  </div>;
};

export default CareReward;
