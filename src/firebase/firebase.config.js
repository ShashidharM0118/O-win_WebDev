// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhprcbB0x-5dYkpzqrLTbi6NpbW6ThTG0",
  authDomain: "fieldtofork-e4f97.firebaseapp.com",
  projectId: "fieldtofork-e4f97",
  storageBucket: "fieldtofork-e4f97.appspot.com",
  messagingSenderId: "1018561259102",
  appId: "1:1018561259102:web:caf7be433beeadba3676cf",
  measurementId: "G-S8MC5H6B0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default firebaseConfig;