# ChatGPT clone with GPT-3 Davinci prototype

At the moment, this is a quick and dirty prototype of a ChatBot UI to use GPT-3 in a similar way to ChatGPT by API calls. Keeping the API calls on the server side.

The project's goal aren't fully defined and may drastically change in the future. At the moment it's meant for personal usage. But I may end up making my server side code not depend on this specific front so that it could be used for instance as a Discord bot.

It currently serves as an AI assistant and support markdown. Ideally the client should be able to tweak the prompt to change the AI's emotions or purpose (i.e. fictional character impersonation)

### Setup

```bash
# Install requirements with
pip install -r requirements.txt
```

Create a config.py file and write
```py
API_KEY = "<OPEN AI API KEY HERE>"
```


Then run main.py and open localhost:5000



## Goals

- [ ] Markdown escape
- [ ] Connect with DALL-E 2
- [ ] Connect with WolframAlpha
- [ ] Save conversations
- [ ] Retrieve conversations
- [ ] Delete conversations
- [ ] Count tokens instead of characters
- [ ] Display remaining OpenAI credits (If Possible)
- [ ] Better short term memory[^1]
- [ ] Long term memory
- [ ] Create "Character" system

## Character system (to-do)

- [ ] Save character
- [ ] Retrieve character
- [ ] Delete character
- [ ] Characters should have a name
- [ ] Characters should have a role
- [ ] Characters may have a personality
- [ ] Characters may have an emotion (maybe dynamic)
- [ ] Characters may have long term memory[^1]

[^1]: Long Term Memory: I currently have in mind a searchable KEY/VALUE database to take the role of long term memory, but that idea may evolve as it may be too simple.