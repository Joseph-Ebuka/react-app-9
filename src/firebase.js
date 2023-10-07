import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDtjfdGm0cjvfZRbYEurrb7Hv86sYslH10",
  authDomain: "ebuka-chat-fbfda.firebaseapp.com",
  projectId: "ebuka-chat-fbfda",
  storageBucket: "ebuka-chat-fbfda.appspot.com",
  messagingSenderId: "225021601597",
  appId: "1:225021601597:web:129c4a9a1086c647234754",
  measurementId: "G-QBRFQBYJM1"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =  getAuth()
export const storage = getStorage();
export const db = getFirestore()