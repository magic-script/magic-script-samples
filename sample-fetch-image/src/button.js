//
import { ui } from "lumin";

async function basicFetch(app, prism, text) {
  text.setText("basicFetch - start");
  // http://lorempixel.com/800/600/animals/
  let response = await fetch("http://placehold.jp/99ccff/003366/250x150.png");
  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }
  let path = app.getWritablePath();
  let name = "img.png";
  let full_name = path + name;
  await fetch("file://" + full_name, { method: "PUT", body: response.body });

  let string = "basicFetch - Success:\n";
  text.setText(string);

  const { UiImage } = ui;

  let image = UiImage.Create(prism, full_name, 0.4, 0.3);
  prism.getRootNode().addChild(image);
}

export function makeButton(app, prism, text) {
  const { UiButton, EclipseButtonParams, EclipseButtonType } = ui;
  let prms = new EclipseButtonParams(EclipseButtonType.kText, "Press me");
  let node = UiButton.CreateEclipseButton(prism, prms);
  node.onActivateSub(async uiEventData => {
    await basicFetch(app, prism, text).catch(error => {
      text.setText("basicFetch - Error: " + error.message);
    });
  });
  return node;
}
