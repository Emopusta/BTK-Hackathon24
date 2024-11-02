var currentChat = [];
const chatBoxElement = document.getElementById("chat-box");

const textInputElement = document.getElementById("input-area");
const sendButton = document.getElementById("send-button");
const clearButton = document.getElementById("clear-button");


chrome.storage.local.get(["chat"], (result) => {
    const { chat } = result;
    currentChat = chat;
    recreateChatBoxFromList(chat);
})

clearButton.onclick = function(){
    clearChat();
}

sendButton.onclick = function(){
    if (!chatBoxElement) {
        console.error("Chat box element not found.");
        return;
    }
    currentChat.push({sender: 'user', message: textInputElement.value});
    console.log(currentChat);
    const prefs = {
        chat: currentChat
    }
    chrome.runtime.sendMessage({event: 'onStart', prefs})

    pushDataToChatBox({sender: 'user', message: textInputElement.value});
    textInputElement.value = "";
}

function recreateChatBoxFromList(list) {
    list.forEach(element => {
        const p = document.createElement("p");
        if (element.sender == 'bot'){
            p.classList.add('bot-message')
        }
        else{
            p.classList.add('user-message')
        }
        p.textContent = element.message;
        chatBoxElement.appendChild(p)
    });
}

function pushDataToChatBox(data) {
    const p = document.createElement("p");
        if (data.sender == 'bot'){
            p.classList.add('bot-message')
        }
        else{
            p.classList.add('user-message')
        }
        p.textContent = data.message;
        chatBoxElement.appendChild(p)
}

function clearChat(){
    currentChat = []
    currentChat.push({sender: 'bot', message: 'Merhaba, ne aramak istiyorsunuz?'});

    while (chatBoxElement.firstChild){
        chatBoxElement.removeChild(chatBoxElement.firstChild);
    }

    const prefs = {
        chat: currentChat
    }
    chrome.runtime.sendMessage({event: 'onStart', prefs})
}

