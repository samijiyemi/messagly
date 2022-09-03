const form = document.querySelector("form");
const textArea = document.querySelector("input");
messageList = document.querySelector("ul");

const socket = io();

// Handling sending message to server
function sendMessage(e) {
  e.preventDefault();

  //   send the input value
  socket.emit("message", textArea.value);

  //   reset the input value
  textArea.input = "";
}

form.addEventListener("submit", sendMessage);

function addMessageToHtml(message) {
  const li = document.createElement("li");

  li.innerText = message;
  messageList.append(li);
}

socket.on("message", addMessageToHtml);

function alertUserConnected() {
  addMessageToHtml("user connected");
}

socket.on("user connected", alertUserConnected);
