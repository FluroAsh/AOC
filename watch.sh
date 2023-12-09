#!/bin/bash
cwd=$(pwd)
npx nodemon -q --watch "$(pwd)" --ext ts,txt -x 'tsx' index.ts 