import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate()

  const getTimeago = (date) => {
    if (!date) return "Just now";
    const diffInMinutes = Math.floor((new Date().getTime() - new Date(date).getTime()) / 60000);
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  useEffect(() => {
    const fetchMessageList = async () => {
      const res = await api.get("/chat/list")
      const messageList = res.data?.data || [];
      setList(messageList)
    }
    fetchMessageList()
  }, [])

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <h2 className="p-4 pb-2 text-l font-extralight tracking-wide">Your Recent Messages</h2>

      {list.length === 0 && (
        <p className='p-4 text-center text-gray-400'>No Conesatation Yet</p>
      )}

      {list.map((chat) => (

        <li key={chat._id} className="list-row" onClick={() => navigate(`/chat/${chat.userId}`)}>
          {/*  <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>*/}
          <div>
            <div className="flex gap-2">
              <span className='text-xs uppercase font-semibold text-purple-950'>{chat.name}</span>
              <span className="text-[10px] text-gray-400 whitespace-nowrap">{getTimeago(chat.letestMessageTime)}</span>
            </div>

            <p className="list-col-wrap text-xs">{chat.letestMessage}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ChatList