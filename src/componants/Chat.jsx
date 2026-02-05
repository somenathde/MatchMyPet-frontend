import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
    const { targetUserId } = useParams()
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([{ from: targetUserId, message: "Hello!" },]);
    const { user } = useSelector((store) => store?.user);
    const userId = user?._id;
    const socketRef = useRef(null);

    const handleSend = () => {
        if (!message.trim() || !socketRef.current) return;
        socketRef.current.emit("sendMessage", {userId, targetUserId, message});
        setMessage("");
    }
    useEffect(() => {
        if (!userId || !targetUserId) return;
        socketRef.current = createSocketConnection();
        socketRef.current.emit("joinChat", { userId, targetUserId });
        socketRef.current.on("MessageReceived", (text) => {
            setMessages((messages) => [...messages, text]);
        });
        return () => {
            socketRef.current.disconnect();
        }
    }, [userId, targetUserId]);
    return (

        <div className="w-1/2 mx-auto my-10 border rounded-xl shadow-lg flex flex-col h-[550px] bg-base-100">

            {/* Header */}
            <div className="p-4 border-b text-lg font-semibold">
                Chat with User {targetUserId}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => {
                    const isMe = msg.from === userId

                    return (
                        <div key={index} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                           {/* <div className="text-xs opacity-50">2 hours ago</div>*/}
                            <div className="chat-bubble chat-bubble-primary">{msg.message}</div>
                           { /*<div className='chat-footer opacity-50'>Seen</div>*/}
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
                <input
                    type="text"
                    placeholder="Type a message…"
                    className="input input-bordered w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="btn btn-primary" onClick={handleSend}>
                    Send
                </button>
            </div>

        </div>
    )
}

export default Chat