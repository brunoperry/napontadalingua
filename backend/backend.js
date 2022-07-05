// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB5-O5J5WLyjy9AtYt95J8m9PhXMBLtu-A',
  authDomain: 'na-ponta-da-lingua.firebaseapp.com',
  projectId: 'na-ponta-da-lingua',
  storageBucket: 'na-ponta-da-lingua.appspot.com',
  messagingSenderId: '298428637844',
  appId: '1:298428637844:web:98ef82a6d447170b2c0a81',
  measurementId: 'G-NK442PVLFL',
};

// const firebase = require('firebase')
const app = initializeApp(firebaseConfig);

export const getDB = async (table) => {
  const db = getFirestore();
  let out = null;
  const snapshot = await getDocs(collection(db, table));
  snapshot.forEach((doc) => (out = doc.data()));
  return out;
};

export const doLogin = async (data) => {
  const auth = getAuth(app);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    console.log('LOGGED!', user);
  } catch (error) {
    console.log('ERROR!', `code:${error.code}, msg:${error.message}`);
  }
};
