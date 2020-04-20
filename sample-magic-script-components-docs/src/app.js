import React from 'react';
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
} from './prism_examples'

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
      { name: 'DropdownList', component: <ExampleDropdownList localPosition={[0, 0.2, 0]} /> },
      { name: 'DropdownListItem', component: <ExampleDropdownListItem localPosition={[0, 0.3, 0]} /> },
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
      { name: 'PortalIcon', component: <ExamplePortalIcon localPosition={[0, 0, 0]} /> },
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

    const initialIndex = this.scenes.findIndex((item) => item.name == 'WebView');
    this.state = { sceneIndex: initialIndex };
  }

  render() {
    const { sceneIndex } = this.state;
    const component = this.scenes[sceneIndex].component;
    return (
      component
    );
  }
}