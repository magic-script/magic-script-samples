import React from "react";
import {
  View,
  ScrollView,
  ScrollBar,
  Text,
  LinearLayout,
  RectLayout,
  Image,
  Prism,
  Scene
} from "magic-script-components";

export class ExampleScrollView extends React.Component {
  render() {
    const contacts = [
      { name: 'Lorem Ipsum    ', email: 'lorem@magicleap.com ', image: require('../../resources/contact1.jpg'), phone: '(555)-123-1234' },
      { name: 'Little Kitten  ', email: 'kitten@magicleap.com', image: require('../../resources/contact2.jpg'), phone: '(555)-123-1234' },
      { name: 'Lorem Ipsum 2  ', email: 'lorem@magicleap.com ', image: require('../../resources/contact1.jpg'), phone: '(555)-123-1234' },
      { name: 'Little Kitten 2', email: 'kitten@magicleap.com', image: require('../../resources/contact2.jpg'), phone: '(555)-123-1234' },
      { name: 'Lorem Ipsum 3  ', email: 'lorem@magicleap.com ', image: require('../../resources/contact1.jpg'), phone: '(555)-123-1234' },
      { name: 'Little Kitten 3', email: 'kitten@magicleap.com', image: require('../../resources/contact2.jpg'), phone: '(555)-123-1234' }
    ];

    const aabb = {
      min: [-0.3, -0.2, -0.3],
      max: [0.3, 0.15, 0.3]
    };

    return (
      <Scene>
        <Prism size={[1, 1, 1]} >
          <View name="main-view" alignment={'center-center'}>
            <ScrollView scrollBarVisibility="auto" scrollBounds={aabb}>
              <ScrollBar length={0.6} thumbSize={0.03} orientation="vertical" />
              <LinearLayout
                defaultItemAlignment="center-left"
                orientation="vertical"
              >
                {contacts.map((contact, index) => (
                  <RectLayout  key={contact.name} width={0.35} contentAlignment={'top-left'}>
                    <View>
                      <Image localPosition={[0, 0, 0]} height={0.17} width={0.17} filePath={contact.image} />
                      <Text localPosition={[0.2, 0.05, 0]} alignment={'center-left'} textSize={0.07} weight={"bold"} textColor={"#85D834"} >
                        {contact.name}
                      </Text>
                      <Text localPosition={[0.2, 0, 0]} alignment={'center-left'} textSize={0.05} textColor={"#e0e0e0"} >
                        {contact.email}
                      </Text>
                      <Text localPosition={[0.2, -0.05, 0]} alignment={'center-left'} textSize={0.05} textColor={"#B5B5B5"}>
                        {contact.phone}
                      </Text>
                    </View>
                  </RectLayout>
                ))}
              </LinearLayout>
            </ScrollView>
          </View>
        </Prism>
      </Scene>
    );
  }
}