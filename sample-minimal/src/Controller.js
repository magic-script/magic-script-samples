import { PrismController } from 'lumin';

export class Controller extends PrismController {
  onAttachPrism() {
    let prism = this.getPrism();

    // Load a model file into a node.
    let id = prism.createModelResourceId("res/DamagedHelmet.glb", 0.2);
    let model = prism.createModelNode(id);

    // Attach the model to the scene graph so it renders.
    this.getRoot().addChild(model);
  }
  onUpdate(delta) {
    return true;
  }
  onEvent(event) {
    return true;
  }
}