import { initializeApp } from "firebase/app";;
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9evkAh0J6i9RjQ7Y9VBKONkouho33JVM",
    authDomain: "faithful-connect.firebaseapp.com",
    projectId: "faithful-connect",
    storageBucket: "faithful-connect.appspot.com",
    messagingSenderId: "171264899455",
    appId: "1:171264899455:web:f67e79a56f0bb4d3fd824a",
    measurementId: "G-XL95P11VQH"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
//   const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();