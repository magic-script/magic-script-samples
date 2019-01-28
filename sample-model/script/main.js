#!/system/bin/script/mxs

import { LandscapeApp } from "lumin";

class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);

    let resource = prism.createModelResourceId("res/BoxTextured.glb", 0.3);
    let model = prism.createModelNode(resource);

    prism.getRootNode().addChild(model);
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
