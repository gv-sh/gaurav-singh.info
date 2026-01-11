export const vertexShader = `
precision highp float;

// Attributes (per-vertex data from BufferGeometry)
attribute float size;
attribute float brightness;
attribute float twinkleSpeed;
attribute float twinklePhase;
attribute float milkyWayIntensity;
attribute vec3 color;

// Varyings (passed to fragment shader)
varying float vBrightness;
varying float vTwinkleSpeed;
varying float vTwinklePhase;
varying float vMilkyWayIntensity;
varying vec3 vColor;

// Uniforms (global data)
uniform float uTime;
uniform float uRotation;

void main() {
    // Pass attributes to fragment shader
    vBrightness = brightness;
    vTwinkleSpeed = twinkleSpeed;
    vTwinklePhase = twinklePhase;
    vMilkyWayIntensity = milkyWayIntensity;
    vColor = color;

    // Apply Earth rotation around Y-axis
    float angle = uRotation;
    mat3 rotationMatrix = mat3(
        cos(angle), 0.0, sin(angle),
        0.0, 1.0, 0.0,
        -sin(angle), 0.0, cos(angle)
    );
    vec3 rotatedPosition = rotationMatrix * position;

    // Transform to screen space
    vec4 mvPosition = modelViewMatrix * vec4(rotatedPosition, 1.0);

    // Point size with distance attenuation
    // Closer stars appear larger
    // Increased multiplier for better visibility
    gl_PointSize = size * (500.0 / -mvPosition.z);

    // Final position
    gl_Position = projectionMatrix * mvPosition;
}
`;
