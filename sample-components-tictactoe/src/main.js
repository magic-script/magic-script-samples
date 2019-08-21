import 'magic-script-polyfills';
import process from './global-scope.js';
import React from 'react';
import mxs from 'magic-script-components';

import { Game } from './app.js';

mxs.bootstrap(<Game type='landscape' volumeSize={[1,1,1]} caption='Tic Tac Toe 123' counter={0} />);
