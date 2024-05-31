#version 460

// uniforms
uniform mat4 m_pvm;
uniform mat3 m_normal;
uniform mat4 m_viewModel;

// input streams - local space
in vec4 position;
in vec3 normal;

//output
out vec3 n; 
out vec3 e;


void main() {    
    // normal in camera space
    n = normalize(m_normal * normal);
    e = -vec3(m_viewModel * position);
    gl_Position = m_pvm * position;
}