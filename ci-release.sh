#!/bin/bash

possible=("\"patch\"" "\"minor\"" "\"major\"")

next=$(jq .nextVersion package.json)

if [[ ! " ${possible[@]} " =~ " ${next} " ]]; then
    echo "ERROR: package.json's nextVersion must be patch, minor or major"
    exit 1
fi

npm run release -- --ci --increment=$next
