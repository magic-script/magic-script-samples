import React from "react";
import {
  ListView,
  ListViewItem,
  Text,
  Image,
  View
} from "magic-script-components";

export class ExampleListView extends React.Component {
  render() {
    const contacts = [
      { name: 'Lorem Ipsum', email: 'lorem.ipsum@magicleap.com', image: require('../resources/contact1.png') },
      { name: 'Little Kitten', email: 'kitten@magicleap.com', image: require('../resources/contact2.png') },
      { name: 'Lorem Ipsum', email: 'lorem.ipsum@magicleap.com', image: require('../resources/contact1.png') },
      { name: 'Lorem Ipsum', email: 'lorem.ipsum@magicleap.com', image: require('../resources/contact1.png') },
    ];

    return (
      <View>
        <Image localPosition={[0, 0, 0]}  height={0.5} color={'#00000055'}/>
        <ListView localPosition={[0, 0, 0]} width={0.7} height={0.5} defaultItemAlignment={'top-left'} defaultItemPadding={[0, 0, 0.02, 0]}>
          {contacts.map((contact, index) => (
            <ListViewItem key={index}>
              <View localPosition={[0, 0, 0]} localScale={[0.8, 0.8, 0.8]}>
                <Image localPosition={[0, 0, 0]} height={0.17} width={0.17} filePath={contact.image} />
                <Text localPosition={[0.13, 0.05, 0]} textSize={0.07} weight={"bold"} textColor={"#85D834"} >
                  {contact.name}
                </Text>
                <Image height={0.07} icon={"send"} localPosition={[0.13, -0.03, 0]} />
                <Text textSize={0.04} textColor={"#e0e0e0"} localPosition={[0.21, -0.03, 0]}>
                  {contact.email}
                </Text>
              </View>
            </ListViewItem>
          ))}
        </ListView>
      </View>
    );
  }
}