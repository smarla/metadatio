#!/usr/bin/env bash

set -o errexit -o nounset

echo ${new_version}

if [[ ${version_change} == 1 ]]
then
  git config user.name "SNAP BOT"
  git config user.email "snapbot@smarla.com"

  git remote add upstream "https://$GH_TOKEN@github.com/smarla/metadatio.git"
  git fetch upstream

  git commit -am "[${change_type}] updated to version ${new_version} [ci skip]"

  git tag ${new_version}
  git push --tags upstream HEAD:master
fi