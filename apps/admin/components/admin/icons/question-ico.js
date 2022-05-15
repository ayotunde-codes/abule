import React, { useState } from 'react';
import { Fn } from '@abule-common/components';

const {
  isEmpty,
} = Fn;

const QuestionIcon = ({ className, text, lastTile }) => {
  const [isActive, setIsActive] = useState(false);
  const showToolTip = () => setIsActive(true);
  const hideToolTip = () => setIsActive(false);
  const displayToolTip = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2000);
  };

  return (
    <div className="tooltipContainer">
      <svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onMouseEnter={showToolTip}
        onMouseLeave={hideToolTip}
        onClick={displayToolTip}
      >
        <path
          opacity={0.7}
          d="M7.07 10.436h.951v-.602c0-1.848 2.506-2.044 2.506-4.368 0-1.456-1.204-2.478-2.8-2.478-1.386 0-2.254.798-2.254.798l.518.714s.742-.602 1.694-.602c1.078 0 1.834.714 1.834 1.61 0 1.806-2.45 2.072-2.45 4.298v.63Zm-.057 2.576h1.078v-1.078H7.013v1.078Z"
          fill="#030229"
        />
        <rect
          x={0.4}
          y={0.4}
          width={15.2}
          height={15.2}
          rx={7.6}
          stroke="#4F4E69"
          strokeWidth={0.8}
        />
      </svg>
      {
        !isEmpty(text)
        && (
          <div className={`tooltip ${!isActive ? 'hide' : ''} ${lastTile ? 'tooltip_lastTile' : ''}`}>
            {text}
          </div>
        )
      }
    </div>
  );
};

export default QuestionIcon;
