#version 460

// uniforms
uniform mat4 m_pvm;
uniform mat3 m_normal;
uniform mat4 m_view;
uniform mat4 m_viewModel;
uniform vec4 ldir;

// input streams
in vec4 position;
in vec3 normal;

// output
out vec3 n;
out vec3 e;
out vec3 l;

void main() {

    // passar normal para espaço camêra
    n = normalize(m_normal * normal);
    e = -vec3(m_viewModel * position);
    // passar a direção da luz de global space para camera space
    l = vec3(m_view * -ldir);
    gl_Position = m_pvm * position;
}