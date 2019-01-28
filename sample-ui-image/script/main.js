#!/system/bin/script/mxs

import { LandscapeApp, ui } from "lumin";

class App extends LandscapeApp {
  init() {
    const { UiImage } = ui;
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);
    let image = UiImage.Create(prism, "res/cat.png", 0.4, 0.3);
    prism.getRootNode().addChild(image);
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
