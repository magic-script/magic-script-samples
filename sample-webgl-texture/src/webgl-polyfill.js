import gl from 'gl';
import png from 'png';
import jpeg from 'jpeg';
import egl from 'egl';

export let width = 1024;
export let height = 1024;

let cb;
let start = Date.now();
export function onUpdate (surface) {
  if (!cb) return;
  let now = (Date.now() - start);
  gl.clear(gl.COLOR_BUFFER_BIT);
  let fn = cb;
  cb = null;
  fn(now);
  egl.swapBuffers(surface);
}

globalThis.requestAnimationFrame = callback => {
  cb = callback;
};

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
