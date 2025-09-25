#!/bin/bash

# Iterate through each file in the directory
for image_file in ./*; do
    # Check if the file is an image (assuming jpg, png, or jpeg extension)
    if [[ "$image_file" =~ \.(jpg|png|jpeg|heic)$ ]]; then
        # Get the file size in bytes
        file_size=$(stat -c %s "$image_file")

        # Convert bytes to kilobytes
        file_size_kb=$((file_size / 1024))

        printf "Processing %-24s" "$image_file"

        # Check if file size is greater than 16KB
        if [ "$file_size_kb" -gt 16 ]; then
            # Run your desired command here
            mogrify -strip -resize '400x400^' -gravity center -crop 400x400+0+0 +repage -quality 80 -auto-orient -format jpg "$image_file"
            file_size=$(stat -c %s "$image_file")
            new_file_sz_kb=$((file_size / 1024))
            echo "done ($new_file_sz_kb KB)"
        else
            echo "skipped ($file_size_kb KB)"
        fi
    fi
done
