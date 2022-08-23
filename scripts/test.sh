#!/bin/bash
set -e

vitestArgs=()

vitestArgs+=("run")

# Passthrough arguments and flags
vitestArgs+=($@)

# Execute
npm exec -- vitest "${vitestArgs[@]}"
