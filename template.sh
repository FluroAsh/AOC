#!/bin/bash

# Find the highest numbered folder in the current directory
highest_folder=$(find . -maxdepth 1 -type d -name "d*" | sort -n | tail -n 1)
if [[ -z "$highest_folder" ]]; then
    highest_number=0
else
    highest_number=${highest_folder#./d}
fi

# Increment the highest number by 1
new_number=$((highest_number + 1))
new_folder="d$new_number"

# Create the new folder
mkdir "$new_folder"
echo "Created folder: $new_folder"

# Create the index.ts file
index_file="$new_folder/index.ts"
touch "$index_file"

# Add some boilerplate to the index.ts file
text=$(cat << END
import fs from 'fs'

// Your code goes here. Good luck!
END
)

printf "%s\n" "$text" > $index_file
echo "Created file: $index_file"
