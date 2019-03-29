import { ui } from 'lumin';

export default async function start (app) {
    const LISTVIEW_CLEANUP_DELAY = 4000;
    const DEFAULT_REQUEST_DELAY = 3000;
    const COUNTER_MAX_VALUE = 1000;
    const COUNTER_INITIAL_VALUE = 1;

    const prism = app.requestNewPrism([1.0, 1.0, 0.5]);

    // UiListView
    const listView = ui.UiListView.Create(prism, 0.375, 1.0);
    listView.setLocalPosition([0.0625, 0.5, 0.0]);
    prism.getRootNode().addChild(listView);

    let counter = COUNTER_INITIAL_VALUE;

    // UiButton - Do Work
    const doButton = ui.UiButton.Create(prism, 'Do Work', 0.375, 0.2, 0.8);
    doButton.setTextSize(0.0425);
    doButton.setLocalPosition([-0.25, 0.18, 0.0]);
    doButton.onActivateSub(async (event) => {

      if (counter <= COUNTER_MAX_VALUE) {
        counter++;
      } else {
        counter = COUNTER_INITIAL_VALUE;
      }

      const label = ui.UiText.CreateEclipseLabel(prism, `Work Item ${counter}`, ui.EclipseLabelType.kT3);

      const listViewItem = ui.UiListViewItem.Create(prism);
      listViewItem.addChild(label);
      listView.addItem(listViewItem);

      const data = await doWork(counter);
      label.setText(`Work ${data.request} completed`);

      setTimeout(() => removeItemFromListView(listViewItem, listView), LISTVIEW_CLEANUP_DELAY);
    });

    prism.getRootNode().addChild(doButton);


    // UiButton - Request Work
    const requestButton = ui.UiButton.Create(prism, 'Request Work', 0.375, 0.20, 0.8);
    requestButton.setTextSize(0.0425);
    requestButton.setLocalPosition([-0.25, -0.18, 0.0]);
    requestButton.onActivateSub(async (event) => {

      if (counter <= COUNTER_MAX_VALUE) {
        counter++;
      } else {
        counter = COUNTER_INITIAL_VALUE;
      }

      const label = ui.UiText.CreateEclipseLabel(prism, `Working on Item ${counter}`, ui.EclipseLabelType.kT3);

      const listViewItem = ui.UiListViewItem.Create(prism);
      listViewItem.addChild(label);
      listView.addItem(listViewItem);

      const data = await requestWork(counter, DEFAULT_REQUEST_DELAY);
      label.setText(`Work ${data.request} completed in ${data.duration} ms`);

      setTimeout(() => removeItemFromListView(listViewItem, listView), LISTVIEW_CLEANUP_DELAY);
    });

    prism.getRootNode().addChild(requestButton);

   async function doWork(requestId) {
    // Returning a non-promise value in async function
    // directs JS to automatically wrap the value in resolved promise
    // return {request: requestId, duration: 0} == return Promise.resolve({request: requestId, duration: 0});
    return { request: requestId, duration: 0 };
  }

  async function requestWork(requestId, delay) {
    const timeStart = Date.now();
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve({ request: requestId, duration: Date.now() - timeStart }), delay));
  }

  function removeItemFromListView(item, listView) {
    const itemNodeId = item.getNodeId();
    const itemsCount = listView.getItemCount();

    for (let index = 0; index < itemsCount; index++) {
      const item = listView.getItem(index);
      if (item.getNodeId() === itemNodeId) {
        listView.removeItem(index);
        break;
      }
    }
  }
  return prism;
}
