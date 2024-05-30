#version 460

//uniform
uniform vec4 diffuse;
uniform vec4 specular;
uniform vec4 l_dir; // world space
uniform mat4 m_view;
uniform float shininess = 128.0;

// input
in vec3 n;
in vec3 e, light_dir;

// output
out vec4 color;

void main() {
    vec3 nn = normalize(n); // camera space

    vec3 ne = normalize(e);

    // Put all the vectors in the same space (camera space)
    //vec3 ld = normalize(vec3(m_view * -light_dir)); // - para ser a direção para a luz e não da luz
    vec3 ld = normalize(light_dir);
    
    float intensity = max(dot(nn,ld),0.0);

    // Calcular a especular
    vec4 specInt = vec4(0.0);
    if (intensity > 0) {
        vec3 h = normalize(ld + ne);
        float cos_alfa = max(dot(h,nn),0.0);
        specInt = specular * pow(cos_alfa,shininess);
    }

    if (intensity > 0.95) {
        intensity = 1.0;
    } else if (intensity > 0.75) {
        intensity = 0.75;
    } 
    else if (intensity > 0.5) {
        intensity = 0.50;
    } else if (intensity > 0.25) {
        intensity = 0.25;
    } else {
        intensity = 0.1;
    }

    color = intensity * diffuse + specInt;
}