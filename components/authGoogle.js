import firebase from 'firebase';
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

//added by Insoo on Sep 28, 2021
//when running in debuggin mode, set it true or false
const DEBUG = false; 

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

// -------------------- LoginGoogle -------------------- 
// Login a user whose account managed by Google
// added by Insoo on Sep 27, 2021
export function LoginGoogle(){
  // get elements
  const googlelogin = document.getElementById("googlelogin");

  console.log("google sign in clicked");
  if (DEBUG) alert ("hi, Google auth Login-0")

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    if (DEBUG) alert ("hi, Google auth Login-1: .then((result) => {")
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    
    alert (`You are successfully logged in using the following email: ${result.user.email}`)
    googlelogin.style.display = "none";
    // logout.style.display = "inline";
  }) //.then((result) => {

} //LoginGoogle()
// -------------------- (End) LoginGoogle --------------------   

// -------------------- LogoutGoogle -------------------- 
// Logout already logged-in user whose account managed by Google
// added by Insoo on Sep 27, 2021
export function LogoutGoogle(){
  // var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signOut()
    .then(() => {
      alert ('Success to logout a user from Google account')
    });
} //LogoutGoogle
// -------------------- (End) LogoutGoogle -------------------- 

// -------------------- RegUserFirebase -------------------- 
// Register a new user to Firebase (Sign Up account managed by Firebase)
// added by Insoo on Sep 28, 2021
export function RegUserFirebase(){

  //entry validation
  //For Firebase, username is not required to register.
  if (email.value == "" || password.value == "") {
    if (DEBUG) console.log("inside if condition");
    alert ('Please, check your entry. Email & password field should be filled up.')
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
// -------------------- (End) RegUserFirebase -------------------- 

// -------------------- LoginFirebase -------------------- 
// Login a user to Firebase (Registered account managed by Firebase)
// added by Insoo on Sep 28, 2021
export function LoginFirebase(){
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(
    email.value,
    password.value
  );
  promise.catch((e) => console.log(e.message));
  alert ("hi, Google auth Firebase SignIn-0")
  alert (`You are successfully logged in using the following email: ${result.user.email}`)
} //LoginFirebase
// -------------------- (End) LoginFirebase -------------------- 

// -------------------- Login state display-------------------- 
firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    console.log(firebaseUser);
    // loggedInStatus.innerText = `You are logged in using the following email: ${result.user.email}`;

    googlelogin.style.display = "none";
    googlelogout.style.display = "inline";
  } else {
    console.log("User is not logged in");
    // loggedInStatus.innerText = "You are not yet logged in";
    googlelogin.style.display = "inline";
    googlelogout.style.display = "none";
  }
}); //firebase.auth().onAuthStateChanged((firebaseUser) => {
// -------------------- (End) Login state display-------------------- 

export default LoginGoogle;
