import React from "react"
const EditIcon = ({ editHandler }) => (
  <svg
    width={15}
    height={15}
    fill="none"
    style={{ 'cursor': 'pointer' }}
    xmlns="http://www.w3.org/2000/svg"
    onClick={editHandler}
  >
    <path
      d="M13.125 13.75H1.875a.472.472 0 0 1-.469-.469c0-.256.213-.469.469-.469h11.25c.256 0 .469.213.469.47a.472.472 0 0 1-.469.468ZM11.887 2.175c-1.212-1.212-2.4-1.244-3.644 0l-.756.756a.26.26 0 0 0-.062.25 5.08 5.08 0 0 0 3.456 3.457.25.25 0 0 0 .256-.063l.75-.756c.619-.613.919-1.206.919-1.806.006-.62-.294-1.22-.919-1.838ZM9.756 7.206a5.5 5.5 0 0 1-.925-.537 3.774 3.774 0 0 1-.35-.269.763.763 0 0 1-.106-.094 5.286 5.286 0 0 1-.644-.65c-.019-.012-.05-.056-.094-.112-.062-.075-.168-.2-.262-.344a3.432 3.432 0 0 1-.244-.369 8.074 8.074 0 0 1-.275-.512c-.115-.246-.437-.32-.629-.127L2.712 7.706a.752.752 0 0 0-.175.344L2.2 10.444c-.063.425.056.825.319 1.093.225.22.537.338.875.338.075 0 .15-.006.225-.019l2.4-.337a.695.695 0 0 0 .343-.175l3.52-3.52c.189-.189.118-.512-.126-.618Z"
      fill="#000"
    />
  </svg>
)

export default EditIcon
