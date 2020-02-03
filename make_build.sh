#!/bin/bash

if [ $(git status -s | wc -l) > 0 ]; then
  echo "You have uncommitted changes. Please commit or stash your changes before continuing"
  exit
fi

CURRENT_VERSION=$(grep \"version\" package.json | awk -F'"' '{print $4}')

read -p "What version (current is ${CURRENT_VERSION})? " NEXT_VERSION
echo "Building v${NEXT_VERSION}..."

perl -pi -e "s/\"version\": \"${CURRENT_VERSION}\"/\"version: \"${NEXT_VERSION}\"/" package.json && \
  yarn build && \
  git st && \
  git add ./ && \
  git commit -a -m "Releasing v${NEXT_VERSION}" && \
  git tag v${NEXT_VERSION}

echo "Done. Now you can run git push --tags origin/master to deploy"
