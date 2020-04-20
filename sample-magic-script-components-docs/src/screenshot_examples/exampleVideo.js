import React from "react";
import { View, Button, Video } from "magic-script-components";

const VideoActions = {
  start: "start",
  pause: "pause",
  stop: "stop"
};

class ExampleVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLooping: false,
      action: VideoActions.pause,
      volume: 1.0,
      videoPath: require("../../assets/video.mp4")
    };
  }

  onStartPauseClick = () => {
    if (this.state.action === VideoActions.start) {
      this.setState({ action: VideoActions.pause });
    } else {
      this.setState({ action: VideoActions.start });
    }
  }

  onStopClick = () => {
    this.setState({ action: VideoActions.stop });
  }

  createButtonWithAction(action, position) {
    const title = action[0].toUpperCase() + action.substring(1);
    const onClickHandler =
      action === VideoActions.stop ? this.onStopClick : this.onStartPauseClick;
    return (
      <Button
        localPosition={position}
        TextSize={0.1}
        width={0.3}
        height={0.12}
        onClick={onClickHandler}
      >
        {title}
      </Button>
    );
  }

  renderPlayOrPauseButton(position) {
    const { action } = this.state;
    if (action === VideoActions.start) {
      return this.createButtonWithAction(VideoActions.pause, position);
    } else {
      return this.createButtonWithAction(VideoActions.start, position);
    }
  }

  renderStopButton(position) {
    return this.createButtonWithAction(VideoActions.stop, position);
  }

  render() {
    const resolution = [1920, 1080];
    const widthInMeters = 1;
    const size = [
      widthInMeters,
      (resolution[1] * widthInMeters) / resolution[0]
    ];
    return (
      <View localPosition={this.props.localPosition}>
        <Video
          localPosition={[0, 0.75, 0]}
          looping={this.state.isLooping}
          width={resolution[0]}
          height={resolution[1]}
          size={size}
          anchorPosition={[0.5 * size[0], 0.5 * size[1], 0]}
          videoPath={this.state.videoPath}
          viewMode={"full-area"}
          volume={this.state.volume}
          action={this.state.action}
        />

        {this.renderPlayOrPauseButton([-0.19, 0, 0])}
        {this.renderStopButton([0.19, 0, 0])}
      </View>
    );
  }
}

export { ExampleVideo };
