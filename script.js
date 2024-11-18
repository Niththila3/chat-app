// Firebase configuration (replace with your own config)
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
  const db = firebase.database();
  
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  
  let username = null; // User's chosen username
  
  // Function to set the username
  function setUsername() {
    const usernameInput = document.getElementById("username-input");
    username = usernameInput.value.trim();
  
    if (username) {
      usernameInput.disabled = true;
      document.querySelector(".username-container button").disabled = true;
      console.log(`Username set to: ${username}`);
    } else {
      alert("Please enter a valid username!");
    }
  }
  
  // Listen for new messages in the database
  db.ref("messages").on("child_added", (snapshot) => {
    const messageData = snapshot.val();
    displayMessage(messageData.text, messageData.sender);
  });
  
  // Display messages in chat box
  function displayMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender === username ? "sent" : "received");
    messageElement.textContent = `${sender}: ${text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
  }
  
  // Send message to the database
  function sendMessage() {
    const messageText = messageInput.value.trim();
    
    if (messageText !== "" && username) {
      db.ref("messages").push({
        text: messageText,
        sender: username
      }).then(() => {
        console.log("Message sent successfully");
      }).catch((error) => {
        console.error("Error sending message:", error);
      });
      
      messageInput.value = ""; // Clear input after sending
    } else if (!username) {
      alert("Please set a username before sending a message.");
    }
  }
  