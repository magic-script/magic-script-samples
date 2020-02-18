import React from 'react';
import { LinearLayout, Video, Button, Text } from 'magic-script-components';

export class ExampleVideo extends React.Component {
  state = {
    playEnabled: false,
    pauseEnabled: false,
    stopEnabled: false,
    status: 'Initializing',
    action: undefined
  }

  onPlayHandler = (eventData) => {
    this.setState({playEnabled: false, pauseEnabled: true, stopEnabled: true, action: 'start'});
  }

  onPauseHandler = (eventData) => {
    this.setState({playEnabled: true, pauseEnabled: false, stopEnabled: true, action: 'pause'});
  }

  onStopHandler = (eventData) => {
    this.setState({playEnabled: true, pauseEnabled: false, stopEnabled: false, action: 'stop'});
  }

  onEventHandler = (eventData) => {
    console.log('onEventHandler: ', eventData);

    const videoEventType = eventData.VideoEventType;

    if ( videoEventType === undefined
      || videoEventType === this.state.status) {
      return;
    }

    if (videoEventType === 'buffering-update') {
      this.setState({status: videoEventType});
    } else if (videoEventType === 'completion') {
      this.setState({playEnabled: true, pauseEnabled: false, stopEnabled: false, status: videoEventType});
    } else if (videoEventType === 'error') {
      this.setState({status: videoEventType});
      this.setState({playEnabled: false, pauseEnabled: false, stopEnabled: false, status: videoEventType});
    } else if (videoEventType === 'info') {
      this.setState({status: videoEventType});
    } else if (videoEventType === 'prepared') {
      this.setState({playEnabled: true, pauseEnabled: false, stopEnabled: false, status: videoEventType});
    } else if (videoEventType === 'seek-complete') {
      this.setState({status: videoEventType});
    } else if (videoEventType === 'video-size-changed') {
      this.setState({status: videoEventType});
    } else {
      this.setState({status: 'unknown'});
    }
  }

  render() {
    const videoProps = {
      videoPath: require('../resources/video_1.mp4'),
      width: 1920,
      height: 1080,
      onEvent: this.onEventHandler,
      localScale: [0.960, 0.540, 0]
    }

    if (this.state.action !== undefined) {
      videoProps.action = this.state.action;
    }

    return (
      <LinearLayout
        alignment='center-center'
        key='top-layout'
        name='main-view'
        defaultItemAlignment='center-center'
        defaultItemPadding={[0.03, 0.03, 0.03, 0.03]}
        orientation='vertical'
      >
        <Video key='video' {...videoProps}/>
        <LinearLayout
          key='buttons-layout'
          defaultItemAlignment='center-center'
          defaultItemPadding={[0.02, 0.02, 0.02, 0.02]}
          orientation='horizontal'
        >
          <Button key='play'  type='icon' iconType='play'  height={0.1}
            enabled={this.state.playEnabled}  onClick={this.onPlayHandler} />
          <Button key='pause' type='icon' iconType='pause' height={0.1}
            enabled={this.state.pauseEnabled} onClick={this.onPauseHandler}/>
          <Button key='stop'  type='icon' iconType='stop'  height={0.1}
            enabled={this.state.stopEnabled}  onClick={this.onStopHandler} />
        </LinearLayout>
        <Text key='status' textSize={0.05} text={`Status: ${this.state.status}`}/>
      </LinearLayout>
    );
  }
}