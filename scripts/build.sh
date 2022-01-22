#!/bin/bash
set -e

tsdxArgs=()

# Add script name
tsdxArgs+=("build" "--name" "index" "--format" "cjs,esm" "--tsconfig" "./tsconfig.build.json")

# Passthrough arguments and flags
tsdxArgs+=($@)

# Execute
npm exec -- tsdx "${tsdxArgs[@]}"

