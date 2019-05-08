import {
  TorusGeometry,
  MetallicMaterial,
  Texture,
  Mesh
} from 'xeogl';

window.onload = () => {
  print('STARTING');
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

  mesh.scene.webgl2 = true;
  mesh.scene.camera.eye = [0, 0, -4];
  mesh.scene.on('tick', function () {
    mesh.scene.camera.orbitYaw(0.4);
  });
};
