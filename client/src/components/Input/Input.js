

import React from 'react'
import './Input.css'
import { Form } from 'react-router'
const Input = ({message, setMessage, sendMessage}) => {
  return (
    <form className='form'>
        <input
            className='input'
            type='text'
            placeholder='Type  a message to send to impress your audience...'
            value={message}
            onChange={({target : {value} } )=>setMessage(value) }
            onKeyPress={event=> event.key==='Enter' ? sendMessage(event) : null}
        />
        <button className='sendButton' onClick={e=> sendMessage(e)}>Send</button>
    </form>
  )
}

export default Input