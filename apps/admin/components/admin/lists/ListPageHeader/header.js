import React from "react"
import LogoutIcon from '../../icons/logout-ico'
import UserIcon from '../../icons/user-ico'

const ListPageHeader = ({
    title,
    firstName,
    lastName,
    role,
}) => {

    return (
        <div className={`adminApp_listPage_header`}>
            <div>
                <span className={`adminApp_listPage_headerTitle`}>{title}</span>
            </div>
            <div className={`adminApp_details`}>
                {
                    role !== undefined &&
                    <>
                        <div className="adminApp_detailsImage"><UserIcon className={`black-fill`} /></div>
                        <div className={`adminApp_details_role`}>
                            <span className={`adminApp_name`}>{`${firstName || ''} ${lastName || ''}`}</span>
                            <span>{role}</span>
                        </div>
                        <LogoutIcon className={`adminApp_logoutIcon`} />
                    </>
                }
            </div>
        </div>
    )
}

export default ListPageHeader