import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyARpDEk8_7LyW-AJS5_9WsTttxenwu6-G4",
  authDomain: "farewell-dairy.firebaseapp.com",
  databaseURL: "https://farewell-dairy.firebaseio.com",
  projectId: "farewell-dairy",
  storageBucket: "farewell-dairy.appspot.com",
  messagingSenderId: "506747051113",
  appId: "1:506747051113:web:53938150f6d15dfe8f96f8",
  measurementId: "G-G2NZ16WBQT",
});

const auth = firebase.auth();
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { auth, firebaseApp, provider, db , storage};
