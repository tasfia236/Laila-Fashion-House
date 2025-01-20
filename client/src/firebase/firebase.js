// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fashion-house-e8e54.firebaseapp.com",
  projectId: "fashion-house-e8e54",
  storageBucket: "fashion-house-e8e54.firebasestorage.app",
  messagingSenderId: "647659161140",
  appId: "1:647659161140:web:6ef2d4c3f7cdbd07376c61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
