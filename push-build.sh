#!/bin/bash

cp -r -f build build-repo
cd build-repo
git add .
git commit -m "build #3"
git push