#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "master" ]; then
    echo "//npm-registry.whitewater.ibm.com/:_authToken=${NPM_AUTH_TOKEN}" >> ~/.npmrc
    
    echo "commit: ${TRAVIS_COMMIT}"
    USER_EMAIL=$(git --no-pager show -s --format='%ae' "${TRAVIS_COMMIT}")
    USER_NAME=$(git --no-pager show -s --format='%an' "${TRAVIS_COMMIT}")
    echo "user email: ${USER_EMAIL}"
    echo "user name: ${USER_NAME}"
    git config user.email "${USER_EMAIL}"
    git config user.name "${USER_NAME}"
    
    git checkout -b increment-patch-version
    npm version patch -m "[ci skip] Travis CI - Increment package version to %s"
    npm publish
    
    git branch --set-upstream-to origin/master
    git push origin HEAD:master
    git push origin HEAD:master --tags
else
    echo "Not publishing to NPM because build is a pull request (${TRAVIS_PULL_REQUEST}) or branch not master (${TRAVIS_BRANCH})"
fi