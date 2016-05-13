#!/usr/bin/env bash

comment=$(git log -1 --pretty=%B)
regex='^\[patch|minor|major\]'

echo 'Checking if publish requested'

if [[ $comment =~ $regex ]]
then

    echo 'Starting NPM publishing'

    git pull origin master

    touch ~/.npmrc

    printf "init.author.name=Smarla Team%s\ninit.author.email=pesama@smarla.com%s\ninit.author.url=https://github.com/smarla%s\n${NPM_API_KEY}" > ~/.npmrc

    cat ~/.npmrc

    npm publish
fi