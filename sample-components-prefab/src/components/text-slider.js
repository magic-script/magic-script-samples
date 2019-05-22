import React from 'react';

export default class TextSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: props.items,
            currentPosition: props.initialPosition
        };

        this.onPreviousClick = this.onPreviousClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    onPreviousClick(event) {
        if (this.state.currentPosition === 0) {
            this.state.currentPosition = this.state.items.length - 1;
        } else {
            this.state.currentPosition--;
        }

        this.setState( this.state );
    }

    onNextClick(event) {
        if ((this.state.currentPosition + 1) === this.state.items.length) {
            this.state.currentPosition = 0;
        } else {
            this.state.currentPosition++;
        }

        this.setState( this.state );
    }

    render() {
        return (
            <view>
                <text localPosition={[-0.25, 0.35, 0]} textSize={0.05}>{this.props.caption}</text>
                <text localPosition={[-0.45, 0.25, 0]} textSize={0.04}>{this.state.items[this.state.currentPosition]}</text>
                <button localPosition={[-0.30, -0.05, 0]} width={0.25} height={0.05} roundness={0.5} textSize={0.025}
                    onClick={this.onPreviousClick}>previous</button>
                <button localPosition={[ 0.05, -0.05, 0]} width={0.25} height={0.05} roundness={0.5} textSize={0.025}
                    onClick={this.onNextClick}>next</button>
            </view>
        );
    }
}
