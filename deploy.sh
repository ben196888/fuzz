#!/bin/sh

REMOTE=${1:-'origin'}

git checkout $REMOTE/master
yarn run build
gh-pages -o $REMOTE -d build
