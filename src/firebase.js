import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAC_zCFjKf1Boj6T8ELf_FOxXQYxFPE5kE",
    authDomain: "clone-baadf.firebaseapp.com",
    projectId: "clone-baadf",
    storageBucket: "clone-baadf.appspot.com",
    messagingSenderId: "315571528814",
    appId: "1:315571528814:web:f2fc30d84d997f8d76b27f",
    measurementId: "G-3K8FQPQB9T"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};