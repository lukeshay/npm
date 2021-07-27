#! /usr/bin/env sh
set -e

tsdxArgs=()

# Add script name
tsdxArgs+=("watch" "--name" "lukeshay" "--format" "cjs,esm,umd" "--tsconfig" "./tsconfig.tsdx.json")

# Passthrough arguments and flags
tsdxArgs+=($@)

# Execute
npm exec -- tsdx "${tsdxArgs[@]}"

