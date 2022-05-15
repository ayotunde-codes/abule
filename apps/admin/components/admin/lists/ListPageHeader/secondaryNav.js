import React from "react"
const SecondaryNav = ({ children }) => {
    return (
        <div className={`adminApp_listPage_navContainer`}>
            <nav className={`adminApp_listPage_nav`}>
                {children}
            </nav>
        </div>
    )
}


export default SecondaryNav