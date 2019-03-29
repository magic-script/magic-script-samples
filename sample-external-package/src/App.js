import { makeTextUnderscore } from './text_underscore.js';
import { makeTextLodash } from './text_lodash.js';

export default async function start (app) {
  let prism = app.requestNewPrism([0.5, 0.5, 0.5]);

  let text_u = makeTextUnderscore(prism);
  text_u.setLocalPosition([0, 0.1, 0]);
  prism.getRootNode().addChild(text_u);

  let text_l = makeTextLodash(prism);
  text_l.setLocalPosition([0, -0.1, 0]);
  prism.getRootNode().addChild(text_l);
  return prism;
}
