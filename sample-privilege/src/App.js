import { ui } from 'lumin';
import { makeButton } from './button.js';

export default async function start (app) {
  let prism = app.requestNewPrism([0.75, 0.75, 0.75]);
  let text = ui.UiText.CreateEclipseLabel(
    prism,
    'Hello\nMagicScript!',
    ui.EclipseLabelType.kT7
  );
  text.setAlignment(ui.Alignment.CENTER_CENTER);
  text.setTextAlignment(ui.HorizontalTextAlignment.kCenter);
  prism.getRootNode().addChild(text);

  let button = makeButton(prism, app, text);
  button.setLocalPosition([0, -0.15, 0]);
  prism.getRootNode().addChild(button);
  return prism;
}
