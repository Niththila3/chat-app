// Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDGEF4tytsB5kN9-DEwmk547N4H7z1opHw",
  authDomain: "niththila-7f5e8.firebaseapp.com",
  databaseURL: "https://niththila-7f5e8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "niththila-7f5e8",
  storageBucket: "niththila-7f5e8.firebasestorage.app",
  messagingSenderId: "296218569751",
  appId: "1:296218569751:web:15b78443089799aa3c8052",
  measurementId: "G-QRQ5335X4Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Sign-In
document.getElementById("google-signin-btn").addEventListener("click", () => {
const provider = new firebase.auth.GoogleAuthProvider();
auth.signInWithPopup(provider)
  .then((result) => {
    // Redirect to chat page after login
    window.location.href = "chat.html";
  })
  .catch((error) => {
    console.error("Error during Google sign-in:", error);
  });
});

// Email and Password Sign-In
document.getElementById("email-login-form").addEventListener("submit", (event) => {
event.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Redirect to chat page after login
    window.location.href = "chat.html";
  })
  .catch((error) => {
    console.error("Error during email sign-in:", error);
  });
});
