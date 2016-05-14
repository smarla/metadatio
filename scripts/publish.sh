#!/usr/bin/env bash

#TODO Remove duplicated code

comment=$(git log -1 --pretty=%B)
#last_tag=$(git describe --abbrev=0)

last_tag=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

current_version="${last_tag//./ }"
version_array=($current_version)
change_type="None"

major=${version_array[0]}
minor=${version_array[1]}
patch=${version_array[2]}

path_regex='^\[patch\]';
minor_regex='^\[minor\]';
major_regex='^\[major\]';
version_change=0
if [[ $comment =~ $path_regex ]]
then
  change_type="patch"
  version_change=1
  patch=$((patch+1))

elif [[ $comment =~ $minor_regex ]]
then
  change_type="minor"
  version_change=1
  minor=$((minor+1));
  patch=0

elif [[ $comment =~ $major_regex ]]
then
  change_type="major"
  version_change=1
  major=$((major+1))
  minor=0
  patch=0
fi

export new_version="${major}.${minor}.${patch}"
export version_change

if [[ ${version_change} == 1 ]]
then
  package="package.json"
  yui="yuidoc.json"
  sed -i "s/\"version\": \"${last_tag}\"/\"version\": \"$new_version\"/g" "$package"
  sed -i "s/\"version\": \"${last_tag}\"/\"version\": \"${new_version}\"/g" "$yui"

    echo 'Starting NPM publishing'

    git pull origin HEAD:master
    git log -p -1

    touch ~/.npmrc

    printf "init.author.name=Smarla Team%s\ninit.author.email=pesama@smarla.com%s\ninit.author.url=https://github.com/smarla%s\n${NPM_API_KEY}" >> ~/.npmrc

    npm publish
fi