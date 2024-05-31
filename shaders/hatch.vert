#version 460

// uniforms
uniform mat4 m_pvm;
uniform mat3 m_normal;
uniform mat4 m_viewModel;

// input streams
in vec4 position;
in vec2 texCoord0;
in vec3 normal;

// output
out vec2 tc;
out vec3 n;
out vec3 e; 

void main() {
    // vai disponibilizar a coordenada de textura para o fragment shader
    tc = texCoord0; 
    n = normalize(m_normal * normal);
    e = -vec3(m_viewModel * position);
    gl_Position = m_pvm * position;
}