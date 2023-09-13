// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'localhost:3000',
  databaseURL: 'http://localhost:3000/',
  projectId: 'TU_PROYECTO_ID',
  storageBucket: 'localhost:3000',
  messagingSenderId: 'TU_MENSAJERÍA_ID',
  appId: 'TU_APP_ID',
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;