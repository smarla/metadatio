#!/usr/bin/env bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

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

elif [[ $comment =~ $major_regex ]]
then
  change_type="major"
  version_change=1
  major=$((major+1))
fi

new_version="${major}.${minor}.${patch}"

if [[ ${version_change} == 1 ]]
then
  package="package.json"
  yui="yuidoc.json"
  echo "Updating version references"
  sed -i "s/\"version\": \"$last_tag\"/\"version\": \"$new_version\"/g" "$package"
  echo "Package.json version changed"
  sed -i "s/\"version\": \"${last_tag}\"/\"version\": \"${new_version}\"/g" "$yui"
  echo "YUIDoc.json version changed"
  git config user.name "Pelayo Sánchez Margareto"
  git config user.email "sanchezmargareto@gmail.com"
  echo "Git properties set"
  git commit -am "[TRAVIS] [ci skip] ${change_type} updated to ${new_version}"
  echo "Version update commited"
  echo "Commit message: $(git log -1 --pretty=%B)"

  echo "Versions updated"
  echo "Tag version"

  git tag $new_version

  git remote add upstream "https://$GH_TOKEN@github.com/smarla/metadatio.git"
  git push --tags upstream HEAD:master

  export VERSION_CHANGED=1
fi