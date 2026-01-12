// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB472l_PD5sdqchNb5I79hMSaBcLozUD8",
  authDomain: "smartdeals-48a28.firebaseapp.com",
  projectId: "smartdeals-48a28",
  storageBucket: "smartdeals-48a28.firebasestorage.app",
  messagingSenderId: "200986054904",
  appId: "1:200986054904:web:1c5acf0c59448d3d8c2b0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);