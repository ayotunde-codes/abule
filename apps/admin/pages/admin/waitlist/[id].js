import Layout from "../../../components/admin/layout"
import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ListPageHeader from "../../../components/admin/lists/ListPageHeader/header"
import { ExportCSV } from "../../../components/admin/lists/ListPageHeader/buttonExport"
import { useSelector } from "react-redux"


const Page = () => {
    const [person, setPerson] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        city: '',
        state: '',
        zipCode: '',
        "findTribe": false,
        "needPickUp": false,
        "needSitter": false,
        "needTutor": false,
        "needActivity": false,
        "needHelpWithChores": false,
        "none": false,
        "helpWithPickUp": false,
        "helpWithSitter": false,
        "helpWithTutor": false,
        "helpWithHostingAnActivity": false,
        "connectWithLikeMinds": false,
        "helpWithChores": false,
    })
    const router = useRouter()
    const admin = useSelector(state => state.admin)

    useEffect(() => {
        const fetchWaitlist = async() => {
            try {
                let config = {
                    headers: { 'Authorization': `Bearer ${admin?.data?.token}` }
                };
                const res = await axios.get(`${process.env.REACT_APP_API}/admin/waitlists/${router.query?.id}`, config)
                if(res.status === 200){
                    setPerson(res.data.data.waitlist)
                }else{
                    router.push(`admin/dashboard`)
                }
            } catch (e) {
                console.log(e)
            }
        }

        fetchWaitlist()
    }, [])

    return (
        <>
             <Head>
                <title>Waitlist</title>
            </Head>
            <div className={`adminApp_listPage_container`}>
                <ListPageHeader 
                    title={`Waitlist`} 
                    firstName={admin?.data?.firstName}
                    lastName={admin?.data?.lastName}
                    role={admin?.data?.adminRole?.name}
                    goBack={true}
                />
                <div className={`adminApp_filter_container`}>
                    <ExportCSV 
                        list={[router.query?.id]}
                        listType={'waitlists'}
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
                    </div>
                </div>
                <div className={`adminApp_listInfo_container`}>
                    <div className={`adminApp_listInfo_painPoints`}>
                        <div className={`adminApp_painPoints_header`}>
                            What are your biggest plans?
                        </div>
                        <div className={`adminApp_painPoints_body`}>
                            {
                                person.findTribe &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I need to find my tribe
                                    </span>
                                </div>
                            }
                            {
                                person.needPickUp &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I need help with pick-up/drop-offs
                                    </span>
                                </div>
                            }
                            {
                                person.needSitter &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I need to find a sitter
                                    </span>                                               
                                </div>
                            }
                            {
                                person.needTutor &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I need to find a tutor
                                    </span>                            
                                </div>
                            }
                            {
                                person.needActivity &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I need to host an activity
                                    </span>
                                </div>
                            }
                            {
                                person.needHelpWithChores &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I need help with household chores
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`adminApp_listInfo_painPoints`}>
                        <div className={`adminApp_painPoints_header`}>
                            How are you able to help others?
                        </div>
                        <div className={`adminApp_painPoints_body`}>
                            {
                                person.helpWithHostingAnActivity || person.helpWithTutor &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I can host an activity or teach a class
                                    </span>
                                </div>
                            }
                            {
                                person.helpWithPickUp &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I can help with pick-up/drop-offs
                                    </span>
                                </div>
                            }
                            {
                                person.helpWithChores &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I can help with household chores
                                    </span>
                                </div>
                            }
                            {
                                person.helpWithSitter &&
                                <div className={`adminApp_painPoint`}>
                                    <div className={`adminApp_painPoint_check`} >
                                    </div>
                                    <span>
                                        I can help with sitting
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Waitlist = () => {
    return (
        <Layout>
            <Page />
        </Layout>
    )
}

export default Waitlist