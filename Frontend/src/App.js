
import './App.css';
import Chat from './chat';
import io from "socket.io-client";
import { useState } from 'react';

const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
   const joinRoom = () =>{
      if(username !== "" && room !== ""){
        socket.emit("join_room", room);
        setShowChat(true);
      }
   };
  return (
    <div className="App">
    {!showChat ? (
    <div className="join-chat-block">
    <h1>Real Time Chat App</h1>
    <div className="joinChatContainer">
    <input type = "text" placeholder = "Name..." onChange = {(event) => {setUserName(event.target.value)}} />
    <input type = "text" placeholder = "Chat Id..." onChange = {(event) => {setRoom(event.target.value)}} />
    <button onClick={joinRoom}>Join Chat</button>
    </div>
    </div>
    )
    : (
    < Chat socket = {socket} username = {username} room = {room} />
    )}
    </div>
    
  );
}

export default App;
