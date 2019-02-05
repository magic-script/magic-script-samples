
import { ui, LandscapeApp } from "lumin";
import { setTimeout, setInterval } from "./builtins.js";
const { UiText, EclipseLabelType, Alignment, HorizontalAlignment } = ui;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.4, 0.1, 0.1]);
    let text = UiText.CreateEclipseLabel(
      prism,
      "There are no mistakes.",
      EclipseLabelType.kT3
    );
    text.setAlignment(Alignment.CENTER_CENTER);
    text.setTextAlignment(HorizontalAlignment.kCenter);

    prism.getRootNode().addChild(text);
    setInterval(async () => {
      text.setText("Only");
      await sleep(500);
      text.setText("Only happy");
      await sleep(500);
      text.setText("Only happy little");
      await sleep(500);
      text.setText("Only happy little accidents!");
    }, 5000);
    return 0;
  }
  updateLoop(delta) {
    return true;
  }
}

let app = new App(0.016);
app.run();
