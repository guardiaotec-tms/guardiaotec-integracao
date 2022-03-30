// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4NgYHqc_YQS752DhctRA-SH_hNOtUNrM',
  authDomain: 'guardiaotec-tms-prototype.firebaseapp.com',
  projectId: 'guardiaotec-tms-prototype',
  storageBucket: 'guardiaotec-tms-prototype.appspot.com',
  messagingSenderId: '332551291469',
  appId: '1:332551291469:web:658590faa07384158dd204',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
