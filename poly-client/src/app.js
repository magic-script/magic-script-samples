/* global fetch, print */
import query from './GooglePolyApi.js';
import { eulerToQuaternion } from './math.js';
import { ui, Desc2d, MAT4_IDENTITY } from 'lumin';
const { UiTextEdit, Alignment, UiLinearLayout, UiGridLayout, UiImage } = ui;

// Log to both `mldb log` and chrome inspector.
let log = (...args) => {
  print(...args);
  console.log(...args);
};

async function doQuery (context) {
  for await (let data of query(context.value)) {
    let { assets } = data;
    await renderGrid(context, assets);
    print('RenderGrid is done');
    // TODO: don't auto load
    // loadModel(context, assets[0]);
    break;
  }
}

function clear (context) {
  if (context.grid || context.transform) {
    context.layout.removeItem(1);
    context.grid = null;
    context.transform = null;
  }
}

async function renderGrid (context, assets) {
  clear(context);
  let grid = UiGridLayout.Create(context.prism);
  grid.setAlignment(Alignment.CENTER_CENTER);
  context.layout.addItemAt(1, grid);
  grid.setColumns(3);
  grid.setRows(3);

  context.grid = grid;

  let promises = [];
  let i = 0;
  for (let asset of assets) {
    let {
      formats: [{ resources }],
      displayName,
      thumbnail: { url, relativePath }
    } = asset;

    // Skip resources that don't have a png.
    let hasPng = false;
    for (let { relativePath } of resources) {
      if (/\.png$/.test(relativePath)) {
        hasPng = true;
        break;
      }
    }
    if (!hasPng) continue;

    let filePath = context.writablePath + i + '-' + relativePath;
    print('Downloading...', displayName, url, filePath);
    let index = i++;
    promises.push(download(url, filePath).then(() => {
      let img = UiImage.Create(context.prism, filePath, 0.266666, 0.2, true, true);
      img.onActivateSub(async () => {
        await loadModel(context, asset);
      });
      print('Loaded', displayName, img);
      context.grid.addItemAt(index, img);
    }));
    if (i >= 9) break;
  }
  await Promise.all(promises);
  print('All loaded');
}

async function loadModel (context, asset) {
  clear(context);
  let {
    root: { url: rootUrl, relativePath: rootName },
    resources
  } = asset.formats[0];
  let rootPath = context.writablePath + rootName;
  let resourcePaths = [];
  await Promise.all([
    download(rootUrl, rootPath),
    Promise.all(resources.map(({ url: resourceUrl, relativePath: resourceName }) => {
      let resourcePath = context.writablePath + resourceName;
      resourcePaths.push(resourcePath);
      return download(resourceUrl, resourcePath);
    }))
  ]);
  print('All files saved...', rootPath, resourcePaths);
  for (let resourcePath of resourcePaths) {
    if (/\.mtl$/i.test(resourcePath)) {
      let id = context.prism.createObjMtlResourceId(resourcePath, true);
      print('MTL', id, resourcePath);
    } else {
      let id = context.prism.createTextureResourceId(Desc2d.DEFAULT, resourcePath, true);
      print('Texture', id, resourcePath);
    }
  }
  let id = context.prism.createModelResourceId(rootPath, 1, true);
  print('model id', id);
  let model = context.prism.createModelNode(id);
  fit(context, model, 0.6);

  let transform = context.prism.createTransformNode(MAT4_IDENTITY);
  transform.addChild(model);

  context.transform = transform;

  context.value = '';
  context.layout.addItemAt(1, context.transform);
}

function fit (context, node, size = 1) {
  let aabb = node.getLocalAABB();
  print(aabb);
  let [x, y, z] = aabb.getCenter();
  let [w, h, d] = aabb.getExtents();
  let scale = size / 2 / Math.max(w, h, d);
  node.setLocalPosition([-x * scale, -y * scale, -z * scale]);
  node.setLocalScale([scale, scale, scale]);
}

async function download (url, file) {
  print('Downloading...', url);
  let res = await fetch(url);
  return fetch('file://' + file, { method: 'PUT', body: res.body });
}

export default async function start (app) {
  let prism = app.requestNewPrism([1.0, 0.8, 0.8]);
  let layout = UiLinearLayout.Create(prism);
  layout.setSize([0.8, 0.7]);
  layout.setAlignment(Alignment.CENTER_CENTER);
  layout.setDefaultItemAlignment(Alignment.CENTER_CENTER);
  prism.getRootNode().addChild(layout);
  // let value = 'fox';
  // let grid;
  // let transform;

  let context = {
    writablePath: app.getWritablePath(),
    layout: layout,
    prism: prism,
    value: "fox"
  }

  setInterval(() => {
    if (!context.transform) return;
    let quat = eulerToQuaternion(Date.now() / 1000, 0, 0);
    context.transform.setLocalRotation(quat);
  }, 33);

  let searchBar = UiTextEdit.Create(context.prism, context.value, 0.8, 0.1);
  searchBar.setAlignment(Alignment.TOP_CENTER);
  searchBar.setTextSize(0.1);
  context.layout.addItemAt(0, searchBar);
  doQuery(context);

  let timeout;
  searchBar.onKeyboardEventSub(() => {
    let newValue = searchBar.getText();
    if (newValue === context.value) { return; }
    context.value = newValue;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      timeout = null;
      doQuery(context);
    }, 2500);
  });

  return context.prism;
}
