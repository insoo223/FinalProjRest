import firebase from 'firebase';
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBPB5fPqLp-cLlRiQQi2mQJeKOgAY8SxM8",
  authDomain: "insoofiregooauth.firebaseapp.com",
  projectId: "insoofiregooauth",
  storageBucket: "insoofiregooauth.appspot.com",
  messagingSenderId: "592112032307",
  appId: "1:592112032307:web:07d9b4d24f7aaf2dfee146"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

// signup
export function SignUpFirebase(){
  // get elements
  // const googlelogin = document.getElementById("googlelogin");
  // const googlelogout = document.getElementById("googlelogout");
  
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  );
  promise.catch((e) => console.log(e.message));
  alert ("hi, Google auth Firebase SignUp-0")
} //SignUpFirebase

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
