varying vec2 vertexUV;
varying vec3 vertexNormal;
uniform sampler2D imgTexture;

void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0, 0, 1));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    gl_FragColor = vec4(atmosphere + texture2D(imgTexture, vertexUV).xyz, 1.0);
    // gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);

}