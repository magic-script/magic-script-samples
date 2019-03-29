import { ui } from 'lumin';

const INTERVAL_DURATION = 1000; // ms
const MAX_VALUE = 1000;
const INITIAL_VALUE = 1;

export default async function start (app) {
  const prism = app.requestNewPrism([0.5, 0.5, 0.5]);
  const text = ui.UiText.CreateEclipseLabel(prism, 'Initial Label', ui.EclipseLabelType.kT3);
  text.setAlignment(ui.Alignment.CENTER_CENTER);

  prism.getRootNode().addChild(text);

  let counter = INITIAL_VALUE;
  let previousTime = Date.now();

  setInterval(() => {
    const currentTime = Date.now();
    text.setText(`Update ${counter} in ${currentTime - previousTime} ms`);
    previousTime = currentTime;

    if (counter <= MAX_VALUE) {
      counter++;
    } else {
      counter = INITIAL_VALUE;
    }
  }, INTERVAL_DURATION);

  return prism;
}
