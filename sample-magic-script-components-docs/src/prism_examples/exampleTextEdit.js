import React from 'react';
import { TextEdit, LinearLayout, Text, Button, View, Prism, Scene } from 'magic-script-components';

export class ExampleTextEdit extends React.Component {
  render() {
    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <View name="main-view" alignment={'center-center'}>
            <LinearLayout
              orientation='horizontal'
              defaultItemAlignment='center-center'
              defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
              localPosition={[-0.2, 0.1, 0]}
            >
              <Text textSize={0.05} textColor={"#B5B5B5"} localPosition={[0.1, 0, 0]}>Login:</Text>
              <TextEdit text='LoremIpsum' height={0.054} textSize={0.05} width={0.3} />
            </LinearLayout>
            <LinearLayout
              orientation='horizontal'
              defaultItemAlignment='center-center'
              defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
              localPosition={[-0.2, 0, 0]}
            >
              <Text textSize={0.05} textColor={"#B5B5B5"} localPosition={[0.1, 0, 0]}>Password:</Text>
              <TextEdit password={true} text='secretpassword' height={0.054} textSize={0.05} width={0.3} />
            </LinearLayout>

            <Button localPosition={[0, -0.2, 0]} text='login' textSize={0.05} />
          </View>
        </Prism>
      </Scene>
    );
  }
}