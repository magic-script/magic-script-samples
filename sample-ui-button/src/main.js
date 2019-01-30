//
import { LandscapeApp } from "lumin";
import { makeText } from "./text.js";
import { makeButton } from "./button.js";

class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);
    // Add text label
    let text = makeText(prism);
    prism.getRootNode().addChild(text);
    text.setLocalPosition([0, 0.2, 0]);
    // Add button
    let button = makeButton(prism, text);
    button.setLocalPosition([0, -0.1, 0]);
    prism.getRootNode().addChild(button);
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
