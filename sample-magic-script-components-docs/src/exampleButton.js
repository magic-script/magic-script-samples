import React from 'react';
import { View, Button } from 'magic-script-components';

export class ExampleButton extends React.Component {
    constructor(props) {
        super(props);
    }

    buttonClickHandler = event => {
        console.log("Hello from buttonClickHandler");
    };

    render() {
        return (
            <View>
                <Button
                    height={0.1}
                    localPosition={[-0.1, -0.2, 0]}
                    onClick={this.buttonClickHandler}
                    roundness={0.7}
                    textSize={0.05}
                    width={0.3}
                >
                    Click Me
                </Button>
            </View>
        );
    }
}