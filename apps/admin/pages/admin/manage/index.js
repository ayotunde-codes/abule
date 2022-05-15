import Layout from "../../../components/admin/layout"
import Head from "next/head"
import ListPageHeader from "../../../components/admin/lists/ListPageHeader/header"
import { AddAdmin } from "../../../components/admin/lists/ListPageHeader/buttonExport"
import List from "../../../components/admin/lists/AdminList"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from 'axios'


const Page = ({setActivePage}) => {
    const [ adminList, setAdminList ] = useState([])    
    const [groupSelect, setGroupSelect ] = useState(false)
    const [selectedData, setSelectedData] = useState([])
    const admin = useSelector(state => state.admin)

    const fetchAdminList = async() => {
      try {
          let config = {
              headers: { 'Authorization': `Bearer ${admin?.data?.token}` }
          };
          if(admin?.data?.adminDepartment?.name === 'Management' || admin?.data?.adminDepartment?.name === 'Human_Resources' ){
            const res = await axios.get(`${process.env.REACT_APP_API}/admin/admins`, config)
            setAdminList(res.data.data?.admins)
          }else {
            const res = await axios.get(`${process.env.REACT_APP_API}/admin/admins/department`, config)
            setAdminList(res.data.data?.admins)
          }
      } catch (e) {
          console.log(e)
      }
  }

    useEffect(() => {
        fetchAdminList()
        setActivePage('manage')
    }, [])

    useEffect(() => {
      if(!groupSelect) setSelectedData([])
    }, [groupSelect])

    return (
        <>
            <Head>
                <title>Abule - Administrators</title>
            </Head>
            <div className={`adminApp_listPage_container`}>
                <ListPageHeader 
                    title={`List of Admin`} 
                    firstName={admin?.data?.firstName}
                    lastName={admin?.data?.lastName}
                    role={admin?.data?.adminRole?.name}
                />
                <div className={`adminApp_filter_container`}>
                    <AddAdmin />
                </div>

                <div onClick={() => setGroupSelect(!groupSelect)} className={`adminApp_selectAll`}>Select all</div>
                <List 
                  list={adminList}
                  fetchAdminList={fetchAdminList}
                  selectedData={selectedData} 
                  setSelectedData={setSelectedData}
                  groupSelect={groupSelect}
                  setGroupSelect={setGroupSelect} 
                />
            </div>
        </>
    )
}

const ManageAdmin = () =>{
    return (
        <Layout>
            <Page />
        </Layout>
    )
}

export default ManageAdmin