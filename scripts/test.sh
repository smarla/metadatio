#!/usr/bin/env bash

if [ "$TRAVIS_BRANCH" == "master" ]
then
    npm run test:coverage
    cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
else
    echo "Skipping phase on branch $TRAVIS_BRANCH"
fi