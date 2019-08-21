// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015
// Title: IChing series

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float shape(vec2 st,float N){
  st=st*2.-1.;
  float a=atan(st.x,st.y)+PI;
  float r=TWO_PI/N;
  return abs(cos(floor(.5+a/r)*r-a)*length(st));
}

float box(vec2 st,vec2 size){
  return shape(st*size,4.);
}

float rect(vec2 _st,vec2 _size){
  _size=vec2(.5)-_size*.5;
  vec2 uv=smoothstep(_size,_size+vec2(1e-4),_st);
  uv*=smoothstep(_size,_size+vec2(1e-4),vec2(1.)-_st);
  return uv.x*uv.y;
}

float hex(vec2 st,float a,float b,float c,float d,float e,float f){
  st=st*vec2(2.,6.);
  
  vec2 fpos=fract(st);
  vec2 ipos=floor(st);
  
  if(ipos.x==1.)fpos.x=1.-fpos.x;
  if(ipos.y<1.){
    return mix(box(fpos,vec2(.84,1.)),box(fpos-vec2(.03,0.),vec2(1.)),a);
  }else if(ipos.y<2.){
    return mix(box(fpos,vec2(.84,1.)),box(fpos-vec2(.03,0.),vec2(1.)),b);
  }else if(ipos.y<3.){
    return mix(box(fpos,vec2(.84,1.)),box(fpos-vec2(.03,0.),vec2(1.)),c);
  }else if(ipos.y<4.){
    return mix(box(fpos,vec2(.84,1.)),box(fpos-vec2(.03,0.),vec2(1.)),d);
  }else if(ipos.y<5.){
    return mix(box(fpos,vec2(.84,1.)),box(fpos-vec2(.03,0.),vec2(1.)),e);
  }else if(ipos.y<6.){
    return mix(box(fpos,vec2(.84,1.)),box(fpos-vec2(.03,0.),vec2(1.)),f);
  }
  return 0.;
}

float hex(vec2 st,float N){
  float b[6];
  float remain=floor(mod(N,64.));
  for(int i=0;i<6;i++){
    b[i]=0.;
    b[i]=step(1.,mod(remain,2.));
    remain=ceil(remain/2.);
  }
  return hex(st,b[0],b[1],b[2],b[3],b[4],b[5]);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.y*=u_resolution.y/u_resolution.x;
  
  st*=10.;
  vec2 fpos=fract(st);
  vec2 ipos=floor(st);
  
  float t=u_time*5.;
  float df=1.;
  df=hex(fpos,ipos.x+ipos.y+t)+(1.-rect(fpos,vec2(.7)));
  
  gl_FragColor=mix(vec4(1.,.5,.2,1.),vec4(0.),step(.7,df));
}
