import React from 'react';
import { ScrollView, ScrollBar, Content, Text, Button } from 'magic-script-components';

export class ExampleContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const aabb = {
      min: [-0.1, -0.3, -0.1],
      max: [0.15, 0.3, 0.1]
    };

    return (
      <ScrollView scrollBounds={aabb}>
        <Content>
          {Array(10).fill(0).map((value, index) => <Text key={index} localPosition={[0, -0.1 * index, 0]} text={`Item ${index + 1}`} textSize={0.08} />)}
        </Content>
      </ScrollView>
    );
  }
}