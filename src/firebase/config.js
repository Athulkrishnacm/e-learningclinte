import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCUgXUaqqWYtGd19gHUSaG5maHIHgOYHnk",
  authDomain: "e-learn-c5846.firebaseapp.com",
  projectId: "e-learn-c5846",
  storageBucket: "e-learn-c5846.appspot.com",
  messagingSenderId: "119634520182",
  appId: "1:119634520182:web:2758d8bc596f56330fd757",
  measurementId: "G-CESPHH9128"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);