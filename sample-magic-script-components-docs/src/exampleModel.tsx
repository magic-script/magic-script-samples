import React from "react";
import { Model, View } from "magic-script-components";

export class ExampleModel extends React.Component {
  render() {
    return (
      <View>
        <Model
          modelPath={"resources/turkey4.fbx"}
          materialPath={"resources/turkey.kmat"}
          texturePaths={["resources/turkey_baseColor.png"]}
          defaultTextureIndex={0}
          defaultTextureSlot={"albedo"}
          defaultMaterialName={"turkey_material"}
          animation={{ name: "idle" }}
          animationPauseState={false}
          animationPlaybackSpeed={1.0}
        />
      </View>
    );
  }
}