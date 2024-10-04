// Import the functions you need from the SDKs you need
import { initializeServerApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp880-CHCf1f5SW974C7VIbpLw62Wg7qI",
  authDomain: "wannabeid.firebaseapp.com",
  projectId: "wannabeid",
  storageBucket: "wannabeid.appspot.com",
  messagingSenderId: "994238386908",
  appId: "1:994238386908:web:69884f238348fa725a1a19",
  measurementId: "G-JT6VKC8TP2",
};

// Initialize Firebase
const app = initializeServerApp(firebaseConfig, {});

export const db = getFirestore(app);
