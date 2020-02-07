import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ARView } from 'magic-script-components-react-native';

export default class ReactNativeApp extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <ARView style={styles.arView} rendersContinuously={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  arView: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#555555'
  }
});
