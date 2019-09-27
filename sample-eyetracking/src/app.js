import { LandscapeApp } from "lumin"
import { SceneManager } from "./SceneManager.js"

import { EyeFixation } from "./EyeFixation.js"
import { EyeOrientation } from "./EyeOrientation.js"

export class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([2, 2, 2]);
    this.setCollisionsEnabled(prism, false);
    prism.app = this;
    let sceneManager = new SceneManager(prism);
    sceneManager.addScene(new EyeFixation("EyeFixation"));
    sceneManager.addScene(new EyeOrientation("EyeOrientation"));
    return 0;
  }
  updateLoop(delta) {
    return true;
  }
  eventListener(event) {
    return true;
  }
}
