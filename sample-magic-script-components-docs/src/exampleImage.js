import React from 'react';
import { View, Image, Text } from 'magic-script-components';

export class ExampleImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }
  onNextClick = eventData => {
    this.setState(state => ({ index: state.index < 3 ? state.index + 1 : 1 }));
  };

  render() {
    return (
      <View localPosition={[-0.16, 0, 0]}>
        <Image localPosition={[-0.13, 0, 0]} height={0.17} width={0.17} filePath={require('../resources/contact1.png')}/>
          <Text alignment={'center-left'} textSize={0.07} weight={"bold"} textColor={"#85D834"} localPosition={[0, 0.05, 0]}>
          Lorem Ipsum
          </Text>
        <Image alignment={'center-left'} height={0.07} icon={"send"} localPosition={[0, -0.03, 0]} />
        <Text alignment={'center-left'} textSize={0.04} textColor={"#e0e0e0"} localPosition={[0.1, -0.03, 0]}>
          lorem.lpsum@magicleap.com
          </Text>

      </View>
    );
  }
}