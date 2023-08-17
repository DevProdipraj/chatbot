const sendChatBtn = document.querySelector(".chat-input span");
const chatInpput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatbox");

let userMassage;

const API_KEY = "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"

const createChatLi = (message, className) => {
    // create a chat  Li for passed message and className  
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className)
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span> <p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    
    // messageEliment = 

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMassage }],
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
    
}

    const handleChat = () => {
        userMassage = chatInpput.value.trim();
        if (!userMassage) return;

        // append the user input message 
        chatBox.appendChild(createChatLi(userMassage, "outgoing"));

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi =  createChatLi("Thinking...", "incoming");
            chatBox.appendChild(incomingChatLi);
            // chatBox.scrollTo(0, chatBox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    sendChatBtn.addEventListener("click", handleChat);