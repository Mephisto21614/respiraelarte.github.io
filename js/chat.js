const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const socket = new WebSocket("ws://your-socket-server-url");

socket.onopen = function(event) {
    console.log("WebSocket connection opened:", event);
};

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    displayMessage(message);
};

sendButton.addEventListener("click", function() {
    const messageText = messageInput.value;
    if (messageText.trim() !== "") {
        const message = {
            type: "message",
            text: messageText
        };
        socket.send(JSON.stringify(message));
        messageInput.value = "";
        displayMessage(message);
    }
});

function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = message.text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
