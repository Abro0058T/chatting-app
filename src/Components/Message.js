import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Img from "../img/addfile.png";
const Message=({ message })=>{
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref=useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);
  // console.log(message)
  console.log(message);
  return (
    <div className={`message ${message.senderId===currentUser.uid &&"owner"}`}>
      <div className="messageinfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img &&
          <img src= {message.img}alt="" />
        }
        </div>
    </div>
  );
}

export default Message;
