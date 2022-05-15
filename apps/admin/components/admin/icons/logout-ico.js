import React from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { denyAccess } from "../../../redux/admin/actions"

const LogoutIcon = ({ className }) => {

  const dispatch = useDispatch()
  const router = useRouter()

  const logout = () => {
    dispatch(denyAccess())
    router.push('/admin/login')
  }

  return (
    <svg
      onClick={logout}
      width={18}
      height={17}
      fill="none"
      style={{ cursor: 'pointer' }}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.58 7.692a.642.642 0 0 0-.653.641c0 .35.288.642.652.642h5.088v3.983c0 2.042-1.688 3.709-3.773 3.709h-4.13c-2.077 0-3.764-1.659-3.764-3.7V3.708C0 1.658 1.696 0 3.773 0h4.138c2.068 0 3.756 1.658 3.756 3.7v3.992H6.579Zm8.112-2.242 2.433 2.425a.636.636 0 0 1 0 .908l-2.433 2.426a.646.646 0 0 1-.45.191.644.644 0 0 1-.458-1.1l1.333-1.325h-3.45V7.692h3.45l-1.334-1.325a.644.644 0 0 1 0-.909.636.636 0 0 1 .909-.008Z"
        fill="#030229"
        opacity={0.5}
      />
    </svg>
  )
}

export default LogoutIcon