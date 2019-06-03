import { LandscapeApp, ViewMode } from 'lumin';
import { WebGlController } from 'magic-script-webgl-prism-controller';
import {
  ArrayCamera,
  Mesh,
  PerspectiveCamera,
  Scene,
  Vector4,
  WebGLRenderer,
  TorusKnotBufferGeometry,
  MeshNormalMaterial
} from 'three';

export class App extends LandscapeApp {
  init () {
    print('Creating Lumin Runtime Prism and Quad Node');
    // Create a new prism that's half a meter squared.
    let prism = this.requestNewPrism([0.5, 0.5, 0.02]);

    // Set a custom prism controller to handle the rest.
    let controller = window.controller = new WebGlController();
    prism.setPrismController(controller);

    return 0;
  }
}

// The WebGlController fakes many browser APIs so we can use a browser webgl engine
// like xeogl as-is using browser style APIs.
window.onload = () => {
  print('quad', window.controller.quad);
  window.controller.quad.setViewMode(ViewMode.kLeftRight);

  var scene = new Scene();
  var cameras = [];

  var ASPECT_RATIO = 1;
  var WIDTH = (window.innerWidth / 2) * window.devicePixelRatio;
  var HEIGHT = (window.innerHeight / 1) * window.devicePixelRatio;

  var y = 0;
  for (var x = 0; x < 2; x++) {
    var subcamera = new PerspectiveCamera(40, ASPECT_RATIO, 0.1, 10);
    subcamera.viewport = new Vector4(Math.floor(x * WIDTH), Math.floor(y * HEIGHT), Math.ceil(WIDTH), Math.ceil(HEIGHT));
    subcamera.position.x = (x - 0.5) * 0.3;
    subcamera.position.z = 3;
    subcamera.position.multiplyScalar(2);
    subcamera.lookAt(0, 0, 0);
    subcamera.updateMatrixWorld();
    cameras.push(subcamera);
  }

  var camera = new ArrayCamera(cameras);
  camera.position.z = 5;

  var renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0x000000, 1);
  document.body.appendChild(renderer.domElement);

  var geometry = new TorusKnotBufferGeometry(1, 0.3, 256, 32);
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
