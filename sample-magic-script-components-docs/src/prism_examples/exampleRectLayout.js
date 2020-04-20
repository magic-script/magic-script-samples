import React from "react";
import { View, RectLayout, Image, Line, Prism, Scene } from "magic-script-components";

export class ExampleRectLayout extends React.Component {
  render() {
    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <Line color={'white'} points={[[-0.2, 0.2, 0], [0, 0.2, 0], [0, 0, 0], [-0.2, 0, 0], [-0.2, 0.2, 0]]} />
            <RectLayout
              localPosition={[-0.2, 0.2, 0]}
              width={0.2}
              height={0.2}
              contentAlignment="top-left"
            >
              <Image width={0.1} height={0.1} color={'red'} />
            </RectLayout>

            <Line color={'white'} points={[[0, 0.2, 0], [0.2, 0.2, 0], [0.2, 0, 0], [0, 0, 0], [0, 0.2, 0]]} />
            <RectLayout
              localPosition={[0, 0.2, 0]}
              width={0.2}
              height={0.2}
              contentAlignment="top-right"
            >
              <Image width={0.1} height={0.1} color={'blue'} />
            </RectLayout>

            <Line color={'white'} points={[[-0.2, 0, 0], [0, 0, 0], [0, -0.2, 0], [-0.2, -0.2, 0], [-0.2, 0, 0]]} />
            <RectLayout
              localPosition={[-0.2, 0, 0]}
              width={0.2}
              height={0.2}
              contentAlignment="bottom-left"
            >
              <Image width={0.1} height={0.1} color={'yellow'} />
            </RectLayout>

            <Line color={'white'} points={[[0, 0, 0], [0.2, 0, 0], [0.2, -0.2, 0], [0, -0.2, 0], [0, 0, 0]]} />
            <RectLayout
              localPosition={[0, 0, 0]}
              width={0.2}
              height={0.2}
              contentAlignment="bottom-right"
            >
              <Image width={0.1} height={0.1} color={'green'} />
            </RectLayout>
          </View>
        </Prism>
      </Scene>
    );
  }
}