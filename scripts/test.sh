#!/bin/bash
set -e

vitestArgs=()

# Add default arguments
vitestArgs+=("run" "--passWithNoTests" "--coverage")

# Passthrough arguments and flags
vitestArgs+=($@)

# Execute
yarn vitest "${vitestArgs[@]}"

