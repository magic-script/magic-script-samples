import React from 'react';
import { View, CircleConfirmation, Scene, Prism } from 'magic-script-components';

export class ExampleCircleConfirmation extends React.Component {
    constructor(props) {
        super(props);
    }

    onConfirmationCanceled = event => {
        console.log("onConfirmationCanceled");
    };
    onConfirmationUpdated = event => {
        console.log("onConfirmationUpdated");
    };
    onConfirmationCompleted = event => {
        console.log("onConfirmationCompleted");
    };


    render() {
        return (
            <Scene>
                <Prism size={[2, 2, 1]} >
                    <View name='main-view' alignment={'center-center'}>
                        <CircleConfirmation
                            onConfirmationCanceled={this.onConfirmationCanceled}
                            onConfirmationCompleted={this.onConfirmationCompleted}
                            onConfirmationUpdated={this.onConfirmationUpdated}
                            radius={0.2}
                        ></CircleConfirmation>
                    </View>
                </Prism>
            </Scene>
        );
    }
}