import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';


var google = new firebase.auth.GoogleAuthProvider();

const app = firebase.initializeApp({
    apiKey: "AIzaSyCPTMH5QwFelF6Pbmj0Nc3U740PxFsvz70",
    authDomain: "envirothon-study.firebaseapp.com",
    projectId: "envirothon-study",
    storageBucket: "envirothon-study.appspot.com",
    messagingSenderId: "313080454876",
    appId: "1:313080454876:web:5b748250cbee1322a99e19"
});

export const googleProvider = google;

export const auth = app.auth();
export default app;