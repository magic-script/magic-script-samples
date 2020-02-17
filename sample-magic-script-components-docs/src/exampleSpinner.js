import React from "react";
import {
  GridLayout,
  LinearLayout,
  Spinner,
  Button
} from "magic-script-components";

export class ExampleSpinner extends React.Component {
  state = { progress: 0 };

  clickHanlder = eventData =>
    this.setState(state => ({
      progress: state.progress < 1 ? state.progress + 0.2 : 0
    }));

  render() {
    return (
      <GridLayout
        name="main-view"
        rows={3}
        columns={2}
        defaultItemAlignment="center-center"
        defaultItemPadding={[0.015, 0.015, 0.015, 0.015]}
        localPosition={[-0.45, 0.45, 0]}
      >
        <Spinner type="sprite-animation" height={0.2} determinate={false} />
        <Spinner
          type="sprite-animation"
          height={0.2}
          determinate={true}
          value={0.5}
        />
        <Spinner type="particle-package" height={0.2} determinate={false} />
        <LinearLayout
          orientation="horizontal"
          defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
        >
          <Spinner
            type="particle-package"
            height={0.2}
            determinate={true}
            value={this.state.progress}
          />
          <Button
            type="icon"
            iconType="add"
            height={0.1}
            onClick={this.clickHanlder}
          />
        </LinearLayout>
      </GridLayout>
    );
  }
}