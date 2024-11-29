varying vec2 vUv;
varying float vColorRandom;
varying float vNoise;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

void main() {
    // Keep the original smooth circle calculation
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(-0.2, 0.5, dist);
    
    // Revert to original color selection logic but more optimized
    vec3 finalColor = uColor1;
    
    // Adjust color mixing thresholds to match original
    if(vColorRandom > 0.99 && vColorRandom < 0.66) {
        finalColor = uColor2;
    } else if(vColorRandom > 0.66) {
        finalColor = uColor3;
    }

    // Reduce noise influence
    finalColor += vNoise * 0.05; // Reduced from 0.1 to 0.05
    
    // Adjust mobile rendering without over-brightening
    #ifdef IS_MOBILE
        alpha *= 0.9; // Less transparency reduction
        // Remove the brightness increase
    #endif

    gl_FragColor = vec4(finalColor, alpha * 0.8); // Added overall opacity adjustment
}
