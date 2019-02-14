import { LandscapeApp, VideoEventData, ViewMode, ui } from "lumin";

export class App extends LandscapeApp {
  init() {
    const prism = this.requestNewPrism([1.0, 0.5, 0.5]);

    // Add VideoNode with 1920 x 1080
    const videoNode = prism.createVideoNode(1920, 1080);
    const statusCode = videoNode.setVideoPath('res/PumpkinCandleH264.mp4');
    console.log("setVideoPath - result: " + statusCode);

    videoNode.setLocalPosition([-0.5, -0.25, 0]);
    videoNode.setLocalScale([0.960, 0.540, 0]);
    videoNode.setViewMode(ViewMode.kFullArea);
    videoNode.setVolume(0.9);

    prism.getRootNode().addChild(videoNode);

 
    // Add Toggle
    const toggle = ui.UiToggle.Create(prism, 'Play');
    toggle.setLocalPosition([0.25, -0.15, 0]);
    
    toggle.onActivateSub((event) => {
      if (toggle.getOn()) {
        videoNode.start();
        toggle.setText('Pause');
      } else {
        videoNode.pause();
        toggle.setText('Play');
      }
    });

    prism.getRootNode().addChild(toggle);

    return 0;
  }

  updateLoop(delta) {
    return true;
  }

  eventListener(event) {
    if (event instanceof VideoEventData) {
      console.log("eventListener - VideoEventData type: " + event.getVideoEventType());
    }

    return true;
  }
}
