#!/usr/bin/env python3
"""
Generate enhanced star data by adding procedural stars to existing dataset
Focuses density in Milky Way plane for visible galactic band
"""

import json
import math
import random

# Constants
TARGET_STAR_COUNT = 5500  # Target total stars
RADIUS = 100.0  # Sphere radius
MILKY_WAY_ENHANCEMENT = True  # Add extra stars in Milky Way plane

def load_existing_stars():
    """Load current star data"""
    with open('src/assets/data/stars-compact.json', 'r') as f:
        data = json.load(f)
    return data['stars']

def generate_procedural_star(base_mag, milky_way_bias=False):
    """Generate a random star with realistic distribution"""
    # Random position on sphere
    theta = random.uniform(0, 2 * math.pi)  # Azimuth
    phi = math.acos(random.uniform(-1, 1))   # Inclination

    # If milky_way_bias, constrain to galactic plane
    if milky_way_bias:
        # Milky Way plane is roughly Dec -30° to +30°
        # In spherical coords, that's phi around π/2
        phi = random.gauss(math.pi/2, 0.3)  # Concentrated around equator
        phi = max(0.2, min(math.pi - 0.2, phi))  # Clamp

    x = RADIUS * math.sin(phi) * math.cos(theta)
    y = RADIUS * math.sin(phi) * math.sin(theta)
    z = RADIUS * math.cos(phi)

    # Magnitude with some variation
    mag = base_mag + random.uniform(-0.3, 0.7)
    mag = max(5.5, min(8.0, mag))  # Clamp to reasonable range

    # Milky Way intensity based on position
    # Higher near the galactic plane (y near 0)
    galactic_distance = abs(z) / RADIUS  # 0 = equator, 1 = poles
    milky_way = 1.0 + (1.0 - galactic_distance) * 0.5

    return {
        'id': random.randint(10000, 99999),  # Synthetic ID
        'x': round(x, 3),
        'y': round(y, 3),
        'z': round(z, 3),
        'mag': round(mag, 2),
        'milkyWay': round(milky_way, 3)
    }

def enhance_star_dataset(existing_stars):
    """Add procedural stars to existing dataset"""
    current_count = len(existing_stars)
    needed = TARGET_STAR_COUNT - current_count

    print(f"Current stars: {current_count}")
    print(f"Generating {needed} additional stars...")

    new_stars = []

    # Generate stars with magnitude distribution
    # Most dim stars (mag 6-7), fewer very dim (mag 7-8)
    for i in range(needed):
        # 70% in Milky Way plane, 30% elsewhere
        milky_way_bias = random.random() < 0.7

        # Magnitude distribution: most stars are dimmer
        if random.random() < 0.6:
            base_mag = random.uniform(6.0, 6.5)  # Dim
        elif random.random() < 0.8:
            base_mag = random.uniform(6.5, 7.0)  # Dimmer
        else:
            base_mag = random.uniform(7.0, 7.5)  # Very dim

        star = generate_procedural_star(base_mag, milky_way_bias)
        new_stars.append(star)

    # Combine and sort by magnitude
    all_stars = existing_stars + new_stars
    all_stars.sort(key=lambda s: s['mag'])

    return all_stars

def main():
    print("Enhanced Star Data Generator")
    print(f"Target: {TARGET_STAR_COUNT} stars")
    print("-" * 50)

    # Load existing stars
    print("Loading existing star data...")
    existing_stars = load_existing_stars()

    # Generate enhanced dataset
    all_stars = enhance_star_dataset(existing_stars)

    print(f"\nTotal stars: {len(all_stars)}")
    print(f"Magnitude range: {all_stars[0]['mag']} to {all_stars[-1]['mag']}")

    # Create output JSON
    output = {
        "metadata": {
            "catalog": "Yale Bright Star Catalog (BSC5) + Procedural Enhancement",
            "totalStars": len(all_stars),
            "magnitudeRange": [all_stars[0]['mag'], all_stars[-1]['mag']],
            "generated": "2026-01-11",
            "note": "Enhanced with procedural stars for Milky Way visibility"
        },
        "stars": all_stars
    }

    # Write to file
    output_file = "src/assets/data/stars-compact.json"
    with open(output_file, 'w') as f:
        json.dump(output, f, separators=(',', ':'))

    print(f"\nWrote {output_file}")
    print(f"File size: {len(json.dumps(output)) / 1024:.1f} KB")

if __name__ == '__main__':
    main()
