import { LandscapeApp } from 'lumin';
import { WebGlController } from 'webgl-prism-controller';
import { ReflectionMap, Scene, setDefaultScene } from 'xeogl';
import { GLTFModel } from 'xeogl-gltf-model';

export class App extends LandscapeApp {
  init () {
    print('Creating Lumin Runtime Prism and Quad Node');
    // Create a new prism that's half a meter squared.
    let prism = this.requestNewPrism([0.5, 0.5, 0.1]);

    // Set a custom prism controller to handle the rest.
    prism.setPrismController(new WebGlController());

    return 0;
  }
}

// The WebGlController fakes many browser APIs so we can use a browser webgl engine
// like xeogl as-is using browser style APIs.s
window.onload = () => {
  var scene = new Scene({
    canvas: 'myCanvas',
    transparent: true
  });
  setDefaultScene(scene);

  var model = new GLTFModel({
    id: 'helmet',
    src: 'res/DamagedHelmet/glTF/DamagedHelmet.gltf',
    combineGeometry: true,
    quantizeGeometry: true
  });

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

  model.map = new ReflectionMap({
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
