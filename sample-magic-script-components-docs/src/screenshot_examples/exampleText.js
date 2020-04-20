import React from 'react';
import { Text, View, Image } from 'magic-script-components';

export class ExampleText extends React.Component {
  render() {
    return (
      <View localPosition={[-0.31, 0, 0]}>
        <Text alignment={'center-left'} textSize={0.1} weight={"bold"} textColor={"#85D834"} localPosition={[0, 0.12, 0]}>
          Lorem Ipsum
        </Text>
        <Image alignment={'center-left'} height={0.07} icon={"phone"}/>
        <Text alignment={'center-left'} textSize={0.05} textColor={"#B5B5B5"} localPosition={[0.1, 0, 0]}>
          (555)-123-1234
        </Text>
        <Image alignment={'center-left'} height={0.07} icon={"send"} localPosition={[0, -0.1, 0]}/>
        <Text alignment={'center-left'} textSize={0.05} textColor={"#e0e0e0"} localPosition={[0.1, -0.1, 0]}>
          lorem.lpsum@magicleap.com
        </Text>
        
      </View>
    );
  }
}
