import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
// import { async } from "@firebase/util";

function Search() {
  const [userName, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  const handleKey = (e) => {
    // console.log(e)
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    //check whetber the group exist ,if not ccreate
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        try{
          const res = await getDoc(doc(db, "chats",combineId));
          if(!res.exists()){
            console.log(combineId)
            await setDoc(doc(db,"chats",combineId),{messages :[]});
            // await setDoc(doc(db,"userChats",currentUser.uid));
            await updateDoc(doc(db,"userChats",currentUser.uid),{
              [combineId+".userInfo"]:{
                uid: user.uid,
                displayName:user.displayName,
                photoURL:user.photoURL
              },
              [combineId+".date"]:serverTimestamp()
            }
            );
            await updateDoc(doc(db,"userChats",user.uid),{
              [combineId+".userInfo"]:{
                uid: currentUser.uid,
                displayName:currentUser.displayName,
                photoURL:currentUser.photoURL
              },
              [combineId+".date"]:serverTimestamp()
            }
            );
      }
    }catch(err){
      console.log(err)
    }
    setUser(null);
    setUsername("")
    //create user chats
  };
  return (
    <div className="Search">
      <div className="searchForm">
        <input
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
        />
      </div>
      {err && <span>User Not</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
