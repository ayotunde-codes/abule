const EmailUser = ({isOpen, setIsOpen, email, setEmail, onSubmit}) => {
    const handleChange = (e) => {
        setEmail({
            ...email,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
        {
            isOpen && (
                <div onClick={() => setIsOpen(false)} className="adminApp_popupPage">
                    <div onClick={(e) => e.stopPropagation()} className="adminApp_popupContainer">
                        <form onSubmit={onSubmit} className="adminApp_popupForm">
                            <div className="popupHeader">Email</div>
                            <input 
                                type={'text'}
                                placeholder='Subject'
                                className="adminApp_formInput"
                                name='emailSubject'
                                onChange={handleChange}
                                value={email.emailSubject}
                                required={true}
                            />
                            <textarea
                                placeholder="Type a message...."
                                name='emailMessage'
                                rows={8}
                                className="adminApp_formInput"                                
                                onChange={handleChange}
                                value={email.emailMessage}
                                minLength={10}
                                required={true}
                            />
                            <div className="adminApp_formBButtonContainer">
                                <img src="/icons/paperclip-ico.svg" alt="Paper Clip" />
                                <button onClick={onSubmit} type="submit" className="adminApp_formButton">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            )  
        }
        </>
    )
}

const MessageUser = ({isOpen, setIsOpen, email, setEmail, onSubmit}) => {
    const handleChange = (e) => {
        setEmail({
            ...email,
            [e.target.name] : e.target.value
        })
    }
    return (
        <>
        {
            isOpen && (
                <div onClick={() => setIsOpen(false)} className="adminApp_popupPage">
                    <div onClick={(e) => e.stopPropagation()} className="adminApp_popupContainer">
                        <form onSubmit={onSubmit} className="adminApp_popupForm">
                            <div className="popupHeader">Text Message</div>                            
                            <textarea
                                placeholder="Type a message...."
                                name='smsMessage'
                                rows={8}
                                className="adminApp_formInput"                                
                                onChange={handleChange}
                                value={email.smsMessage}
                                minLength={10}
                                required={true}
                            />
                            <div className="adminApp_formBButtonContainer">
                                <img src="/icons/paperclip-ico.svg" alt="Paper Clip" style={{visibility: 'hidden'}}/>
                                <button onClick={onSubmit} type="submit" className="adminApp_formButton">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )  
        }
        </>
    )
}


export {EmailUser, MessageUser}