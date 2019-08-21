import React from 'react';

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { counter: props.counter, message: 'placeholder' };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
  }

  onButtonClick(event) {
    this.setState( state => ({ counter: state.counter + 1 }) );
  }

  onTextChanged(event) {
    console.log(event);
  }

  render() {
    return (
      <view name='main-view'>
        <text localPosition={[0, 0.25, 0]} textSize={0.10} textColor={[0.1, 1, 0.1, 0.84]}>{this.state.counter}</text>
        <button width={0.25} height={0.10} roundness={0.5} onClick={this.onButtonClick}>ClickMe</button>
      </view>
    );
  }
}
