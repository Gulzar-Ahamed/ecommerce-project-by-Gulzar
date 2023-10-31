// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

import   {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBh1z2XProoiVHhBdefGp1TPQdXF2e1zks",
  authDomain: "ecommerceproject-caf02.firebaseapp.com",
  projectId: "ecommerceproject-caf02",
  storageBucket: "ecommerceproject-caf02.appspot.com",
  messagingSenderId: "301592468306",
  appId: "1:301592468306:web:8081bf470756917899f88b",
  measurementId: "G-4SJECJ6KMV"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// now firebaseConfig is our firebase project details and this is the main part to connect our react with firebase
 
export const authenticationObject=getAuth(app);

export const googleProvider=new GoogleAuthProvider();

// the below is for firestore database configuration..
export const firebaseFireStoreDB= getFirestore(app);