// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5-O5J5WLyjy9AtYt95J8m9PhXMBLtu-A",
  authDomain: "na-ponta-da-lingua.firebaseapp.com",
  projectId: "na-ponta-da-lingua",
  storageBucket: "na-ponta-da-lingua.appspot.com",
  messagingSenderId: "298428637844",
  appId: "1:298428637844:web:98ef82a6d447170b2c0a81",
  measurementId: "G-NK442PVLFL"
};

// const firebase = require('firebase')
initializeApp(firebaseConfig);

export const getDB = async (table) => {
  const db = getFirestore();
  let out = null;
  const snapshot = await getDocs(collection(db, table));
  snapshot.forEach((doc) => (out = doc.data()));
  return out;
};