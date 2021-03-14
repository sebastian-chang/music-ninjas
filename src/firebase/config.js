import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCEfeA5QhhJ8IBPUySIPN9V8ofnGNGhOQM",
  authDomain: "muso-ninjas-9f919.firebaseapp.com",
  projectId: "muso-ninjas-9f919",
  storageBucket: "muso-ninjas-9f919.appspot.com",
  messagingSenderId: "837930690789",
  appId: "1:837930690789:web:ec2830c6cebda2afc38c0c"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timeStamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timeStamp }
