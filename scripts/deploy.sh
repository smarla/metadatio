#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd docs

git init
git config user.name "Pelayo Sánchez Margareto"
git config user.email "san"

git remote add upstream "https://$GH_TOKEN@github.com/smarla/metadatio.git"
git fetch upstream
git reset upstream/gh-pages

echo "metadat.io" > CNAME

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages