import { LandscapeApp, ui } from 'lumin';
const { UiText, EclipseLabelType, Alignment, HorizontalTextAlignment } = ui;

export class App extends LandscapeApp {
  onAppStart () {
    // Create a new prism that's half a meter cubed.
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);

    // Configure localStorage from polyfills to persist state to disk.
    // This function expects a folder it can write to, don't put anything else in here.
    localStorage.updateBase(this.getWritablePathWhenUnlocked() + "localStorage");

    // First we read the old value from localStorage.
    // If this is our initial load, it will be null, otherwise, it will be a string.
    const oldCount = localStorage.getItem('count');

    // Convert the old value to a number (defaulting to zero) and increment.
    const count = Number(oldCount || '0') + 1;

    // Store the new count so next time, it will increment again.
    localStorage.setItem('count', String(count));


    // Create a nice text label using UIKit.
    let text = UiText.CreateEclipseLabel(
      prism,
      'Hello\nMagicScript! times ' + count,
      EclipseLabelType.kT7
    );
    text.setAlignment(Alignment.CENTER_CENTER);
    text.setTextAlignment(HorizontalTextAlignment.kCenter);

    // Attach the label to the root of the prism's scene graph.
    prism.getRootNode().addChild(text);
  }

  // Known Issue
  // Web Inspector does not work unless the updateLoop function is present in source.
  // It can be removed for production code.
  updateLoop (delta: number) {
    return true;
  }

  init () {
    return 0;
  }
}
