//

import { ui } from "lumin";
import { setTimeout, fetch } from "./builtins.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function onPress(node, text) {
  text.setText("onPress - start");
  await sleep(1000);
  text.setText("onPress - end");
}

async function basicFetch(text) {
  text.setText("basicFetch - start");
  fetch("file://res/products.json")
    .then(function(response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(function(json) {
      let string = "basicFetch - Success:\n";
      for (var i = 0; i < json.products.length; i++) {
        string += "\n";
        string += json.products[i].Name;
        string += " can be found in " + json.products[i].Location + ".";
        string += " Cost: $" + json.products[i].Price;
      }
      text.setText(string);
    })
    .catch(function(error) {
      text.setText("basicFetch - Error: " + error.message);
    });
  //text.setText("basicFetch - end");
}

export function makeButton(prism, text) {
  const { UiButton, EclipseButtonParams, EclipseButtonType } = ui;
  let prms = new EclipseButtonParams(EclipseButtonType.kText, "Press me");
  let node = UiButton.CreateEclipseButton(prism, prms);
  node.onActivateSub(async function(uiEventData) {
    basicFetch(text);
  });
  return node;
}
