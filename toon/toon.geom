#version 330

layout(triangles_adjacency) in;
layout (triangle_strip, max_vertices=15) out;

// in
in vec3 vNormal[];      // Normal in camera coords.
in vec3 vLightDir[];

// uniforms
uniform float edgeOverdraw; // percentage to extend the quads beyond the edge
uniform float edgeWidth;    // width of the silhouette edge in clip coords.
// uniform int normalThreshold;

// out
out vec3 gNormal;
out vec3 gLightDir;
flat out int gIsEdge;

// takes three triangle corners (in screen space), returning true for front-facing triangles
// if z coordinate of normal vector is positive
bool isFrontFacing(vec3 a, vec3 b, vec3 c){
    //float threshold  = 0.0;
    float threshold = -0.000001;
    
    return (((a.x * b.y - b.x * a.y) +
            (b.x * c.y - c.x * b.y) +
            (c.x * a.y - a.x * c.y)) > threshold);
}

// emits quad between two points (edge)
void emitEdgeQuad(vec3 p1, vec3 p2){
    vec2 ext = edgeOverdraw * (p2.xy - p1.xy); //edge overdraw vector

    vec2 v = normalize(p2.xy - p1.xy);
    vec2 n = vec2(-v.y, v.x) * edgeWidth; //edge Width vector
    
    gIsEdge = 1;

    /*
        A -- p1 --- p2 -- B  
        |                 |
        |                 |
        C --------------- D
    */

    // A
    gl_Position = vec4( p1.xy - ext, p1.z, 1.0 );
    EmitVertex();

    // C
    gl_Position = vec4( p1.xy - n - ext, p1.z, 1.0 );
    EmitVertex();

    // B
    gl_Position = vec4( p2.xy + ext, p2.z, 1.0 );
    EmitVertex();

    // D
    gl_Position = vec4( p2.xy - n + ext, p2.z, 1.0 );
    EmitVertex();
    
    EndPrimitive();
}

void main(){
    /*
    5---4---3
     \ / \ /
      0---2
       \ /
        1
    */
    vec3 p0 = gl_in[0].gl_Position.xyz / gl_in[0].gl_Position.w;
    vec3 p1 = gl_in[1].gl_Position.xyz / gl_in[1].gl_Position.w;
    vec3 p2 = gl_in[2].gl_Position.xyz / gl_in[2].gl_Position.w;
    vec3 p3 = gl_in[3].gl_Position.xyz / gl_in[3].gl_Position.w;
    vec3 p4 = gl_in[4].gl_Position.xyz / gl_in[4].gl_Position.w;
    vec3 p5 = gl_in[5].gl_Position.xyz / gl_in[5].gl_Position.w;

    // Check if the triangle is front facing by comparing the z component of the normal (if it is positive, the triangle is front facing)
    // If the triangle is front facing, check if the edges are front facing, if not, emit the edge quad
    if(isFrontFacing(p0, p2, p4)){
        if(!isFrontFacing(p0, p1, p2)){
            emitEdgeQuad(p0, p2);
        }

        if(!isFrontFacing(p2, p3, p4)){
            emitEdgeQuad(p2, p4);
        }

        if(!isFrontFacing(p4, p5, p0)){
            emitEdgeQuad(p4, p0);
        }
    }

    // Output the original triangle
    gIsEdge = 0; // Triangle is not part of an edge.

    gNormal = vNormal[0];
    gLightDir = vLightDir[0];
    gl_Position = gl_in[0].gl_Position;
    EmitVertex();

    gNormal = vNormal[2];
    gLightDir = vLightDir[2];
    gl_Position = gl_in[2].gl_Position;
    EmitVertex();

    gNormal = vNormal[4];
    gLightDir = vLightDir[4];
    gl_Position = gl_in[4].gl_Position;
    EmitVertex();

    EndPrimitive();
}