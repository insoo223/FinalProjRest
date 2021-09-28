import firebase from 'firebase';
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

//added by Insoo on Sep 28, 2021
//when running in debuggin mode, set it true or false
const DEBUG = true; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBPB5fPqLp-cLlRiQQi2mQJeKOgAY8SxM8",
  authDomain: "insoofiregooauth.firebaseapp.com",
  projectId: "insoofiregooauth",
  storageBucket: "insoofiregooauth.appspot.com",
  messagingSenderId: "592112032307",
  appId: "1:592112032307:web:07d9b4d24f7aaf2dfee146"
}; //firebaseConfig

//added by Insoo on Sep 28, 2021
//Resolve run-time error: Firebase App named '[DEFAULT]' already exists (app/duplicate-app) [duplicate]
//ref: https://stackoverflow.com/questions/43331011/firebase-app-named-default-already-exists-app-duplicate-app
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
} //if (!firebase.apps.length) 
else {
  firebase.app(); // if already initialized, use that one
} //else

export function LoginGoogle(){
  // get elements
  const googlelogin = document.getElementById("googlelogin");

  console.log("google sign in clicked");
  alert ("hi, Google auth Login-0")

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    alert ("hi, Google auth Login-1: .then((result) => {")
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    // loggedInStatus.innerText = `You are logged in using the following email: ${result.user.email}`;
    alert (`hi, Google auth Login-1A:You are logged in using the following email: ${result.user.email}`)
    // login.style.display = "none";
    // signup.style.display = "none";
    // email.style.display = "none";
    // password.style.display = "none";
    googlelogin.style.display = "none";
    // logout.style.display = "inline";
  }) //.then((result) => {

  // login state
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      // loggedInStatus.innerText = `You are logged in using the following email: ${result.user.email}`;
      alert (`hi, Google auth Login-2: You are logged in using the following email: ${result.user.email}`)

      // logout.style.display = "inline";
      // login.style.display = "none";
      // signup.style.display = "none";
      // email.style.display = "none";
      // password.style.display = "none";
      googlelogin.style.display = "none";
    } else {
      console.log("User is not logged in");
      // loggedInStatus.innerText = "You are not yet logged in";
      // login.style.display = "inline";
      // signup.style.display = "inline";
      // email.style.display = "inline";
      googlelogin.style.display = "inline";
      // password.style.display = "inline";
      // logout.style.display = "none";
    }
  }); //firebase.auth().onAuthStateChanged((firebaseUser) => {

} //function LoginGoogle(){

export function LogoutGoogle(){
  // get elements
  // const googlelogin = document.getElementById("googlelogin");
  // const googlelogout = document.getElementById("googlelogout");

  // logout
  firebase.auth().signOut();
  alert ("hi, Google auth Logout-0")

} //LogoutGoogle

// Register a new user to Firebase (Sign Up account managed by Firebase)
export function RegUserFirebase(){
  // get elements
  // const googlelogin = document.getElementById("googlelogin");
  // const googlelogout = document.getElementById("googlelogout");
  
  //entry validation: added by Insoo on Sep 28, 2021
  //For Firebase, username is not required to register.
  if (email.value == "" || password.value == "") {
    if (DEBUG) console.log("inside if condition");
    alert ('Please, check your entry. Every field should be filled up.')
    //setLoading(false);
    return;
  } //if 

  const auth = firebase.auth();
  
  const promise = auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  );
  promise.then(alert (`For Firebase, only email & password pair is registered.Success to create a new user ${JSON.stringify(email.value)} registered on Firebase:`))
  promise.catch((e) => console.log(e.message));
  
} //RegUserFirebase

 // login
 export function LoginFirebase(){
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(
    email.value,
    password.value
  );
  promise.catch((e) => console.log(e.message));
  alert ("hi, Google auth Firebase SignIn-0")
} //LoginFirebase

export default LoginGoogle;
