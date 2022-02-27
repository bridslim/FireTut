import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBg0lqda8w7pas3HQEP0EMWcQ_PVM-CENY",
    authDomain: "fir-tutorial-f6d5c.firebaseapp.com",
    projectId: "fir-tutorial-f6d5c",
    storageBucket: "fir-tutorial-f6d5c.appspot.com",
    messagingSenderId: "519838770732",
    appId: "1:519838770732:web:9270bcd16a445815981389",
    measurementId: "G-4L2P81V2P9"
  };
  
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)