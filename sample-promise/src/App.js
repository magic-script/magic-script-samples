import { ui } from 'lumin';

const WORK_DURATION = 3000;

export default async function start (app) {
  const INTIAL_VALUE = 1;
  const MAX_VALUE = 1000;

  const prism = app.requestNewPrism([1.0, 0.5, 0.5]);

  // Label
  const label = ui.UiText.CreateEclipseLabel(prism, 'Idle', ui.EclipseLabelType.kT3);
  label.setAlignment(ui.Alignment.CENTER_CENTER);
  prism.getRootNode().addChild(label);

  // Button
  let counter = INTIAL_VALUE;
  const button = ui.UiButton.Create(prism, 'Request Work');
  button.setLocalPosition([0.0, -0.125, 0.125]);
  button.onActivateSub((event) => {

    if (counter <= MAX_VALUE) {
      counter++;
    } else {
      counter = INTIAL_VALUE;
    }

    doWork(counter)
      .then(value => label.setText(`Request ${value.request} completed in ${value.duration} ms`))
      .catch(error => label.setText(`Error: ${error}`));

  });
  function doWork(count) {
    const startTime = Date.now();
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve({ request: count, duration: Date.now() - startTime }), WORK_DURATION)
    );
  }

  prism.getRootNode().addChild(button);
  return prism;
}
