#!/system/bin/script/mxs

import { LandscapeApp } from "lumin";

class App extends LandscapeApp {
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

let app = new App(0.016);
app.run();
