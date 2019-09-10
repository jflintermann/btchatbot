#Startup

1. If changes were made to training data(/Chatbot/data/nlu.md) or stories (/Chatbot/data/stories.md), train model in /Chatbot 

    $rasa train

2. Run Rasa Core server in /Chatbot, for testing purposes use shell

	$rasa run

	$rasa shell

3. Run Rasa Action server in /Chatbot

	$rasa run actions

4. Run Webhook server in /Webhook

	$node webhook.js
