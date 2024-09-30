// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX5-vgTtcBAzVGhfaJvjtUhZIldf9Xm6w",
  authDomain: "ecommercewebsite-c620e.firebaseapp.com",
  projectId: "ecommercewebsite-c620e",
  storageBucket: "ecommercewebsite-c620e.appspot.com",
  messagingSenderId: "718459808882",
  appId: "1:718459808882:web:405c9d0b7f16f70839e6eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }