/** Particle shaders (BUILD_SPEC §6.3). Colours are passed in sRGB and written as-is. */
export const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uNoise;
  uniform float uWave;
  uniform float uPointSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uMouseStrength;

  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aSeed;

  varying float vDepth;
  varying float vSeed;

  float easeInOutCubic(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }

  void main() {
    float p = easeInOutCubic(clamp(uProgress, 0.0, 1.0));
    vec3 pos = mix(aFrom, aTo, p);

    float s = aSeed * 6.2831853;
    vec3 drift = vec3(
      sin(uTime * 0.55 + s + pos.y * 2.7),
      cos(uTime * 0.47 + s * 1.31 + pos.z * 2.3),
      sin(uTime * 0.61 + s * 0.73 + pos.x * 2.9)
    );
    pos += drift * uNoise;
    pos.y += uWave * (sin(pos.x * 2.6 + uTime * 1.1) * 0.14 + sin(pos.z * 3.4 + uTime * 0.8) * 0.09);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec4 clip = projectionMatrix * mv;

    // gentle repel around the cursor (screen space)
    vec2 ndc = clip.xy / clip.w;
    vec2 d = ndc - uMouse;
    float dist = length(d);
    float push = uMouseStrength * smoothstep(0.3, 0.0, dist);
    clip.xy += normalize(d + vec2(1e-5)) * push * 0.1 * clip.w;

    gl_Position = clip;
    gl_PointSize = uPointSize * (0.55 + aSeed * 0.9) * uPixelRatio * (3.0 / -mv.z);
    vDepth = clamp((pos.z + 1.2) / 2.4, 0.0, 1.0);
    vSeed = aSeed;
  }
`;

export const particleFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uSparkle;
  uniform float uOpacity;
  uniform float uTime;

  varying float vDepth;
  varying float vSeed;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.08, d);
    vec3 col = mix(uColorA, uColorB, vDepth);
    // ~3% of points sparkle gold
    float sparkle = step(0.97, vSeed);
    float twinkle = 0.55 + 0.45 * sin(uTime * 2.2 + vSeed * 40.0);
    col = mix(col, uSparkle, sparkle);
    alpha *= mix(0.35 + 0.65 * vDepth, twinkle, sparkle);
    gl_FragColor = vec4(col, alpha * uOpacity);
  }
`;
