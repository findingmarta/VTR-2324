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

  	// vec2 texSize  = textureSize(tex, 0).xy;
    

  	// float x = int(gl_FragCoord.x) % pixelSize;
  	// float y = int(gl_FragCoord.y) % pixelSize;

    // x = floor(pixelSize / 2.0) - x;
    // y = floor(pixelSize / 2.0) - y;

    // x = gl_FragCoord.x + x;
    // y = gl_FragCoord.y + y;

  	// vec2 uv = vec2(x, y) / texSize;
	// colorOut = texture(tex, texCoord + uv);