// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD05VkgNfL4junCjQJcFIm8YStJWKKY35Y",
    authDomain: "produtec-25.firebaseapp.com",
    databaseURL: "https://produtec-25-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "produtec-25",
    storageBucket: "produtec-25.firebasestorage.app",
    messagingSenderId: "200070458969",
    appId: "1:200070458969:web:f7e420351796cee1948b48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;