
export default async function start (app) {
  let prism = app.requestNewPrism([0.5, 0.5, 0.5]);
  let node = prism.createLineNode();
  node.addPoints([0, 0, 0]);
  node.addPoints([0.5, 0.5, 0.5]);
  prism.getRootNode().addChild(node);
  return prism;
}
