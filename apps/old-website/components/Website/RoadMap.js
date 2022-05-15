import React from 'react';

const RoadMap = ({roadMapClass, roadMapText}) => {
  return(
    <div className={`roadMapBlock ${roadMapClass}`}>
        {roadMapText}
    </div>
  )
};

export default RoadMap;
