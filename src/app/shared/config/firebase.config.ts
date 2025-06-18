// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCimU8BQIUZyJrjrg-w3Mj9FeU5Z0hR6HY",
  authDomain: "twitterfake-9222b.firebaseapp.com",
  projectId: "twitterfake-9222b",
  storageBucket: "twitterfake-9222b.firebasestorage.app",
  messagingSenderId: "384282923389",
  appId: "1:384282923389:web:51da50dc83ac32193dbc14",
  measurementId: "G-ZBEK83JZCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
