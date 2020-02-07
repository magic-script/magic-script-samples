// Add support for things like setTimeout, setInterval and fetch.
// Simply importing this sets all these as global definitions.
// They are declared in the .eslintrc so your editor won't complain.
import 'magic-script-polyfills';
import process from './global-scope';
import React from 'react';
import mxs from 'magic-script-components-lumin';

// Reference process so it isn't stripped
typeof process;

// Load main app logic from the app class.
import MyApp from "../../src/app";

mxs.bootstrap(
  <MyApp
    type="landscape"
    volumeSize={[1, 0.5, 0.1]}
    message="Hello Components"
  />
);