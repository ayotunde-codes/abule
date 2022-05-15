import Layout from "../../../components/admin/layout"
import Head from "next/head"
import ListPageHeader from "../../../components/admin/lists/ListPageHeader/header"
import { ExportCSV } from "../../../components/admin/lists/ListPageHeader/buttonExport"
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'

const Page = () => {
    const [person, setPerson] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
        communitySize: 0,
        ambassadorCharacteristics: ''
    })

    const router = useRouter()
    const admin = useSelector(state => state.admin)
    
    useEffect(() => {
        const fetchAmbassador = async() => {
            try {
                let config = {
                    headers: { 'Authorization': `Bearer ${admin?.data?.token}` }
                };
                const res = await axios.get(`${process.env.REACT_APP_API}/admin/ambassadors/${router.query?.id}`, config)
                if(res.status === 200){
                    setPerson(res.data.data.ambassador)
                }else{
                    router.push(`admin/dashboard`)
                }
            } catch (e) {
                console.log(e)
                
            }
        }

        fetchAmbassador()
    }, [])
    return (
        <>
             <Head>
                <title>Abule - Ambassadors</title>
            </Head>
            <div className={`adminApp_listPage_container`}>
                <ListPageHeader 
                    title={`Ambassadors`}
                    firstName={admin?.data?.firstName}
                    lastName={admin?.data?.lastName}
                    role={admin?.data?.adminRole?.name}
                    goBack={true}
                />
                <div className={`adminApp_filter_container`}>
                    <ExportCSV 
                        list={[router.query?.id]}
                        listType={'ambassadors'}
                        token={admin?.data?.token} 
                    />
                </div>
                <div className={`adminApp_listPane_container`} >
                    <div className={`adminApp_listPane_details`}>
                        <div className={`adminApp_listPane_details_firstName`}>
                            <span className={`adminApp_header`}>First Name</span>
                            <span className={`adminApp_info`}>{person.firstName}</span>
                        </div>
                        <div className={`adminApp_listPane_details_lastName`}>
                            <span className={`adminApp_header`}>Last Name</span>
                            <span className={`adminApp_info`}>{person.lastName}</span>
                        </div>
                    </div>
                    <div className={`adminApp_listPane_details`}>
                        <div className={`adminApp_listPane_details_email`}>
                            <span className={`adminApp_header`}>Email Address</span>
                            <span className={`adminApp_info`}>{person.email}</span>
                        </div>
                        <div className={`adminApp_listPane_details_phone`}>
                            <span className={`adminApp_header`}>Phone Number</span>
                            <span className={`adminApp_info`}>{person.phoneNumber}</span>
                        </div>
                    </div>
                    <div className={`adminApp_listPane_details`}>
                        <div className={`adminApp_listPane_details_city`}>
                            <span className={`adminApp_header`}>City</span>
                            <span className={`adminApp_info`}>{person.city}</span>
                        </div>
                        <div className={`adminApp_listPane_details_state`}>
                            <span className={`adminApp_header`}>State</span>
                            <span className={`adminApp_info`}>{person.state}</span>
                        </div>
                    </div>
                    <div className={`adminApp_listPane_details`}>
                        <div className={`adminApp_listPane_details_zipCode`}>
                            <span className={`adminApp_header`}>Zip Code</span>
                            <span className={`adminApp_info`}>{person.zipCode}</span>
                        </div>
                        <div className={`adminApp_listPane_details_zipCode`}>
                            <span className={`adminApp_header`}>Number of people in community?</span>
                            <span className={`adminApp_info`}>{person.communitySize}</span>
                        </div>
                    </div>
                </div>
                <div className={`adminApp_listInfo_amb_container`}>
                    <div className={`adminApp_info_header`}>
                        {`Tell us why you think you'll make a good ambassador or tribe leader`}
                    </div>
                    <div>
                        {person.ambassadorCharacteristics}
                    </div>
                </div>
            </div>
        </>
    )
}

const AmbassadorsList = () => {
    return (
        <Layout>
            <Page />
        </Layout>
    )
}

export default AmbassadorsList