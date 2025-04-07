// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYOzuQ3Q3sH-CEs50GQqc1KrEa4vDKoAk",
  authDomain: "icebreaker-bb661.firebaseapp.com",
  projectId: "icebreaker-bb661",
  storageBucket: "icebreaker-bb661.firebasestorage.app",
  messagingSenderId: "1024805081815",
  appId: "1:1024805081815:web:feb5fa4b0bf83bcd8d1692",
  measurementId: "G-C16GS13BTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);