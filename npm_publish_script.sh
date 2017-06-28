#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "master" ]; then
    echo "//npm-registry.whitewater.ibm.com/:_authToken=${NPM_AUTH_TOKEN}" >> ~/.npmrc
    
    git checkout -b increment-patch-version
    npm version patch -m "[ci skip] Travis CI - Increment package version to %s"
    npm publish
    
    git branch --set-upstream-to origin/master
    git push origin HEAD:master
    git push origin HEAD:master --tags
else
    echo "Not publishing to NPM because build is a pull request (${TRAVIS_PULL_REQUEST}) or branch not master (${TRAVIS_BRANCH})"
fi