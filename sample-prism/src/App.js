export default async function start (app) {

  let prism = app.requestNewPrism([0.2, 0.4, 0.2]);

  let name = 'res/WaterBottle.glb';
  let resource = prism.createModelResourceId(name, 1.0);
  let model = prism.createModelNode(resource);

  prism.getRootNode().addChild(model);
  return prism;
}
