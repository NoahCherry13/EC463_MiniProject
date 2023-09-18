// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA0lnW0-W3ukxO7adwpb3dgjk15Tzp2JcM",
    authDomain: "interestingpotato-7b5bc.firebaseapp.com",
    projectId: "interestingpotato-7b5bc",
    storageBucket: "interestingpotato-7b5bc.appspot.com",
    messagingSenderId: "734383287787",
    appId: "1:734383287787:web:a1f482e48f36515fbafdae",
    measurementId: "G-TC8NEH4GZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();