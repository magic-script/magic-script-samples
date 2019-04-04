import { GLTFModel } from './GltfModel.js';

export function main () {
  var model = new GLTFModel({
    id: 'helmet',
    src: 'res/DamagedHelmet.gltf',
    combineGeometry: true,
    quantizeGeometry: true
  });

  var scene = model.scene;
  var camera = scene.camera;
  camera.eye = [0, 0, -3.0];
  camera.look = [0, 0, 0];
  camera.up = [0, 1, 0];
  var spinning = true;
  model.on('loaded', function () {
    scene.on('tick', function () { // Slowly orbit the camera
      if (spinning) {
        camera.orbitYaw(-0.1);
      }
    });
  });
}
