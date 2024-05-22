// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrKmZPHyzpbnvW9bGVGTAxvSueW8nfi3o",
  authDomain: "signup-app-f00a4.firebaseapp.com",
  projectId: "signup-app-f00a4",
  storageBucket: "signup-app-f00a4.appspot.com",
  messagingSenderId: "295674795354",
  appId: "1:295674795354:web:3926bfe44230b1ca1f0f63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };