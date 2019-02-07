import { ImmersiveApp } from 'lumin';

export class App extends ImmersiveApp {
  init() {
    let prism = this.requestNewPrism([1, 1, 1]);
    let node = prism.createLineNode();
    node.addPoints([0, 0, 0]);
    node.addPoints([1, 1, 1]);

    this.positionPrism(prism, [0, 0, -1]);

    prism.getRootNode().addChild(node);
    return 0;
  }
  updateLoop(delta) {
    return true;
  }
}
