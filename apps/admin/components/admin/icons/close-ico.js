import React from "react"

const CloseIcon = (props) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3.75 14.25 10.5-10.5M14.25 14.25 3.75 3.75"
      stroke="#292D32"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CloseIcon