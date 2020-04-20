import { AppRegistry } from 'react-native';
import { ReactNativeMagicScript } from 'magic-script-components-react-native';
import ReactNativeApp from '../react-native/ReactNativeApp';

const MagicScript = {
    registerApp: (name, appComponent, debug = false) => {
        AppRegistry.registerComponent(name, () => ReactNativeApp);
        ReactNativeMagicScript.render(appComponent, { name: 'root' }, null, debug);
    }
};

export { MagicScript };
