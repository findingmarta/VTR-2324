#version 460

//uniforms
uniform vec4 diffuse;
uniform vec4 specular;
uniform vec4 l_dir; // world space
uniform mat4 m_view;
uniform float shininess = 128.0;
uniform int num_shades;

uniform float blue_b;
uniform float yellow_rg;
uniform float alpha;
uniform float beta;

// input
in vec3 n;
in vec3 e;
in vec3 l;

// output
out vec4 color;

void main() {

    vec4 blue = vec4(0,0,blue_b,1.0);
    vec4 yellow = vec4(yellow_rg,yellow_rg,0,1.0);

    
    vec3 nn = normalize(n); 
    vec3 ne = normalize(e);
    vec3 ld = normalize(l); // - para ser a direção para a luz e não da luz
  
    float intensity = max(dot(ld,nn),0.0);

    // Calcula a cor a aplicar sendo esta uma mistura da cor difusa e azul
    vec4 coldColor = blue + alpha * diffuse;

    // Calcula a cor a aplicar sendo esta uma mistura da cor difusa e amarelo
    vec4 warmColor = yellow + beta * diffuse;

    // os valor de dot(nn,ld) estão no intervalo [-1,1] e aux passa-os para o intervalo [0,1]
    float aux = (1.0 + dot(ld,nn))/2.0;

    // calcula a cor sem a componente especular sendo esta cor uma junção da cor fria e da cor quente
    vec3 cwmix = aux*warmColor.rgb + (1.0-aux)*coldColor.rgb;

    // Calcular a especular
    vec4 specInt = vec4(0.0);
    if (intensity > 0) {
        vec3 h = normalize(ld + ne);
        float cos_alfa = max(dot(h,nn),0.0);
        specInt = specular * pow(cos_alfa,shininess);
    }
    //calculo da cor com que já tem em conta a especular
    color = vec4(cwmix,1) + specInt;
}