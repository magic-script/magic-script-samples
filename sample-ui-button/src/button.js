import { ui } from 'lumin';

var counter = 0;

function onPress(node, text) {
  console.log('onPress triggered!');
  counter++;
  node.setText('Press again');
  text.setText('Pressed ' + counter + ' time(s)');
}

export function makeButton(prism, text) {
  const { UiButton } = ui;
  let node = UiButton.Create(prism, 'Press me', 0, 0.1);
  console.log('makeButton');
  node.onActivateSub(function (uiEventData) {
    onPress(node, text);
  });
  return node;
}
