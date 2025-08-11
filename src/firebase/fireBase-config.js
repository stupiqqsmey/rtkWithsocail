// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIZLI_UESB6G-wpCx3ZHVTvznvfBpCLY8",
    authDomain: "react-social-login-4243c.firebaseapp.com",
    projectId: "react-social-login-4243c",
    storageBucket: "react-social-login-4243c.firebasestorage.app",
    messagingSenderId: "760029143897",
    appId: "1:760029143897:web:6fc1279baa498ebfa4e248",
    measurementId: "G-YY90GFW3GT"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };