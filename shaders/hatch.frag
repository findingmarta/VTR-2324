#version 460

// uniforms
uniform sampler2D tex; 

uniform int div = 5;
uniform float width = 0.5;
uniform float gap = 0.1; // diminuir o gap para haver menos desfoque
uniform float factor = 0.5;

uniform vec4 diffuse = vec4(0.3,0.3,0.6,0);
uniform vec4 secondary_diffuse = vec4(0.5,0.5,0.5,0);

// interpolated inputs
in vec2 tc;

// output
out vec4 color;

void main() {
    vec2 fr = fract(tc * div); // coordenada s (tc.s); fract dá a parte fracionária
    float f;

    // Transição suave
    if (fr.s < width-gap){
        color = diffuse;
    }
    else if (fr.s < width){
        f = fr.s - (width-gap);
        f = f/gap;
        color = mix(diffuse, secondary_diffuse, f);
    }
    else if (fr.s < 1-gap){
        color = secondary_diffuse;
    }
    else {
        f = fr.s - (1-gap);
        f = f/gap;
        color = mix(secondary_diffuse, diffuse, f); // cor de onde parti para a cor para onde vou e o f
    }

    // Transição mais suave ainda
    f = smoothstep(width-gap, width, fr.s) - smoothstep(1-gap, 1, fr.s);
    color = mix(diffuse, secondary_diffuse, f);


    //experimentar com a textura que é uma linha
    //color = texture(tex, tc*div); 
    f = texture(tex, tc*div).r; // r é a primeira componente da textura
    color = mix(diffuse, secondary_diffuse, f); // cor definida por uma função f




    // Transição mais suave aindaaaaaaaa (derivadas)
    vec2 deriv = vec2(dFdx(tc.s*div), dFdy(tc.s*div)); 
    float len = length(deriv); // comprimento do vetor

    float actualGap = len * factor;
    f = smoothstep(width-actualGap, width, fr.s) - smoothstep(1-actualGap, 1, fr.s);
    color = mix(diffuse, secondary_diffuse, f);


}