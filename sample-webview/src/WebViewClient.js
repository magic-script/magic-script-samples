import { ui } from 'lumin';

export class WebViewClient extends ui.UiWebViewClient {
  constructor(app){
    super();
    this.app = app;
  }

  onBeforeResourceLoad(webview, resource_url) {
    print("MxS onBeforeResourceLoad: ",resource_url);
  }

  onExternalProtocol(webview, url) {
    print("MxS onExternalProtocol", url);
  }

  onLoadEnd(webview, is_main_frame, http_error_code) {
    print("MxS onLoadEnd", is_main_frame, http_error_code);
    this.app.address_bar.setText(webview.getUrl());
  }

  onLoadError(webview, is_main_frame, error_code, error_str, failed_url) {
    print("MxS onLoadError", is_main_frame, error_code, error_str, failed_url);
  }
}

