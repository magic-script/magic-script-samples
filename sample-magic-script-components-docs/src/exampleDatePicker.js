import React from 'react';
import { DatePicker } from 'magic-script-components';

export class ExampleDatePicker extends React.Component {

    onDateChanged = event => {
        // event.Date, event.DateString
        console.log("onDateChanged event received: ", event);
      };
    
      onDateConfirmed = event => {
        // event.Date, event.DateString
        console.log("onDateConfirmed event received: ", event);
      };

    render() {
        return (
            <DatePicker
                label="Select Date"
                labelSide="left"
                color={[0.112, 0.655, 0.766, 1]}
                defaultDate="03/21/2019"
                showHint={false}
                height={0.3}
                yearMin={1990}
                yearMax={2020}
                localScale={[2, 2, 0]}
                onDateChanged={this.onDateChanged}
                onDateConfirmed={this.onDateConfirmed}
            />
        );
    }
}