import { ui } from 'lumin';

export default async function start (app) {
  const { UiImage } = ui;
  let prism = app.requestNewPrism([0.5, 0.5, 0.5]);
  let image = UiImage.Create(prism, 'res/cat.png', 0.4, 0.3);
  prism.getRootNode().addChild(image);
  return prism;
}
