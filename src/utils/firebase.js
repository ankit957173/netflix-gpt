// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-XqMHlYhhcfI78PrNQ4osnp7jJFXLmHc",
  authDomain: "netflix-gpt-f1773.firebaseapp.com",
  projectId: "netflix-gpt-f1773",
  storageBucket: "netflix-gpt-f1773.firebasestorage.app",
  messagingSenderId: "632800525689",
  appId: "1:632800525689:web:ad3915e0d5e493d53043a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();