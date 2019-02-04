//

import { ui } from "lumin";

function onPress(prism, id) {
  // FIXME: Convert to a more appropriate system API
  let sound = prism.getSound(id);
  if (sound) {
    let audio_node = prism.createAudioNode();
    if (audio_node) {
      audio_node.createWithSound(sound);
      // 0 to 8, with 0 for silence,  1 for unity gain, and 8 for 8x gain
      audio_node.setSoundVolumeLinear(5);
      audio_node.startSound();
    }
  }
}

export function makeButton(prism, id) {
  const { UiButton } = ui;
  let node = UiButton.Create(prism, id, 0, 0.1);
  console.log("makeButton");
  node.onActivateSub(function(uiEventData) {
    onPress(prism, id);
  });
  return node;
}
