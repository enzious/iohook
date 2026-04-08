#!/bin/sh

npm run build
mkdir -p builds/node-v115-linux-x64/
rm -rf builds/node-v115-linux-x64/build
cp -r build builds/node-v115-linux-x64/
