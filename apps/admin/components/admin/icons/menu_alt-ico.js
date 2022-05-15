import React from "react"
const MenuAltIcon = ({ onClick, isOpen }) => {
    return (
        <div onClick={onClick} className={`adminApp_menuAlt ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default MenuAltIcon