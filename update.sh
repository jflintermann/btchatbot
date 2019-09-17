#!/bin/bash

mydir=$(dirname "$0")

if [ ! -z $1 ]
then
    #replace language files
    cp $mydir/"$1"/config.yml $mydir/Chatbot
    cp $mydir/"$1"/domain.yml $mydir/Chatbot
    cp $mydir/"$1"/nlu.md $mydir/Chatbot/data
    cp $mydir/"$1"/phrases.json $mydir
    echo "Switched language to $1."
fi

cd $mydir/Chatbot

#train rasa model
rasa train

