#!/bin/bash
set -ev

npm test

if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "master" ]; then
    echo "//npm-registry.whitewater.ibm.com/:_authToken=${NPM_AUTH_TOKEN}" >> ~/.npmrc
    git config user.email "travis@travis.ibm.com"
    git config user.name "Travis IBM CI"
    git checkout -b increment-patch-version
    npm version patch -m "[ci skip] Increment package version to %s"
    npm publish
    git branch --set-upstream-to origin/master
    git push origin HEAD:master
    git push origin HEAD:master --tags
else
    echo "Not publishing to NPM because build is a pull request (${TRAVIS_PULL_REQUEST}) or branch not master (${TRAVIS_BRANCH})"
fi