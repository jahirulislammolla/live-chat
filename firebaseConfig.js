import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCfiTdYpn5qZkaPNPYgsxY5E3Q7SGA_mbA",
    authDomain: "live-e28a4.firebaseapp.com",
    projectId: "live-e28a4",
    storageBucket: "live-e28a4.firebasestorage.app",
    messagingSenderId: "890210902449",
    appId: "1:890210902449:web:0ce88bb5744bc858801d90",
    measurementId: "G-RC3TLRX6W8"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
