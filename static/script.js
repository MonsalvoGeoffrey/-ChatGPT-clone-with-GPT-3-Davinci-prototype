let chat = []
const chatArea = document.getElementById("chat-area");
const input = document.getElementById("input");

let waitingResponse = false

const escapeHtml = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}



class Message {
    constructor(user, content) {
        this.user = user;
        this.content = content;
    }
}




function addMessage(user, content){
    chat.push(new Message(user, content));
    refreshChat();
}


// function addMessage(user, ai){
//     chat.push([user, ai])
//     refreshChat()
// }

function sanitize(message){
    message = escapeHtml(message);
    // message = message.split("\n").join("<br>\n")
    // message = message.replaceAll()
    console.log(message)
    message = message.replaceAll(/((?:^&gt; .*$\n?))+/gm , (match, content) => { return `<blockquote>${match.replaceAll(/^&gt; /gm, "")}</blockquote>`; })
    message = message.replaceAll(/((?:^- .*$\n?))+/gm , (match, content) => { return `<ul>${match.replaceAll(/^- (.*?)$/gm, (match, content) => { return "<li>" + content + "</li>"})}</ul>`; })
    message = message.replaceAll(/((?:^\d+\. .*$\n?))+/gm , (match, content) => { return `<ol>${match.replaceAll(/^\d+\. (.*?)$/gm, (match, content) => { return "<li>" + content + "</li>"})}</ol>`; })
    message = message.replaceAll(/^###### (.+?)$/gsm , (match, content) => { return `<h6>${content}</h6>`; })
    message = message.replaceAll(/^##### (.+?)$/gsm , (match, content) => { return `<h5>${content}</h5>`; })
    message = message.replaceAll(/^#### (.+?)$/gsm , (match, content) => { return `<h4>${content}</h4>`; })
    message = message.replaceAll(/^### (.+?)$/gsm , (match, content) => { return `<h3>${content}</h3>`; })
    message = message.replaceAll(/^## (.+?)$/gsm , (match, content) => { return `<h2>${content}</h2>`; })
    message = message.replaceAll(/^# (.+?)$/gsm , (match, content) => { return `<h1>${content}</h1>`; })
    message = message.replaceAll(/\*\*\*(.*?)\*\*\*/gs , (match, content) => { return `<strong><em>${content}</em></strong>`; })
    message = message.replaceAll(/\*\*(.*?)\*\*/gs , (match, content) => { return `<strong>${content}</strong>`; })
    message = message.replaceAll(/\*(.*?)\*/gs , (match, content) => { return `<em>${content}</em>`; })
    message = message.replaceAll(/==(.*?)==/gs , (match, content) => { return `<mark>${content}</mark>`; })
    message = message.replaceAll(/__(.*?)__/gs , (match, content) => { return `<u>${content}</u>`; })
    message = message.replaceAll(/~~(.*?)~~/gs , (match, content) => { return `<del>${content}</del>`; })
    message = message.replaceAll(/```(.*?)```/gs , (match, content) => {
        const lineArray = content.split("\n")
        const language = hljs.getLanguage(lineArray[0]);
        if (language){
            return `<pre><code class="language-${lineArray.shift()}">${lineArray.join("\n")}</code></pre>`;
        }else{
            return `<pre><code class="language-plaintext">${lineArray.join("\n")}</code></pre>`;
        }
    })
    message = message.replaceAll(/`(.*?)`/gs , (match, content) => { return `<code class="language-plaintext inline-code">${content}</code>`; })
    message = message.replaceAll(/!\[(.*?)\]\((.*?)\)/gs , (match, alt_text, url) => { return `<img src="${url}" alt="${alt_text}">`; })
    message = message.replaceAll(/\[(.*?)\]\((.*?)\)/gs , (match, link, url) => { return `<a href="${url}" target="_blank">${link}</a>`; })
    // message = filterXSS(message);
    return message;
    // return converter.makeHtml(message)
}

/*function refreshChat(){
    chatArea.innerHTML = "";
    for(const messages of chat){
        let userMessage = document.createElement("pre");
        let aiMessage = document.createElement("pre");

        console.log(messages[0])
        console.log(sanitize(messages[0]))
        userMessage.innerHTML = sanitize(messages[0]);
        aiMessage.innerHTML = sanitize(messages[1]);
        userMessage.classList.add("message");
        userMessage.classList.add("user-message");
        aiMessage.classList.add("message");
        aiMessage.classList.add("ai-message");
        chatArea.appendChild(userMessage);
        chatArea.appendChild(aiMessage);
    }
    hljs.highlightAll();
}*/

function refreshChat(){
    chatArea.innerHTML = "";
    for(const message of chat){
        let messageElement = document.createElement("div");
        let user = document.createElement("p");
        let content = document.createElement("pre");
        messageElement.appendChild(user);
        messageElement.appendChild(content);
        messageElement.classList.add("message")
        user.innerText = message.user
        user.classList.add("message-user");
        content.innerHTML = sanitize(message.content);
        content.classList.add("message-content");
        chatArea.appendChild(messageElement)


        continue;
        let userMessage = document.createElement("pre");
        let aiMessage = document.createElement("pre");

        console.log(messages[0])
        console.log(sanitize(messages[0]))
        userMessage.innerHTML = sanitize(messages[0]);
        aiMessage.innerHTML = sanitize(messages[1]);
        userMessage.classList.add("message");
        userMessage.classList.add("user-message");
        aiMessage.classList.add("message");
        aiMessage.classList.add("ai-message");
        chatArea.appendChild(userMessage);
        chatArea.appendChild(aiMessage);
    }
    hljs.highlightAll();
}

input.addEventListener("keypress", function(event){
    if(event.key == "Enter" && !event.shiftKey){
        event.preventDefault();
        if(waitingResponse) { return; };
        // input.contentEditable = false;
        waitingResponse = true
        const text = input.innerText;
        input.innerText = "";
        addMessage("Human", text)
        fetch("ai_message", {
            method: "POST",
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({chat}),
        }).then((res) => {
            return res.text();
            
        }).then((res) => {
            // addMessage(input.innerText, res);
            addMessage("AI", res)
            // input.innerText = "";
            waitingResponse = false
            // input.contentEditable = true;
        })
    }
})
