/*#version 460

// uniforms
uniform sampler2D tex, hatch0, hatch1, hatch2, hatch3, hatch4, hatch5, hatch6; 

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


}*/
#version 460

// uniforms
uniform sampler2D tex, hatch0, hatch1, hatch2, hatch3, hatch4, hatch5, hatch6; 
uniform vec4 ldir;
uniform mat4 m_view;

uniform int div = 5;
uniform float width = 0.5;
uniform float gap = 0.1; // diminuir o gap para haver menos desfoque
uniform float factor = 0.5;


// interpolated inputs
in vec2 tc;
in vec3 n;
in vec3 e; 

// output
out vec4 color;

void main() {

    vec3 normal = normalize(n);
    vec3 l = normalize(vec3(m_view - ldir));
    float intensity = max(dot(normal,l), 0.0);
    
    vec4 h0 = texture(hatch0,texCoord);
    vec4 h1 = texture(hatch1,texCoord);
    vec4 h2 = texture(hatch2,texCoord);
    vec4 h3 = texture(hatch3,texCoord);
    vec4 h4 = texture(hatch4,texCoord);
    vec4 h5 = texture(hatch5,texCoord);
    vec4 h6 = texture(hatch6,texCoord);

    float shades = 1/7;

    vec2 deriv = vec2(dFdx(tc.s*div), dFdy(tc.s*div)); 
    float len = length(deriv); // comprimento do vetor

    float actualGap = len * factor;
    f = smoothstep(width-actualGap, width, fr.s) - smoothstep(1-actualGap, 1, fr.s);

    if(intensity < shades){
        color = mix(h6,h5,f);
    } else if(intensity < 2*shades){
        color = mix(h5,h4,f);
    } else if(intensity < 3*shades){
        color = mix(h4,h3,f);
    } else if(intensity < 4*shades){
        color = mix(h3,h2,f);
    } else if(intensity < 5*shades){
        color = mix(h2,h1,f);
    } else if(intensity < 6*shades){
        color = mix(h1,h0,f);
    } else{
        color = h0;
    }
}