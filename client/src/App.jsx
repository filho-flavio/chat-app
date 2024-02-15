import './App.css';
import React, { useState } from 'react';
import io from 'socket.io-client'
import Chat from './components/Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [userName, setName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(!showChat);
    }
  }

  return (
    <>
      {showChat ? (
        <Chat socket={socket} userName={userName} room={room} />
      ) : (
        <div className="container-chat">
          <h3 className="title-chat">Join A Chat</h3>
          <input className="input-chat" type="text" placeholder='Your name...' onChange={(e) => setName(e.target.value)} />
          <input className="input-chat" type="text" placeholder='Room ID...' onChange={(e) => setRoom(e.target.value)} />
          <button className="btn-chat" onClick={joinRoom}>Join A Room</button>
        </div>
      )}
    </>
  )
}

export default App
