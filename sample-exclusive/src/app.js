import gl from 'gl';
import egl from 'egl';
import { ExclusiveRender, ImmersiveApp, FPS_DELTA } from 'lumin';
import * as mat4 from 'gl-matrix/esm/mat4.js';

function makeProgram (vs, fs) {
  let program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    let infoLog = gl.getProgramInfoLog(program);
    throw new Error(`Program link error: ${infoLog}`);
  }
  return program;
}

function makeShader (type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    let infoLog = gl.getShaderInfoLog(shader);
    throw new Error(`shader compilation error ${type}: ${infoLog}`);
  }
  return shader;
}

const vert = (...args) => makeShader(gl.VERTEX_SHADER, args.join(''));
const frag = (...args) => makeShader(gl.FRAGMENT_SHADER, args.join(''));

function cubeData () {
  let positions = [
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0
  ];

  var colorsOfFaces = [
    [0.3, 1.0, 1.0, 1.0], // Front face: cyan
    [1.0, 0.3, 0.3, 1.0], // Back face: red
    [0.3, 1.0, 0.3, 1.0], // Top face: green
    [0.3, 0.3, 1.0, 1.0], // Bottom face: blue
    [1.0, 1.0, 0.3, 1.0], // Right face: yellow
    [1.0, 0.3, 1.0, 1.0] // Left face: purple
  ];

  var colors = [];

  for (var j = 0; j < 6; j++) {
    for (var i = 0; i < 4; i++) {
      var polygonColor = colorsOfFaces[(j + i) % 6];
      colors = colors.concat(polygonColor);
    }
  }

  let elements = [
    0, 1, 2, 0, 2, 3, // front
    4, 5, 6, 4, 6, 7, // back
    8, 9, 10, 8, 10, 11, // top
    12, 13, 14, 12, 14, 15, // bottom
    16, 17, 18, 16, 18, 19, // right
    20, 21, 22, 20, 22, 23 // left
  ];

  return { positions, elements, colors };
}

function cubeBuffers () {
  let cube = cubeData();
  let positions = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.positions), gl.STATIC_DRAW);

  let colors = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colors);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.colors), gl.STATIC_DRAW);

  let elements = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elements);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cube.elements), gl.STATIC_DRAW);

  return { positions, colors, elements };
}

function initGL () {
  egl.initialize(0, 0);
  egl.bindAPI(egl.OPENGL_ES_API);
  let context = egl.createContext(3, 0);
  egl.makeCurrent(null, null, context);

  let vs = vert`
    // Each point has a position and color
    attribute vec3 position;
    attribute vec4 color;

    // The transformation matrices
    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;

    // Pass the color attribute down to the fragment shader
    varying vec4 vColor;

    void main() {

      // Pass the color down to the fragment shader
      vColor = color;

      // Read the multiplication in reverse order, the point is taken from
      // the original model space and moved into world space. It is then
      // projected into clip space as a homogeneous point. Generally the
      // W value will be something other than 1 at the end of it.
      gl_Position = projection * view * model * vec4( position, 1.0 );
    }
  `;

  let fs = frag`
    precision mediump float;
    varying vec4 vColor;

    void main() {
      gl_FragColor = vColor;
      // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `;

  let program = makeProgram(vs, fs);

  let { positions, colors, elements } = cubeBuffers();

  return { context, fs, vs, program, positions, colors, elements };
}

export class App extends ImmersiveApp {
  init () {
    this.setEventSleepTime(FPS_DELTA); // make this a FPS APS

    let prism = this.requestNewPrism([2, 3, 0.5]);

    let { context, program, positions, colors, elements } = initGL();
    this.positions = positions;
    this.colors = colors;
    this.elements = elements;
    this.program = program;

    let options = new ExclusiveRender.ClientOptions();

    let exclusive = this.exclusive = this.startExclusiveModeGL(options, context);
    print('exclusive started', exclusive);

    this.info = new ExclusiveRender.FrameInfo();
    this.params = new ExclusiveRender.FrameParams();

    this.fb = gl.createFramebuffer();

    let locations = this.locations = {
      model: gl.getUniformLocation(program, 'model'),
      view: gl.getUniformLocation(program, 'view'),
      projection: gl.getUniformLocation(program, 'projection'),
      position: gl.getAttribLocation(program, 'position'),
      color: gl.getAttribLocation(program, 'color')
    };

    gl.enableVertexAttribArray(locations.position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positions);
    gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(locations.color);
    gl.bindBuffer(gl.ARRAY_BUFFER, colors);
    gl.vertexAttribPointer(locations.color, 4, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elements);

    // Tell WebGL to test the depth when drawing
    gl.enable(gl.DEPTH_TEST);

    gl.clearColor(0.07, 0, 0.1, 1.0);

    this.model = mat4.create();
    this.view = mat4.create();
    this.projection = mat4.create();

    this.start = Date.now();
    return 0;
  }

  updateLoop (delta) {
    let { fb, start, exclusive, model, view, projection, params, info, program, locations } = this;

    let now = (Date.now() - start) / 1000;

    mat4.identity(model);
    mat4.translate(model, model, [0, 0, -0.5]);
    mat4.scale(model, model, [0.1, 0.1, 0.1]);
    mat4.rotate(model, model, now, [0, 1, 0]);

    exclusive.beginFrame(params, info);

    let [x, y] = info.getViewPortLowerLeft();
    let [w, h] = info.getViewPortSize();
    gl.viewport(x, y, w, h);

    // bind shader
    gl.useProgram(program);

    // Draw both eyes.
    draw(0);
    draw(1);

    function draw (eye) {
      mat4.copy(projection, info.getProj(eye));
      mat4.copy(view, info.getView(eye));

      gl.uniformMatrix4fv(locations.model, false, model);
      gl.uniformMatrix4fv(locations.view, false, view);
      gl.uniformMatrix4fv(locations.projection, false, projection);

      // setup frame buffer
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTextureLayer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, info.getColorId(), 0, eye);
      gl.framebufferTextureLayer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, info.getDepthId(), 0, eye);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    }

    exclusive.endFrame(info, true);

    return true;
  }

  deInit () {
    this.stopExclusiveMode();
  }
}
