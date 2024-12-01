// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA23dp0hfsnesp7vtB-wW916e_50i9v5BQ",
  authDomain: "test-dd583.firebaseapp.com",
  projectId: "test-dd583",
  storageBucket: "test-dd583.firebasestorage.app",
  messagingSenderId: "401460438064",
  appId: "1:401460438064:web:0de30d910dd0df077a79f5",
  measurementId: "G-2FB01BNKX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app)
export { auth, storage,analytics , db }
