import React from "react";
import { LinearLayout, Tab, Text, PageView, Line, Content } from "magic-script-components";

export class ExampleTab extends React.Component {
  state = { activePage: 0 }

  onHomeClicked = () => this.setState({ activePage: 0 })
  onAboutClicked = () => this.setState({ activePage: 1 })
  onContactClicked = () => this.setState({ activePage: 2 })

  render() {
    return (
      <LinearLayout
        alignment='center-center'
        name='top-layout'
        orientation='vertical'
        defaultItemAlignment="center-left"
      >
        <Text textSize={0.05} text='Tabs' />
        <LinearLayout
          name='tab-page-layout'
          defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          defaultItemAlignment="center-left"
          orientation='vertical'
        >
          <LinearLayout
            name='tab-layout'
            defaultItemAlignment="center-left"
            defaultItemPadding={[0.01, 0.02, 0.01, 0.02]}
            orientation='horizontal'
          >
            <Tab text='Home' onClick={this.onHomeClicked}/>
            <Tab text='About' onClick={this.onAboutClicked}/>
            <Tab text='Contact' onClick={this.onContactClicked}/>
          </LinearLayout>
          <Line points={[
              [-0.35, 0.2, 0],
              [ 0.35, 0.2, 0]
            ]}
          />
          <PageView visiblePage={this.state.activePage}>
            <Content name="page-home">
              <Text textSize={0.05}>Welcome ...</Text>
            </Content>
            <Content name="page-about">
              <Text textSize={0.05}>About us ...</Text>
            </Content>
            <Content name="page-contact">
              <Text textSize={0.05}>Contact ...</Text>
            </Content>
          </PageView>
        </LinearLayout>
      </LinearLayout>
    );
  }
}