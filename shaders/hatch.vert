#version 460

// uniforms
uniform mat4 m_pvm;
uniform mat3 m_normal;

// input streams
in vec4 position;
in vec2 texCoord0;
in vec3 normal;

// output
out vec2 tc;
out vec3 n;

void main() {
    // vai disponibilizar a coordenada de textura para o fragment shader
    tc = texCoord0; 
    n = normalize(m_normal * normal);
    gl_Position = m_pvm * position;
}