import * as React from "react"

const CautionIcon = (props) => (
  <svg
    width={15}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{cursor: "pointer"}}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.778 2.293a.32.32 0 0 0-.556 0L1.47 12.387a.322.322 0 0 0 .278.482h11.504a.322.322 0 0 0 .278-.482L7.778 2.293ZM6.188 1.7a1.51 1.51 0 0 1 2.625 0l5.751 10.094c.576 1.01-.15 2.268-1.312 2.268H1.748c-1.161 0-1.888-1.258-1.312-2.268L6.187 1.701Z"
      fill="#121212"
    />
    <path
      d="M8.214 11.08a.715.715 0 1 1-1.43 0 .715.715 0 0 1 1.43 0Z"
      fill="#121212"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 5.114c.394 0 .714.32.714.716v3.102a.715.715 0 1 1-1.429 0V5.83c0-.396.32-.716.715-.716Z"
      fill="#121212"
    />
  </svg>
)

export default CautionIcon