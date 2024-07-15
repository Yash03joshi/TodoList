import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// import {getDatabase} from "firebase/database";

// const db = getDatabase();
console.log("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyB8aGjsV6QGablAfS77TJCcyATYDps4-sc",
  authDomain: "todolist-b3143.firebaseapp.com",
  databaseURL: "https://todolist-b3143-default-rtdb.firebaseio.com",
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
    createUserWithEmailAndPassword(auth,a,b)
 
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        sessionStorage.setItem("email",document.getElementById("username").value);
        window.location.href="todolist.html";
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  }


document.getElementById("login?").addEventListener("click",()=>{
    document.location.href="index.html";
})
document.getElementById("signup").addEventListener("click",()=>{
    signup(document.getElementById("username").value,document.getElementById("password").value);
  })
