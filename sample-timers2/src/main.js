
import { ui, LandscapeApp } from "lumin";
import { setTimeout } from "./builtins.js";
const { UiButton, UiText, EclipseLabelType, Alignment, HorizontalAlignment } = ui;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.4, 0.2, 0.1]);
    console.log({prism});

    let button = UiButton.Create(prism, "Click Me", 0, 0.1);
    button.onActivateSub(() => {
      console.log("clicked");
      button.setText("Thanks!");
      setTimeout(() => {
        console.log("timeout");
        button.setText("Again?");
      }, 1000);
    });
    prism.getRootNode().addChild(button);
    console.log({button});
  }
  update(delta) {
    return true;
  }

}

let app = new App(0.016);
app.run();
