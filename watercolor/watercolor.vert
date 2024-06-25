#version 460

layout(location = 0) in vec3 inPosition;   // Position attribute
layout(location = 1) in vec2 inTexCoord; // Texture coordinate attribute

out vec2 TexCoord;

void main() {
    gl_Position = vec4(inPosition, 1.0);
    TexCoord = inTexCoord;
}
