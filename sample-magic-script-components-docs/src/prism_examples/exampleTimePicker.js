import React from "react";
import { View, TimePicker, TextEdit, DatePicker, LinearLayout, Button, Scene, Prism } from "magic-script-components";

export class ExampleTimePicker extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    const startHour = date.getHours() + 1
    const endHour = date.getHours() + 2

    this.state = { startTime: startHour + ":00:00", endTime: endHour + ":00:00" };
  }

  onDateConfirmed = event => {
    // event.Date, event.DateString
    console.log("onDateConfirmed event received: ", event);
  };

  onTimeConfirmed = event => {
    // event.Time, event.TimeString
    console.log("onTimeConfirmed event received: ", event);
  };

  render() {
    const { startTime, endTime } = this.state
    return (
      <Scene>
        <Prism size={[1, 1, 0.2]} >
          <LinearLayout
            name="main-view"
            localPosition={[0, 0, 0]}
            alignment="center-center"
            itemPadding={[
              { index: 0, padding: [0, 0, 0.06, 0] },
              { index: 2, padding: [0, 0, 0.04, 0] },
              { index: 3, padding: [0, 0, 0.08, 0] },
            ]}>
            <TextEdit hint='Event Title' height={0.075} textSize={0.07} width={0.7} />

            <LinearLayout orientation="horizontal">
              <DatePicker label="Starts" labelSide="left" showHint={false} onDateConfirmed={this.onDateConfirmed} />
              <TimePicker labelSide="left" time={startTime} timeFormat={"HH:MM p"} showHint={false} onTimeConfirmed={this.onTimeConfirmed} />
            </LinearLayout>

            <LinearLayout orientation="horizontal">
              <DatePicker label="Ends" labelSide="left" showHint={false} onDateConfirmed={this.onDateConfirmed} />
              <TimePicker labelSide="left" time={endTime} timeFormat={"HH:MM p"} showHint={false} onTimeConfirmed={this.onTimeConfirmed} />
            </LinearLayout>

            <TextEdit hint='Add notes or comments' multiline={true} height={0.15} textSize={0.05} width={0.7} />

            <View>
              <Button localPosition={[-0.2, 0, 0]} text="Accept" textSize={0.06} roundness={1} />
              <Button localPosition={[0.2, 0, 0]} text="Reject" textSize={0.06} roundness={1} />
            </View>
          </LinearLayout>
        </Prism>
      </Scene>
    );
  }
}