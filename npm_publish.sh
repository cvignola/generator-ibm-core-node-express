#!/bin/bash
set -ev

npm test

if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "development" ]; then
    echo "//npm-registry.whitewater.ibm.com/:_authToken=${NPM_AUTH_TOKEN}" >> ~/.npmrc
    git config user.email "travis@travis-ci.org"
    git config user.name "Travis CI"
    npm version patch -m "[ci skip] Increment version to %s"
    npm publish
    git remote add origin https://${GH_TOKEN}@github.ibm.com/arf/generator-core-node-express.git
    git push origin development --tags
else
    echo "Not publishing to NPM. isPullRequest?: ${TRAVIS_PULL_REQUEST}, branch: ${TRAVIS_BRANCH}"
fi