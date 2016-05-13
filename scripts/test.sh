#!/usr/bin/env bash

npm run test:coverage
cat ./coverage/lcov.info | ./node_modules/.bin/coveralls