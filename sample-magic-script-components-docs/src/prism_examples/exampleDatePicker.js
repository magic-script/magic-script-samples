import React from 'react';
import { View, DatePicker, Scene, Prism } from 'magic-script-components';

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
            <Scene>
                <Prism size={[1, 1, 0.2]} >
                    <View name='main-view' alignment={'center-center'} localPosition={[-0.25, 0, 0]}>
                        <DatePicker
                            label="Select Date"
                            labelSide="left"
                            color={[0.112, 0.655, 0.766, 1]}
                            defaultDate="03/21/2019"
                            showHint={false}
                            height={0.3}
                            yearMin={1990}
                            yearMax={2020}
                            onDateChanged={this.onDateChanged}
                            onDateConfirmed={this.onDateConfirmed}
                        />
                    </View>
                </Prism>
            </Scene>
        );
    }
}