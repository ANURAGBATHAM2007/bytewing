import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyArH2zi2zEY8caq59PMtB6URlg-zFPMwTo",
  authDomain: "mindwell-hackathon.firebaseapp.com",
  projectId: "mindwell-hackathon",
  storageBucket: "mindwell-hackathon.firebasestorage.app",
  messagingSenderId: "974505801141",
  appId: "1:974505801141:web:02e8ff884de36fd56ad5fc",
  measurementId: "G-5PNYF7QSPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Update Auth UI on all pages
document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btn-login');
    
    if (!btnLogin) return;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            console.log("Global Auth: User Logged In", user.email);
            // Replace text while keeping the ::after arrow
            btnLogin.textContent = user.email; 
            btnLogin.href = "#"; 
            btnLogin.title = "Logged in as " + user.email + " (Double click to Logout)";
            
            // Optional: Logout on double click
            btnLogin.addEventListener('dblclick', () => {
                signOut(auth).then(() => {
                    window.location.reload();
                });
            });
        } else {
            // User is signed out
            console.log("Global Auth: User Logged Out");
            btnLogin.textContent = "Login / Signup";
            btnLogin.href = "login.html";
        }
    });
});
