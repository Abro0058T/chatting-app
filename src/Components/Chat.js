import React from 'react'
import Cam from '../img/addfile.png'
import Messages from './Messages'
import Input from './Input'
import Video from '../img/video.svg'
import Person from '../img/person.svg'
import More from '../img/more.svg'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
function Chat() {
  const {data}=useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Video}  style={{width:"50px"}}alt="" />
          <img src={Person}  style={{width:"50px"}}alt="" />
          <img src={More}  style={{width:"50px"}}alt="" />
        </div>

      </div>
        <Messages/>
        <Input/>
    </div>
  )
}

export default Chat