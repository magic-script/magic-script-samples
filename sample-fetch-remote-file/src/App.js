import { LandscapeApp } from 'lumin';
import { makeText } from './text.js';
import { makeButton } from './button.js';

export class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.7, 0.5, 0.2]);
    // Add text label
    let text = makeText(prism);
    prism.getRootNode().addChild(text);
    text.setLocalPosition([0, 0.1, 0]);
    // Add button
    let button = makeButton(prism, text);
    button.setLocalPosition([0, -0.1, 0]);
    prism.getRootNode().addChild(button);
    return 0;
  }
  updateLoop(delta) {
    return true;
  }
}
