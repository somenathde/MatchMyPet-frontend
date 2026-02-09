import React, { useEffect } from 'react'
import api from '../api/axios'

const ChatList = () => {

   const fetchMessageList=()=>{
      const res=api.get("/chat/list")
    }
  useEffect(()=>{
      fetchMessageList()
    },[])



  return (
    <div>ChatList</div>

    
  )
}

export default ChatList