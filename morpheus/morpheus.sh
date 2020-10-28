#!/bin/sh
npm run build
exec node ./lib/start.js "$@"