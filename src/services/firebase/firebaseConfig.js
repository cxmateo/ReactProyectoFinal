import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAzc6qURXeDYGRSYyd9F-CGxZJ-xFZ-DsA",
  authDomain: "coderhouse-8b0af.firebaseapp.com",
  projectId: "coderhouse-8b0af",
  storageBucket: "coderhouse-8b0af.firebasestorage.app",
  messagingSenderId: "549688036728",
  appId: "1:549688036728:web:030b00ff8d5b0569394c8d",
  measurementId: "G-CDLC07TKY1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
