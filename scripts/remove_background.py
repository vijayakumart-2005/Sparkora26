import os
import math
from collections import deque
from PIL import Image, ImageDraw, ImageFilter

def process_nexus():
    im = Image.open("src/assets/nexus-logo.jpg").convert("RGBA")
    w, h = im.size
    cx, cy = 161.0, 150.5
    radius = 136.2

    # Create 4x supersampled mask for ultra-smooth anti-aliased circular edge
    scale = 4
    mask = Image.new("L", (w * scale, h * scale), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse(
        [
            (cx - radius) * scale,
            (cy - radius) * scale,
            (cx + radius) * scale,
            (cy + radius) * scale,
        ],
        fill=255,
    )
    mask = mask.resize((w, h), Image.Resampling.LANCZOS)

    # Apply mask
    im.putalpha(mask)

    # Crop tightly with 4px margin
    bbox = im.getbbox()
    if bbox:
        # Pad slightly
        pad = 4
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad),
        )
        im = im.crop(crop_box)

    im.save("src/assets/nexus-logo.png", "PNG")
    print("Saved src/assets/nexus-logo.png", im.size)

def process_iei():
    im = Image.open("src/assets/iei-logo.jpg").convert("RGBA")
    w, h = im.size
    cx, cy = 159.5, 159.5
    radius = 158.8

    # Create 4x supersampled mask for ultra-smooth circular edge
    scale = 4
    mask = Image.new("L", (w * scale, h * scale), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse(
        [
            (cx - radius) * scale,
            (cy - radius) * scale,
            (cx + radius) * scale,
            (cy + radius) * scale,
        ],
        fill=255,
    )
    mask = mask.resize((w, h), Image.Resampling.LANCZOS)

    im.putalpha(mask)

    # Crop tightly with 4px margin
    bbox = im.getbbox()
    if bbox:
        pad = 4
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad),
        )
        im = im.crop(crop_box)

    im.save("src/assets/iei-logo.png", "PNG")
    print("Saved src/assets/iei-logo.png", im.size)

def process_algobiz():
    im = Image.open("src/assets/club-algobiz-logo.jpg").convert("RGB")
    w, h = im.size
    pixels = im.load()

    # Connected component flood-fill from border to detect outer black background
    visited = set()
    queue = deque()

    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
        visited.add((x, 0))
        visited.add((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
        visited.add((0, y))
        visited.add((w - 1, y))

    bg_mask = Image.new("L", (w, h), 255) # 255 = foreground, 0 = background
    bg_mask_pixels = bg_mask.load()

    # The outer boundary of the shield is bright gold (brightness > 40-50).
    # Background pixels are <= 25.
    threshold = 28

    while queue:
        x, y = queue.popleft()
        r, g, b = pixels[x, y]
        brightness = max(r, g, b)
        if brightness <= threshold:
            bg_mask_pixels[x, y] = 0
            for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    queue.append((nx, ny))

    # Smooth the mask slightly for anti-aliasing edges
    smooth_mask = bg_mask.filter(ImageFilter.GaussianBlur(radius=0.8))

    # Construct RGBA image
    im_rgba = im.convert("RGBA")
    im_rgba.putalpha(smooth_mask)

    bbox = im_rgba.getbbox()
    if bbox:
        pad = 4
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad),
        )
        im_rgba = im_rgba.crop(crop_box)

    im_rgba.save("src/assets/club-algobiz-logo.png", "PNG")
    print("Saved src/assets/club-algobiz-logo.png", im_rgba.size)

if __name__ == "__main__":
    process_nexus()
    process_iei()
    process_algobiz()
