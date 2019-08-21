import { LandscapeApp, ui } from 'lumin';
import { WebViewClient } from './WebViewClient.js';

export class App extends LandscapeApp {
  onAppStart () {
    // Create a new prism that's half a meter cubed.
    let windowWidth = 1.3;
    let bodyHeight = windowWidth / 1.6;
    let headerHeight = 0.05;
    let fontSize = 0.03;

    let prism = this.requestNewPrism([windowWidth, bodyHeight + headerHeight + 0.1, 0.2]);

    // Cursor size is determined from prism size. Set the scale to ignore the default size.
    ui.Cursor.SetScale(prism, 0.03);

    // main layout container
    let container = ui.UiLinearLayout.Create(prism);
    container.setAlignment(ui.Alignment.CENTER_CENTER);
    container.setDefaultItemAlignment(ui.Alignment.CENTER_CENTER);
    container.setOrientation(ui.Orientation.kVertical);
    container.setDefaultItemPadding([0.01, 0.0, 0.03, 0.0]);

    // header container
    let header = ui.UiLinearLayout.Create(prism);
    header.setDefaultItemAlignment(ui.Alignment.CENTER_CENTER);
    header.setDefaultItemPadding([0.0, 0.01, 0.0, 0.01]);
    header.setOrientation(ui.Orientation.kHorizontal);
    container.addItem(header);

    // body container
    let body = ui.UiLinearLayout.Create(prism);
    body.setAlignment(ui.Alignment.CENTER_CENTER);
    body.setOrientation(ui.Orientation.kHorizontal);
    container.addItem(body);

    // UiWebView Node
    let webView = ui.UiWebView.Create(prism, [windowWidth, bodyHeight]);
    body.addItem(webView);

    // address bar
    let addressBar = ui.UiTextEdit.Create(prism, 'google.com', webView.getSize()[0] * 0.5, headerHeight);
    this.address_bar = addressBar;
    addressBar.setTextEntryMode(ui.TextEntryMode.kURL);
    addressBar.setTextSize(fontSize);
    addressBar.onKeyboardEventSub(function (data, key) {
      if (key.getKeyType() === ui.KeyType.kSubmit) {
        webView.loadUrl(addressBar.getText());
      }
    });
    header.addItem(addressBar);

    // back/forward buttons
    let back = ui.UiButton.CreateEclipseButton(prism, new ui.EclipseButtonParams(ui.EclipseButtonType.kIcon, ui.SystemIcon.kActionsLeft));
    back.onActivateSub(data => {
      webView.goBack();
    });
    header.addItem(back);
    let forward = ui.UiButton.CreateEclipseButton(prism, new ui.EclipseButtonParams(ui.EclipseButtonType.kIcon, ui.SystemIcon.kActionsRight));
    forward.onActivateSub(data => {
      webView.goForward();
    });
    header.addItem(forward);

    // keyboard
    let keyboard = new ui.KeyboardProperties();
    keyboard.speechToTextEnabled = true;
    keyboard.enterIsSubmit = true;
    keyboard.formMode = ui.KeyboardProperties.FormMode.kClearCloseSubmit;
    keyboard.submitLabel = ui.KeyboardProperties.SubmitLabel.kSearchIcon;
    addressBar.setKeyboardProperties(keyboard);

    // clear data : cache and cookies
    let clearBtn = ui.UiButton.Create(prism, 'Clear Data', 0.15, headerHeight, 1.0);
    clearBtn.onActivateSub(function (event) {
      webView.getDataManagerInstance().removeAllCookies();
      webView.getDataManagerInstance().clearCache();
    });
    header.addItem(clearBtn);

    // bookmarks
    let bookmarks = ui.UiDropDownList.Create(prism, 'Bookmarks');
    let bookmarksURL = {};
    bookmarksURL['PopUps'] = 'popuptest.com';
    bookmarksURL['Google'] = 'google.com';
    bookmarksURL['YouTube'] = 'youtube.com';
    bookmarksURL['Twitch'] = 'twitch.com';
    bookmarksURL['Magic Leap'] = 'magicleap.com';

    let list = [];

    for (let key in bookmarksURL) {
      let item = new ui.DropDownListItem(key, []);
      list.push(item);
    }
    bookmarks.setList(list);
    bookmarks.setTextSize(0.03);
    bookmarks.onSelectionChangedSub(function (data, dropList) {
      bookmarks.setText(dropList[0].label);
      webView.loadUrl(bookmarksURL[dropList[0].label]);
      addressBar.setText(bookmarksURL[dropList[0].label]);
    });

    header.addItem(bookmarks);
    prism.getRootNode().addChild(container);

    // WebView Client
    let client = new WebViewClient(this);
    webView.setWebViewClient(client);
    webView.loadUrl('www.google.com');
  }

  // Known Issue
  // Web Inspector does not work unless the updateLoop function is present in source.
  // It can be removed for production code.
  updateLoop (delta) {
    return true;
  }
}
