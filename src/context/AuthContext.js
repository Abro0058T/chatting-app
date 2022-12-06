import { onAuthStateChanged } from "firebase/auth"
import { createContext, useState,useEffect } from "react"
import { auth } from "../firebase"
// import { AuthProvider } from "firebase/auth"
export const AuthContext =createContext()


export const  AuthContextProvider =({children})=>{
    const [currentUser,setCurrentUser]=useState({})

    useEffect(()=>{
        const unsub= onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            console.log(user)
        }) 

        return ()=>{
            unsub();

        }
    },[]);

    return(
        // console.log(currentUser)
        <AuthContext.Provider value={{currentUser}}>
        {children}
     </AuthContext.Provider>
         )
};
    