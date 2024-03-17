import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyC9oe4k1NtbzxVyQOYGT_uPwxiaSdf7o_Q",
    authDomain: "olx-demo-25917.firebaseapp.com",
    projectId: "olx-demo-25917",
    storageBucket: "olx-demo-25917.appspot.com",
    messagingSenderId: "67480654868",
    appId: "1:67480654868:web:398fe1d328f165b0418301",
    measurementId: "G-FWJD84H8V0"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}