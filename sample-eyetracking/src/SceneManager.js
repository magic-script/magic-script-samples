import { ui } from 'lumin'

export class SceneManager {
  constructor(prism) {
    this.prism = prism;
    this.pages = [];
    this.current = 0;
    this.init();
  }
  init() {
    let that = this;

    let size =  this.prism.getSize();

    // setup page control:
    let controlLayout = ui.UiLinearLayout.Create(this.prism);
    controlLayout.setSize([size[0], 0.0]);
    controlLayout.setLocalPosition([-size[0]/2,size[1]/2,0])
    this.prism.getRootNode().addChild(controlLayout);

    let buttonLayout = ui.UiLinearLayout.Create(this.prism);
    buttonLayout.setOrientation(ui.Orientation.kHorizontal);
    buttonLayout.setSize([size[0], 0.0]);
    controlLayout.addItem(buttonLayout);

    // Prev button
    let eclipseParamsPrev = new ui.EclipseButtonParams(ui.EclipseButtonType.kIcon, ui.SystemIcon.kArrowLeft, 0.1);
    let uiPrev = ui.UiButton.CreateEclipseButton(this.prism, eclipseParamsPrev);
    uiPrev.onActivateSub(function(evt){
      that.showScene((that.current - 1) < 0 ? that.pages.length - 1 : that.current - 1);
    });
    buttonLayout.addItem(uiPrev, [0,0,0,0], ui.Alignment.CENTER_LEFT);
    this.uiPrev = uiPrev;

    // current button
    let uiCurrent= ui.UiDropDownList.Create(this.prism, "Current");
    uiCurrent.setLocalPosition([0,0.9,0]);
    uiCurrent.setTextSize(0.05);
    uiCurrent.setListTextSize(0.05);
    uiCurrent.onSelectionChangedSub((evt, list) => {
      if (list.length == 0) return;
      that.showScene(list[0].id);
    });
    buttonLayout.addItem(uiCurrent, [0,0,0,0], ui.Alignment.CENTER_CENTER);
    this.uiCurrent = uiCurrent;

    // Next button
    let eclipseParamsNext = new ui.EclipseButtonParams(ui.EclipseButtonType.kIcon, ui.SystemIcon.kArrowRight, 0.1);
    let uiNext= ui.UiButton.CreateEclipseButton(this.prism, eclipseParamsNext);
    uiNext.onActivateSub(function(evt){
      that.showScene((that.current + 1) % that.pages.length);
    });
    buttonLayout.addItem(uiNext, [0,0,0,0], ui.Alignment.CENTER_RIGHT);
    this.uiNext = uiNext;

    // layout with the text labels
    let textLayout = ui.UiLinearLayout.Create(this.prism);
    textLayout.setOrientation(ui.Orientation.kHorizontal);
    textLayout.setSize([size[0], 0.0]);
    controlLayout.addItem(textLayout);

    let uiPrevText = ui.UiText.Create(this.prism, "Prev");
    uiPrevText.setTextSize(0.06);
    textLayout.addItem(uiPrevText, [0,0,0,0], ui.Alignment.CENTER_LEFT);
    this.uiPrevText = uiPrevText;

    let uiPrevNext = ui.UiText.Create(this.prism, "Next");
    uiPrevNext.setTextSize(0.06);
    textLayout.addItem(uiPrevNext, [0,0,0,0], ui.Alignment.CENTER_RIGHT);
    this.uiPrevNext = uiPrevNext;
  }
  addScene(scene) {
    this.pages.push(scene);
    let list = this.uiCurrent.getList();
    list.push(new ui.DropDownListItem(scene.getName(), list.length));
    this.uiCurrent.setList(list);
    if (this.pages.length == 1)
      this.showScene(0);
    else
      this.updateHeader();
  }
  showScene(idx) {
    if (idx < 0 || idx >= this.pages.length || this.pages.length == 0) return;

    this.prism.setPrismController(this.pages[idx]);
    this.current = idx;

    this.updateHeader();
  }
  updateHeader(){
    this.uiCurrent.setText(this.pages[this.current].getName());

    let prev = (this.current - 1) < 0 ? this.pages.length - 1 : this.current - 1;
    this.uiPrevText.setText(this.pages[prev].getName());

    let next = (this.current + 1) % this.pages.length;
    this.uiPrevNext.setText(this.pages[next].getName());

    this.uiCurrent.setSelected(this.current, true);
  }
}