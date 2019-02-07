
import { LandscapeApp, ui } from "lumin";

import { setTimeout, setInterval, fetch } from "./builtins.js";

class App extends LandscapeApp {
  async init() {
    const DEFAULT_REQUEST_DELAY = 3000;

    const prism = this.requestNewPrism([1.0, 0.5, 0.5]);

    const label = ui.UiText.CreateEclipseLabel(prism, "Waiting for data ...", ui.EclipseLabelType.kT7);
    label.setAlignment(ui.Alignment.CENTER_CENTER);
    label.setTextAlignment(ui.HorizontalAlignment.kCenter);

    prism.getRootNode().addChild(label);

    let requestId = 1;
  
    let data = await this.requestDataImmediate(requestId);
    label.setText(`Request ${data.request} completed`);
    
    requestId++;
    data = await this.requestDataDelayed(requestId, DEFAULT_REQUEST_DELAY);
    label.setText(`Request ${data.request} completed in ${data.duration} ms`);

    return 0;
  }
  updateLoop(delta) {
    return true;
  }
  eventListener(event) {
    return true;
  }

  async requestDataImmediate(requestId) {
    // Returning a non-promise value in async function
    // directs JS to automatically wrap the value in resolved promise
    // return {request: requestId, duration: 0} == return Promise.resolve({request: requestId, duration: 0});
    return {request: requestId, duration: 0};
  }

  async requestDataDelayed(requestId, delay) {
    const timeStart = Date.now();
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve({request: requestId, duration: Date.now() - timeStart}), delay));
  }
}

let app = new App(0.016);
app.run();
