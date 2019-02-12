// Add support for things like setTimeout, setInterval and fetch.
import 'magic-script-polyfills';

// Import our main app
import { DynamicFbxScene } from './dynamic-fbx-scene.js';

// Launch our app!
new DynamicFbxScene(0.5);
