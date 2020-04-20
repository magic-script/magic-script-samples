import React from "react";
import { Text, Slider, Image, LinearLayout } from "magic-script-components";

export class ExampleSlider extends React.Component {
  state = {
    red: undefined,
    green: undefined,
    blue: undefined,
    alpha: undefined
  };

  onRedChanged = eventData => this.setState({ red: eventData.Value });
  onGreenChanged = eventData => this.setState({ green: eventData.Value });
  onBlueChanged = eventData => this.setState({ blue: eventData.Value });
  onAlphaChanged = eventData => this.setState({ alpha: eventData.Value });

  _setInitialSliderValue = (sliderProps, currentValue, initialValue) => {
    if (currentValue === undefined) {
      sliderProps.value = initialValue;
    }
    return sliderProps;
  };

  render() {
    const sliderProps = { width: 0.8, height: 0.02, min: 0, max: 1 };
    const redProps = this._setInitialSliderValue(
      { ...sliderProps },
      this.state.red,
      0.5
    );
    const greenProps = this._setInitialSliderValue(
      { ...sliderProps },
      this.state.green,
      0.5
    );
    const blueProps = this._setInitialSliderValue(
      { ...sliderProps },
      this.state.blue,
      0.5
    );
    const alphaProps = this._setInitialSliderValue(
      { ...sliderProps },
      this.state.alpha,
      0.5
    );

    const color = [
      this.state.red === undefined ? redProps.value : this.state.red,
      this.state.green === undefined ? greenProps.value : this.state.green,
      this.state.blue === undefined ? blueProps.value : this.state.blue,
      this.state.alpha === undefined ? alphaProps.value : this.state.alpha
    ];

    return (
      <LinearLayout
        name="main-view"
        orientation="vertical"
        defaultItemAlignment="center-left"
        defaultItemPadding={[0.012, 0.012, 0.012, 0.012]}
        localPosition={[-0.45, 0.45, 0]}
      >
        <Image width={0.8} height={0.3} color={color} useFrame={true} />
        <Text textSize={0.05} textColor={[1, 0, 0, 1]} text="Red" />
        <Slider {...redProps} onSliderChanged={this.onRedChanged} />
        <Text textSize={0.05} textColor={[0, 1, 0, 1]} text="Green" />
        <Slider {...greenProps} onSliderChanged={this.onGreenChanged} />
        <Text textSize={0.05} textColor={[0, 0, 1, 1]} text="Blue" />
        <Slider {...blueProps} onSliderChanged={this.onBlueChanged} />
        <Text textSize={0.05} text="Alpha" />
        <Slider {...alphaProps} onSliderChanged={this.onAlphaChanged} />
      </LinearLayout>
    );
  }
}