// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBCR_LIMwUvoNV6_r0MhOzX3e1Eaver5oI",
    authDomain: "pals---birthday-template.firebaseapp.com",
    projectId: "pals---birthday-template",
    storageBucket: "pals---birthday-template.appspot.com",
    messagingSenderId: "828046318515",
    appId: "1:828046318515:web:91680a6b19b72bba0409c6",
    measurementId: "G-BRL86VNBQH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  firebase.initializeApp(config);
  const db=firebase.firestore();
  db.settings({timestampsInSnapshots: true});
  var bdays=db.collection('Birthdays').get().then((snapshot)=>{
    console.log(snapshot.docs);
  })