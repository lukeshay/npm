#!/bin/bash

set -e

tscArgs=()

# Add script name
tscArgs+=("-p" "./tsconfig.build.json")

# Passthrough arguments and flags
tscArgs+=($@)

# Execute
yarn rimraf dist

yarn tsc --module es6 --outDir ./dist/module "${tscArgs[@]}"
yarn tsc --module commonjs --outDir ./dist/main "${tscArgs[@]}"

yarn tsc --declaration --outDir ./dist/types "${tscArgs[@]}"
