import { LandscapeApp, ui } from 'lumin';
import { width, height, onUpdate } from './webgl-polyfill.js';
import { main } from './webgl.js';
import { makeCurrent } from 'egl';

const { UiText, EclipseLabelType, Alignment, HorizontalTextAlignment } = ui;

export class App extends LandscapeApp {
  onAppStart () {
    let prism = this.requestNewPrism([0.5, 0.5, 0.1]);
    let root = prism.getRootNode();

    let id = prism.createPlanarEGLResourceId(width, height);
    print('id', id);
    let quad = prism.createQuadNode(id);
    print('quad', quad);
    quad.setLocalScale([0.5, 0.5, 0.5]);
    quad.setLocalPosition([-0.25, -0.25, 0]);
    quad.setBackFaceCulls(false);
    quad.setIsOpaque(false);
    root.addChild(quad);

    // Add a label for visibility/debugging
    let text = this.text = UiText.CreateEclipseLabel(
      prism,
      'Textures!',
      EclipseLabelType.kT7
    );
    text.setAlignment(Alignment.CENTER_CENTER);
    text.setTextAlignment(HorizontalTextAlignment.kCenter);
    text.setLocalPosition([0, 0, 0.025]);
    root.addChild(text);

    let resource = this.resource = prism.getResource(id);
    print('resource', resource);
    let surface = this.surface = resource.getEGLSurface();
    print('surface', surface);
    let context = this.context = resource.getEGLContext();
    print('context', context);
    makeCurrent(surface, surface, context);
    main();
    return 0;
  }
  updateLoop () {
    onUpdate(this.surface);
    return true;
  }
}
