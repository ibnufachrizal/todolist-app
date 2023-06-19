// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCw5sxyWjQTsCaxhBe-hlWnIWWfMGINOLc",
  authDomain: "todolist-fc346.firebaseapp.com",
  projectId: "todolist-fc346",
  storageBucket: "todolist-fc346.appspot.com",
  messagingSenderId: "999010923871",
  appId: "1:999010923871:web:31ccf53659de66b00232ea",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const db = getFirestore(firebase.initializeApp(firebaseConfig));

export default firebase;
