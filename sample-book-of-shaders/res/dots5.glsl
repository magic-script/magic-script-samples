// Author @patriciogv ( patricio.io ) - 2015
// Title: Nina Warmerdam ( www.behance.net/ninawarmerdam )

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 tile(vec2 st,float zoom){
  st*=zoom;
  return fract(st);
}

float circle(vec2 st,float radius){
  vec2 pos=vec2(.5)-st;
  radius*=.75;
  return 1.-smoothstep(radius-(radius*.05),radius+(radius*.05),dot(pos,pos)*3.14);
}

float circlePattern(vec2 st,float radius){
  return circle(st+vec2(0.,-.5),radius)+
  circle(st+vec2(0.,.5),radius)+
  circle(st+vec2(-.5,0.),radius)+
  circle(st+vec2(.5,0.),radius);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  vec3 color=vec3(0.);
  
  vec2 grid1=tile(st,7.);
  grid1=tile(st+vec2(cos(u_time),sin(u_time))*.01,7.);
  color+=mix(vec3(.075,.114,.329),vec3(.973,.843,.675),circlePattern(grid1,.23)-circlePattern(grid1,.01));
  
  vec2 grid2=tile(st,3.);
  grid2=tile(st+vec2(cos(u_time),sin(u_time))*.02,3.);
  color=mix(color,vec3(.761,.247,.102),circlePattern(grid2,.2))-circlePattern(grid2,.05),
  
  gl_FragColor=vec4(color,1.);
}
