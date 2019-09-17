#!/bin/bash

mydir=$(dirname "$0")

#create directory if non existent
if [ ! -d "$1" ]
then
    mkdir "$1"
fi

#save language files
cp $mydir/Chatbot/config.yml $mydir/"$1"
cp $mydir/Chatbot/domain.yml $mydir/"$1"
cp $mydir/Chatbot/data/nlu.md $mydir/"$1"
cp $mydir/phrases.json $mydir/"$1"
echo "Saved language files to /$1."
