import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB3EvLZAGUgueWTkNAua1n4B37WKSHBX5w",
  authDomain: "monkey-blogging-52ae9.firebaseapp.com",
  projectId: "monkey-blogging-52ae9",
  storageBucket: "monkey-blogging-52ae9.appspot.com",
  messagingSenderId: "267484514715",
  appId: "1:267484514715:web:35287b22891450677bb93e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app); 
export const auth = getAuth(app);
