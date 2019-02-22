import { LandscapeApp, ui } from 'lumin';
import { makeButton } from "./button.js";

export class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.75, 0.75, 0.75]);
    let text = ui.UiText.CreateEclipseLabel(
      prism,
      'Hello\nMagicScript!',
      ui.EclipseLabelType.kT7
    );
    text.setAlignment(ui.Alignment.CENTER_CENTER);
    text.setTextAlignment(ui.HorizontalAlignment.kCenter);
    prism.getRootNode().addChild(text);

    let button = makeButton(prism, this, text);
    button.setLocalPosition([0, -0.15, 0]);
    prism.getRootNode().addChild(button);
    return 0;
  }
  updateLoop(delta) {
    return true;
  }
}
