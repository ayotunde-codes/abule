import React from "react"
import Link from 'next/link'
import DashboardIcon from '../icons/dashboard-ico'
import AdminIcon from '../icons/admin-ico'
import AlertIcon from '../icons/alert-ico'
import CohortIcon from '../icons/cohort-ico'
import DeptIcon from '../icons/dept-ico'
import UserIcon from '../icons/user-ico'
import MenuAltIcon from '../icons/menu_alt-ico'
import ArrowLeftAlt from '../icons/arrow_left_alt-ico'
import LogoutIcon from '../icons/logout-ico'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const SideNav = ({
    role,
    firstName,
    lastName,
    activePage,
    goBack
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();

    const toggleNav = () => {
        setIsOpen(prevState => !prevState)
    }

    return (
        <div className={`adminApp_sideNav`} >
            <div className={`adminApp_sideNav_togglerContainer`}>
                {
                    goBack === true ?
                        <div onClick={() => router.back()}>
                            <ArrowLeftAlt />
                        </div>
                        :
                        <div className={`adminApp_navImage_small`}>
                            <img src='/favicon.png' alt='logo' />
                        </div>
                }
                {

                    <div className={`adminApp_sideNav_toggler`}>
                        <MenuAltIcon onClick={toggleNav} isOpen={isOpen} />
                    </div>
                }
            </div>
            <div className={`${!isOpen ? 'adminApp_navStatus' : 'adminApp_navStatusOpen'}`}>
                <aside className={`adminApp_sideNav_container`}>
                    <div className={`adminApp_sideNav_header`}>
                        <div className={`adminApp_navImage_big`}>
                            <img src='/logo_full.png' alt="logo" />
                        </div>
                        <div className={`adminApp_navImage_small`}>
                            <img src='/favicon.png' alt='logo' />
                        </div>
                    </div>
                    <nav className={`adminApp_sideNav_body`}>
                        <Link href='/admin/users'>
                            <a className={`adminApp_sideNav_link ${activePage === 'dashboard' && 'adminApp_sideNav_link_active'}`}>
                                <DashboardIcon className={`adminApp_sideNav_icon}`} />
                                <span>Dashboard</span>
                            </a>
                        </Link>
                        <Link href='/admin/users'>
                            <a className={`adminApp_sideNav_link ${activePage === 'users' && 'adminApp_sideNav_link_active'}`}>
                                <UserIcon className={`adminApp_sideNav_icon`} />
                                <span>Users</span>
                            </a>
                        </Link>
                        <Link href='/admin/manage'>
                            <a className={`adminApp_sideNav_link ${activePage === 'manage' && 'adminApp_sideNav_link_active'}`}>
                                <AdminIcon className={`adminApp_sideNav_icon`} />
                                <span>Manage Admins</span>
                            </a>
                        </Link>
                        <Link href='/admin/users'>
                            <a className={`adminApp_sideNav_link`}>
                                <DeptIcon className={`adminApp_sideNav_icon`} />
                                <span>Departments</span>
                            </a>
                        </Link>
                        <Link href='/admin/users'>
                            <a className={`adminApp_sideNav_link`}>
                                <CohortIcon className={`adminApp_sideNav_icon`} />
                                <span>Cohorts</span>
                            </a>
                        </Link>
                        <Link href='#'>
                            <a className={`adminApp_sideNav_link`}>
                                <AlertIcon className={`adminApp_sideNav_icon`} />
                                <span>Notifications</span>
                            </a>
                        </Link>
                    </nav>
                    <div className={`adminApp_sideNav_footer`}>
                        {
                            role !== undefined &&
                            <>
                                <div className="adminApp_detailsImage"><UserIcon className={`black-fill`} /></div>
                                <div className={`adminApp_details_role`}>
                                    <span className={`adminApp_name`}>{`${firstName || ''}`}</span>
                                    <span className={`adminApp_name`}>{`${lastName || ''}`}</span>
                                </div>
                                <LogoutIcon />
                            </>
                        }
                    </div>
                </aside>
                <div onClick={toggleNav} className='adminApp_navBlankArea'></div>
            </div>

        </div>
    )
}

export default SideNav