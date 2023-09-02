// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCicCHj5wiSWQNvm-gne-jrqoIGyVtgv2w",
  authDomain: "ncaa-app-4f0c7.firebaseapp.com",
  projectId: "ncaa-app-4f0c7",
  storageBucket: "ncaa-app-4f0c7.appspot.com",
  messagingSenderId: "684306336247",
  appId: "1:684306336247:web:e8364a1a5bd1236ffa86f2",
  measurementId: "G-ERZ8EJGJPW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
