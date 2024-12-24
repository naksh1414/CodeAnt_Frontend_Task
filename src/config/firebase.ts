// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQlHIHB6ozhDH8AG6Do55LvNhJPOnkI0Q",
  authDomain: "code-ant.firebaseapp.com",
  projectId: "code-ant",
  storageBucket: "code-ant.firebasestorage.app",
  messagingSenderId: "883159156834",
  appId: "1:883159156834:web:d8a82b5f2582e5438be93b",
  measurementId: "G-8W2EZ52M94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GithubAuthProvider();
provider.addScope("user");
provider.addScope("user:email");
provider.setCustomParameters({
  allow_signup: "true",
});

setPersistence(auth, browserLocalPersistence);
