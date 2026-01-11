export const fragmentShader = `
precision highp float;

// From vertex shader
varying float vBrightness;
varying float vTwinkleSpeed;
varying float vTwinklePhase;
varying float vMilkyWayIntensity;
varying vec3 vColor;

// Uniforms
uniform float uTime;

void main() {
    vec2 coords = gl_PointCoord - vec2(0.5);
    float dist = length(coords);

    // Discard pixels too far out
    if (dist > 0.5) discard;

    // Three-layer soft glow system (no spikes)
    // 1. Bright core (tight)
    float core = smoothstep(0.35, 0.0, dist);

    // 2. Medium glow (soft halo)
    float midGlow = smoothstep(0.5, 0.15, dist) * 0.7;

    // 3. Outer glow (very soft)
    float outerGlow = smoothstep(0.5, 0.0, dist) * 0.3;

    // Combine glow layers
    float finalAlpha = max(core, max(midGlow, outerGlow));

    // Twinkling effect
    float twinkle = 0.5 + 0.5 * sin(uTime * vTwinkleSpeed + vTwinklePhase);
    float finalBrightness = vBrightness * (0.7 + 0.3 * twinkle);
    finalBrightness *= vMilkyWayIntensity;

    // Star color with brightness
    vec3 starColor = vColor * finalBrightness;

    // Add extra glow boost to alpha for softer appearance
    float glowBoost = 1.0 + vBrightness * 0.5;

    // Output
    gl_FragColor = vec4(starColor, finalAlpha * finalBrightness * glowBoost);
}
`;
