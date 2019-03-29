import { ui } from 'lumin';
const { UiButton } = ui;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function start (app) {
  let prism = app.requestNewPrism([0.4, 0.2, 0.1]);

  let button = UiButton.Create(prism, 'Click Me', 0, 0.1);
  button.onActivateSub(async () => {
    button.setText('Thanks!');
    await sleep(1000);
    button.setText('Again?');
  });
  prism.getRootNode().addChild(button);
  return prism;
}
