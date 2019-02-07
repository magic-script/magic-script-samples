import { LandscapeApp } from "lumin";

class App extends LandscapeApp {
  init() {
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);
    // 1920 x 1080
    let node = prism.createVideoNode(1920, 1080);
    let result = node.setVideoPath("res/video.mp4");
    console.log("setVideoPath - result: " + result);
    node.setLocalPosition([0, 0, 0]);
    //node.setLocalScale([1.920, 1.080, 0]);
    //node.setViewMode(ViewMode.kFullArea);
    prism.getRootNode().addChild(node);
    return 0;
  }
  updateLoop(delta) {
    return true;
  }

  eventListener(event) {
    console.log("eventListener - event: " + event.toString());
    console.log("eventListener - event type: " + typeof event);
    if (event instanceof VideoEventData) {
      let type = event.getVideoEventType();
      console.log("eventListener - VideoEventData type: " + type);
    }
    return true;
  }
}

let app = new App(0.016);
app.run();
