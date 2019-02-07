import { LandscapeApp } from 'lumin';

export class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);
    let node = prism.createLineNode();
    node.addPoints([0, 0, 0]);
    node.addPoints([0.5, 0.5, 0.5]);
    prism.getRootNode().addChild(node);
    return 0;
  }
  updateLoop(delta) {
    return true;
  }
  eventListener(event) {
    return true;
  }
}
