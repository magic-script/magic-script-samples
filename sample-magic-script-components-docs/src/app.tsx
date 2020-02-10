import React from 'react';
import { View, Button, LinearLayout, DropdownList, DropdownListItem, Line, Image } from 'magic-script-components';
import {
  ExampleButton,
  ExampleCircleConfirmation,
  ExampleColorPicker,
  ExampleContent,
  ExampleDatePicker,
  ExampleDialog,
  ExampleDropdownList,
  ExampleDropdownListItem,
  ExampleGridLayout,
  ExampleImage,
  ExampleLight,
  ExampleLine,
  ExampleLinearLayout,
  ExampleListView,
  ExampleListViewItem,
  ExampleModel,
  ExamplePageView,
  ExamplePanel,
  ExamplePortalIcon,
  ExampleProgressBar,
  ExampleRectLayout,
  ExampleScrollBar,
  ExampleScrollView,
  ExampleSlider,
  ExampleSpinner,
  ExampleTab,
  ExampleText,
  ExampleTextEdit,
  ExampleTimePicker,
  ExampleToggle,
  ExampleToggleGroup,
  ExampleVideo,
  ExampleWebView,
} from './'


export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.scenes = [
      { name: 'Button', component: <ExampleButton localPosition={[0, 0, 0]} /> },
      { name: 'CircleConfirmation', component: <ExampleCircleConfirmation localPosition={[0, 0, 0]} /> },
      { name: 'ColorPicker', component: <ExampleColorPicker localPosition={[0, 0, 0]} /> },
      { name: 'Content', component: <ExampleContent localPosition={[0, 0, 0]} /> },
      { name: 'DatePicker', component: <ExampleDatePicker localPosition={[0, 0, 0]} /> },
      { name: 'Dialog', component: <ExampleDialog localPosition={[0, 0, 0]} /> },
      { name: 'DropdownList', component: <ExampleDropdownList localPosition={[0, 0, 0]} /> },
      { name: 'DropdownListItem', component: <ExampleDropdownListItem localPosition={[0, 0, 0]} /> },
      { name: 'GridLayout', component: <ExampleGridLayout localPosition={[0, 0, 0]} /> },
      { name: 'Image', component: <ExampleImage localPosition={[0, 0, 0]} /> },
      { name: 'Light', component: <ExampleLight localPosition={[0, 0, 0]} /> },
      { name: 'Line', component: <ExampleLine localPosition={[0, 0, 0]} /> },
      { name: 'LinearLayout', component: <ExampleLinearLayout localPosition={[0, 0, 0]} /> },
      { name: 'ListView', component: <ExampleListView localPosition={[0, 0, 0]} /> },
      { name: 'ListViewItem', component: <ExampleListViewItem localPosition={[0, 0, 0]} /> },
      { name: 'Model', component: <ExampleModel localPosition={[0, 0, 0]} /> },
      { name: 'PageView', component: <ExamplePageView localPosition={[0, 0, 0]} /> },
      { name: 'Panel', component: <ExamplePanel localPosition={[0, 0, 0]} /> },
      // { name: 'PortalIcon', component: <ExamplePortalIcon localPosition={[0, 0, 0]} /> },
      { name: 'ProgressBar', component: <ExampleProgressBar localPosition={[0, 0, 0]} /> },
      { name: 'RectLayout', component: <ExampleRectLayout localPosition={[0, 0, 0]} /> },
      { name: 'ScrollBar', component: <ExampleScrollBar localPosition={[0, 0, 0]} /> },
      { name: 'ScrollView', component: <ExampleScrollView localPosition={[0, 0, 0]} /> },
      { name: 'Slider', component: <ExampleSlider localPosition={[0, 0, 0]} /> },
      { name: 'Spinner', component: <ExampleSpinner localPosition={[0, 0, 0]} /> },
      { name: 'Tab', component: <ExampleTab localPosition={[0, 0, 0]} /> },
      { name: 'Text', component: <ExampleText localPosition={[0, 0, 0]} /> },
      { name: 'TextEdit', component: <ExampleTextEdit localPosition={[0, 0, 0]} /> },
      { name: 'TimePicker', component: <ExampleTimePicker localPosition={[0, 0, 0]} /> },
      { name: 'Toggle', component: <ExampleToggle localPosition={[0, 0, 0]} /> },
      { name: 'ToggleGroup', component: <ExampleToggleGroup localPosition={[0, 0, 0]} /> },
      { name: 'Video', component: <ExampleVideo localPosition={[0, 0, 0]} /> },
      { name: 'WebView', component: <ExampleWebView localPosition={[0, 0, 0]} /> },
    ];

    const initialIndex = 0
    this.state = { sceneIndex: initialIndex, showGrid: false };
  }

  componentDidMount() {
    // this.handler = setInterval(this.onNextScene, 15000);
  }

  onNextScene = () => {
    const { sceneIndex } = this.state;
    const nextIndex = (sceneIndex + 1) % this.scenes.length;
    this.setState({ sceneIndex: nextIndex });
  }

  onPreviousScene = () => {
    const { sceneIndex } = this.state;
    const prevIndex = (sceneIndex > 0) ? sceneIndex - 1 : this.scenes.length - 1;
    this.setState({ sceneIndex: prevIndex });
  }

  onSceneSelected = event => {
    if (event.selectedItemsIndexes.length > 0) {
      const item = event.selectedItemsIndexes[0];
      this.setState({ sceneIndex: item.id });
    }
  }

  renderDropdownItems() {
    return this.scenes.map((scene, index) => <DropdownListItem key={index} id={`${index}`} label={scene.name.replace(/\n/g, ' ')}/>)
  }

  render() {
    const { sceneIndex } = this.state;
    const scene = this.scenes[sceneIndex];
    return (
      <View name='main-view' alignment={'center-center'} localScale={[0.5, 0.5, 0.5]} localPosition={[0, -0.3, -1]}>
        <View alignment={'center-center'} localPosition={[0, 1.3, 0]}>
          <Button localPosition={[-0.5, 0, 0]} width={0.25} height={0.1} roundness={1} textSize={0.05} onClick={this.onPreviousScene}>Prev</Button>
          {/* <DropdownList alignment={'top-center'} height={0.15} listMaxHeight={1} localPosition={[0, 0, 0]} onSelectionChanged={this.onSceneSelected} text={scene.name} textSize={0.05}> */}
            {/* {this.renderDropdownItems()} */}
          {/* </DropdownList> */}
          <Button localPosition={[0.5, 0, 0]} width={0.25} height={0.1} roundness={1} textSize={0.05} onClick={this.onNextScene}>Next</Button>
        </View>
        
        {/* <View localPosition={[-0.9, 0, 0]} width={1.4} height={1} localPosition={[0, 0.5, -0.3]} defaultItemAlignment={'top-left'}> */}
          {/* <Image color={[0,0,0,1]} localPosition={0,0,0.3} width={1.6} height={1.2} /> */}
        {/* </View> */}

        <View localPosition={[-0.7, 0, 0]} width={1.4} height={1} localPosition={[0, 0.5, 0]} defaultItemAlignment={'top-left'}>
          {scene.component}
        </View>
      </View>
    );
  }
}