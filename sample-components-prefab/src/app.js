import React from 'react';
import { TextSlider } from './components/index.js';

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.instructions = [
      'Step 1:\nThis is prefab demo app created for fun :D',
      'Step 2:\nCreating prefabs requires you to enjoy fun !',
      'Step 3:\nEnjoying fun is a crucial element of creating prefabs.',
      'Step 4:\nAnother crucial requirement is completion of\nmagic-script-components',
    ];
  }

  render() {
    return (
      <view name='main-view'>
        <TextSlider items={this.instructions} initialPosition={0} caption={'Instructions'}></TextSlider>
      </view>
    );
  }
}
