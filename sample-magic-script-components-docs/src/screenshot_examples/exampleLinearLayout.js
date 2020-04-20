import React from "react";
import { LinearLayout, Text, TextEdit } from "magic-script-components";

export class ExampleLinearLayout extends React.Component {
  render() {
    return (
        <LinearLayout
          orientation='vertical'
          alignment="center-center"
          defaultItemAlignment='center-center'
          defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
        >
          <LinearLayout
            orientation='horizontal'
            defaultItemAlignment='center-center'
            defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          >
            <Text textSize={0.05} textColor={"#B5B5B5"} localPosition={[0.1, 0, 0]}>Name:</Text>
            <TextEdit text='Lorem Ipsum' height={0.054} textSize={0.05} width={0.3} />
          </LinearLayout>
          <LinearLayout
            orientation='horizontal'
            defaultItemAlignment='center-center'
            defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          >
            <Text textSize={0.05} textColor={"#B5B5B5"} localPosition={[0.1, 0, 0]}>Age:</Text>
            <TextEdit text='25' height={0.054} textSize={0.05} width={0.3} />
          </LinearLayout>

        </LinearLayout>
    );
  }
}