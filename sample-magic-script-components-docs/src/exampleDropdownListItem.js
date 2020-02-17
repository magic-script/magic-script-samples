import React from "react";
import { View, DropdownList, DropdownListItem } from "magic-script-components";

export class ExampleDropdownListItem extends React.Component {
  state = { selectedId: undefined };

  onSelection = eventData => {
    console.log("Selected items:", eventData.SelectedItems);
  };

  render() {
    const moons = [
      "Europa",
      "Ganymede",
      "Io",
      "Callisto",
      "Valetudo",
      "Amalthea"
    ];

    return (
      <View name="main-view">
        <DropdownList
          text="Select Moon"
          iconColor={[0.5, 1.0, 0.5, 0.8]}
          onSelectionChanged={this.onSelection}
        >
          {moons.map((moon, index) => (
            <DropdownListItem id={index} label={moon} />
          ))}
        </DropdownList>
      </View>
    );
  }
}