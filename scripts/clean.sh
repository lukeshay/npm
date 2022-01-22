#!/bin/bash
set -e

rimrafArgs=()

# Add script name
rimrafArgs+=("dist" ".jest-*")

# Passthrough arguments and flags
rimrafArgs+=($@)

# Execute
npm exec -- rimraf "${rimrafArgs[@]}"

