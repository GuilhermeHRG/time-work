// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAWvHQuHxroAGd3z620v5I1l7_LWNeI2bI",
  authDomain: "tcc-timetocode.firebaseapp.com",
  projectId: "tcc-timetocode",
  storageBucket: "tcc-timetocode.firebasestorage.app",
  messagingSenderId: "803148399009",
  appId: "1:803148399009:web:29a78f54a3a686f2af8be0",
  measurementId: "G-PSW4MK3P0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);