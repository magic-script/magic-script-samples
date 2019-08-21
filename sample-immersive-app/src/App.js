
export default async function start (app) {
  let prism = app.requestNewPrism([1, 1, 1]);
  let node = prism.createLineNode();
  node.addPoints([0, 0, 0]);
  node.addPoints([1, 1, 1]);

  app.positionPrism(prism, [0, 0, -1]);

  prism.getRootNode().addChild(node);
  return prism;
}
