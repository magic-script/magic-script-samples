import { makeText } from './text.js';
import { makeButton } from './button.js';

export default async function start (app) {
  let prism = app.requestNewPrism([0.7, 0.5, 0.2]);
  // Add text label
  let text = makeText(prism);
  prism.getRootNode().addChild(text);
  text.setLocalPosition([0, 0.1, 0]);
  // Add button
  let button = makeButton(prism, text);
  button.setLocalPosition([0, -0.1, 0]);
  prism.getRootNode().addChild(button);
  return prism;
}
