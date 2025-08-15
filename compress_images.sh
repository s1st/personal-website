#!/bin/bash

# Image Compression Script for Personal Website
# This script will compress large images to improve website performance

echo "🚀 Starting image compression for website performance optimization..."

# Create backup directory
mkdir -p images/backup_$(date +%Y%m%d_%H%M%S)
echo "📁 Created backup directory"

# Function to compress images with quality settings
compress_image() {
    local input="$1"
    local output="$2"
    local quality="$3"
    local max_width="$4"
    
    if [ -f "$input" ]; then
        echo "🔄 Compressing: $input"
        
        # Get original file size
        original_size=$(du -h "$input" | cut -f1)
        
        # Compress with ImageMagick
        convert "$input" -quality "$quality" -resize "$max_width" "$output"
        
        # Get compressed file size
        compressed_size=$(du -h "$output" | cut -f1)
        
        echo "✅ Compressed: $input ($original_size → $compressed_size)"
    else
        echo "❌ File not found: $input"
    fi
}

# Function to create WebP versions (better compression)
create_webp() {
    local input="$1"
    local output="${input%.*}.webp"
    
    if [ -f "$input" ]; then
        echo "🔄 Creating WebP: $input"
        convert "$input" -quality 85 "$output"
        echo "✅ Created: $output"
    fi
}

# Critical images that need immediate compression
echo "🎯 Compressing critical large images..."

# 1. Profile photo (7.8MB → target: ~200KB)
compress_image "images/me.JPG" "images/me_compressed.jpg" 85 "800x800"
compress_image "images/me.JPG" "images/me_compressed.webp" 85 "800x800"

# 2. Background images (4.7MB + 523KB → target: ~200KB total)
compress_image "images/bg1.jpg" "images/bg1_compressed.jpg" 80 "1920x1080"
compress_image "images/bg.jpg" "images/bg_compressed.jpg" 80 "1920x1080"

# 3. Large research images
compress_image "images/antnet.png" "images/antnet_compressed.png" 85 "1200x800"
compress_image "images/pultrusion_real.png" "images/pultrusion_real_compressed.png" 85 "1200x800"

# 4. Other images that could benefit from compression
compress_image "images/overview_inferring.png" "images/overview_inferring_compressed.png" 85 "1000x600"
compress_image "images/mesh_details2.png" "images/mesh_details2_compressed.png" 85 "1000x600"
compress_image "images/pultrusion_line.png" "images/pultrusion_line_compressed.png" 85 "800x600"

# Create WebP versions for modern browsers
echo "🌐 Creating WebP versions for better compression..."
create_webp "images/all_profs_and_me.jpeg"
create_webp "images/RL4RTM.jpg"
create_webp "images/permeabilitynets.jpg"
create_webp "images/ffn.jpg"
create_webp "images/TRTM_Setup.jpg"

# Show compression results
echo ""
echo "📊 Compression Summary:"
echo "========================"
echo "Original large files:"
du -h images/me.JPG images/bg1.jpg images/antnet.png images/pultrusion_real.png 2>/dev/null | sort -hr

echo ""
echo "Compressed files:"
du -h images/*_compressed.* images/*.webp 2>/dev/null | sort -hr

echo ""
echo "💡 Next steps:"
echo "1. Review compressed images for quality"
echo "2. Update HTML to use compressed versions"
echo "3. Consider implementing lazy loading"
echo "4. Test website performance improvement"

echo ""
echo "🎉 Image compression completed!"
