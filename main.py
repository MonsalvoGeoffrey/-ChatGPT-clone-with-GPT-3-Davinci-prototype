import openai
from flask import Flask, render_template, request
from config import API_KEY
from typing import List
from time import sleep

openai.api_key = API_KEY

app = Flask(__name__)


def make_api_call(chat: List) -> str:
    # sleep(2)
    # return "Test Placeholder"
    prompt = """The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, detailed, verbose, and very friendly.
    Markdown may be used. Including to show code (with the language name or acronym on the first line).

    Human: Hello, who are you?
    AI: I am an AI created by OpenAI. How can I help you today?
    """
    for message in chat:
        prompt += f"{message['user']}: {message['content']}\n"
        # prompt += f"{exchange[0]}\nAI: {exchange[1]}\nHuman: "
    prompt += f"AI:"
    prompt = prompt[-2048:]
    response = openai.Completion.create(
        model="text-davinci-003",
        max_tokens=2048,
        prompt= prompt,
        stop=["AI:", "Human:"],
        frequency_penalty=0.6,
        temperature=0.9
    )
    print(response.choices[0].text) # type: ignore
    return response.choices[0].text # type: ignore



@app.route('/')
def index():
    return render_template("index.html")

@app.route('/ai_message', methods=['POST'])
def ai_message():
    data: List[List[str]] = request.json['chat'] #type: ignore
    # last_message: str = request.json['last_message'] #type: ignore
    return make_api_call(data)


app.run(host="127.0.0.1", port=5000, debug=True)