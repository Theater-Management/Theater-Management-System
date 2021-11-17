import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxSiUGfiKx9qSEHWFMtLXaqbEls3QCsHQ",
  authDomain: "theater-management-system.firebaseapp.com",
  projectId: "theater-management-system",
  storageBucket: "theater-management-system.appspot.com",
  messagingSenderId: "415401391425",
  appId: "1:415401391425:web:32eb807105dda0a7405dc0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
