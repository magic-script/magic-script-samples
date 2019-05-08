import { LandscapeApp } from 'lumin';
import { WebGlController } from 'magic-script-webgl-prism-controller';
import { TorusGeometry, MetallicMaterial, Texture, Mesh, Scene, setDefaultScene } from 'xeogl';

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
// like xeogl as-is using browser style APIs.
window.onload = () => {
  print('Starting webgl code');
  var scene = new Scene({
    canvas: 'myCanvas',
    transparent: true
  });
  setDefaultScene(scene);

  // Render a webgl scene using xeogl engine.
  var mesh = new Mesh({
    geometry: new TorusGeometry({
      radius: 1.0,
      tube: 0.3,
      radialSegments: 120,
      tubeSegments: 60
    }),
    material: new MetallicMaterial({
      baseColorMap: new Texture({
        src: 'res/uvGrid2.jpg'
      }),
      roughnessMap: new Texture({
        src: 'res/goldRoughness.jpg',
        encoding: 'sRGB'
      })
    })
  });

  scene.camera.eye = [0, 0, -4];
  scene.on('tick', function () {
    scene.camera.orbitYaw(0.4);
  });
};
