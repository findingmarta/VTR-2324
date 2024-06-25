#version 330

// in
in vec3 gNormal; // Normal in camera coords.
in vec3 gLightDir;
flat in int gIsEdge; // Whether or not we're drawing an edge

// uniforms
uniform vec4 lineColor;
uniform int num_shades;

// out
out vec4 colorOut;

vec3 toonShade(){
	float intensity;
	vec3 l, n;
	
	n = normalize(gNormal);
	intensity = max(dot(gLightDir,n),0.0);
	
    vec3 diffuse = vec3(0.0, 1.0, 0.0);
    vec3 outputF = diffuse;

    // Toon shading
    // Given the number of shades, we can calculate the intensity of the light
    intensity = floor(intensity * num_shades) / num_shades;
    outputF = intensity * diffuse;

    return outputF;
}

void main(){
    if(gIsEdge == 1){
        colorOut = lineColor;
    }
    else{
        colorOut = vec4(toonShade(), 1.0);
    }
}