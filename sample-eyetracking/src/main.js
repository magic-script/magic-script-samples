// Add support for things like setTimeout, setInterval and fetch.
// Simply importing this sets all these as global definitions.
// They are declared in the .eslintrc so your editor won't complain.
import 'magic-script-polyfills';

// Load main app logic from the app class.
import { App } from './app.js';

// Launch our app!
// The 0.5 value is the number of seconds to call `updateLoop` in an interval if
// there are no other events waking the event loop.
export default new App(0.5);
