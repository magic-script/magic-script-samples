export default () => {
  const vert = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

  let vertices = new Float32Array([
    -1, -1, -1, 1, 1, -1, 1, 1
  ]);

  let vs, fs, program, buffer;

  return (gl, width, height, frag) => {
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0.5, 0, 1);

    if (!vs) {
      vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vert);
      gl.compileShader(vs);
      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vs));
      }
    }
    if (fs) {
      gl.deleteShader(fs);
    }
    fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, frag);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(fs));
    }

    if (program) {
      gl.deleteProgram(program);
    }
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }

    if (!buffer) {
      buffer = gl.createBuffer();
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(program);
    let position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    let uResolution, uTime, uMouse;
    if (/\bu_resolution\b/.test(frag)) {
      uResolution = gl.getUniformLocation(program, 'u_resolution');
    }
    if (/\bu_time\b/.test(frag)) {
      uTime = gl.getUniformLocation(program, 'u_time');
    }
    if (/\bu_mouse\b/.test(frag)) {
      uMouse = gl.getUniformLocation(program, 'u_mouse');
    }
    if (uResolution !== undefined) {
      gl.uniform2f(uResolution, width, height);
    }

    return (time, x, y) => {
      if (uTime !== undefined) {
        gl.uniform1f(uTime, time);
      }
      if (uMouse !== undefined) {
        gl.uniform2f(uMouse, x, y);
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return true;
    };
  };
};
