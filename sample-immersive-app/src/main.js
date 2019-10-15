// Add support for things like setTimeout, setInterval and fetch.
// Simply importing this sets all these as global definitions.
// They are declared in the .eslintrc so your editor won't complain.
import 'magic-script-polyfills';

// Import our main app logic for per-invocation prisms.
import start from './App.js';

import { ImmersiveApp } from 'lumin';

class App extends ImmersiveApp {

  // This lifecycle hook is called when your App instance is created.
  // This happens when the first instance if launched and a new process is created.
  // If your app is launched again while one is still running, this will not be called.
  init() {
    this.prisms = [];
    return 0;
  }

  // This lifecycle hook is called for every time your app is launched.
  // It's called after init at process startup and called again with every
  // launch invocation.
  async onAppStart(arg) {
    let prism = await start(this, arg);
    this.prisms.push(prism);
    let id = prism.onDestroyEventSub(() => {
      prism.onDestroyEventUnsub(id);
      if (prism.onClose) prism.onClose();
      let index = this.prisms.indexOf(prism);
      if (index >= 0) this.prisms.splice(index, 1);
    });
  }

  // This is the lumin runtime update loop from C++
  // It's called whenever the event loop updates or using the
  // timeout value specified at app instantiation.
  // Here we simply dispatch it to any prism instances that are interested in it.
  updateLoop(delta) {
    for (let prism of this.prisms) {
      if (prism.onUpdate) prism.onUpdate(delta);
    }
    return true;
  }

  // This is a generic event listener from lumin runtime.
  // We dispatch it to any listening prism instances.
  eventListener(event) {
    for (let prism of this.prisms) {
      if (prism.onEvent) prism.onEvent(event);
    }
    return false;
  }
}

// Launch our app!
// The 0.5 value is the number of seconds to call `updateLoop` in an interval if
// there are no other events waking the event loop.
new App(0.5);
