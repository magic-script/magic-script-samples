import React from "react";
import { View, LinearLayout, Text } from "magic-script-components";

export class ExampleLinearLayout extends React.Component {
  render() {
    const moons = [
      "Europa",
      "Ganymede",
      "Io",
      "Callisto",
      "Valetudo",
      "Amalthea",
      "Metis",
      "Ananke",
      "Carme"
    ];

    return (
      <View name="main-view">
        <LinearLayout
          defaultItemAlignment="center-left"
          defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          localPosition={[-0.1, 0.25, 0]}
        >
          {moons.map((moon, index) => (
            <Text textSize={0.05} key={index} text={moon} />
          ))}
        </LinearLayout>
      </View>
    );
  }
}