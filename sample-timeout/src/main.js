
import { ui, LandscapeApp } from "lumin";
import { setTimeout } from "./builtins.js";
const { UiButton, UiText, EclipseLabelType, Alignment, HorizontalAlignment } = ui;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.4, 0.2, 0.1]);

    let button = UiButton.Create(prism, "Click Me", 0, 0.1);
    button.onActivateSub(async () => {
      button.setText("Thanks!");
      await sleep(1000);
      button.setText("Again?");
    });
    prism.getRootNode().addChild(button);
  }
  updateLoop(delta) {
    return true;
  }

}

let app = new App(0.016);
app.run();
