#!/bin/bash

# Script to generate circular favicons from favicon_base.png
# Usage: ./generate_favicons.sh
# 
# This script creates circular favicons with transparent corners
# from a square favicon_base.png image in the same directory.

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "Error: ImageMagick is not installed. Please install it first."
    echo "On Ubuntu/Debian: sudo apt install imagemagick"
    echo "On macOS: brew install imagemagick"
    exit 1
fi

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_IMAGE="$SCRIPT_DIR/favicon_base.png"
FAVICON_DIR="$SCRIPT_DIR/favicon"

# Check if favicon_base.png exists
if [ ! -f "$BASE_IMAGE" ]; then
    echo "Error: favicon_base.png not found in $SCRIPT_DIR"
    echo "Please place your favicon_base.png file in the assets directory."
    exit 1
fi

# Create favicon directory if it doesn't exist
mkdir -p "$FAVICON_DIR"

echo "Generating circular favicons from favicon_base.png..."

# Step 1: Create a 512x512 version of the base image
echo "  → Resizing base image to 512x512..."
magick "$BASE_IMAGE" -resize 512x512 "$SCRIPT_DIR/temp_square_512.png"

# Step 2: Create a circular mask
echo "  → Creating circular mask..."
magick -size 512x512 xc:none -fill white -draw "circle 256,256 256,0" "$SCRIPT_DIR/temp_mask_512.png"

# Step 3: Apply the circular mask to create circular image
echo "  → Applying circular mask..."
magick "$SCRIPT_DIR/temp_square_512.png" "$SCRIPT_DIR/temp_mask_512.png" -alpha off -compose copy_opacity -composite "$SCRIPT_DIR/temp_circular_512.png"

# Step 4: Generate all favicon sizes from the circular version
echo "  → Generating favicon-16x16.png..."
magick "$SCRIPT_DIR/temp_circular_512.png" -resize 16x16 "$FAVICON_DIR/favicon-16x16.png"

echo "  → Generating favicon-32x32.png..."
magick "$SCRIPT_DIR/temp_circular_512.png" -resize 32x32 "$FAVICON_DIR/favicon-32x32.png"

echo "  → Generating apple-touch-icon.png..."
magick "$SCRIPT_DIR/temp_circular_512.png" -resize 180x180 "$FAVICON_DIR/apple-touch-icon.png"

echo "  → Generating android-chrome-192x192.png..."
magick "$SCRIPT_DIR/temp_circular_512.png" -resize 192x192 "$FAVICON_DIR/android-chrome-192x192.png"

echo "  → Generating android-chrome-512x512.png..."
cp "$SCRIPT_DIR/temp_circular_512.png" "$FAVICON_DIR/android-chrome-512x512.png"

# Step 5: Create the ICO file with multiple sizes
echo "  → Creating favicon.ico..."
magick "$SCRIPT_DIR/temp_circular_512.png" -resize 32x32 "$SCRIPT_DIR/temp_circular_32.png"
magick "$SCRIPT_DIR/temp_circular_512.png" -resize 16x16 "$SCRIPT_DIR/temp_circular_16.png"
magick "$SCRIPT_DIR/temp_circular_32.png" "$SCRIPT_DIR/temp_circular_16.png" "$FAVICON_DIR/favicon.ico"

# Step 6: Clean up temporary files
echo "  → Cleaning up temporary files..."
rm -f "$SCRIPT_DIR"/temp_*.png

echo "✅ Circular favicons generated successfully!"
echo ""
echo "Generated files:"
echo "  • favicon-16x16.png (16x16)"
echo "  • favicon-32x32.png (32x32)"
echo "  • favicon.ico (multi-size)"
echo "  • apple-touch-icon.png (180x180)"
echo "  • android-chrome-192x192.png (192x192)"
echo "  • android-chrome-512x512.png (512x512)"
echo ""
echo "All files have circular design with transparent corners."
echo "Files are located in: $FAVICON_DIR" 