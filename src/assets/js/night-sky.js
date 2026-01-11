import * as THREE from '/assets/js/three.module.js';
import { vertexShader } from './shaders/stars.vert.js';
import { fragmentShader } from './shaders/stars.frag.js';
import { STAR_NAMES } from './star-names.js';

// Spectral type colors for named stars (based on astronomical data)
const STAR_SPECTRAL_COLORS = {
  2491: { r: 0.79, g: 0.84, b: 1.0 },    // Sirius (A1V) - White
  2326: { r: 0.97, g: 0.97, b: 1.0 },    // Procyon (F5IV) - Yellow-white
  5340: { r: 1.0, g: 0.82, b: 0.63 },    // Arcturus (K0III) - Orange
  5459: { r: 0.97, g: 0.97, b: 1.0 },    // Canopus (F0Ib) - Yellow-white
  7001: { r: 0.76, g: 0.81, b: 1.0 },    // Vega (A0V) - Blue-white
  1708: { r: 0.69, g: 0.78, b: 1.0 },    // Rigel (B8Ia) - Blue
  1713: { r: 0.69, g: 0.78, b: 1.0 },    // Achernar (B3V) - Blue
  2943: { r: 1.0, g: 0.96, b: 0.8 },     // Capella (G8III) - Yellow
  472: { r: 0.69, g: 0.78, b: 1.0 },     // Hadar (B1III) - Blue
  2061: { r: 1.0, g: 0.5, b: 0.3 },      // Betelgeuse (M2Iab) - Red
  5267: { r: 0.69, g: 0.78, b: 1.0 },    // Spica (B1V) - Blue
  7557: { r: 0.76, g: 0.81, b: 1.0 },    // Deneb (A2Ia) - White
  1457: { r: 1.0, g: 0.82, b: 0.63 },    // Aldebaran (K5III) - Orange
  6134: { r: 1.0, g: 0.5, b: 0.3 },      // Antares (M1.5Iab) - Red
  5056: { r: 1.0, g: 0.82, b: 0.63 },    // Pollux (K0III) - Orange
  2990: { r: 0.76, g: 0.81, b: 1.0 },    // Fomalhaut (A3V) - White
  8728: { r: 0.76, g: 0.81, b: 1.0 },    // Altair (A7V) - White
  4853: { r: 0.69, g: 0.78, b: 1.0 },    // Mimosa (B0.5III) - Blue
  7924: { r: 1.0, g: 0.82, b: 0.63 },    // Deneb Kaitos (K0III) - Orange
  424: { r: 0.97, g: 0.97, b: 1.0 },     // Polaris (F7Ib) - Yellow-white
  2618: { r: 0.69, g: 0.78, b: 1.0 },    // Regulus (B7V) - Blue
  3982: { r: 0.76, g: 0.81, b: 1.0 }     // Castor (A1V) - White
};

// Global state
let scene, camera, renderer, stars, starMaterial;
let isInitialized = false;
let animationPaused = false;
let rotationAngle = 0;
let needsFadeIn = false; // Flag to trigger fade-in after first render

// Star label sprites
let labelSprites = [];

// Shooting star state
let shootingStars = [];
let nextMeteorTime = 5 + Math.random() * 5; // 5-10 seconds for testing (was 30-60)
let lastFrameTime = performance.now();

// Animation constants
const ROTATION_SPEED = 0.00005; // ~1 full rotation per hour

// Color interpolation helper
function lerpColor(color1, color2, t) {
  return {
    r: color1.r + (color2.r - color1.r) * t,
    g: color1.g + (color2.g - color1.g) * t,
    b: color1.b + (color2.b - color1.b) * t
  };
}

// Get star color based on magnitude (brighter→bluer, dimmer→redder)
function getMagnitudeBasedColor(magnitude) {
  const minMag = -1.5;
  const maxMag = 6.0;
  const t = (magnitude - minMag) / (maxMag - minMag);
  const clampedT = Math.max(0, Math.min(1, t));

  if (clampedT < 0.2) {
    // Very bright: Blue to Blue-white
    return lerpColor(
      { r: 0.61, g: 0.69, b: 1.0 },
      { r: 0.79, g: 0.84, b: 1.0 },
      clampedT / 0.2
    );
  } else if (clampedT < 0.4) {
    // Bright: White to Yellow-white
    return lerpColor(
      { r: 0.79, g: 0.84, b: 1.0 },
      { r: 0.97, g: 0.97, b: 1.0 },
      (clampedT - 0.2) / 0.2
    );
  } else if (clampedT < 0.6) {
    // Medium: Yellow-white to Yellow
    return lerpColor(
      { r: 0.97, g: 0.97, b: 1.0 },
      { r: 1.0, g: 0.96, b: 0.92 },
      (clampedT - 0.4) / 0.2
    );
  } else if (clampedT < 0.8) {
    // Dim: Yellow to Orange
    return lerpColor(
      { r: 1.0, g: 0.96, b: 0.92 },
      { r: 1.0, g: 0.82, b: 0.63 },
      (clampedT - 0.6) / 0.2
    );
  } else {
    // Very dim: Orange to Red
    return lerpColor(
      { r: 1.0, g: 0.82, b: 0.63 },
      { r: 1.0, g: 0.8, b: 0.44 },
      (clampedT - 0.8) / 0.2
    );
  }
}

// Device detection for performance tiering
function getStarCount() {
  const width = window.innerWidth;
  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile && width < 768) {
    return 2500; // Mobile: increased for denser Milky Way
  } else if (width < 1024) {
    return 4000; // Tablet: mid-range
  } else {
    return 6000; // Desktop: use all available stars
  }
}

// Check if WebGL is supported
function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

// ShootingStar class for meteor trails
class ShootingStar {
  constructor() {
    // Start position in visible hemisphere (in front of camera)
    // Camera is at (0, 0, 0.1) looking along -Z axis
    // Spawn meteors in upper portion of view, moving downward/across

    const angle = Math.random() * Math.PI * 0.6 - Math.PI * 0.3; // -54° to +54° horizontal
    const heightAngle = Math.random() * Math.PI * 0.2 + Math.PI * 0.15; // Upper portion
    const distance = 60 + Math.random() * 30; // 60-90 units away

    this.startPos = new THREE.Vector3(
      distance * Math.sin(angle),
      distance * Math.sin(heightAngle),
      -distance * Math.cos(angle) // Negative Z = in front of camera
    );

    // Direction: diagonal downward across screen
    const horizontalDir = (Math.random() - 0.5) * 0.8; // Left or right
    const verticalDir = -(0.7 + Math.random() * 0.3); // Downward
    const depthDir = -0.2; // Slight toward camera

    this.direction = new THREE.Vector3(horizontalDir, verticalDir, depthDir).normalize();

    // Realistic meteor colors based on composition
    // 60% white/blue (very hot), 15% yellow (sodium), 15% green (magnesium), 10% orange/red (nitrogen/oxygen)
    const colorRoll = Math.random();
    if (colorRoll < 0.6) {
      // White/blue-white (very hot, fast meteors)
      this.color = new THREE.Color(0.95 + Math.random() * 0.05, 0.95 + Math.random() * 0.05, 1.0);
    } else if (colorRoll < 0.75) {
      // Yellow/golden (sodium)
      this.color = new THREE.Color(1.0, 0.9 + Math.random() * 0.1, 0.4 + Math.random() * 0.2);
    } else if (colorRoll < 0.9) {
      // Green (magnesium) - most striking
      this.color = new THREE.Color(0.3 + Math.random() * 0.2, 1.0, 0.3 + Math.random() * 0.3);
    } else {
      // Orange/red (atmospheric nitrogen/oxygen)
      this.color = new THREE.Color(1.0, 0.5 + Math.random() * 0.3, 0.2 + Math.random() * 0.2);
    }

    // Trail properties
    this.length = 20 + Math.random() * 30; // 20-50 units (reduced for smaller size)
    this.speed = 80 + Math.random() * 60; // 80-140 - faster
    this.opacity = 1.0;
    this.lifetime = 1.5 + Math.random() * 0.5; // 1.5-2 seconds

    // Random early dissipation (25% chance)
    this.earlyDissipation = Math.random() < 0.25;
    if (this.earlyDissipation) {
      // Fade out between 40-70% of normal lifetime
      this.lifetime *= (0.4 + Math.random() * 0.3);
    }

    this.age = 0;

    // Create trail with glow effect
    this.createTrail();
  }

  createTrail() {
    // Create continuous line trail using LineSegments
    const segments = 20; // Reduced from 32 for performance

    // LineSegments: each segment needs 2 points
    const positions = new Float32Array(segments * 2 * 3);
    const colors = new Float32Array(segments * 2 * 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5
    });

    this.trail = new THREE.LineSegments(geometry, material);
    this.segments = segments;

    // Small glow points for subtle halo effect
    const glowGeometry = new THREE.BufferGeometry();
    const glowPositions = new Float32Array((segments + 1) * 3);
    const glowColors = new Float32Array((segments + 1) * 3);
    glowGeometry.setAttribute('position', new THREE.BufferAttribute(glowPositions, 3));
    glowGeometry.setAttribute('color', new THREE.BufferAttribute(glowColors, 3));

    const glowMaterial = new THREE.PointsMaterial({
      size: 1.5, // Much smaller - just subtle glow
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: false
    });

    this.glow = new THREE.Points(glowGeometry, glowMaterial);

    // Group elements
    this.line = new THREE.Group();
    this.line.add(this.trail); // Main continuous line
    this.line.add(this.glow);  // Subtle glow
  }

  update(deltaTime) {
    this.age += deltaTime;

    // Move along direction
    this.startPos.add(this.direction.clone().multiplyScalar(this.speed * deltaTime));

    // Update line segments positions (creates connected trail)
    const positions = this.trail.geometry.attributes.position.array;
    const colors = this.trail.geometry.attributes.color.array;

    for (let i = 0; i < this.segments; i++) {
      const t1 = i / this.segments;
      const t2 = (i + 1) / this.segments;

      // Positions along trail
      const pos1 = this.startPos.clone().add(
        this.direction.clone().multiplyScalar(-this.length * t1)
      );
      const pos2 = this.startPos.clone().add(
        this.direction.clone().multiplyScalar(-this.length * t2)
      );

      // First point of segment
      positions[i * 6] = pos1.x;
      positions[i * 6 + 1] = pos1.y;
      positions[i * 6 + 2] = pos1.z;

      // Second point of segment
      positions[i * 6 + 3] = pos2.x;
      positions[i * 6 + 4] = pos2.y;
      positions[i * 6 + 5] = pos2.z;

      // Gradient color (bright head → dim tail)
      const brightness1 = Math.pow(1 - t1, 1.5); // Exponential falloff
      const brightness2 = Math.pow(1 - t2, 1.5);

      colors[i * 6] = this.color.r * brightness1;
      colors[i * 6 + 1] = this.color.g * brightness1;
      colors[i * 6 + 2] = this.color.b * brightness1;
      colors[i * 6 + 3] = this.color.r * brightness2;
      colors[i * 6 + 4] = this.color.g * brightness2;
      colors[i * 6 + 5] = this.color.b * brightness2;
    }

    this.trail.geometry.attributes.position.needsUpdate = true;
    this.trail.geometry.attributes.color.needsUpdate = true;

    // Update glow points
    const glowPositions = this.glow.geometry.attributes.position.array;
    const glowColors = this.glow.geometry.attributes.color.array;

    for (let i = 0; i <= this.segments; i++) {
      const t = i / this.segments;
      const pos = this.startPos.clone().add(
        this.direction.clone().multiplyScalar(-this.length * t)
      );

      glowPositions[i * 3] = pos.x;
      glowPositions[i * 3 + 1] = pos.y;
      glowPositions[i * 3 + 2] = pos.z;

      const brightness = Math.pow(1 - t, 1.5);
      glowColors[i * 3] = this.color.r * brightness;
      glowColors[i * 3 + 1] = this.color.g * brightness;
      glowColors[i * 3 + 2] = this.color.b * brightness;
    }

    this.glow.geometry.attributes.position.needsUpdate = true;
    this.glow.geometry.attributes.color.needsUpdate = true;

    // Fade out over lifetime with slower fade
    const fadeStart = 0.7; // Don't start fading until 70% through lifetime
    const fadeProgress = Math.max(0, (this.age / this.lifetime - fadeStart) / (1 - fadeStart));
    this.opacity = Math.max(0, 1.0 - fadeProgress);

    // Apply fade to both materials
    this.trail.material.opacity = this.opacity;
    this.glow.material.opacity = this.opacity * 0.6;

    return this.opacity > 0;
  }
}

// Update shooting stars system
function updateShootingStars(deltaTime) {
  // Update existing meteors
  shootingStars = shootingStars.filter(meteor => {
    const alive = meteor.update(deltaTime);
    if (!alive) {
      scene.remove(meteor.line);
      // Dispose of all geometries and materials
      meteor.trail.geometry.dispose();
      meteor.trail.material.dispose();
      meteor.glow.geometry.dispose();
      meteor.glow.material.dispose();
    }
    return alive;
  });

  // Spawn new meteor
  nextMeteorTime -= deltaTime;
  if (nextMeteorTime <= 0) {
    const meteor = new ShootingStar();
    scene.add(meteor.line);
    shootingStars.push(meteor);
    nextMeteorTime = 5 + Math.random() * 5; // 5-10 seconds for testing (was 30-60)
  }
}

// Nebulae data - famous visible nebulae at accurate celestial coordinates
const NEBULAE_DATA = [
  {
    name: 'Orion Nebula',
    ra: 5.5833, // hours (5h 35m)
    dec: -5.3833, // degrees (-5° 23')
    size: 12,
    color: new THREE.Color(0xff4466), // Red/pink emission
    opacity: 0.5,
    type: 'emission'
  },
  {
    name: 'Lagoon Nebula',
    ra: 18.0667, // hours (18h 4m)
    dec: -24.3833, // degrees (-24° 23')
    size: 8,
    color: new THREE.Color(0xff3355), // Deep red/pink
    opacity: 0.4,
    type: 'emission'
  },
  {
    name: 'Eagle Nebula',
    ra: 18.3167, // hours (18h 19m)
    dec: -13.8167, // degrees (-13° 49')
    size: 7,
    color: new THREE.Color(0xee6644), // Red/orange
    opacity: 0.35,
    type: 'emission'
  },
  {
    name: 'Trifid Nebula',
    ra: 18.0333, // hours (18h 2m)
    dec: -23.0333, // degrees (-23° 2')
    size: 6,
    color: new THREE.Color(0xcc66ff), // Pink/blue mix
    opacity: 0.35,
    type: 'emission'
  },
  {
    name: 'Andromeda Galaxy',
    ra: 0.7167, // hours (0h 43m)
    dec: 41.2667, // degrees (+41° 16')
    size: 14,
    color: new THREE.Color(0xaabbcc), // Pale blue/white
    opacity: 0.3,
    type: 'diffuse'
  }
];

// Simple 2D noise function for nebula texture
function noise2D(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

// Fractal brownian motion for cloud-like patterns
function fbm(x, y, octaves = 4) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency);
    frequency *= 2;
    amplitude *= 0.5;
  }

  return value;
}

// Create realistic procedural nebula texture
function createNebulaTexture(color, nebulaType = 'diffuse') {
  const canvas = document.createElement('canvas');
  const size = 512; // Higher resolution
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) / maxRadius;

      // Normalized coordinates for noise
      const nx = x / size;
      const ny = y / size;

      // Multiple layers of noise for cloud structure
      const noise1 = fbm(nx * 3, ny * 3, 5);
      const noise2 = fbm(nx * 6 + 10, ny * 6 + 10, 4);
      const noise3 = fbm(nx * 12 + 20, ny * 12 + 20, 3);

      // Combine noise layers
      let cloudDensity = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;

      // Apply radial falloff
      const radialFalloff = Math.max(0, 1 - Math.pow(dist, 1.5));

      // Create wispy, irregular edges
      const edgeNoise = fbm(nx * 8, ny * 8, 3);
      const irregularFalloff = Math.max(0, radialFalloff - (1 - edgeNoise) * 0.3);

      // Combine density with falloff
      let finalDensity = cloudDensity * irregularFalloff;

      // Add bright core for emission nebulae
      if (nebulaType === 'emission') {
        const coreBrightness = Math.exp(-dist * dist * 4) * 0.8;
        finalDensity = Math.max(finalDensity, coreBrightness);
      }

      // Clamp and enhance contrast
      finalDensity = Math.pow(Math.max(0, Math.min(1, finalDensity)), 0.8);

      // Apply color
      const idx = (y * size + x) * 4;
      data[idx] = Math.floor(color.r * 255 * (0.8 + finalDensity * 0.5));
      data[idx + 1] = Math.floor(color.g * 255 * (0.8 + finalDensity * 0.5));
      data[idx + 2] = Math.floor(color.b * 255 * (0.8 + finalDensity * 0.5));
      data[idx + 3] = Math.floor(finalDensity * 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Add slight blur for softer appearance
  ctx.filter = 'blur(1px)';
  ctx.drawImage(canvas, 0, 0);

  return new THREE.CanvasTexture(canvas);
}

// Create nebulae sprites
function createNebulae() {
  const nebulae = [];

  NEBULAE_DATA.forEach(nebula => {
    // Convert RA/Dec to 3D coordinates
    const raRad = (nebula.ra / 24.0) * 2 * Math.PI;
    const decRad = (nebula.dec * Math.PI) / 180;
    const radius = 100; // Same as star sphere

    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.cos(decRad) * Math.sin(raRad);
    const z = radius * Math.sin(decRad);

    // Create sprite with procedural texture
    const texture = createNebulaTexture(nebula.color, nebula.type);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: nebula.opacity,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false
    });

    const sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, z);
    sprite.scale.set(nebula.size, nebula.size, 1);

    // Add to stars group so it rotates with sky
    stars.add(sprite);
    nebulae.push(sprite);

    console.log(`Created ${nebula.name} at position (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}), size: ${nebula.size}, opacity: ${nebula.opacity}`);
  });

  console.log(`Created ${nebulae.length} nebulae total`);
  return nebulae;
}

// Initialize WebGL and create night sky
async function initWebGL() {
  if (isInitialized) return;

  if (!isWebGLSupported()) {
    console.log('WebGL not supported, night sky disabled');
    return;
  }

  try {
    // Load star data
    const response = await fetch('/assets/data/stars-compact.json');
    const data = await response.json();
    const allStars = data.stars;

    // Determine star count based on device
    const maxStars = getStarCount();
    const starData = allStars.slice(0, Math.min(maxStars, allStars.length));
    const starCount = starData.length;

    console.log(`Initializing night sky with ${starCount} stars`);
    console.log('Star data loaded:', { totalStars: allStars.length, using: starCount });

    // Setup Three.js scene
    scene = new THREE.Scene();

    // Camera setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1); // Slight offset from origin

    // Renderer setup
    const canvas = document.getElementById('night-sky-canvas');
    if (!canvas) {
      console.error('Night sky canvas not found');
      return;
    }

    // Safari compatibility: Try WebGL2 first, fall back to WebGL1
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not available in this browser');
      return;
    }
    console.log('WebGL context type:', gl instanceof WebGL2RenderingContext ? 'WebGL2' : 'WebGL1');

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      context: gl,
      alpha: true,
      antialias: false, // Disabled for performance
      premultipliedAlpha: false
    });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(width, height);

    // Safari fix: devicePixelRatio handling
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);

    console.log('WebGL renderer created:', { width, height, pixelRatio, userAgent: navigator.userAgent });

    // Create particle system
    const geometry = new THREE.BufferGeometry();

    // Prepare attribute arrays
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const brightness = new Float32Array(starCount);
    const twinkleSpeed = new Float32Array(starCount);
    const twinklePhase = new Float32Array(starCount);
    const milkyWayIntensity = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3); // RGB per star

    // Populate buffers from star data
    for (let i = 0; i < starCount; i++) {
      const star = starData[i];

      // Position
      positions[i * 3] = star.x;
      positions[i * 3 + 1] = star.y;
      positions[i * 3 + 2] = star.z;

      // Size from magnitude (brighter stars = larger)
      // Magnitude scale: lower magnitude = brighter
      // Increased size multiplier for better visibility
      sizes[i] = 1.0 + (6.0 - star.mag) * 0.5;

      // Brightness from magnitude
      brightness[i] = Math.max(0.3, 1.0 - star.mag / 6.0);

      // Random twinkle parameters for natural variation
      twinkleSpeed[i] = 0.5 + Math.random() * 1.5; // 0.5-2.0 Hz
      twinklePhase[i] = Math.random() * Math.PI * 2; // 0-2π

      // Milky Way intensity (pre-calculated in star data)
      milkyWayIntensity[i] = star.milkyWay || 1.0;

      // Color based on spectral type or magnitude
      let starColor;
      if (STAR_SPECTRAL_COLORS[star.id]) {
        starColor = STAR_SPECTRAL_COLORS[star.id];
      } else {
        starColor = getMagnitudeBasedColor(star.mag);
      }

      colors[i * 3] = starColor.r;
      colors[i * 3 + 1] = starColor.g;
      colors[i * 3 + 2] = starColor.b;
    }

    // Set geometry attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('brightness', new THREE.BufferAttribute(brightness, 1));
    geometry.setAttribute('twinkleSpeed', new THREE.BufferAttribute(twinkleSpeed, 1));
    geometry.setAttribute('twinklePhase', new THREE.BufferAttribute(twinklePhase, 1));
    geometry.setAttribute('milkyWayIntensity', new THREE.BufferAttribute(milkyWayIntensity, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create shader material
    starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRotation: { value: 0 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending, // Realistic star glow
      depthWrite: false,
      depthTest: true
    });

    // Check for shader compilation errors (Safari specific)
    const program = starMaterial.program;
    if (program) {
      console.log('Shader program compiled successfully');
    }

    // Create points object and add to scene
    stars = new THREE.Points(geometry, starMaterial);
    scene.add(stars);

    console.log('Star system created:', {
      starCount,
      geometryVertices: geometry.attributes.position.count,
      materialType: starMaterial.type
    });

    isInitialized = true;
    needsFadeIn = true; // Set flag for fade-in after first render

    // Create star labels (wait for font to load)
    await createStarLabels(starData);

    // Create nebulae
    createNebulae();

    // Start animation loop
    animate();

    console.log('Night sky initialized successfully - animation loop started');
  } catch (error) {
    console.error('Failed to initialize night sky:', error);
  }
}

// Create text sprite for Three.js labels
function createTextSprite(text, fontSize = 10) {
  // Create canvas for text rendering
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Check if Fragment Mono is loaded, otherwise use Courier New
  const fontFamily = document.fonts.check(`${fontSize}px Fragment Mono`) ? 'Fragment Mono' : 'Courier New';

  // Font settings
  context.font = `${fontSize}px ${fontFamily}, monospace`;
  const metrics = context.measureText(text);
  const textWidth = metrics.width;

  // Set canvas size with padding
  canvas.width = textWidth + 20;
  canvas.height = fontSize + 10;

  // Draw text with styling
  context.font = `${fontSize}px ${fontFamily}, monospace`;
  context.fillStyle = 'rgba(200, 200, 200, 0.8)';
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.shadowColor = 'rgba(0, 0, 0, 0.9)';
  context.shadowBlur = 3;
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  // Create sprite material
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
    depthTest: true,
    depthWrite: false,
    sizeAttenuation: false  // Disable perspective scaling - all labels same size
  });

  // Create sprite
  const sprite = new THREE.Sprite(material);

  // Scale sprite based on text size
  // Smaller scale since sizeAttenuation is disabled (no perspective scaling)
  const scale = 0.025;
  sprite.scale.set(
    (canvas.width / canvas.height) * scale,
    scale,
    1
  );

  return sprite;
}

// Create Three.js sprite labels for named stars
async function createStarLabels(starData) {
  // Wait for Fragment Mono font to load
  try {
    await document.fonts.load('14px Fragment Mono');
    console.log('Fragment Mono font loaded');
  } catch (error) {
    console.warn('Fragment Mono font failed to load, using fallback');
  }

  // Create label sprites for named stars
  starData.forEach((star) => {
    if (STAR_NAMES[star.id]) {
      const sprite = createTextSprite(STAR_NAMES[star.id].toUpperCase(), 14); // Uppercase, larger font

      // Get star position as Vector3
      const starPos = new THREE.Vector3(star.x, star.y, star.z);

      // Calculate star size using same formula as star initialization
      const starSize = 1.0 + (6.0 - star.mag) * 0.5;
      const offset = (2 + starSize * 0.8) * 0.5;  // Half the original distance

      // Test if label below star would be visible
      // Project to screen coordinates (normalized device coordinates: -1 to 1)
      const testPosBelow = new THREE.Vector3(starPos.x, starPos.y - offset, starPos.z);
      const projectedBelow = testPosBelow.clone().project(camera);

      // If below position is off-screen (y < -1 means off bottom), position above instead
      const yOffset = projectedBelow.y < -1 ? offset : -offset;

      const labelPos = new THREE.Vector3(
        starPos.x,
        starPos.y + yOffset,  // Below or above based on visibility
        starPos.z
      );

      sprite.position.copy(labelPos);

      // Add to stars group so they rotate together
      stars.add(sprite);

      labelSprites.push({
        sprite: sprite,
        starName: STAR_NAMES[star.id]
      });
    }
  });

  console.log(`Created ${labelSprites.length} label sprites`);

  // Fade in labels after 3 seconds
  setTimeout(() => {
    labelSprites.forEach(({ sprite }) => {
      sprite.material.opacity = 0.8;
      sprite.material.needsUpdate = true;
    });
    console.log('Label sprites faded in');
  }, 3000);
}


// Animation loop
function animate() {
  requestAnimationFrame(animate);

  const theme = document.documentElement.getAttribute('data-theme');

  if (theme === 'dark' && !animationPaused && isInitialized) {
    // Calculate delta time for smooth animation
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastFrameTime) / 1000; // Convert to seconds
    lastFrameTime = currentTime;

    // Update rotation
    rotationAngle += ROTATION_SPEED;

    // Update shader uniforms
    starMaterial.uniforms.uTime.value = performance.now() * 0.001; // Convert to seconds

    // Rotate the stars object instead of using shader rotation
    // This makes both stars and sprite labels rotate together
    // Negate to match the original shader rotation direction
    stars.rotation.y = -rotationAngle;
    starMaterial.uniforms.uRotation.value = 0; // Disable shader rotation

    // Update shooting stars
    updateShootingStars(deltaTime);

    // Render
    renderer.render(scene, camera);

    // Fade in canvas after first render
    if (needsFadeIn) {
      needsFadeIn = false;
      const canvas = document.getElementById('night-sky-canvas');
      if (canvas) {
        canvas.style.opacity = '0';
        canvas.offsetHeight; // Force reflow
        requestAnimationFrame(() => {
          canvas.style.opacity = '1';
          console.log('Canvas faded in after first render');
        });
      }
    }
  }
}

// Handle window resize
function handleResize() {
  if (!isInitialized) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// Theme change handler
function handleThemeChange() {
  const theme = document.documentElement.getAttribute('data-theme');
  const canvas = document.getElementById('night-sky-canvas');

  console.log('Theme changed to:', theme);

  if (theme === 'dark') {
    // Ensure canvas starts invisible
    if (canvas) {
      canvas.style.opacity = '0';
    }

    if (!isInitialized) {
      // Initialize WebGL if not already done
      console.log('Initializing WebGL on theme toggle...');
      initWebGL(); // Will trigger fade-in after first render
    } else {
      // Resume animation if paused
      console.log('Resuming animation');
      animationPaused = false;
      needsFadeIn = true; // Trigger fade-in on next render

      // Safari fix: Force canvas refresh by resizing renderer
      if (renderer && camera) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        console.log('Forced canvas refresh for Safari');
      }
    }
  } else {
    // Light theme: fade out and pause
    console.log('Switching to light theme, pausing animation');
    if (canvas) {
      canvas.style.opacity = '0';
    }
    animationPaused = true;
  }
}

// Initialize theme observer
function initThemeObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        handleThemeChange();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const initialTheme = document.documentElement.getAttribute('data-theme');

  // Only initialize if starting in dark theme
  // Deferred slightly to allow page load animation to complete
  if (initialTheme === 'dark') {
    setTimeout(() => {
      initWebGL();
    }, 500);
  }

  // Setup theme observer
  initThemeObserver();

  // Setup resize handler
  window.addEventListener('resize', handleResize);
});
