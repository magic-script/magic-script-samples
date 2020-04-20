import React from "react";
import { View, Dialog, Text } from "magic-script-components";

export class ExampleDialog extends React.Component {
    state = {
        requestUserConfirmation: true,
        dismissNotification: false,
    };

    onDialogCanceled = event => {
        console.log("User declined !");
        this.setState({
            requestUserConfirmation: false
        });
    };

    onDialogConfirmed = event => {
        console.log("User confirmed !");
        this.setState({
            requestUserConfirmation: false,
            dismissNotification: true
        });
    };
    
    render() {
        const dialog = this.state.requestUserConfirmation
            ? (<Dialog
                buttonType="text-with-icon"
                type="dual-action"
                layout="wide"
                cancelIcon="close"
                cancelText="No"
                confirmIcon="check"
                confirmText="Yes"
                title="Please confirm:"
                message="Dismiss the notification ?"
                onDialogCanceled={this.onDialogCanceled}
                onDialogConfirmed={this.onDialogConfirmed}
            />)
            : undefined;
        const notification = this.state.dismissNotification
            ? undefined
            : (<Text key='notification' textSize={0.035} text='You have recieved message!' localPosition={[-0.175, 0.3, 0]} />);
        return (
            <View name='main-view'>
                <Text key='notification-center' textSize={0.05} text='Notification Center' localPosition={[-0.18, 0.4, 0]} />
                {notification}
                {dialog}
            </View>
        );
    }
}