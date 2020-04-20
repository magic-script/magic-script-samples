import React from "react";
import { GridLayout, Text, View, Image, Scene, Prism } from "magic-script-components";

export class ExampleGridLayout extends React.Component {
  render() {
    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <GridLayout alignment={'center-center'} rows={3} defaultItemPadding={[0.02, 0.02, 0.02, 0.02]}>
              <View>
                <Image color="#7e7e7e" width={0.3} height={0.3} />
                <Text text='1' alignment="center-center" textColor="#151515" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
              <View>
                <Image color="#2a2a2a" width={0.3} height={0.3} />
                <Text text='2' alignment="center-center" textColor="#bdbdbd" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
              <View>
                <Image color="#7e7e7e" width={0.3} height={0.3} />
                <Text text='3' alignment="center-center" textColor="#151515" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
              <View>
                <Image color="#2a2a2a" width={0.3} height={0.3} />
                <Text text='4' alignment="center-center" textColor="#bdbdbd" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
              <View>
                <Image color="#7e7e7e" width={0.3} height={0.3} />
                <Text text='5' alignment="center-center" textColor="#151515" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
              <View>
                <Image color="#2a2a2a" width={0.3} height={0.3} />
                <Text text='6' alignment="center-center" textColor="#bdbdbd" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
              <View>
                <Image color="#7e7e7e" width={0.3} height={0.3} />
                <Text text='7' alignment="center-center" textColor="#151515" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
              <View>
                <Image color="#2a2a2a" width={0.3} height={0.3} />
                <Text text='8' alignment="center-center" textColor="#bdbdbd" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
              <View>
                <Image color="#7e7e7e" width={0.3} height={0.3} />
                <Text text='9' alignment="center-center" textColor="#151515" textSize={0.08} localPosition={[0, 0, 0.02]} />
              </View>
            </GridLayout>
          </View>
        </Prism>
      </Scene>
    );
  }
}