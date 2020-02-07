import React from 'react';
import { ScrollView, ScrollBar, Content, Text, Button } from 'magic-script-components';

export class ExampleContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <ScrollBar />
                <Content>
                    <Text>Message Box</Text>
                    <Button>Submit</Button>
                </Content>
            </ScrollView>
        );
    }
}