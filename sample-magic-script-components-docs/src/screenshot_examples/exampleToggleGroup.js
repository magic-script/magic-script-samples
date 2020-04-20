import React from "react";
import { GridLayout, LinearLayout, ToggleGroup, Toggle } from "magic-script-components";

export class ExampleToggleGroup extends React.Component {
  onChangedHandler = (eventData, message) => {
    console.log(`Toggle: ${message}`);
  };

  render() {
    return (
      <GridLayout
        name='main-view'
        columns={2}
        rows={2}
        defaultItemAlignment="center-center"
        defaultItemPadding={[0.03, 0.03, 0.03, 0.03]}
        // localPosition={[-0.35, 0.35, 0]}
        alignment='center-center'
      >
        <ToggleGroup key='regular-toggles-group'>
          <LinearLayout
            key='regular-toggles'
            defaultItemAlignment="center-right"
            defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          >
            <Toggle key='TA' text="Toggle A" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'TA')} />
            <Toggle key='TB' text="Toggle B" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'TB')} />
            <Toggle key='TC' text="Toggle C" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'TC')} />
          </LinearLayout>
        </ToggleGroup>
        <ToggleGroup key='radio-toggles-group'>
          <LinearLayout
            key='radio-toggles'
            defaultItemAlignment="center-right"
            defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          >
            <Toggle key='RA' type='radio' text="Radio A" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'RA')} />
            <Toggle key='RB' type='radio' text="Radio B" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'RB')} />
            <Toggle key='RC' type='radio' text="Radio C" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'RC')} />
          </LinearLayout>
        </ToggleGroup>
        <ToggleGroup key='regular-toggles-multi-group' allowMultipleOn={true}>
          <LinearLayout
            key='regular-toggles-multi'
            defaultItemAlignment="center-right"
            defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          >
            <Toggle key='TMA' text="Toggle MA" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'TMA')} />
            <Toggle key='TMB' text="Toggle MB" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'TMB')} />
            <Toggle key='TMC' text="Toggle MC" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'TMC')} />
          </LinearLayout>
        </ToggleGroup>
        <ToggleGroup key='checkbox-toggles-group' allowMultipleOn={true}>
          <LinearLayout
            key='checkbox-toggles'
            defaultItemAlignment="center-right"
            defaultItemPadding={[0.01, 0.01, 0.01, 0.01]}
          >
            <Toggle key='CA' type='checkbox' text="Checkbox A" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'CA')} />
            <Toggle key='CB' type='checkbox' text="Checkbox B" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'CB')} />
            <Toggle key='CC' type='checkbox' text="Checkbox C" onToggleChanged={(eventData) => this.onChangedHandler(eventData, 'CC')} />
          </LinearLayout>
        </ToggleGroup>
      </GridLayout>
    );
  }
}