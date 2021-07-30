#!/bin/bash
set -e

tsdxArgs=()

# Add default arguments
tsdxArgs+=("test" "--passWithNoTests" "--coverage")

# Add arguments based on environment variables
if [ -n "$CI" ]; then
  tsdxArgs+=("--maxWorkers=4")
  tsdxArgs+=("--ci ")
fi

# Passthrough arguments and flags
tsdxArgs+=($@)

# Execute
npm exec -- tsdx "${tsdxArgs[@]}"

