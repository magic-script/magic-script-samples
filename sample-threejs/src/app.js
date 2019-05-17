import { LandscapeApp, ViewMode } from 'lumin';
import { WebGlController } from 'magic-script-webgl-prism-controller';
import {
  ArrayCamera,
  DoubleSide,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  TorusGeometry,
  Vector4,
  WebGLRenderer
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
  renderer.setClearColor(0x000000, 1);
  document.body.appendChild(renderer.domElement);

  var lights = [];
  lights[ 0 ] = new PointLight(0xffffff, 1, 0);
  lights[ 1 ] = new PointLight(0xffffff, 1, 0);
  lights[ 2 ] = new PointLight(0xffffff, 1, 0);

  lights[ 0 ].position.set(0, 20, 0);
  lights[ 1 ].position.set(10, 20, 10);
  lights[ 2 ].position.set(-10, -20, -10);

  scene.add(lights[ 0 ]);
  scene.add(lights[ 1 ]);
  scene.add(lights[ 2 ]);

  var helmet;
  var loader = new GLTFLoader();
  loader.load('res/DamagedHelmet/glTF/DamagedHelmet.gltf', function (gltf) {
    helmet = gltf.scene;
    scene.add(gltf.scene);
  }, undefined, function (error) {
    print('Error', error);
  });

  var group = new Group();

  var geometry = new TorusGeometry(2, 0.5, 16, 100);

  var lineMaterial = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
  var meshMaterial = new MeshPhongMaterial({ color: 0x156289, emissive: 0x072534, side: DoubleSide, flatShading: true });

  group.add(new LineSegments(geometry, lineMaterial));
  group.add(new Mesh(geometry, meshMaterial));

  scene.add(group);

  var render = function (time) {
    window.requestAnimationFrame(render);

    group.rotation.x += 0.005;
    group.rotation.y += 0.005;
    if (helmet) {
      helmet.rotation.y = time / 1000;
    }

    renderer.render(scene, camera);
  };
  render();
};
