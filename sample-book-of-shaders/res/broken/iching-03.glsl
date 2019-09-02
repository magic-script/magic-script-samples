// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float shape(vec2 st,int N){
  st=st*2.-1.;
  float a=atan(st.x,st.y)+PI;
  float r=TWO_PI/float(N);
  return cos(floor(.5+a/r)*r-a)*length(st);
}

float box(vec2 st,vec2 size){
  return shape(st*size,4);
}

float hex(vec2 st,bool a,bool b,bool c,bool d,bool e,bool f){
  st=st*vec2(2.,6.);
  
  vec2 fpos=fract(st);
  vec2 ipos=floor(st);
  
  if(ipos.x==1.)fpos.x=1.-fpos.x;
  if(ipos.y<1.){
    return a?box(fpos-vec2(.03,0.),vec2(1.)):box(fpos,vec2(.84,1.));
  }else if(ipos.y<2.){
    return b?box(fpos-vec2(.03,0.),vec2(1.)):box(fpos,vec2(.84,1.));
  }else if(ipos.y<3.){
    return c?box(fpos-vec2(.03,0.),vec2(1.)):box(fpos,vec2(.84,1.));
  }else if(ipos.y<4.){
    return d?box(fpos-vec2(.03,0.),vec2(1.)):box(fpos,vec2(.84,1.));
  }else if(ipos.y<5.){
    return e?box(fpos-vec2(.03,0.),vec2(1.)):box(fpos,vec2(.84,1.));
  }else if(ipos.y<6.){
    return f?box(fpos-vec2(.03,0.),vec2(1.)):box(fpos,vec2(.84,1.));
  }
  return 0.;
}

float hex(vec2 st,float N){
  bool b[6];
  float remain=floor(mod(N,64.));
  for(int i=0;i<6;i++){
    b[i]=mod(remain,2.)==1.?true:false;
    remain=ceil(remain/2.);
  }
  return hex(st,b[0],b[1],b[2],b[3],b[4],b[5]);
}

vec3 random3(vec3 c){
  float j=4096.*sin(dot(c,vec3(17.,59.4,15.)));
  vec3 r;
  r.z=fract(512.*j);
  j*=.125;
  r.x=fract(512.*j);
  j*=.125;
  r.y=fract(512.*j);
  return r-.5;
}

const float F3=.3333333;
const float G3=.1666667;
float snoise(vec3 p){
  
  vec3 s=floor(p+dot(p,vec3(F3)));
  vec3 x=p-s+dot(s,vec3(G3));
  
  vec3 e=step(vec3(0.),x-x.yzx);
  vec3 i1=e*(1.-e.zxy);
  vec3 i2=1.-e.zxy*(1.-e);
  
  vec3 x1=x-i1+G3;
  vec3 x2=x-i2+2.*G3;
  vec3 x3=x-1.+3.*G3;
  
  vec4 w,d;
  
  w.x=dot(x,x);
  w.y=dot(x1,x1);
  w.z=dot(x2,x2);
  w.w=dot(x3,x3);
  
  w=max(.6-w,0.);
  
  d.x=dot(random3(s),x);
  d.y=dot(random3(s+i1),x1);
  d.z=dot(random3(s+i2),x2);
  d.w=dot(random3(s+1.),x3);
  
  w*=w;
  w*=w;
  d*=w;
  
  return dot(d,vec4(52.));
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.y*=u_resolution.y/u_resolution.x;
  
  float t=u_time*.5;
  
  float df=1.;
  df=mix(hex(st,t),hex(st,t+1.),fract(t));
  df+=snoise(vec3(st*75.,t*.1))*.03;
  gl_FragColor=mix(vec4(.7,1.,.3,1.),vec4(0.),step(.7,df));
  
}
