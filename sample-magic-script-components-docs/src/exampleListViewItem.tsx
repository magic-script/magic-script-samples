import React from "react";
import {
  ScrollBar,
  ListView,
  ListViewItem,
  Text
} from "magic-script-components";

export  class ExampleListViewItem extends React.Component {
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

    const oddColor = [0.25, 0.5, 0.75, 1];
    const evenColor = [0.75, 0.5, 0.25, 1];

    return (
      <ListView localPosition={[-0.15, -0.15, 0]} width={0.5} height={0.6}>
        <ScrollBar width={0.5} thumbSize={0.03} />
        {moons.map((moon, index) => (
          <ListViewItem backgroundColor={index % 2 ? evenColor : oddColor}>
            <Text key={index} textSize={0.1}>
              {moon}
            </Text>
          </ListViewItem>
        ))}
      </ListView>
    );
  }
}