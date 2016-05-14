#!/usr/bin/env bash

set -o errexit -o nounset

if [[ ${version_change} == 1 ]]
then
  package="package.json"
  yui="yuidoc.json"
  sed -i "s/\"version\": \"${last_tag}\"/\"version\": \"$new_version\"/g" "$package"
  sed -i "s/\"version\": \"${last_tag}\"/\"version\": \"${new_version}\"/g" "$yui"
  git config user.name "SNAP BOT"
  git config user.email "snapbot@smarla.com"

  git remote add upstream "https://$GH_TOKEN@github.com/smarla/metadatio.git"
  git fetch upstream

  git commit -am "[${change_type}] updated to version ${new_version} [ci skip]"

  git tag ${new_version}
  git push --tags upstream HEAD:master
fi