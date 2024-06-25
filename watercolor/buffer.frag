#version 460

in vec2 TexCoord;
out vec4 FragColor;

void main()
{
    FragColor = vec4(TexCoord, 0.0, 1.0); // Simple texture coordinate visualization
}
