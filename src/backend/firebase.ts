import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWvHQuHxroAGd3z620v5I1l7_LWNeI2bI",
  authDomain: "tcc-timetocode.firebaseapp.com",
  projectId: "tcc-timetocode",
  storageBucket: "tcc-timetocode.firebasestorage.app",
  messagingSenderId: "803148399009",
  appId: "1:803148399009:web:29a78f54a3a686f2af8be0",
  measurementId: "G-PSW4MK3P0K"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Erro ao autenticar:", error);
  }
}
