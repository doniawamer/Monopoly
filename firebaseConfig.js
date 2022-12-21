// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB4-Phei2AHeFs_YxLU2ARR7c47b-Fhrk",
  authDomain: "monopoly-cfd24.firebaseapp.com",
  projectId: "monopoly-cfd24",
  storageBucket: "monopoly-cfd24.appspot.com",
  messagingSenderId: "48471080626",
  appId: "1:48471080626:web:a0aaac30c9fe12127f53ab",
  measurementId: "G-RCVZ8LRV0K",
  databaseURL: "https://monopoly-cfd24-default-rtdb.firebaseio.com/",
};
// Initialize Realtime Database and get a reference to the service

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
