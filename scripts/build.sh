#!/bin/bash
set -e

tsdxArgs=()

# Add script name
tsdxArgs+=("-p" "./tsconfig.build.json")

# Passthrough arguments and flags
# tsdxArgs+=($@)

# Execute
npm exec -- rimraf dist

npm exec -- tsc --module es6 --outDir ./dist/main "${tsdxArgs[@]}"
npm exec -- tsc --module commonjs --outDir ./dist/module "${tsdxArgs[@]}"

npm exec -- tsc --declaration --outDir ./dist/types "${tsdxArgs[@]}"

