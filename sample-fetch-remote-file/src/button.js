//
import { ui } from "lumin";

async function basicFetch(text) {
  text.setText("basicFetch - start");
  let response = await fetch("http://jsonplaceholder.typicode.com/todos/1");
  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }
  let json = await response.json();
  console.log(json);

  let string = "basicFetch - Success:\n";
  string += JSON.stringify(json);
  text.setText(string);
}

export function makeButton(prism, text) {
  const { UiButton, EclipseButtonParams, EclipseButtonType } = ui;
  let prms = new EclipseButtonParams(EclipseButtonType.kText, "Press me");
  let node = UiButton.CreateEclipseButton(prism, prms);
  node.onActivateSub(uiEventData => {
    basicFetch(text).catch(error => {
      text.setText("basicFetch - Error: " + error.message);
    });
  });
  return node;
}
