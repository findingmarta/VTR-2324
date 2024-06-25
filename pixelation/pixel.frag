#version 330

// uniforms
uniform sampler2D tex;
uniform int pixelSize;

// interpolated input
in vec2 texCoord;

// outputs
out vec4 colorOut;

void main(void) {
  // Calculate the texel size
  vec2 texSize = textureSize(tex, 0);
  vec2 texelSize = 1.0 / texSize;

  // Calculate the pixelated coordinates
  vec2 pixelCoord = texCoord * texSize;
  pixelCoord = floor(pixelCoord / pixelSize) * pixelSize;

  // Convert back to normalized texture coordinates
  vec2 pixelatedTexCoord = pixelCoord * texelSize;

  // Sample the texture at the pixelated coordinates
  colorOut = texture(tex, pixelatedTexCoord);
}


