import { LandscapeApp, ViewMode, EyeTrackingEventData } from 'lumin';
import { WebGlController } from 'magic-script-webgl-prism-controller';
import {
  ArrayCamera,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxBufferGeometry,
  TorusKnotBufferGeometry,
  MeshNormalMaterial,
  Matrix4,
  Vector4,
  Vector3
} from 'three';
import perspective from './perspective.js';

import gl from 'gl';

export class App extends LandscapeApp {
  init () {
    const left = new PerspectiveCamera();
    const right = new PerspectiveCamera();
    window.cameras = this.cameras = [left, right];
    left.viewport = new Vector4(0, 0, 512, 1014);
    right.viewport = new Vector4(512, 0, 512, 1014);
    left.updateProjectionMatrix = () => { console.log('left.updateProjectionMatrix'); };
    right.updateProjectionMatrix = () => { console.log('right.updateProjectionMatrix'); };
    left.updateMatrixWorld = () => { console.log('left.updateMatrixWorld'); };
    right.updateMatrixWorld = () => { console.log('right.updateMatrixWorld'); };
    console.log('Creating Lumin Runtime Prism and Quad Node');
    // Create a new prism that's half a meter squared.
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);

    // Set a custom prism controller to handle the rest.
    let controller = window.controller = new WebGlController();
    prism.setPrismController(controller);
    this.eyeTracker = prism.retainEyeTrackingUpdates();
    this.prism = prism;
    this.quad = controller.quad;

    return 0;
  }
  eventListener (evt) {
    if (!(evt instanceof EyeTrackingEventData)) { return true; }

    // Get eye positions in prism coordinates
    const prismToWorld = new Matrix4().fromArray(this.prism.getTransform().flat());
    const worldToPrism = new Matrix4().getInverse(prismToWorld);
    let pl = new Vector4(...evt.getEyeTrackingLeftEyePosition(), 1).applyMatrix4(worldToPrism);
    let pr = new Vector4(...evt.getEyeTrackingRightEyePosition(), 1).applyMatrix4(worldToPrism);
    let up = new Vector3(...this.getHeadposeWorldUpVector());
    let center = new Vector3(0, 0, 0);
    let L = new Matrix4().lookAt(pl, center, up);
    let T = new Matrix4().makeTranslation(-0.25, -0.25, 0);
    let quadToPrism = new Matrix4().multiplyMatrices(L, T);
    let look = quadToPrism.toArray();
    look = [
      look.slice(0, 4),
      look.slice(4, 8),
      look.slice(8, 12),
      look.slice(12, 16)
    ];
    console.log(look);
    this.quad.setLocalTransform(look);
    // Get quad vertices in prism coordinates
    // const quadToPrism = new Matrix4().fromArray(this.quad.getCurrentPrismTransform().flat());
    let vertices = this.quad.getVertices();
    // bottom-left
    let pa = new Vector4(...vertices[0], 1).applyMatrix4(quadToPrism);
    // top-left
    let pb = new Vector4(...vertices[1], 1).applyMatrix4(quadToPrism);
    // bottom-right
    let pc = new Vector4(...vertices[3], 1).applyMatrix4(quadToPrism);

    const positions = [pl, pr];
    const n = 0.0025;
    const f = 100;

    for (let i = 0; i < 2; i++) {
      const pe = positions[i];

      const camera = this.cameras[i];
      const P = perspective(
        pa.toArray(),
        pb.toArray(),
        pc.toArray(),
        pe.toArray(),
        n, f
      );
      camera.projectionMatrix.fromArray(P);
      camera.projectionMatrixInverse.getInverse(camera.projectionMatrix);
      camera.matrixWorld.identity();
      camera.matrixWorldInverse.identity();
    }
    return true;
  }
}

// The WebGlController fakes many browser APIs so we can use a browser webgl engine
// like xeogl as-is using browser style APIs.
window.onload = () => {
  console.log('quad', window.controller.quad);
  window.controller.quad.setViewMode(ViewMode.kLeftRight);

  var scene = new Scene();

  console.log(window.cameras);
  var camera = new ArrayCamera(window.cameras);

  var renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new TorusKnotBufferGeometry(0.13, 0.05, 128, 16);
  var material = new MeshNormalMaterial();
  var torusKnot = new Mesh(geometry, material);

  scene.add(torusKnot);

  var render = function (time) {
    window.requestAnimationFrame(render);

    torusKnot.rotation.x = time * 0.0003;
    torusKnot.rotation.y = time * 0.0004;
    torusKnot.rotation.z = time * 0.0002;

    renderer.render(scene, camera);
  };
  render();
};
