import { getDatabase, ref, onValue, push, child, update, remove } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const todoList = document.getElementById('todoList');
let username = sessionStorage.email.replace("@", "").replace(".", "");
let arrayOfObjects = [];

const starCountRef = ref(db, 'Users/' + username + '/Tasks');
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    arrayOfObjects = Object.entries(data).map(([key, value]) => ({ key, value }));
    renderTodoList();
});

function renderTodoList() {
    todoList.innerHTML = "";
    for (let i = 0; i < arrayOfObjects.length; i++) {
        const task = arrayOfObjects[i];
        const taskHTML = `<li id="${task.key}-li">
            <input type="checkbox" id="${task.key}" ${task.value ? 'checked' : ''}><p>${task.key}</p> 
            <button id="${task.key}-btn">delete</button>
        </li>`;
        todoList.innerHTML += taskHTML;
    }
    setDeleteEventListeners();
}

function setDeleteEventListeners() {
    for (let i = 0; i < arrayOfObjects.length; i++) {
        const task = arrayOfObjects[i];
        const deleteButton = document.getElementById(`${task.key}-btn`);
        if (deleteButton) {
            deleteButton.removeEventListener("click", handleDelete);
            deleteButton.addEventListener("click", handleDelete);
        }
    }
}


function handleDelete(event) {
    const taskKey = event.target.id.replace("-btn", "");
    removeItem(taskKey);
}

function removeItem(taskKey) {
    const taskRef = ref(db, 'Users/' + username + '/Tasks/' + taskKey);
    remove(taskRef).then(() => {
        arrayOfObjects = arrayOfObjects.filter(task => task.key !== taskKey);
        renderTodoList();
        console.log("Task removed successfully");
    }).catch((error) => {
        console.error("Error removing task: ", error);
    });
}

function writeNewPost() {
    const input = document.getElementById("input").value;
    if (input !== "") {
        const postData = false;
        const updates = {};
        updates['/Users/' + username + '/Tasks/' + input] = postData;
        update(ref(db), updates).then(() => {
            arrayOfObjects.push({ key: input, value: postData });
            // renderTodoList();
            document.getElementById("input").value = ""; // Clear input field after adding
        });
    }
}

document.getElementById("btn").addEventListener("click", writeNewPost);
document.getElementById("signout").addEventListener("click", () => {
    signOut(auth).then(() => {
        document.location.href = "index.html";
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
});
