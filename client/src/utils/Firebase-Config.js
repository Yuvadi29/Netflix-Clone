// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJwz_5RXR4BQY873ZVyrHJg1mD_3JelPI",
    authDomain: "netflixclone-20abf.firebaseapp.com",
    projectId: "netflixclone-20abf",
    storageBucket: "netflixclone-20abf.appspot.com",
    messagingSenderId: "629140428784",
    appId: "1:629140428784:web:5bf0feb41996cd1dae6f35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//It will point to our netflix application
export const firebaseAuth = getAuth(app);