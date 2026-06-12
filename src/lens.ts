import type { IUniform } from 'three';

interface LensShaderDef {
  uniforms: Record<string, IUniform>;
  vertexShader: string;
  fragmentShader: string;
}

/**
 * Full-screen "optic" pass: subtle barrel distortion, chromatic
 * aberration that grows toward the edges, a progressive radial blur,
 * a heavy corner vignette (the binocular look) and fine film grain.
 */
export const LensShader: LensShaderDef = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uDistortion: { value: 0.12 },
    uAberration: { value: 0.002 },
    uBlurStrength: { value: 0.012 },
    uVignetteStart: { value: 0.7 },
    uVignetteEnd: { value: 1.36 },
    uGrain: { value: 0.016 },
  },

  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uDistortion;
    uniform float uAberration;
    uniform float uBlurStrength;
    uniform float uVignetteStart;
    uniform float uVignetteEnd;
    uniform float uGrain;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      float r2 = dot(p, p);

      // barrel distortion, renormalized so the frame stays filled
      vec2 q = p * (1.0 + uDistortion * r2) / (1.0 + uDistortion);
      vec2 uv = q * 0.5 + 0.5;

      float r = length(p);
      float edge = smoothstep(0.55, 1.32, r);

      // radial blur + chromatic split, both growing with the radius
      vec2 dir = r > 0.0001 ? p / r : vec2(0.0);
      float blur = uBlurStrength * edge;
      float ca = uAberration * r2;

      vec3 col = vec3(0.0);
      float total = 0.0;
      for (int i = 0; i < 6; i++) {
        float t = (float(i) / 5.0 - 0.5) * 2.0;
        float w = 1.0 - abs(t) * 0.55;
        vec2 offset = dir * blur * t;
        col.r += texture2D(tDiffuse, uv + offset + dir * ca).r * w;
        col.g += texture2D(tDiffuse, uv + offset).g * w;
        col.b += texture2D(tDiffuse, uv + offset - dir * ca).b * w;
        total += w;
      }
      col /= total;

      // binocular vignette — corners sink into a warm near-black umbra
      // (values are linear-space; keep them tiny or sRGB output washes them out)
      float vig = 1.0 - smoothstep(uVignetteStart, uVignetteEnd, r);
      col = mix(vec3(0.0045, 0.0032, 0.0022), col, vig);

      // candlelight warmth
      col *= vec3(1.02, 1.0, 0.955);

      // fine animated grain, scaled by local luminance so dark areas stay dark
      float g = hash(vUv * vec2(1920.0, 1080.0) + fract(uTime) * 100.0) - 0.5;
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      col += g * uGrain * (0.25 + 0.75 * edge) * (0.25 + 2.0 * lum);

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};
