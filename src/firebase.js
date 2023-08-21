// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCBuhuf5CTVKzJnOD6WYTxAAYAHhe1czjo',
  authDomain: 'clone-3b574.firebaseapp.com',
  projectId: 'clone-3b574',
  storageBucket: 'clone-3b574.appspot.com',
  messagingSenderId: '725115776163',
  appId: '1:725115776163:web:583e6ae48e2fa11913e316',
  measurementId: 'G-ZJQ7XGL7JZ',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth, db, app };
