//
import { LandscapeApp, ui } from "lumin";
import { makePage } from "./page.js";
import { makeButton } from "./button.js";

class App extends LandscapeApp {
  init() {
    const { UiPageView, Alignment } = ui;
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);

    // Create page view
    let pageview = UiPageView.Create(prism);
    pageview.setLocalPosition([0, 0.2, 0]);
    pageview.setAlignment(Alignment.CENTER_CENTER);
    prism.getRootNode().addChild(pageview);

    // Add pages
    // TODO: Use libuv API to traverse local directory
    let count = 5;
    pageview.addPage(makePage(prism, "res/pic_1.png"));
    pageview.addPage(makePage(prism, "res/pic_2.png"));
    pageview.addPage(makePage(prism, "res/pic_3.png"));
    pageview.addPage(makePage(prism, "res/pic_4.png"));
    pageview.addPage(makePage(prism, "res/pic_5.png"));

    // Add button
    let button = makeButton(prism, pageview, count);
    button.setLocalPosition([0, -0.2, 0]);
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
