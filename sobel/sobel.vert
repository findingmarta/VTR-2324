#version 460
 
uniform mat4 m_pvm;
 
in vec4 position;
in vec2 texCoord0;
 
out vec2 texCoordV;
 
void main() {
 
    texCoordV = texCoord0;
    gl_Position = m_pvm * position;
}