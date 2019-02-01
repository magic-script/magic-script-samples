//

import { ui } from "lumin";

var current = 0;

function onPress(pageview, count) {
  console.log("onPress triggered!");
  current = ++current % count;
  pageview.showPage(current);
}

export function makeButton(prism, pageview, count) {
  const { UiButton, EclipseButtonParams, EclipseButtonType } = ui;
  let prms = new EclipseButtonParams(EclipseButtonType.kText, "Next Page");
  let node = UiButton.CreateEclipseButton(prism, prms);
  console.log("makeButton");
  node.onActivateSub(function(uiEventData) {
    onPress(pageview, count);
  });
  return node;
}
