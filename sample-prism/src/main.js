//
import { LandscapeApp } from "lumin";

class App extends LandscapeApp {
  onAppStart(initArg) {
    let prism = this.requestNewPrism([0.2, 0.4, 0.2]);

    let name = "res/WaterBottle.glb";
    let resource = prism.createModelResourceId(name, 1.0);
    let model = prism.createModelNode(resource);

    prism.getRootNode().addChild(model);
    super.onAppStart(initArg);
  }
  init() {
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
