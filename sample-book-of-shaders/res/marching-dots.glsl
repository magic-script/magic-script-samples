// Author @patriciogv - 2015 - patricio.io

#ifdef GL_ES
precision mediump float;
#endif

const float PI=3.1415926535897932384626433832795;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 movingTiles(vec2 _st,float _zoom,float _speed){
  _st*=_zoom;
  float time=u_time*_speed;
  if(fract(time)>.5){
    if(fract(_st.y*.5)>.5){
      _st.x+=fract(time)*2.;
    }else{
      _st.x-=fract(time)*2.;
    }
  }else{
    if(fract(_st.x*.5)>.5){
      _st.y+=fract(time)*2.;
    }else{
      _st.y-=fract(time)*2.;
    }
  }
  return fract(_st);
}

float circle(vec2 _st,float _radius){
  vec2 pos=vec2(.5)-_st;
  return smoothstep(1.-_radius,1.-_radius+_radius*.2,1.-dot(pos,pos)*3.14);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  
  st=movingTiles(st,10.,.5);
  
  gl_FragColor=vec4(1.,1.,.3,1.) * circle(st,.3);

  // gl_FragColor=vec4(color,1.);
}
