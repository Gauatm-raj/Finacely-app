// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// import {getFireStore,doc, setDoc} from "firebase/fireStore";
import { getFirestore, collection, getDocs,setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCX9KHsnNxNOWU7jDjGBHhcfVIfwMHjpGA",
  authDomain: "finance-app-6bcd0.firebaseapp.com",
  projectId: "finance-app-6bcd0",
  storageBucket: "finance-app-6bcd0.appspot.com",
  messagingSenderId: "958543044114",
  appId: "1:958543044114:web:bb49a991d817c566e642cb",
  measurementId: "G-05TB6XFVFD"
};

// Init
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,getDocs,setDoc};