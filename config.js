
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

 export const firebaseConfig = {
    apiKey: "AIzaSyAPt4vVv1skpuNWvaUEzu7GckzzJPUPRBQ",
    authDomain: "spedydb.firebaseapp.com",
    projectId: "spedydb",
    storageBucket: "spedydb.appspot.com",
    messagingSenderId: "77664105948",
    appId: "1:77664105948:web:8a6a14a0ef5475fca78b19",
    measurementId: "G-89V6RZPZDX"
  };
  
  
// Initialize Firebase


const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;



