import { ReflectionMap } from 'xeogl';
import { GLTFModel } from './GltfModel.js';

window.onload = () => {
  print('STARTING');
  // ---------------------------------------------------
  // Load the model
  // ---------------------------------------------------
  var model = new GLTFModel({
    id: 'helmet',
    src: 'res/DamagedHelmet/glTF/DamagedHelmet.gltf',
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
        camera.orbitYaw(-0.2);
      }
    });
  });

  var map = new ReflectionMap({
    src: [
      'res/Uffizi_Gallery/Uffizi_Gallery_Radiance_PX.png',
      'res/Uffizi_Gallery/Uffizi_Gallery_Radiance_NX.png',
      'res/Uffizi_Gallery/Uffizi_Gallery_Radiance_PY.png',
      'res/Uffizi_Gallery/Uffizi_Gallery_Radiance_NY.png',
      'res/Uffizi_Gallery/Uffizi_Gallery_Radiance_PZ.png',
      'res/Uffizi_Gallery/Uffizi_Gallery_Radiance_NZ.png'
    ],
    encoding: 'sRGB'
  });
};
