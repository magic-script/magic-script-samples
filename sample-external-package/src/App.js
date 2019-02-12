import { LandscapeApp } from 'lumin';
import { makeTextUnderscore } from './text_underscore.js';
import { makeTextLodash } from './text_lodash.js';

export class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);

    let text_u = makeTextUnderscore(prism);
    text_u.setLocalPosition([0, 0.1, 0]);
    prism.getRootNode().addChild(text_u);

    let text_l = makeTextLodash(prism);
    text_l.setLocalPosition([0, -0.1, 0]);
    prism.getRootNode().addChild(text_l);
    return 0;
  }
  updateLoop(delta) {
    return true;
  }
}
