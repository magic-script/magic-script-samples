import React from 'react';
import { View, CircleConfirmation } from 'magic-script-components';

export class ExampleCircleConfirmation extends React.Component {
    constructor(props) {
        super(props);
    }

    onConfirmationCanceled = event => {
        console.log("onConfirmationCanceled");
    };
    onConfirmationUpdate = event => {
        console.log("onConfirmationUpdate");
    };
    onConfirmationComplete = event => {
        console.log("onConfirmationComplete");
    };


    render() {
        return (
            <View>
                <CircleConfirmation
                    onConfirmationCanceled={this.onConfirmationCanceled}
                    onConfirmationComplete={this.onConfirmationComplete}
                    onConfirmationUpdate={this.onConfirmationUpdate}
                    radius={0.2}
                ></CircleConfirmation>
            </View>
        );
    }
}