import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
console.log("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyB8aGjsV6QGablAfS77TJCcyATYDps4-sc",
  authDomain: "todolist-b3143.firebaseapp.com",
  projectId: "todolist-b3143",
  storageBucket: "todolist-b3143.appspot.com",
  messagingSenderId: "135594427541",
  appId: "1:135594427541:web:e53a39889c26f988fb479c",
  measurementId: "G-Z8CTSC7HDL"
};
console.log("hello");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

  function signup(a,b) {
    createUserWithEmailAndPassword(auth, a, b)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
    });
  }
 export function login(a,b) {
    signInWithEmailAndPassword(auth, a, b)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
  }
  function logout(params) {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      
  }