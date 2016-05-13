#!/usr/bin/env bash

comment=$(git log -1 --pretty=%B)
regex='^\[patch|minor|major\]'

echo 'Checking if publish requested'

if [[ $comment =~ $regex ]]
then

    echo 'Starting NPM publishing'

    git pull origin master

    touch ~/.npmrc

    echo "init.author.name=Smarla Team\ninit.author.email=pesama@smarla.com\ninit.author.url=https://github.com/smarla\n${NPM_API_KEY}" > ~/.npmrc

#    npm publish
#fi