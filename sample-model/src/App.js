export default async function start (app) {
  let prism = app.requestNewPrism([0.5, 0.5, 0.5]);

  let resource = prism.createModelResourceId("res/BoxTextured.glb", 0.3);
  let model = prism.createModelNode(resource);

  prism.getRootNode().addChild(model);
  return prism;
}
