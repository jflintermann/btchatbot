#!/bin/bash
trap 'kill %1; kill %2' EXIT

mydir=$(dirname "$0")

#run webhook
node $mydir/Webhook/recipes.js &

cd $mydir/Chatbot

#run action server
rasa run actions -p 50002 &

if [ "$1" = "shell" ]
then
    #run rasa shell
    rasa shell -p 50001
else
    #run core server
    rasa run -p 50001
fi
