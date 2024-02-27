// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{initializeAuth,getReactNativePersistence} from 'firebase/auth'
import {getFirestore,collection} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsQuRer5QkpemRYYy4qHZvL7Lyvh6qSPk",
  authDomain: "fir-chat-ee220.firebaseapp.com",
  projectId: "fir-chat-ee220",
  storageBucket: "fir-chat-ee220.appspot.com",
  messagingSenderId: "246160503966",
  appId: "1:246160503966:web:4c479d83271c4e4b18f78f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)
export const userRef = collection(db,'users')
export const roomRef = collection(db,'rooms')