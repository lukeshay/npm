#!/bin/bash
set -e

tsdxArgs=()

# Add script name
tsdxArgs+=("build" "--name" "lukeshay" "--format" "cjs,esm" "--tsconfig" "./tsconfig.build.json")

# Passthrough arguments and flags
tsdxArgs+=($@)

# Execute
npm exec -- tsdx "${tsdxArgs[@]}"

