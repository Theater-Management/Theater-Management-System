import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAxSiUGfiKx9qSEHWFMtLXaqbEls3QCsHQ",
//   authDomain: "theater-management-system.firebaseapp.com",
//   projectId: "theater-management-system",
//   storageBucket: "theater-management-system.appspot.com",
//   messagingSenderId: "415401391425",
//   appId: "1:415401391425:web:32eb807105dda0a7405dc0",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

// export default app;

//testing database
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8lJayckj8dgRTtgAhYUaoDHlGkuU5D1w",
  authDomain: "testing-c4088.firebaseapp.com",
  projectId: "testing-c4088",
  storageBucket: "testing-c4088.appspot.com",
  messagingSenderId: "469946894744",
  appId: "1:469946894744:web:f9f0a0e1fdea20f08003ed",
  measurementId: "G-V8Q09SBEQN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
