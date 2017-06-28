#!/bin/bash
set -ev

echo "commit: ${TRAVIS_COMMIT}"
USER_EMAIL=$(git --no-pager show -s --format='%ae' "${TRAVIS_COMMIT}")
USER_NAME=$(git --no-pager show -s --format='%an' "${TRAVIS_COMMIT}")
echo "user email: ${USER_EMAIL}"
echo "user name: ${USER_NAME}"
git config user.email "${USER_EMAIL}"
git config user.name "${USER_NAME}"