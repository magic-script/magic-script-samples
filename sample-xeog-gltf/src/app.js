import { LandscapeApp, ui } from 'lumin';
import egl from 'egl';
import gl from 'gl';
import png from 'png';
import jpeg from 'jpeg';

const { UiText, EclipseLabelType, Alignment, HorizontalTextAlignment } = ui;

// gl.getParameter is broken in 0.96, let's hard-code some answers.
let overrides = {
  [gl.DEPTH_BITS]: 16,
  [gl.MAX_TEXTURE_SIZE]: 2048,
  [gl.MAX_CUBE_MAP_TEXTURE_SIZE]: 512,
  [gl.MAX_RENDERBUFFER_SIZE]: 2048,
  [gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS]: 8,
  [gl.MAX_TEXTURE_IMAGE_UNITS]: 8,
  [gl.MAX_VERTEX_ATTRIBS]: 10,
  [gl.MAX_VERTEX_UNIFORM_VECTORS]: 128,
  [gl.MAX_FRAGMENT_UNIFORM_VECTORS]: 32,
  [gl.MAX_VARYING_VECTORS]: 6
};
let originalGetParameter = gl.getParameter;
gl.getParameter = pname => {
  return overrides[pname] || originalGetParameter(pname);
};

let cb;
globalThis.requestAnimationFrame = fn => { cb = fn; };
export class App extends LandscapeApp {
  init () {
    let prism = this.requestNewPrism([0.5, 0.5, 0.2]);
    let root = prism.getRootNode();

    // // Create a nice text label using UIKit.
    // let text = UiText.CreateEclipseLabel(
    //   prism,
    //   'Hello\nMXS Xeogl!',
    //   EclipseLabelType.kT7
    // );
    // text.setAlignment(Alignment.CENTER_CENTER);
    // text.setTextAlignment(HorizontalTextAlignment.kCenter);
    // root.addChild(text);

    // create planar resource
    let id = prism.createPlanarEGLResourceId(1024, 1024);
    let quad = prism.createQuadNode(id);
    quad.setLocalScale([0.5, 0.5, 0.5]);
    quad.setLocalPosition([-0.25, -0.25, -0.1]);
    quad.setBackFaceCulls(false);
    quad.setIsOpaque(false);
    root.addChild(quad);
    let resource = this.resource = prism.getResource(id);
    let surface = this.surface = resource.getEGLSurface();
    let context = this.context = resource.getEGLContext();
    egl.makeCurrent(surface, surface, context);
    this.start = Date.now();

    globalThis.requestAnimationFrame = callback => {
      this.cb = callback;
    };
    if (cb) this.cb = cb;
    if (window.onload) { window.onload(); }
    return 0;
  }
  updateLoop () {
    if (this.cb) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      let fn = this.cb;
      this.cb = null;
      fn(Date.now() - this.start);
      egl.swapBuffers(this.surface);
    }
    return true;
  }
}

export let width = 1024;
export let height = 1024;

let DomNode = {
  get parentElement () { return this; },
  appendChild () { return this; },
  addEventListener (event, fn) {
    print('Ignoring addEventListener', event);
  },
  get style () { return {}; },
  querySelector (selector) {
    print('querySelector', selector);
    if (/canvas/.test(selector)) return canvas;
  }
};

let canvas = {
  __proto__: DomNode,
  getContext (type) {
    if (type !== 'webgl') return {};
    gl.canvas = canvas;
    return gl;
  },
  clientWidth: width,
  clientHeight: height,
  width,
  height
};

let body = {
  __proto__: DomNode
};

globalThis.window = globalThis;
window.innerWidth = width;
window.innerHeight = height;

globalThis.document = {
  __proto__: DomNode,
  getElementsByTagName (name) {
    print('document.getElementsByTagName', name);
    if (name === 'body') return [body];
    if (name === 'canvas') return [canvas];
    return [];
  },
  getElementById (id) {
    print('document.getElementById', id);
    if (/canvas/.test(id)) return canvas;
  },
  createElement (tag) {
    if (tag === 'canvas') return canvas;
    if (tag === 'img') return new Image();
    return { __proto__: DomNode };
  },
  createElementNS (namespace, tag) {
    if (namespace === 'http://www.w3.org/1999/xhtml') return this.createElement(tag);
    return { __proto__: DomNode };
  },
  body
};

class Image {
  set src (url) {
    fetch(url)
      .then(res => res.arrayBuffer())
      .then(data => {
        print('Image loaded', url);
        let decode;
        if (/\.png/i.test(url)) {
          decode = png.decode;
        } else if (/\.jpe?g/i.test(url)) {
          decode = jpeg.decode;
        } else {
          throw new Error('Can only load .png, .jpg, or .jpeg images');
        }
        let { width, height, pixels, bpp } = decode(data);
        print('Image decoded', width, height, pixels, bpp);
        if (width * height * bpp !== pixels.byteLength) {
          throw new Error('Decode output mismatched size');
        }
        this.bpp = bpp;
        this.width = width;
        this.height = height;
        this.pixels = pixels;
        this.onload();
      }, err => {
        if (this.onerror) {
          this.onerror(err);
        } else {
          throw err;
        }
      });
  }
  addEventListener (name, cb) {
    if (name === 'load') this.onload = cb;
  }
  removeEventListener (name, cb) {
    if (name === 'load' && this.onload === cb) this.onload = undefined;
  }
}

globalThis.Image = Image;

globalThis.navigator = {};

class WebVRManager {

}

globalThis.WebVRManager = WebVRManager;
