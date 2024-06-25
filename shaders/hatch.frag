
#version 460

// uniforms
uniform sampler2D tex; 
uniform sampler2D hatch0;
uniform sampler2D hatch1;
uniform sampler2D hatch2;
uniform sampler2D hatch3;
uniform sampler2D hatch4;
uniform sampler2D hatch5;

uniform vec4 ldir;
uniform mat4 m_view;


// interpolated inputs
in vec2 tc;
in vec3 n;

// output
out vec4 color;

float f(float intensity, float i, float shades){
    return (6. * (intensity - (i * shades)));
}

void main() {
    vec4 c;
    vec3 normal = normalize(n);
    vec3 ld = normalize(vec3(m_view * -ldir));
    float intensity = max(dot(normal,ld), 0.0);
    
    vec4 h0 = texture(hatch0,tc);
    vec4 h1 = texture(hatch1,tc);
    vec4 h2 = texture(hatch2,tc);
    vec4 h3 = texture(hatch3,tc);
    vec4 h4 = texture(hatch4,tc);
    vec4 h5 = texture(hatch5,tc);

    float shades = 1./6.; 
    if(intensity <= shades){
        c = mix(h5,h4,f(intensity,0.,shades));
    } else if(intensity <= 2*shades){
        c = mix(h4,h3,f(intensity,1.,shades));
    } else if(intensity <= 3*shades){
        c = mix(h3,h2,f(intensity,2.,shades));
    } else if(intensity <= 4*shades){
        c = mix(h2,h1,f(intensity,3.,shades));
    } else if(intensity <= 5*shades){
        c = mix(h1,h0,f(intensity,4.,shades));
    }else if(intensity <= 6*shades){
        c = mix(h0,vec4(1.),f(intensity,5.,shades));
    }

    color = vec4( c.rgb, 1. );
}