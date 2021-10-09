import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './App.css';

function Chat({ socket, username, room }) {
    const [curMessage, setCurMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (curMessage !== "") {
            const messageData = {
                room: room,
                sender: username,
                message: curMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurMessage("");
        };
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-block">
        <h1>Live Chat</h1>
        <div className="chat-window">
            <div className="chat-header"></div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                        <div className="message" id = {username === messageContent.sender ? "you" : "other"}>
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.sender}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text" value= {curMessage} placeholder="Hey..." onChange={(event) => { setCurMessage(event.target.value) }}
                onKeyPress={(event) => {event.key==="Enter" && sendMessage();}}
                 />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>
    )
}

export default Chat;