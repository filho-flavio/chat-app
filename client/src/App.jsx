import './App.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import Chat from './Chat';

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

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
    })
  }, [socket])


  return (
    <>
      {showChat ? (
        <Chat socket={socket} userName={userName} room={room} />
      ) : (
        <div>
          <h3>Join A Chat</h3>
          <input type="text" placeholder='Jhon...' onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder='Room ID...' onChange={(e) => setRoom(e.target.value)} />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )}
    </>
  )
}

export default App
