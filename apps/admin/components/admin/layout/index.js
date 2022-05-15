import { useSelector, useDispatch } from "react-redux"
import React, { useState, useEffect } from "react"
import SideNav from "../nav/SideNav"
import { useRouter } from "next/router"
import { setHistory } from "../../../redux/admin/actions"

const Layout  = ({children}) => {
    const admin = useSelector(state => state.admin)
    const [activePage, setActivePage] = useState('dashboard')
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        document.body.style.overflowX = 'hidden'
        dispatch(setHistory(router.asPath))
        return () => document.body.style.overflowX = ''
    }, [])

    useEffect(() => {
       if(!admin.hasAccess || admin.data?.token === undefined) router.push('/admin/login')
    }, [admin.hasAccess])

    return (
    <div className={`adminApp_layoutContainer`}>
        <SideNav 
            firstName={admin?.data?.firstName}
            lastName={admin?.data?.lastName}
            role={admin?.data?.adminRole?.name}
            activePage={activePage}
        />
        <div>{React.cloneElement(children, {setActivePage})}</div>
    </div>
    )
}

export default Layout