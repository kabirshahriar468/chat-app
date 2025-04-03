import React, {useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {io} from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
let socket;
const Chat = () => {
  const location = useLocation(); // ✅ Fix: use the hook instead
  const [name, setName] =useState('');
  const [room, setRoom] =useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState(''); // ✅ Fix: Add message state
  const [messages, setMessages] = useState([]); // ✅ Fix: Add messages state
  const ENDPOINT = 'https://chat-app-room-adda99.vercel.app/'; // ✅ Fix: Ensure the URL is correct for your server
  useEffect(() => {
    const {name,room} = queryString.parse(location.search);
    socket = io(ENDPOINT); // ✅ Fix: Ensure the URL is correct for your server
    setName(name);
    setRoom(room);
    console.log(socket);

    socket.emit('join', {name, room}, () => {
      
    });


    return () => {
      //socket.emit('disconnect'); // ✅ Fix: Ensure the socket is disconnected on unmount
      socket.disconnect(); // ✅ Correct way

      socket.off(); // ✅ Fix: Ensure the socket is cleaned up on unmount
    };
    
  },[ENDPOINT,location.search]); // ✅ Add dependency to avoid re-running unnecessarily


  useEffect(() => {
    socket.on('message', (message) => { // ✅ Fix: Listen for messages from the server
      setMessages((prevMessages) => [...prevMessages, message]); // ✅ Fix: Update messages state
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }
  ,[]); // ✅ Add dependency to avoid re-running unnecessarily
  
  const sendMessage = (e) => {
    e.preventDefault(); // ✅ Fix: Prevent default form submission behavior
    if(message) { // ✅ Fix: Check if message is not empty
      socket.emit('sendMessage', message, () => setMessage('')); // ✅ Fix: Emit message to the server and clear input
    }
  };
  //console.log(message, messages); // ✅ Fix: Log message and messages state for debugging 
  
  return (
    <div className='outerContainer'>
      <div className="container">
        <InfoBar room={room}/> {/* ✅ Fix: Pass room prop to InfoBar */}
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        
      </div>

      <TextContainer users={users}/>
    </div>
  );
};

export default Chat;
