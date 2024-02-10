// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW9AlkFJrKLfqdUmBG1vkoBkg0zLf-aj8",
  authDomain: "training-1a11f.firebaseapp.com",
  projectId: "training-1a11f",
  storageBucket: "training-1a11f.appspot.com",
  messagingSenderId: "762977594900",
  appId: "1:762977594900:web:c258f44e5a83650a1d4101"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);