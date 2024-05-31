#version 460

//uniforms
uniform vec4 diffuse;
uniform vec4 specular;
uniform vec4 l_dir; // world space
uniform mat4 m_view;
uniform float shininess = 128.0;
uniform int num_shades;

// input
in vec3 n;
in vec3 e;

// output
out vec4 color;

void main() {
    // camera space
    vec3 nn = normalize(n); 
    vec3 ne = normalize(e);

    // Put all the vectors in the same space (camera space)
    vec3 ld = normalize(vec3(m_view * -l_dir)); // - para ser a direção para a luz e não da luz
    
    float intensity = max(dot(nn,ld),0.0);

    // Calcular a especular
    vec4 specInt = vec4(0.0);
    if (intensity > 0) {
        vec3 h = normalize(ld + ne);
        float cos_alfa = max(dot(h,nn),0.0);
        specInt = specular * pow(cos_alfa,shininess);
    }

    // Toon shading
    // Given the number of shades, we can calculate the intensity of the light
    intensity = floor(intensity * num_shades) / num_shades;

    color = intensity * diffuse + specInt;
}