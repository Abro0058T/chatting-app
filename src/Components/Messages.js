import React from 'react'
import Message from './Message'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// import { unstable_batchedUpdates } from 'react-dom'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
function Messages() {
  const[messages,setMessages]=useState([])
  const {data}=useContext(ChatContext);
  useEffect(()=>{
    const unSub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
    return ()=>{
      unSub()
    }
  },[data.chatId])
  return (
    <div className='Messages'>
      {messages.map(m=>(
        <Message message={m} key={m.id}/>
      ))

      }
    </div>
  )
}

export default Messages