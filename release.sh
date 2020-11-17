#!/bin/bash

master="release-master"
develop="release-develop"

master_latest=$(git ls-remote origin $master | awk '{ print $1 }')
develop_latest=$(git ls-remote origin $develop | awk '{ print $1 }')
current_branch=$(git branch --show-current)

if [ "$master_latest" != "$develop_latest" ]; then
    echo "ERROR: $master's latest commit $master_latest differs from $develop's $develop_latest."
    exit 1
fi

if [ "$current_branch" != "$develop" ]; then
    echo "ERROR: you must release from $develop, you're currently on $current_branch"
    exit 1
fi

npm run release

develop_after_release_local=$(git rev-parse HEAD)

if [ "$develop_latest" = "$develop_after_release_local" ]; then
    echo "ERROR: after the release there is no new commits. Are you sure the release went fine? Please commit your release changes, push it to $develop and ff merge back the release commit to $master"
    exit 1
fi

develop_after_release_remote=$(git ls-remote origin $develop | awk '{ print $1 }')

if [ "$develop_after_release_local" != "$develop_after_release_remote" ]; then
    echo "Somewhy npm was not pushed the release commit to remote. Would you like to push it now?"
    select yn in "Yes" "No"; do
        case $yn in
            Yes ) git push; break;;
            No ) exit;;
        esac
    done
fi

git checkout $master
git pull --ff-only origin $develop
git push

