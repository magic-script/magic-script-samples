import { LandscapeApp } from 'lumin';
import { Controller } from "./Controller.js";

export class App extends LandscapeApp {
  onAppStart() {
    // Create a new prism that's half a meter cubed.
    let prism = this.requestNewPrism([0.5, 0.5, 0.5]);

    // Set a custom prism controller to handle the rest.
    prism.setPrismController(new Controller());
  }
}