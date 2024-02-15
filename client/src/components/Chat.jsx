import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css"

function Chat({ socket, userName, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <>
            <div className="main-chat">
                <div className="chat-header">
                    <p>Live Chat</p>
                </div>
                <div className="chat-body line">
                    <ScrollToBottom className="message-container">
                        {messageList.map((item) => {
                            return (
                                <div className="message" id={userName === item.author ? "you" : "other"}>
                                    <div>
                                        <div className="message-content">
                                            <p>{item.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{item.time}</p>
                                            <p id="author">{item.author}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer border-r line">
                    <input className="input-send-message" value={currentMessage} type="text" placeholder="Hey..." onChange={e => setCurrentMessage(e.target.value)} onKeyDown={(event) => { event.key === "Enter" && sendMessage() }} />
                    <button className="btn-send-message line" onClick={sendMessage} ><IoMdSend /></button>
                </div>
            </div>
        </>
    )
}

export default Chat;