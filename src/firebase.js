// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZzGsdcfYbquPZxPq2gikgr-FoCVr9bp8",
  authDomain: "chat-f96ed.firebaseapp.com",
  projectId: "chat-f96ed",
  storageBucket: "chat-f96ed.appspot.com",
  messagingSenderId: "731237871215",
  appId: "1:731237871215:web:ab1f97b2f1c18b5741679a",
  measurementId: "G-V7C3CVC6H0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth()
 export const storage = getStorage();
 export const db =getFirestore();
const analytics = getAnalytics(app);