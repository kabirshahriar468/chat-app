import React,{useEffect} from 'react'
import './Message.css'
import ReactEmoji from 'react-emoji'
const Message = ({message : {user,text},name}) => {
    let isSentByCurrentUser =false;
    let trimmedName=""
    if (user && name) {
        trimmedName = name.trim().toLowerCase();
        if (user.trim().toLowerCase() === trimmedName) {
            isSentByCurrentUser = true;
        }
    }
    // useEffect(() => {
    //     console.log("Message component: user =", user);
    //     console.log("Message component: trimmedName =", trimmedName);
    //     console.log("Message component: isSentByCurrentUser =", isSentByCurrentUser);
    // }, [user, name]);

  return (
    isSentByCurrentUser
    ? (
        <div className='messageContainer justifyEnd'>
            <p className='sentText pr-10'>{trimmedName}</p>
            <div className='messageBox backgroundBlue'>
                <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
            </div>
        </div>
    )
    :(
        <div className='messageContainer justifyStart'>
            
            <div className='messageBox backgroundLight'>
                <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
            </div>
            <p className='sentText pl-10'>{user}</p>
        </div>
    )
  )
}

export default Message