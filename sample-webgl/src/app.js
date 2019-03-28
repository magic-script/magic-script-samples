import gl from 'gl';
import egl from 'egl';
import shader from './thebookofshaders.js';
import { scandir } from 'magic-script-polyfills/src/fs.js';
import { LandscapeApp, ui, CursorHoverState } from 'lumin';
const { Cursor, UiText, EclipseLabelType, Alignment, HorizontalTextAlignment } = ui;

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export class App extends LandscapeApp {
  init () {
    print('INIT!');
    return 0;
  }
  onAppStart () {
    print(CursorHoverState);
    print(JSON.stringify(CursorHoverState, null, 2));
    // Create a new prism that's half a meter cubed.
    let w = this.w = 0.5;
    let h = this.h = 0.5;
    let prism = this.prism = this.requestNewPrism([w, h, 0.1]);

    Cursor.SetState(prism, CursorHoverState.kNone);

    let root = prism.getRootNode();

    // Add a label for visibility/debugging
    let text = this.text = UiText.CreateEclipseLabel(
      prism,
      'Loading...',
      EclipseLabelType.kT7
    );
    text.setAlignment(Alignment.CENTER_CENTER);
    text.setTextAlignment(HorizontalTextAlignment.kCenter);
    text.setLocalPosition([0, 0, 0.025]);
    root.addChild(text);

    let text2 = this.text2 = UiText.CreateEclipseLabel(
      prism,
      'WebGL!',
      EclipseLabelType.kT7
    );
    text2.setAlignment(Alignment.CENTER_CENTER);
    text2.setTextAlignment(HorizontalTextAlignment.kCenter);
    text2.setLocalPosition([0, 0, -0.025]);
    text2.setLocalRotation([0, 1, 0, 0]);
    root.addChild(text2);
    let width = this.width = 1024;
    let height = this.height = 1024;

    let id = prism.createPlanarEGLResourceId(width, height);
    print('id', id);
    let quad = prism.createQuadNode(id);
    print('quad', quad);
    quad.setLocalScale([0.5, 0.5, 0.5]);
    quad.setLocalPosition([-0.25, -0.25, 0]);
    quad.setBackFaceCulls(false);
    quad.setIsOpaque(false);
    root.addChild(quad);
    print('quad color', quad.getColor());

    let resource = this.resource = prism.getResource(id);
    print('resource', resource);
    let surface = this.surface = resource.getEGLSurface();
    print('surface', surface);
    let context = this.context = resource.getEGLContext();
    print('context', context);

    let version = egl.initialize(3, 2);
    print('version', JSON.stringify(version, null, 2));
    egl.bindAPI(egl.OPENGL_ES_API);
    print('bound API');
    egl.makeCurrent(surface, surface, context);
    print('made current');

    this.time = 0;

    let load = async (name) => {
      let res = await fetch('res/' + name);
      let frag = await res.text();
      text.setText(name);
      this.update = shader(gl, width, height, frag);
      print(name);
    };
    let cycle = async () => {
      while (true) {
        for (let { name, type } of await scandir('res')) {
          if (type !== 'file') continue;
          await load(name);
          await sleep(5000);
        }
      }
    };

    cycle();
    // load('circle-wave.glsl');
    // load('iching-01.glsl');
    // load('ikeda.glsl');
    // load('voroni.glsl');
  }
  updateLoop (delta) {
    this.time += delta;
    let { prism, update, time, surface, text, w, h, width, height } = this;
    if (update) {
      let [x, y] = Cursor.GetPosition(prism);
      print(x, y);
      x = width * (x / w + 0.5);
      y = height * (y / h + 0.5);
      update(time, x, y);
    } else {
      let bright = (Math.cos(time * 2) + 1);
      gl.clearColor(0.5 + bright / 4, bright / 5 + 0.2, 0.1, 0.5);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    text.setLocalPosition([0, 0, Math.sin(time) * 0.04]);
    egl.swapBuffers(surface);
    return true;
  }
}
