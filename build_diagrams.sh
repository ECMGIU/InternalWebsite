#!/bin/zsh

for file in diagrams/src/*; do
    echo "Building: $file"
    diagrams flowchart $file diagrams/build/$(basename -s .flowchart $file).svg
done
