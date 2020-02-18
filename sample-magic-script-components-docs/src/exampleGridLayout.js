import React from "react";
import { GridLayout, Text, View } from "magic-script-components";

export class ExampleGridLayout extends React.Component {
  render() {
    return (
      <View name="main-view">
        <GridLayout localPosition={[-0.25, 0.5, 0]} width={0.5} height={0.8} rows={2} columns={2}
          itemAlignment={[
            {row: 0, column: 0, alignment: 'top-right'},
            {row: 0, column: 1, alignment: 'bottom-left'},
            {row: 1, column: 0, alignment: 'top-left'},
            {row: 1, column: 1, alignment: 'bottom-right'}
          ]}
        >
          <Text textSize={0.08} text='Europa' />
          <Text textSize={0.06} text='Atlas' />
          <Text textSize={0.1 } text='Callisto' />
          <Text textSize={0.03} text='Dia' />
        </GridLayout>
      </View>
    );
  }
}