#!/usr/bin/env bash

echo "//npm-registry.whitewater.ibm.com/:_authToken=${NPM_AUTH_TOKEN}" > .npmrc
git config user.email "travis@travis-ci.org"
git config user.name "Travis CI"
npm version patch -m "Increment version to %s"
npm publish
git push