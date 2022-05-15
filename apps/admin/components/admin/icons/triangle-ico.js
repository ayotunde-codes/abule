import React from "react"
const TriICon = ({ className, stroke }) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5.047 14.547.774 1.357l13.56 2.894-9.287 10.296Z"
      stroke={stroke ? stroke : "#97BAFF"}
    />
  </svg>
)

export default TriICon