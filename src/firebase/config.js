import { initializeApp } from 'firebase/app';
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import * as storage from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDJ2T9pZef5bebjmKrNv3y4SXIiLS4oIPA",
  authDomain: "olx-clone-8be69.firebaseapp.com",
  projectId: "olx-clone-8be69",
  storageBucket: "olx-clone-8be69.appspot.com",
  messagingSenderId: "33695132710",
  appId: "1:33695132710:web:7f53c873cb93492ac70ae7",
  measurementId: "G-Z260KYVN3X"
};


const app = initializeApp(firebaseConfig);
const db = firestore.getFirestore();

const firebaseExports = { app, db, firebaseAuth, firestore, storage };
export default firebaseExports;