#version 460

// uniforms
uniform mat4 m_pvm;
uniform mat3 m_normal;
uniform mat4 m_viewModel;
uniform mat4 m_view;
uniform vec4 l_posicao;

// input streams - local space
in vec4 position;
in vec3 normal;

//output
out vec3 n; // normal in camera space
out vec3 e, light_dir;


void main() {
    // Put all the vectors in the same space (camera space)
    //vec4 pos = m_viewModel * position;
    //vec4 l_pos = m_view * l_posicao;
    // Calcular direção da luz
    //light_dir = vec3(l_pos - pos);
    
    n = normalize(m_normal * normal);
    e = -vec3(m_viewModel * position);
    gl_Position = m_pvm * position;
}