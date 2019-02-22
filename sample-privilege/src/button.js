import { ui, PrivilegeId } from "lumin";

var counter = 0;

function onPress(node, app, text) {
  console.log("onPress triggered!");
  counter++;
  var result = app.requestPrivilegeBlocking(PrivilegeId.kLocalAreaNetwork);
  print("privilege response", result);
  node.setText("Request Again");
  text.setText("Privilge " + ((result == 1) ? "Granted" : "Not Granted"));
}

export function makeButton(prism, app, text) {
  const { UiButton } = ui;
  let node = UiButton.Create(prism, "Request Privilege", 0, 0.1);
  console.log("makeButton");
  node.onActivateSub(function(uiEventData) {
    onPress(node, app, text);
  });
  return node;
}
