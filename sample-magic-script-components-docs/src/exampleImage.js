import React from 'react';
import { View, Image, Button } from 'magic-script-components';

export class ExampleImage extends React.Component {
  constructor(props) {
    super(props);
  this.state = { index: 0 };

  this.images=[
    require('../resources/DemoPicture1.jpg'),
    require('../resources/DemoPicture2.jpg'),
    require('../resources/DemoPicture3.jpg'),
    require('../resources/DemoPicture4.jpg')
  ]
}
  onNextClick = eventData => {
    this.setState(state => ({ index: state.index < 3 ? state.index + 1 : 1 }));
  };

  render() {
    const path = this.images[this.state.index]

    return (
      <View>
        <Image
          filePath={path}
          height={0.25}
          width={0.5}
        />
        <Button
          localPosition={[0.12, -0.17, 0]}
          width={0.25}
          height={0.1}
          roundness={0.5}
          labelSide='left'
          type='icon'
          iconType='arrow-right'
          text='Next'
          onClick={this.onNextClick}
        />
      </View>
    );
  }
}