import React from "react";
import { View, PageView, Content, Text, Toggle } from "magic-script-components";

export class ExampleToggle extends React.Component {
  state = { pageIndex: 0 };
  
  onSwitchHandler = eventData => {
    this.setState({ pageIndex: eventData.On ? 1 : 0 });
  };

  render() {
    return (
      <View name="main-view">
        <Toggle
          localPosition={[0, -0.25, 0]}
          text="Switch Page"
          onToggleChanged={this.onSwitchHandler}
        />
        <PageView name="page-view" visiblePage={this.state.pageIndex}>
          <Content name="page-0">
            <Text textSize={0.1}>Page One</Text>
          </Content>
          <Content name="page-1">
            <Text textSize={0.1}>Page Two</Text>
          </Content>
        </PageView>
      </View>
    );
  }
}