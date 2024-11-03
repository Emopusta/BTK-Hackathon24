var currentChat = [];
const chatBoxElement = document.getElementById("chat-box");

const textInputElement = document.getElementById("input-area");
const sendButton = document.getElementById("send-button");
const clearButton = document.getElementById("clear-button");

chrome.storage.local.get(["chat"], (result) => {
  const { chat } = result;
  if (chat != null) {
    currentChat = chat;
    recreateChatBoxFromList(chat);
  }
});

clearButton.onclick = function () {
  clearChat();
};

sendButton.onclick = async function () {
  if (!chatBoxElement) {
    console.error("Chat box element not found.");
    return;
  }
  currentChat.push({ sender: "user", message: textInputElement.value });
  pushDataToChatBox({ sender: "user", message: textInputElement.value });

  const response = await sendPrompt(textInputElement.value);
  const botResponse = { sender: "bot", message: response.data.model.text };
  currentChat.push(botResponse);
  pushDataToChatBox(botResponse);

  console.log(currentChat);
  const prefs = {
    chat: currentChat,
  };
  chrome.runtime.sendMessage({ event: "onStart", prefs });

  textInputElement.value = "";
};

function recreateChatBoxFromList(list) {
  if (list.length > 0) {
    list.forEach((element) => {
      const p = document.createElement("p");
      if (element.sender == "bot") {
        p.classList.add("bot-message");
      } else {
        p.classList.add("user-message");
      }
      p.textContent = element.message;
      chatBoxElement.appendChild(p);
    });
  }
}

function pushDataToChatBox(data) {
  const p = document.createElement("p");
  if (data.sender == "bot") {
    p.classList.add("bot-message");
  } else {
    p.classList.add("user-message");
  }
  p.textContent = data.message;
  chatBoxElement.appendChild(p);
}

function clearChat() {
  const clearedChat = [];
  clearedChat.push({
    sender: "bot",
    message: "Merhaba, ne aramak istiyorsunuz?",
  });

  while (chatBoxElement.firstChild) {
    chatBoxElement.removeChild(chatBoxElement.firstChild);
  }

  const prefs = {
    chat: clearedChat,
  };
  chrome.runtime.sendMessage({ event: "onStart", prefs });
}




const BASE_URL = "http://localhost:8000";

async function sendPrompt(promptMessage) {
  const data = { prompt: promptMessage };
  try {
    const response = await fetch(BASE_URL + "/api/Gemini/send-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}