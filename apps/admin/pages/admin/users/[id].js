import Layout from "../../../components/admin/layout"
import Head from "next/head"
import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import ListPageHeader from "../../../components/admin/lists/ListPageHeader/header"
import SecondaryNav from "../../../components/admin/lists/ListPageHeader/secondaryNav"
import {
    InputDatePicker
} from '@abule-common/components';
import Overview from "../../../components/admin/userOverview"
import Profile from "../../../components/admin/userProfile"
import ContactUser from "../../../components/admin/contactUser"


const Page = (props) => {
    const [title, setTitle] = useState('')
    const [activeTab, setActiveTab] = useState('overview')
    const [userProfile, setUserProfile] = useState({})
    const admin = useSelector(state => state.admin)
    const [isMounted, setIsMounted] = useState(false)
    const [contactDropdown, setContactDropdown] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let config = {
                    headers: { 'Authorization': `Bearer ${admin?.data?.token}` }
                };
                const res = await axios.get(`${process.env.REACT_APP_API}/admin/users/${router.query.id}`, config)
                setUserProfile(res.data.data.user)
                console.log('This are the users-----', res.data.data.user)
                setIsMounted(true)
            } catch (e) {
                console.log(e)
                if (e.response.status === 404) router.replace('/admin/users')
            }
        }
        fetchUser()
        setTitle('List of Users')
        props.setActivePage('users')

        return () => { setIsMounted(false) }
    }, [])

    const getOverview = () => setActiveTab('overview');
    const getProfile = () => setActiveTab('profile')
    const getActivities = () => setActiveTab('activities')
    const getRequests = () => setActiveTab('requests')
    const getDisputes = () => setActiveTab('disputes')

    const toggleContactDropdown = () => {
        if (contactDropdown) setContactDropdown(false)
    }
    return (
        <>
            <Head>
                <title>Abule - Users</title>
            </Head>
            <div className={`adminApp_listPage_container`} onClick={toggleContactDropdown}>
                <ListPageHeader
                    title={`${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`}
                    firstName={admin?.data?.firstName}
                    lastName={admin?.data?.lastName}
                    role={admin?.data?.adminRole?.name}
                />
                <SecondaryNav>
                    <div onClick={getOverview} className={`nav_links ${activeTab === 'overview' ? 'active' : ''}`}>
                        <span className={`text`}>Overview</span>
                        <div className={`pill`}></div>
                    </div>
                    <div onClick={getProfile} className={`nav_links ${activeTab === "profile" ? 'active' : ''}`}>
                        <span className={`text`}>Profile</span>
                        <div className={`pill`}></div>
                    </div>
                    <div onClick={getActivities} className={`nav_links ${activeTab === "activities" ? 'active' : ''}`}>
                        <span className={`text`}>Activities</span>
                        <div className={`pill`}></div>
                    </div>
                    <div onClick={getRequests} className={`nav_links ${activeTab === "requests" ? 'active' : ''}`}>
                        <span className={`text`}>Requests</span>
                        <div className={`pill`}></div>
                    </div>
                    <div onClick={getDisputes} className={`nav_links ${activeTab === "disputes" ? 'active' : ''}`}>
                        <span className={`text`}>Dispute Resolution</span>
                        <div className={`pill`}></div>
                    </div>
                </SecondaryNav>

                <div className={`adminApp_messageUserPane ${activeTab === 'profile' ? 'adminApp_messageUserPane_profile' : ''}`}>
                    <div className={`adminApp_filter_alt`}>
                        <InputDatePicker
                            onSave={() => console.log('Saved')}
                            onChange={(dates) => console.log('Changed-------', dates)}
                            pickRange={true}
                            controller={() => <span style={{ fontSize: '24px' }} className="icon-calendar-1"></span>}
                        />
                    </div>

                    <ContactUser
                        contactDropdown={contactDropdown}
                        setContactDropdown={setContactDropdown}
                        userId={router?.query?.id}
                        token={admin?.data?.token}
                    />
                </div>

                {
                    isMounted &&
                    <>
                        {activeTab === 'overview' && <Overview user={userProfile} />}
                        {activeTab === 'profile' && <Profile {...props} user={userProfile} />}
                    </>
                }
            </div>
        </>
    )
}

const Users = (props) => {
    return (
        <Layout>
            <Page {...props} />
        </Layout>
    )
}

export default Users