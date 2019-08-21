import { ui } from 'lumin';

export function makePage(prism, text, name) {
  const {
    UiPanel,
    UiText,
    EclipseLabelType,
    Alignment,
    HorizontalTextAlignment,
    UiImage
  } = ui;
  // Create panel
  let panel = UiPanel.Create(prism);
  // Add text label
  let label = UiText.CreateEclipseLabel(prism, text, EclipseLabelType.kB1);
  label.setAlignment(Alignment.CENTER_CENTER);
  label.setTextAlignment(HorizontalTextAlignment.kCenter);
  panel.addChild(label);
  // Add image
  let image = UiImage.Create(prism, name, 0.4096, 0.3072);
  image.setLocalPosition([0, -0.2, 0]);
  panel.addChild(image);
  return panel;
}
