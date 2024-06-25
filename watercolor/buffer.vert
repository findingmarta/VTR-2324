#version 460

layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec2 inTexCoord;

out vec2 TexCoord;

uniform mat4 m_pvm;

void main()
{
    gl_Position = m_pvm * vec4(inPosition, 1.0);
    TexCoord = inTexCoord;
}
