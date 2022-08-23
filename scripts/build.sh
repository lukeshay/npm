#!/bin/bash

set -e

tscArgs=()

# Add script name
tscArgs+=("-p" "./tsconfig.build.json")

# Passthrough arguments and flags
tscArgs+=($@)

# Execute
npm exec -- rimraf dist

npm exec -- tsc --module es6 --outDir ./dist/module "${tscArgs[@]}"
npm exec -- tsc --module commonjs --outDir ./dist/main "${tscArgs[@]}"

npm exec -- tsc --declaration --outDir ./dist/types "${tscArgs[@]}"

