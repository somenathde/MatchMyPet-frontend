import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import api from '../api/axios';


const Chat = () => {
    const { targetUserId } = useParams()
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { user } = useSelector((store) => store?.user);
    const userId = user?._id;
    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    const getTimeago = (date) => {
        if (!date) return "Just now";
        const diffInMinutes = Math.floor((new Date().getTime() - new Date(date).getTime()) / 60000);
        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    useEffect(() => {
        if (!targetUserId) return;

        const fetchMessages = async () => {
            try {
                const res = await api.get(`/chat/${targetUserId}`);
                const chatMessages = res.data?.data?.messages.map((msg) => ({
                    senderId: msg.senderId._id,
                    message: msg.text,
                    senderName: msg.senderId.firstName,
                    time: msg.createdAt,
                }));
                setMessages(chatMessages || []);
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        }

        fetchMessages();
    }, [targetUserId])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const handleSend = () => {
        if (!message.trim() || !socketRef.current) return;
        socketRef.current.emit("sendMessage", { userId, targetUserId, message });
        setMessage("");
    }
    useEffect(() => {
        if (!userId || !targetUserId) return;
        socketRef.current = createSocketConnection();
        const handleMessages = (msg) => ({
            senderId: msg.senderId,
            message: msg.message,
            senderName: "", // msg.senderId === userId ? "You" : `User ${msg.senderId}`,
            time: msg.createdAt,
        })
        const onMessageReceived = (msg) => {
            setMessages((prev) => [...prev, handleMessages(msg)]);
        }
        socketRef.current.emit("joinChat", { userId, targetUserId });
        socketRef.current.on("MessageReceived", onMessageReceived)
        return () => {
            socketRef.current.off("MessageReceived", onMessageReceived);
            socketRef.current.disconnect();
        }
    }, [userId, targetUserId])
    return (

        <div className="w-1/2 mx-auto my-10 border rounded-xl shadow-lg flex flex-col h-137.5 bg-base-100">

            {/* Header */}
            <div className="p-4 border-b text-lg font-semibold">
                Chat with {targetUserId}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === userId

                    return (
                        <div key={msg._id || index}
                            className={`${isMe ? "chat chat-end " : "chat chat-start "}`}
                        >
                            <div className="chat-header">
                                {msg.senderName}
                                <time className="text-xs opacity-50">{getTimeago(msg.time)}</time>
                            </div>

                            <div className={`${isMe ? "chat-bubble chat-bubble-primary" : "chat-bubble chat-bubble-secondary"}`} >{msg.message}</div>
                            { /*<div className='chat-footer opacity-50'>Seen</div>*/}
                        </div>
                    );
                })}
                <div ref={bottomRef} />
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