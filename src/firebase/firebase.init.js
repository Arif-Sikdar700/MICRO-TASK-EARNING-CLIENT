// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpKQyHUSEYKHQWCC1WMZcdDWLOSnCssuU",
  authDomain: "micro-task-19.firebaseapp.com",
  projectId: "micro-task-19",
  storageBucket: "micro-task-19.firebasestorage.app",
  messagingSenderId: "607377221632",
  appId: "1:607377221632:web:a0f6a7e3cb88180a13d0e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
