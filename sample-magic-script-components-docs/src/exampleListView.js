import React from "react";
import {
  ListView,
  ListViewItem,
  Text,
  Image,
  View,
  RectLayout,
  ScrollBar
} from "magic-script-components";

export class ExampleListView extends React.Component {
  render() {
    const contacts = [
      { name: 'Lorem Ipsum    ', email: 'lorem@magicleap.com ', image: require('../resources/contact1.jpg'), phone: '(555)-123-1234' },
      { name: 'Little Kitten  ', email: 'kitten@magicleap.com', image: require('../resources/contact2.jpg'), phone: '(555)-123-1234' },
      { name: 'Lorem Ipsum 2  ', email: 'lorem@magicleap.com ', image: require('../resources/contact1.jpg'), phone: '(555)-123-1234' },
      { name: 'Little Kitten 2', email: 'kitten@magicleap.com', image: require('../resources/contact2.jpg'), phone: '(555)-123-1234' },
      { name: 'Lorem Ipsum 3  ', email: 'lorem@magicleap.com ', image: require('../resources/contact1.jpg'), phone: '(555)-123-1234' },
      { name: 'Little Kitten 3', email: 'kitten@magicleap.com', image: require('../resources/contact2.jpg'), phone: '(555)-123-1234' }
    ];

    return (
      <View>
        <ListView localPosition={[0, 0, 0]} width={0.7} height={0.5} defaultItemAlignment={'top-left'} defaultItemPadding={[0, 0, 0.01, 0]}>
          <ScrollBar length={0.5} thumbSize={0.03} />
          {contacts.map((contact, index) => (
            <ListViewItem key={index}>
              <RectLayout width={0.35} contentAlignment={'top-left'}>
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
            </ListViewItem>
          ))}
        </ListView>
      </View>
    );
  }
}