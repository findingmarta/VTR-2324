#version 460

in vec2 TexCoord;
out vec4 FragColor;

uniform sampler2D bufferTexture;
uniform sampler2D paperTexture;

void main()
{
    vec4 bufferColor = texture(bufferTexture, TexCoord);
    vec4 paperColor = texture(paperTexture, TexCoord);

    // Simple watercolor effect combining buffer and paper textures
    FragColor = mix(bufferColor, paperColor, 0.5);
}
