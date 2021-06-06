import firebase from 'firebase/app'
import 'firebase/firestore' 
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyAh4DyNj-0_PxzjnUiVM3hfPqm2HVWmrHA",
    authDomain: "budget-6fd74.firebaseapp.com",
    projectId: "budget-6fd74",
    storageBucket: "budget-6fd74.appspot.com",
    messagingSenderId: "647325351981",
    appId: "1:647325351981:web:7a91130e98763fdb8fb8a4",
    measurementId: "G-E35CBK01SL"
  };

//   const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebase.initializeApp(firebaseConfig);
//   export default firebaseApp.firestore()
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();