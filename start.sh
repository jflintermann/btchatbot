#!/bin/bash
trap 'kill %1; kill %2' EXIT

mydir=$(dirname "$0")

#run webhook
node $mydir/Webhook/recipes.js &

cd $mydir/Chatbot

#run action server
rasa run actions &

if [ "$1" = "shell" ]
then
    #run rasa shell
    rasa shell
else
    #run core server
    rasa run
fi
