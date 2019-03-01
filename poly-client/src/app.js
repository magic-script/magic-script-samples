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

export default async function start (app) {
  let base = app.getWritablePath();
  let prism = app.requestNewPrism([1.0, 0.8, 0.8]);
  let layout = UiLinearLayout.Create(prism);
  layout.setSize([0.8, 0.7]);
  layout.setAlignment(Alignment.CENTER_CENTER);
  layout.setDefaultItemAlignment(Alignment.CENTER_CENTER);
  prism.getRootNode().addChild(layout);
  let value = 'fox';
  let grid;
  let transform;

  setInterval(() => {
    if (!transform) return;
    let quat = eulerToQuaternion(Date.now() / 1000, 0, 0);
    transform.setLocalRotation(quat);
  }, 33);

  let searchBar = UiTextEdit.Create(prism, value, 0.8, 0.1);
  searchBar.setAlignment(Alignment.TOP_CENTER);
  searchBar.setTextSize(0.1);
  layout.addItemAt(0, searchBar);
  doQuery(value);

  let timeout;
  searchBar.onKeyboardEventSub(() => {
    let newValue = searchBar.getText();
    if (newValue === value) { return; }
    value = newValue;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(async () => {
      timeout = null;
      doQuery(value);
    }, 2500);
  });

  async function doQuery (value) {
    for await (let data of query(value)) {
      let { assets } = data;
      await renderGrid(assets);
      print('RenderGrid is done');
      // TODO: don't auto load
      // loadModel(assets[0]);
      break;
    }
  }

  function clear () {
    if (grid || transform) {
      layout.removeItem(1);
      grid = null;
      transform = null;
    }
  }

  async function renderGrid (assets) {
    clear();
    grid = UiGridLayout.Create(prism);
    grid.setAlignment(Alignment.CENTER_CENTER);
    layout.addItemAt(1, grid);
    grid.setColumns(3);
    grid.setRows(3);
    let promises = [];
    let i = 0;
    for (let asset of assets) {
      let {
        formats: [{ resources }],
        displayName, thumbnail: { url, relativePath }
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

      let filePath = base + i + '-' + relativePath;
      print('Downloading...', displayName, url, filePath);
      let index = i++;
      promises.push(download(url, filePath).then(() => {
        let img = UiImage.Create(prism, filePath, 0.266666, 0.2, true, true);
        img.onActivateSub(async () => {
          await loadModel(asset);
        });
        print('Loaded', displayName, img);
        grid.addItemAt(index, img);
      }));
      if (i >= 9) break;
    }
    await Promise.all(promises);
    print('All loaded');
  }

  async function loadModel (asset) {
    clear();
    let {
      root: { url: rootUrl, relativePath: rootName },
      resources
    } = asset.formats[0];
    let rootPath = base + rootName;
    let resourcePaths = [];
    await Promise.all([
      download(rootUrl, rootPath),
      Promise.all(resources.map(({ url: resourceUrl, relativePath: resourceName }) => {
        let resourcePath = base + resourceName;
        resourcePaths.push(resourcePath);
        return download(resourceUrl, resourcePath);
      }))
    ]);
    print('All files saved...', rootPath, resourcePaths);
    for (let resourcePath of resourcePaths) {
      if (/\.mtl$/i.test(resourcePath)) {
        let id = prism.createObjMtlResourceId(resourcePath, true);
        print('MTL', id, resourcePath);
      } else {
        let id = prism.createTextureResourceId(Desc2d.DEFAULT, resourcePath, true);
        print('Texture', id, resourcePath);
      }
    }
    let id = prism.createModelResourceId(rootPath, 1, true);
    print('model id', id);
    let model = prism.createModelNode(id);
    fit(model, 0.6);
    transform = prism.createTransformNode(MAT4_IDENTITY);
    transform.addChild(model);
    value = '';
    layout.addItemAt(1, transform);
  }

  function fit (node, size = 1) {
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

  /**
  let response = await fetch("http://placehold.jp/99ccff/003366/250x150.png");
  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }
  let path = app.getWritablePath();
  let name = "img.png";
  let full_name = path + name;
  await fetch("file://" + full_name, { method: "PUT", body: response.body });

  let string = "basicFetch - Success:\n";
  text.setText(string);

  const { UiImage } = ui;

  let image = UiImage.Create(prism, full_name, 0.4, 0.3, true);
   */
  return prism;
}
